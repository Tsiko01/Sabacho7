// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// Browser: global error / unhandled rejection events.
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

// Node / Vercel runtime: process-level hooks.
if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err) => record(err));
  process.on("unhandledRejection", (reason) => record(reason));
}

// h3 console.errors the real error (with full stack) before masking it to
// {"unhandled":true,"message":"HTTPError"}.  Intercept console.error so we
// keep a reference to the original Error.
if (
  typeof console !== "undefined" &&
  typeof console.error === "function" &&
  !(console.error as any).__captured
) {
  const orig = console.error.bind(console);
  const wrapped = (...args: unknown[]) => {
    const err = args.find((a) => a instanceof Error);
    if (err) record(err);
    orig(...(args as []));
  };
  (wrapped as any).__captured = true;
  console.error = wrapped as typeof console.error;
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}