import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MASTER_PHOTO = "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/da774837-7e13-4361-9812-d2d4962368bd.jpg";

const services = [
  {
    icon: "Sparkles",
    title: "Аппаратный педикюр",
    desc: "Профессиональная обработка ногтей и кожи стоп с использованием медицинского оборудования. Безопасно, стерильно, результат виден сразу.",
    duration: "60–90 мин",
    tag: "Популярное",
  },
  {
    icon: "Shield",
    title: "Удаление мозолей",
    desc: "Безболезненное удаление сухих и стержневых мозолей. Устраняем причину дискомфорта, а не только симптомы.",
    duration: "30–45 мин",
    tag: null,
  },
  {
    icon: "Activity",
    title: "Лечение грибка",
    desc: "Диагностика и комплексное лечение онихомикоза. Подбор индивидуальной программы восстановления здоровья ногтей.",
    duration: "45–60 мин",
    tag: "Специализация",
  },
  {
    icon: "Heart",
    title: "Уход за ногтями",
    desc: "Коррекция вросшего ногтя, лечение паронихии, обработка деформированных ногтей. Возвращаем красоту и здоровье.",
    duration: "40–60 мин",
    tag: null,
  },
];

const prices = [
  { service: "Аппаратный педикюр", price: "от 1 700 ₽" },
  { service: "Педикюр + покрытие гель-лаком", price: "3 800 ₽" },
  { service: "Удаление одной мозоли", price: "800 ₽" },
  { service: "Удаление мозолей (комплекс)", price: "2 200 ₽" },
  { service: "Лечение грибка ногтей (1 ноготь)", price: "700 ₽" },
  { service: "Лечение грибка (курс 5 процедур)", price: "3 000 ₽" },
  { service: "Коррекция вросшего ногтя", price: "1 500 ₽" },
  { service: "Консультация", price: "Бесплатно" },
];

const portfolioItems = [
  { label: "Аппаратный педикюр", beforeImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/c8718ba6-cbc5-4c5b-a767-7de74b5c610b.jpg", afterImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/fec211b0-ca6e-4430-979d-0f7f779ae6e7.jpg" },
  { label: "Удаление мозолей", beforeImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/da4b009b-2579-4de0-b84e-3b86cae87943.jpg", afterImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/b1a78b31-9f0e-4f50-914d-490cebfa876c.jpg" },
  { label: "Лечение грибка", beforeImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/d75ffba2-d24e-40ce-847c-5a4fdf576afe.jpg", afterImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/927038cc-6799-46bd-81f4-87f5c86fa084.jpg" },
  { label: "Вросший ноготь", beforeImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/88a486a6-5df7-4f55-a5a3-59ca82193fbe.jpg", afterImage: "https://cdn.poehali.dev/projects/756bf854-deba-40d9-ab92-127a45ee7a4b/bucket/784daf3c-64e8-4381-b848-2a0aa8690d63.jpg" },
  { label: "Обработка утолщённых ногтей «онихогрифоз»" },
  { label: "Комплексный уход" },
];

const reviews = [
  {
    name: "Марина К.",
    date: "Март 2024",
    text: "Анна — настоящий профессионал! Пришла с запущенным грибком, после курса из 5 процедур ногти выглядят здоровыми. Очень деликатный подход и стерильность на высшем уровне.",
    stars: 5,
    service: "Лечение грибка",
  },
  {
    name: "Елена В.",
    date: "Февраль 2024",
    text: "Делала аппаратный педикюр впервые — это совсем не больно, как я боялась. Результат держится уже 4 недели. Буду приходить только сюда!",
    stars: 5,
    service: "Аппаратный педикюр",
  },
  {
    name: "Ольга С.",
    date: "Январь 2024",
    text: "Мучилась с вросшим ногтём 2 года. Анна решила проблему за одну процедуру и объяснила, как избежать рецидива. Спасибо огромное!",
    stars: 5,
    service: "Вросший ноготь",
  },
  {
    name: "Татьяна М.",
    date: "Декабрь 2023",
    text: "Уже полгода хожу к Анне. Кабинет всегда чистый, инструменты стерилизуются при мне. Стопы всегда в идеальном состоянии.",
    stars: 5,
    service: "Аппаратный педикюр",
  },
];

const navLinks = [
  { label: "О мастере", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Прайс", href: "#price" },
  { label: "Работы", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(18,13,9,0.97), rgba(18,13,9,0.0))" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#home" className="font-display text-xl tracking-widest">
            <span className="text-gold-gradient">Э.Гусева</span>
            <span className="block text-[10px] font-body tracking-[0.3em] text-muted-foreground uppercase mt-0.5">Подолог · Чистополь</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <a href="#booking" className="hidden md:inline-block btn-gold text-xs">Записаться</a>

          <button className="md:hidden text-muted-foreground hover:text-gold transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 py-6 px-4 border-t border-border" style={{ background: "rgba(18,13,9,0.98)" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors border-b border-border/30 last:border-0">
                {l.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setMenuOpen(false)} className="block mt-5 btn-gold text-center">Записаться</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, hsl(42,65%,65%,0.12) 0%, transparent 70%)" }} />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20"
            style={{ background: "radial-gradient(ellipse at top right, hsl(42,50%,40%,0.15) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40"
            style={{ background: "linear-gradient(to top, hsl(30,15%,7%), transparent)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full pt-28 pb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="ornament mb-6 animate-fade-in-up" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.1s forwards" }}>
                ✦ &nbsp; подология &nbsp; ✦
              </div>
              <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight mb-6"
                style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards" }}>
                Здоровые<br />
                <span className="text-gold-gradient italic">стопы</span><br />
                — это искусство
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md"
                style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.35s forwards" }}>Специализируюсь на лечении проблем стоп  и ногтей.
Помогаю в решение проблем таких как:
Грибок ногтей
Врастающие ногти
Мозоли,омозолелости,гиперкеротоз
Деформированные ногти 
Трещины 
Установка коррекционных систем </p>
              <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.45s forwards" }}>
                <a href="#booking" className="btn-gold">Записаться онлайн</a>
                <a href="#portfolio" className="btn-gold-outline">Мои работы</a>
              </div>

              <div className="flex gap-10 mt-14" style={{ opacity: 0, animation: "fadeInUp 0.8s ease 0.6s forwards" }}>
                {[["8+", "лет опыта"], ["1200+", "клиентов"], ["4.9", "рейтинг"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl text-gold-gradient">{num}</div>
                    <div className="text-xs text-muted-foreground tracking-wider uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end"
              style={{ opacity: 0, animation: "scaleIn 0.9s ease 0.3s forwards" }}>
              <div className="relative w-72 md:w-88">
                <div className="absolute -inset-4 pointer-events-none"
                  style={{ border: "1px solid hsl(42,65%,65%,0.15)" }} />
                <div className="absolute -inset-8 pointer-events-none"
                  style={{ border: "1px solid hsl(42,65%,65%,0.07)" }} />
                <img src={MASTER_PHOTO} alt="Эльвира Гусева — подолог"
                  className="w-full object-cover block"
                  style={{ aspectRatio: "3/4" }} />
                <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: "1px solid hsl(42,65%,65%,0.8)", borderLeft: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute top-0 right-0 w-5 h-5" style={{ borderTop: "1px solid hsl(42,65%,65%,0.8)", borderRight: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "1px solid hsl(42,65%,65%,0.8)", borderLeft: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "1px solid hsl(42,65%,65%,0.8)", borderRight: "1px solid hsl(42,65%,65%,0.8)" }} />

                <div className="absolute -bottom-5 -right-5 bg-card border border-border/50 px-4 py-3">
                  <div className="text-xs tracking-widest uppercase text-muted-foreground">опыт</div>
                  <div className="font-display text-2xl text-gold-gradient">8 лет</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="flex items-center justify-center py-2">
        <div className="deco-line" />
        <span className="ornament mx-4">✦</span>
        <div className="deco-line" />
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <AnimatedSection className="space-y-3">
              {[
                ["Award", "Сертификат подолога", "ООО Школа-студия «Виктория»"],
                ["TrendingUp", "Повышение квалификации", "Ежегодные курсы по онихологии и биомеханике стопы"],
                ["Zap", "Работа с аппаратами", "Сертифицированный специалист Doctor Alex & SP-130"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="flex items-start gap-4 p-4 card-gold-border rounded-sm bg-card">
                  <Icon name={icon} size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-body font-medium text-foreground">{title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </AnimatedSection>

            {/* Photo column */}
            <AnimatedSection className="flex justify-center">
              <div className="relative w-56 md:w-64">
                <div className="absolute -inset-3 pointer-events-none"
                  style={{ border: "1px solid hsl(42,65%,65%,0.18)" }} />
                <img
                  src={MASTER_PHOTO}
                  alt="Анна Белова — подолог"
                  className="w-full object-cover block"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: "1px solid hsl(42,65%,65%,0.8)", borderLeft: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1px solid hsl(42,65%,65%,0.8)", borderRight: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: "1px solid hsl(42,65%,65%,0.8)", borderLeft: "1px solid hsl(42,65%,65%,0.8)" }} />
                <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: "1px solid hsl(42,65%,65%,0.8)", borderRight: "1px solid hsl(42,65%,65%,0.8)" }} />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="ornament mb-4">✦ &nbsp; о мастере</div>
              <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
                Эльвира Гусева —<br /><span className="text-gold-gradient italic"></span><br />подолог
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">Начала свой путь в подологии с 2025 года. Пройдя обучение в г. Казани и получив диплом  о профессиональной переподготовке.   Убеждена, что здоровье стоп напрямую влияет на качество всей жизни.</p>
              <p className="text-muted-foreground leading-relaxed mb-8">Принимаю в стерильном кабинете в центре Чистополя. Каждый инструмент — стерильный и вскрывается при вас. Никаких очередей — только запись.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-px" style={{ background: "hsl(42,65%,65%,0.5)" }} />
                <span className="text-gold text-sm font-display italic">«Каждый клиент — это отдельная история»</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 md:px-12"
        style={{ background: "linear-gradient(180deg, hsl(30,12%,8%) 0%, hsl(30,15%,7%) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="ornament mb-4">✦ &nbsp; услуги</div>
            <h2 className="font-display text-4xl md:text-5xl">Что я делаю</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title}>
                <div className="relative p-8 card-gold-border rounded-sm bg-card h-full">
                  {s.tag && (
                    <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase px-2 py-1 font-body font-medium"
                      style={{ background: "hsl(42,65%,65%)", color: "hsl(30,15%,7%)" }}>
                      {s.tag}
                    </div>
                  )}
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/30 rounded-sm mb-5"
                    style={{ background: "hsl(42,65%,65%,0.05)" }}>
                    <Icon name={s.icon} size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="text-gold" />
                    <span>{s.duration}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="ornament mb-4">✦ &nbsp; стоимость</div>
            <h2 className="font-display text-4xl md:text-5xl">Прайс-лист</h2>
            <p className="text-muted-foreground text-sm mt-4">Точную стоимость уточняйте на консультации</p>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ border: "1px solid hsl(30,10%,18%)" }}>
              {prices.map((p, i) => (
                <div key={p.service}
                  className="flex items-center justify-between px-6 py-4 transition-colors duration-200 group"
                  style={{
                    borderBottom: i < prices.length - 1 ? "1px solid hsl(30,10%,16%)" : "none",
                    background: i % 2 === 0 ? "hsl(30,12%,10%)" : "transparent"
                  }}>
                  <span className="text-sm font-body text-muted-foreground group-hover:text-foreground transition-colors">{p.service}</span>
                  <span className="font-display text-xl" style={{ color: p.price === "Бесплатно" ? "hsl(120,40%,60%)" : "hsl(42,65%,65%)" }}>{p.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-5 text-center">Консультация — всегда бесплатно. Действует накопительная система скидок.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 md:px-12"
        style={{ background: "linear-gradient(180deg, hsl(30,12%,8%) 0%, hsl(30,15%,7%) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="ornament mb-4">✦ &nbsp; портфолио</div>
            <h2 className="font-display text-4xl md:text-5xl">Работы до / после</h2>
            <p className="text-muted-foreground text-sm mt-4 max-w-sm mx-auto">Наведите на карточку, чтобы увидеть результат после процедуры</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioItems.map((item, i) => (
              <AnimatedSection key={i}>
                <div
                  className="relative cursor-pointer overflow-hidden rounded-sm group"
                  style={{ aspectRatio: "4/5", background: "hsl(30,12%,12%)", border: "1px solid hsl(30,10%,18%)" }}
                  onMouseEnter={() => setActivePortfolio(i)}
                  onMouseLeave={() => setActivePortfolio(null)}>

                  {item.beforeImage ? (
                    <img
                      src={activePortfolio === i && item.afterImage ? item.afterImage : item.beforeImage}
                      alt={`${item.label} — ${activePortfolio === i && item.afterImage ? "после" : "до"}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Image" size={28} className="text-gold opacity-30 mx-auto mb-2" />
                        <span className="text-xs text-muted-foreground tracking-wider">{item.label}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 transition-opacity duration-400"
                    style={{
                      background: activePortfolio === i
                        ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)"
                        : "transparent",
                      opacity: activePortfolio === i ? 1 : 0
                    }} />

                  <div className="absolute top-3 right-3 text-[9px] tracking-widest uppercase px-2 py-1 font-body font-medium transition-all duration-300"
                    style={{
                      background: activePortfolio === i ? "hsl(42,65%,65%)" : "rgba(0,0,0,0.6)",
                      color: activePortfolio === i ? "hsl(30,15%,7%)" : "rgba(255,255,255,0.8)"
                    }}>
                    {activePortfolio === i ? "После" : "До"}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white/80 font-body tracking-wide transition-opacity duration-300"
                    style={{ opacity: activePortfolio === i ? 1 : 0 }}>
                    {item.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">Реальные фото появятся после загрузки вашего портфолио</p>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="ornament mb-4">✦ &nbsp; отзывы</div>
            <h2 className="font-display text-4xl md:text-5xl">Что говорят клиенты</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={i}>
                <div className="review-card rounded-sm p-7 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="font-body font-medium text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{r.date} · {r.service}</div>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Icon key={j} name="Star" size={13} className="text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-display text-lg italic">
                    «{r.text}»
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">Более 200 отзывов на <span className="text-gold">Яндекс Картах</span> и <span className="text-gold">2GIS</span></p>
          </AnimatedSection>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6 md:px-12"
        style={{ background: "linear-gradient(135deg, hsl(30,12%,8%) 0%, hsl(30,15%,7%) 100%)" }}>
        <div className="max-w-xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="ornament mb-4">✦ &nbsp; запись</div>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Записаться на приём</h2>
            <p className="text-muted-foreground text-sm">Оставьте заявку — свяжусь в течение 30 минут для подтверждения</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="text-center py-16 space-y-5">
                <div className="w-16 h-16 flex items-center justify-center mx-auto"
                  style={{ border: "1px solid hsl(42,65%,65%,0.4)", borderRadius: "50%" }}>
                  <Icon name="Check" size={28} className="text-gold" />
                </div>
                <div className="font-display text-3xl text-gold-gradient">Заявка отправлена</div>
                <p className="text-muted-foreground text-sm">Свяжусь с вами в ближайшее время для подтверждения записи</p>
                <button onClick={() => setSubmitted(false)} className="btn-gold-outline">Новая запись</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Ваше имя *</label>
                    <input required className="input-dark" placeholder="Как вас зовут?"
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Телефон *</label>
                    <input required type="tel" className="input-dark" placeholder="+7 (999) 000-00-00"
                      value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Услуга</label>
                  <select className="input-dark" value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}>
                    <option value="">Выберите услугу</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Консультация">Консультация (бесплатно)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Комментарий</label>
                  <textarea className="input-dark resize-none" rows={3} placeholder="Опишите проблему или пожелания..."
                    value={formData.comment} onChange={e => setFormData(p => ({ ...p, comment: e.target.value }))} />
                </div>
                <button type="submit" className="btn-gold w-full">Отправить заявку</button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="ornament mb-4">✦ &nbsp; контакты</div>
            <h2 className="font-display text-4xl md:text-5xl">Как найти меня</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "MapPin",
                title: "Адрес",
                lines: ["г. Чистополь", "ул. Л.Толстого, д. 143", ""],
              },
              {
                icon: "Phone",
                title: "Телефон",
                lines: ["+7 (937) 288-93-27", "WhatsApp / Telegram", "Пн–Сб: 9:00–20:00"],
              },
              {
                icon: "MessageCircle",
                title: "Соцсети",
                lines: ["@podolod.Chistopol", "Instagram", "ВКонтакте"],
              },
            ].map(({ icon, title, lines }) => (
              <AnimatedSection key={title}>
                <div className="card-gold-border rounded-sm p-8 text-center bg-card">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-5"
                    style={{ border: "1px solid hsl(42,65%,65%,0.3)", background: "hsl(42,65%,65%,0.05)" }}>
                    <Icon name={icon} size={20} className="text-gold" />
                  </div>
                  <div className="font-display text-2xl mb-4">{title}</div>
                  {lines.map((l, i) => (
                    <div key={i} className={`text-sm leading-relaxed ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{l}</div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12" style={{ borderTop: "1px solid hsl(30,10%,15%)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="font-display text-xl text-gold-gradient">Э. Гусева · Подолог</div>
          <div className="text-xs text-muted-foreground tracking-wider text-center">
            © 2024 Эльвира Гусева · Медицинский подолог · Чистополь
          </div>
          <a href="#booking" className="btn-gold text-xs py-2.5 px-6">Записаться</a>
        </div>
      </footer>
    </div>
  );
}