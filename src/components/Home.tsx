import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LoanCalculator } from '@/components/LoanCalculator';
import { CheckCircle, Zap, User, Briefcase, FileText, DollarSign, Calculator, ArrowRight, Shield, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Home() {
  const [approvedLoans, setApprovedLoans] = useState(0);
  const [loansStarted, setLoansStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const heroSection = useInView(0.1);
  const loanTypesSection = useInView(0.1);
  const howItWorksSection = useInView(0.1);
  const trustSection = useInView(0.1);

  // Start counter when hero is visible
  useEffect(() => {
    if (heroSection.inView && !loansStarted) {
      setLoansStarted(true);
      const target = 3247;
      let current = 0;
      const interval = setInterval(() => {
        if (current < target - 50) {
          current += Math.floor(Math.random() * 20) + 10;
        } else if (current < target) {
          current += 1;
        } else {
          clearInterval(interval);
        }
        setApprovedLoans(current > target ? target : current);
      }, 40);
      return () => clearInterval(interval);
    }
  }, [heroSection.inView, loansStarted]);

  const loanTypes = [
    {
      icon: <User size={24} />,
      title: 'Préstamo Personal',
      range: 'Desde $200 hasta $2,000',
      color: 'text-green-primary',
      iconBg: 'bg-navy-mid',
      featured: false,
      features: ['Sin garante', 'Hasta 12 meses plazo', 'Aprobación en 24h', 'Solo cédula'],
      state: { amount: 1000, term: 12 },
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Préstamo para Negocio',
      range: 'Desde $500 hasta $5,000',
      color: 'text-green-primary',
      iconBg: 'bg-green-primary/20',
      featured: true,
      badge: 'Más Solicitado',
      features: ['Para capital de trabajo', 'Hasta 24 meses plazo', 'Con o sin historial', 'RUC o actividad comprobable'],
      state: { amount: 3000, term: 18 },
    },
    {
      icon: <Zap size={24} fill="currentColor" />,
      title: 'Préstamo de Emergencia',
      range: 'Desde $200 hasta $1,000',
      color: 'text-amber-urgency',
      iconBg: 'bg-navy-mid',
      featured: false,
      features: ['Respuesta en horas', 'Mínimos requisitos', 'Desembolso inmediato', 'Plazo corto (1 a 6 meses)'],
      state: { amount: 500, term: 3 },
    },
  ];

  const trustCards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
      title: '100% en Línea',
      desc: 'Desde tu celular o computadora, sin visitas, sin filas, sin fotocopias.',
      accent: 'text-green-primary',
      bg: 'bg-green-primary/20',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: 'Datos Seguros',
      desc: 'Encriptación SSL 256-bit. Tus datos personales son confidenciales y nunca se comparten.',
      accent: 'text-green-primary',
      bg: 'bg-green-primary/20',
    },
    {
      icon: <Zap size={24} fill="currentColor" />,
      title: 'Respuesta Rápida',
      desc: 'Revisamos tu solicitud urgentemente. Obtén una respuesta en menos de 24 horas hábiles.',
      accent: 'text-amber-urgency',
      bg: 'bg-amber-urgency/20',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Soporte Real',
      desc: 'Un asesor financiero real te acompaña por WhatsApp en todo el proceso de desembolso.',
      accent: 'text-green-primary',
      bg: 'bg-green-primary/20',
    },
  ];

  return (
    <Layout>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section ref={heroSection.ref} className="relative bg-transparent pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Decorative SVG lines */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1024 600" preserveAspectRatio="none">
            <path d="M0,500 L200,450 L400,480 L600,400 L800,420 L1024,300" fill="none" stroke="#3DB82A" strokeWidth="2" />
            <path d="M0,550 L250,520 L500,540 L750,490 L1024,450" fill="none" stroke="#3DB82A" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

            {/* Left Column */}
            <div className={cn(
              "w-full lg:w-[55%] text-center lg:text-left transition-all duration-700",
              heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-urgency/10 border border-amber-urgency/20 text-amber-urgency font-sans font-bold text-xs uppercase tracking-wide mb-6 animate-pulse">
                <Zap size={14} fill="currentColor" />
                Aprobación en 24 horas · Cupos disponibles hoy
              </span>

              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[64px] text-off-white leading-[1.05] tracking-tight mb-6">
                El dinero que<br />
                necesitas, <span className="bg-gradient-to-r from-green-primary to-[#1A7A0A] bg-clip-text text-transparent">hoy<br className="hidden lg:block" /> mismo.</span>
              </h1>

              <p className="font-sans text-muted-dark text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Préstamos personales desde $200 hasta $5,000. Sin garantes, sin papeleos excesivos, 100% en línea.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {['Sin garantes', 'Sin visitas', 'Respuesta rápida'].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-green-dim font-sans font-medium text-[13px] bg-navy-mid/30 px-3 py-1.5 rounded-md border border-navy-border/50 hover:border-green-primary/40 hover:bg-navy-mid/50 transition-all duration-200"
                  >
                    <CheckCircle size={14} /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
                </span>
                <p className="font-sans font-semibold text-success tracking-wide text-sm">
                  {approvedLoans.toLocaleString()} préstamos aprobados este mes
                </p>
              </div>

              {/* CTA Buttons below stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                <Link
                  to="/solicitar"
                  className="btn-shimmer btn-press inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold text-lg hover:brightness-110 shadow-[0_8px_24px_rgba(61,184,42,0.35)] hover:shadow-[0_12px_32px_rgba(61,184,42,0.5)] transition-all duration-200"
                >
                  Solicitar ahora <ArrowRight size={20} />
                </Link>
                <Link
                  to="/como-funciona"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-navy-border text-off-white font-sans font-medium hover:border-green-primary/50 hover:bg-navy-mid/30 transition-all duration-200"
                >
                  ¿Cómo funciona?
                </Link>
              </div>
            </div>

            {/* Right Column - Calculator */}
            <div className={cn(
              "w-full max-w-md mx-auto lg:w-[45%] transition-all duration-700 delay-200",
              heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <LoanCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-navy-brand/40 backdrop-blur-md py-12 border-y border-navy-border relative z-10 overflow-hidden">
        {/* Moving glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-primary/3 to-transparent animate-[shimmer_4s_ease_infinite]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '+3,200', label: 'Clientes activos', color: 'text-green-primary' },
              { value: '$4.2M', label: 'En préstamos otorgados', color: 'text-green-primary' },
              { value: '24h', label: 'Aprobación promedio', color: 'text-green-primary' },
              { value: '4.8★', label: 'Calificación de clientes', color: 'text-amber-urgency' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center px-4 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={cn(
                  "font-display text-4xl sm:text-5xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110",
                  stat.color
                )}>
                  {stat.value}
                </div>
                <div className="font-sans text-muted-dark font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loan Types ───────────────────────────────────────── */}
      <section ref={loanTypesSection.ref} className="bg-transparent py-20 lg:py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
            loanTypesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-off-white mb-4">
              Elige el Préstamo Ideal.
            </h2>
            <p className="font-sans text-muted-dark text-lg">
              Soluciones financieras diseñadas para cada necesidad. Aplica al que mejor se adapte a ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loanTypes.map((loan, i) => (
              <div
                key={loan.title}
                style={{ transitionDelay: loanTypesSection.inView ? `${i * 120}ms` : '0ms' }}
                className={cn(
                  "relative backdrop-blur-xl rounded-2xl p-8 text-off-white card-lift group cursor-pointer transition-all duration-700",
                  loan.featured
                    ? "bg-navy-brand/90 border-2 border-green-primary/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(61,184,42,0.15)] md:-translate-y-4"
                    : "bg-navy-brand/80 border border-navy-border shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
                  loanTypesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
              >
                {loan.badge && (
                  <div className="absolute -top-4 right-6 bg-amber-urgency text-navy-deep font-sans font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {loan.badge}
                  </div>
                )}

                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                  loan.iconBg,
                  loan.color
                )}>
                  {loan.icon}
                </div>

                <h3 className="font-heading font-bold text-xl mb-2">{loan.title}</h3>
                <p className={cn("font-sans font-bold text-lg mb-6", loan.color)}>{loan.range}</p>

                <ul className="space-y-3 mb-8">
                  {loan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 font-sans text-sm text-off-white/80">
                      <CheckCircle
                        size={16}
                        className={cn("mt-0.5 shrink-0", loan.featured ? "text-green-primary" : "text-green-dim")}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/solicitar"
                  state={loan.state}
                  className={cn(
                    "btn-press btn-shimmer block w-full text-center py-3 rounded-xl font-heading font-bold bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white transition-all duration-200",
                    loan.featured
                      ? "shadow-[0_10px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_14px_28px_rgba(61,184,42,0.45)]"
                      : "shadow-lg hover:shadow-[0_8px_20px_rgba(61,184,42,0.25)]"
                  )}
                >
                  Solicitar este préstamo
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section
        ref={howItWorksSection.ref}
        className="bg-navy-deep/40 backdrop-blur-md py-20 lg:py-28 relative overflow-hidden border-t border-navy-border z-10"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMxQjJBNEEiLz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className={cn(
            "font-heading font-extrabold text-3xl sm:text-4xl text-off-white text-center mb-16 transition-all duration-700",
            howItWorksSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            ¿Cómo funciona?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 border-t-2 border-dashed border-green-primary/30 z-0" />

            {[
              { num: 1, title: 'Simula tu crédito', desc: 'Usa nuestra calculadora y ve cuánto puedes pedir y pagarás.', icon: <Calculator size={24} /> },
              { num: 2, title: 'Completa la solicitud', desc: '5 minutos. Solo tu cédula y datos básicos. Sin salir.', icon: <FileText size={24} /> },
              { num: 3, title: 'Recibe respuesta', desc: 'En 24 horas o menos te contactamos con la decisión.', icon: <CheckCircle size={24} /> },
              { num: 4, title: 'Recibe tu dinero', desc: 'Transferencia directa a tu cuenta bancaria o efectivo.', icon: <DollarSign size={24} /> },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: howItWorksSection.inView ? `${idx * 120}ms` : '0ms' }}
                className={cn(
                  "relative z-10 flex flex-col items-center text-center group transition-all duration-700",
                  howItWorksSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
              >
                <div className="w-24 h-24 rounded-full bg-navy-brand border-4 border-navy-deep flex items-center justify-center mb-6 shadow-xl relative group-hover:border-green-primary/40 group-hover:shadow-[0_0_24px_rgba(61,184,42,0.2)] transition-all duration-300">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-primary text-white font-heading font-bold flex items-center justify-center text-sm border-2 border-navy-deep shadow-sm">
                    {step.num}
                  </span>
                  <div className="text-off-white group-hover:text-green-primary transition-colors duration-300">{step.icon}</div>
                </div>
                <h3 className="font-heading font-bold text-lg text-off-white mb-3 group-hover:text-green-primary transition-colors duration-200">{step.title}</h3>
                <p className="font-sans text-muted-dark text-sm max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/como-funciona"
              className="btn-press inline-flex items-center gap-2 px-8 py-3 rounded-full border border-navy-border text-off-white font-sans font-medium hover:bg-navy-brand hover:border-green-primary/40 hover:text-green-primary transition-all duration-200"
            >
              Ver el proceso detallado <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust & Security ─────────────────────────────────── */}
      <section ref={trustSection.ref} className="bg-transparent py-20 lg:py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
            trustSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-off-white mb-4">
              ¿Por qué miles de ecuatorianos nos eligen?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCards.map((card, i) => (
              <div
                key={card.title}
                style={{ transitionDelay: trustSection.inView ? `${i * 100}ms` : '0ms' }}
                className={cn(
                  "bg-navy-brand/60 backdrop-blur-xl p-8 rounded-2xl border border-navy-border shadow-lg card-lift group transition-all duration-700",
                  trustSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                  card.bg,
                  card.accent
                )}>
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-off-white mb-3 group-hover:text-green-primary transition-colors duration-200">{card.title}</h3>
                <p className="font-sans text-off-white/70 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Urgency CTA Banner ────────────────────────────────── */}
      <section className="bg-gradient-to-r from-green-primary/20 to-[#1A7A0A]/20 backdrop-blur-xl py-16 mb-12 mx-4 lg:mx-auto max-w-7xl rounded-3xl border border-green-primary/30 relative z-10 shadow-[0_20px_50px_rgba(61,184,42,0.1)] overflow-hidden">
        {/* Animated bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-green-primary/5 animate-[shimmer_6s_ease_infinite]" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-urgency text-navy-deep font-sans font-bold text-sm mb-6 uppercase tracking-wider animate-pulse shadow-md">
            ⚡ Cierra pronto: Cupos de la semana
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-6">
            ¿Necesitas dinero hoy?
          </h2>
          <p className="font-sans text-white/90 text-lg mb-8 max-w-lg mx-auto">
            Solicitudes abiertas. Proceso sin compromisos. Averigua si calificas en 5 minutos.
          </p>
          <Link
            to="/solicitar"
            className="btn-press btn-shimmer inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-green-primary font-heading font-bold text-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            Solicitar mi préstamo ahora <ArrowRight size={22} />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm font-sans">
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-dim" /> Sin costo de consulta</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-dim" /> Sin garantes</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-urgency" /> Respuesta en 24h</span>
          </div>
        </div>
      </section>

    </Layout>
  );
}
