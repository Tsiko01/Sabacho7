-- Add language and update status constraint for bookings
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en';

-- Normalize existing statuses to the new flow
UPDATE public.bookings SET status = 'cancelled' WHERE status IN ('declined');
UPDATE public.bookings SET status = 'confirmed' WHERE status IN ('completed');