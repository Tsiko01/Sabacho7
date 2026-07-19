CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL DEFAULT '',
  question_ka TEXT,
  question_ru TEXT,
  question_uk TEXT,
  answer TEXT NOT NULL DEFAULT '',
  answer_ka TEXT,
  answer_ru TEXT,
  answer_uk TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active faqs" ON public.faqs FOR SELECT USING (active = true);
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER faqs_set_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.faqs (question, question_ka, question_ru, question_uk, answer, answer_ka, answer_ru, answer_uk, sort_order) VALUES
('How do I book a tasting?', 'როგორ დავჯავშნო დეგუსტაცია?', 'Как забронировать дегустацию?', 'Як забронювати дегустацію?',
 'Send a request through the booking form on this site — we confirm every reservation personally within a few hours.',
 'გამოგვიგზავნეთ მოთხოვნა ჯავშნის ფორმის საშუალებით — თითოეულ ჯავშანს პირადად ვადასტურებთ.',
 'Отправьте запрос через форму бронирования — мы подтверждаем каждое бронирование лично в течение нескольких часов.',
 'Надішліть запит через форму бронювання — ми підтверджуємо кожне бронювання особисто протягом кількох годин.', 1),
('Do you host private groups?', 'მასპინძლობთ კერძო ჯგუფებს?', 'Принимаете ли вы частные группы?', 'Ви приймаєте приватні групи?',
 'Yes. Private evenings for couples, families, and small groups are our specialty — please mention your group size when booking.',
 'დიახ. კერძო საღამოები წყვილებისთვის, ოჯახებისთვის და მცირე ჯგუფებისთვის ჩვენი სპეციალობაა — ჯავშნისას მიუთითეთ ჯგუფის ზომა.',
 'Да. Частные вечера для пар, семей и небольших групп — наша специальность. Укажите размер группы при бронировании.',
 'Так. Приватні вечори для пар, родин та невеликих груп — наша спеціальність. Вкажіть розмір групи при бронюванні.', 2),
('What is included in the Supra?', 'რა შედის სუფრაში?', 'Что входит в Супру?', 'Що входить у Супру?',
 'A full Kakhetian table: home-cooked dishes, our wines, chacha, toasts led by a tamada, and stories that last well into the night.',
 'სრული კახური სუფრა: სახლში მომზადებული კერძები, ჩვენი ღვინოები, ჭაჭა, თამადის სადღეგრძელოები და ღამემდე გაგრძელებული ისტორიები.',
 'Полный кахетинский стол: домашние блюда, наши вина, чача, тосты от тамады и истории до глубокой ночи.',
 'Повний кахетинський стіл: домашні страви, наші вина, чача, тости від тамади та історії до глибокої ночі.', 3),
('Where are you located?', 'სად მდებარეობთ?', 'Где вы находитесь?', 'Де ви знаходитесь?',
 'In a quiet Kakhetian village. Full directions are shared upon booking confirmation.',
 'მშვიდ კახურ სოფელში. ზუსტ მისამართს გამოგიგზავნით ჯავშნის დადასტურების შემდეგ.',
 'В тихой кахетинской деревне. Точный адрес мы отправим после подтверждения бронирования.',
 'У тихому кахетинському селі. Точну адресу надішлемо після підтвердження бронювання.', 4),
('Which languages do you host in?', 'რომელ ენებზე მასპინძლობთ?', 'На каких языках вы принимаете гостей?', 'Якими мовами ви приймаєте гостей?',
 'Georgian, English, Russian and Ukrainian — the family switches naturally between them during the evening.',
 'ქართული, ინგლისური, რუსული და უკრაინული — ოჯახი საღამოს განმავლობაში ბუნებრივად გადადის ერთი ენიდან მეორეზე.',
 'Грузинский, английский, русский и украинский — семья естественно переходит между ними в течение вечера.',
 'Грузинська, англійська, російська та українська — родина природно переходить між ними протягом вечора.', 5);