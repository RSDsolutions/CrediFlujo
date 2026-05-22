import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { LoanCalculator } from '@/components/LoanCalculator';
import { CheckCircle, ChevronDown, ArrowRight, Smartphone, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
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

const faqs = [
  {
    q: "¿Cuánto tiempo tarda el proceso completo?",
    a: "Usualmente de 12 a 24 horas laborables desde que envías el formulario hasta el desembolso en tu cuenta bancaria."
  },
  {
    q: "¿Necesito garante?",
    a: "No. En CreditoFlujo confiamos en tu perfil. No requerimos garantes ni fiadores para la mayoría de nuestros préstamos personales."
  },
  {
    q: "¿Puedo pagar antes del plazo?",
    a: "Sí, puedes realizar pagos anticipados o cancelar la totalidad de la deuda en cualquier momento sin penalizaciones por prepago."
  },
  {
    q: "¿Qué documentos necesito?",
    a: "Principalmente tu cédula de identidad vigente. Dependiendo del monto, podemos solicitar un comprobante de ingresos. Sin papelería física ni notarías."
  },
  {
    q: "¿En qué ciudades operan?",
    a: "Operamos en todo el territorio ecuatoriano. Al ser 100% en línea, puedes solicitarlo desde cualquier ciudad del país."
  },
  {
    q: "¿Cuál es la tasa de interés?",
    a: "Nuestras tasas son competitivas y varían según el perfil crediticio y el plazo elegido. Te informaremos la tasa exacta antes de que confirmes tu crédito, sin letra pequeña."
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300 overflow-hidden",
        open
          ? "bg-navy-brand/60 border-green-primary/30 shadow-[0_4px_20px_rgba(61,184,42,0.08)]"
          : "bg-navy-brand/30 border-navy-border hover:border-green-primary/20"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left group"
        aria-expanded={open}
      >
        <span className={cn(
          "font-heading font-bold text-base transition-colors duration-200 pr-4",
          open ? "text-green-primary" : "text-text-dark group-hover:text-green-primary"
        )}>
          {q}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            "shrink-0 transition-all duration-300",
            open ? "text-green-primary rotate-180" : "text-muted-dark group-hover:text-green-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="font-sans text-muted-light text-sm leading-relaxed px-5 pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function ComoFunciona() {
  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();
  const s4 = useInView();
  const sFaq = useInView();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-deep py-12 lg:py-20 text-center border-b border-navy-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/3 to-transparent pointer-events-none" />
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-primary/10 border border-green-primary/20 text-green-dim font-sans font-bold text-xs uppercase tracking-wide mb-4">
            Proceso simple y transparente
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-4">Así de Fácil</h1>
          <p className="font-sans text-lg text-muted-dark max-w-2xl mx-auto">
            4 pasos para tener el dinero en tu cuenta. Sin salir de casa, sin filas, sin papeleos.
          </p>
        </div>
      </section>

      {/* Step 1 - Simula tu crédito */}
      <section
        ref={s1.ref as React.RefObject<HTMLElement>}
        className="py-20 lg:py-28 overflow-hidden bg-very-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <div
                className="font-heading font-extrabold text-[100px] leading-none select-none"
                style={{ WebkitTextStroke: '2px #3DB82A', color: 'transparent' }}
              >
                01
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-dark mb-4 mt-2">Simula tu Crédito</h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Usa nuestra calculadora para ver exactamente cuánto pagarás antes de comprometerte.
                Puedes ajustar montos y plazos libremente. La simulación es gratis y no impacta tu historial crediticio.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Gratis e instantáneo', 'Sin impacto crediticio', 'Ajusta a tu medida'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-green-dim font-sans font-medium text-xs bg-green-primary/10 px-3 py-1.5 rounded-full border border-green-primary/20">
                    <CheckCircle size={12} /> {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/solicitar"
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(61,184,42,0.3)] transition-all duration-200"
              >
                Ir al formulario <ArrowRight size={18} />
              </Link>
            </div>
            <div className={cn(
              "w-full lg:w-1/2 max-w-md mx-auto transition-all duration-700 delay-200",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <LoanCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 - Completa tu Solicitud */}
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        className="py-20 lg:py-28 bg-navy-brand/20 border-y border-navy-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s2.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div
                className="font-heading font-extrabold text-[100px] leading-none select-none"
                style={{ WebkitTextStroke: '2px #1B2A4A', color: 'transparent' }}
              >
                02
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-dark mb-4 mt-2">Completa tu Solicitud</h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Nuestra solicitud en línea toma unos 5 minutos. Solo datos básicos y tu cédula.
                No pedimos papeles interminables ni garantes imposibles de conseguir.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <Smartphone size={18} />, label: 'Desde el celular o computadora' },
                  { icon: <CheckCircle size={18} />, label: 'Sin papeleo físico ni notarías' },
                  { icon: <CheckCircle size={18} />, label: 'Información 100% segura (SSL 256-bit)' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 font-sans text-text-dark font-medium group">
                    <div className="w-8 h-8 rounded-full bg-green-primary/15 flex items-center justify-center text-green-primary shrink-0 group-hover:bg-green-primary/25 transition-colors duration-200">
                      {item.icon}
                    </div>
                    {item.label}
                  </li>
                ))}
              </ul>
              <Link
                to="/solicitar"
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(61,184,42,0.3)] transition-all duration-200"
              >
                Empezar solicitud <ArrowRight size={18} />
              </Link>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 flex justify-center transition-all duration-700 delay-200",
              s2.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              {/* Phone Mockup */}
              <div className="w-full max-w-[280px] aspect-[1/2] bg-[#0D1829] rounded-[3rem] border-8 border-navy-mid shadow-2xl p-4 flex flex-col relative overflow-hidden hover:shadow-[0_24px_48px_rgba(0,0,0,0.6),0_0_24px_rgba(61,184,42,0.1)] transition-shadow duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-navy-mid rounded-b-2xl" />
                <div className="mt-8 flex flex-col gap-3">
                  <div className="h-5 w-2/5 bg-navy-mid rounded-md" />
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-11 w-full bg-navy-mid/50 rounded-xl border border-navy-border/50"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                  <div className="h-11 w-full bg-green-primary rounded-xl mt-3 shadow-sm opacity-90 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 - Recibe tu Respuesta */}
      <section
        ref={s3.ref as React.RefObject<HTMLElement>}
        className="py-20 lg:py-28 bg-navy-brand border-t border-green-primary text-off-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-green-primary/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s3.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <div
                className="font-heading font-extrabold text-[100px] leading-none select-none"
                style={{ WebkitTextStroke: '2px #3DB82A', color: 'transparent' }}
              >
                03
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4 mt-2">Recibe tu Respuesta</h2>
              <p className="font-sans text-lg text-off-white/80 mb-8 leading-relaxed">
                Nuestro equipo revisa tu solicitud rápidamente. En 24 horas (a veces menos) te contactamos
                por WhatsApp con la decisión. Si calificas, recibirás la propuesta formal de crédito.
              </p>
              <div className="flex items-center gap-3 bg-green-primary/10 border border-green-primary/30 rounded-xl p-4">
                <Clock size={20} className="text-green-primary shrink-0" />
                <p className="font-sans text-sm text-off-white/90">
                  <strong className="text-green-primary">Tiempo promedio de respuesta:</strong> 12–24 horas hábiles
                </p>
              </div>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 flex items-center justify-center lg:justify-end transition-all duration-700 delay-200",
              s3.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="bg-navy-deep p-8 rounded-2xl border border-navy-border shadow-2xl w-full max-w-sm hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_20px_rgba(61,184,42,0.1)] transition-shadow duration-300">
                <p className="text-xs font-sans text-muted-dark uppercase tracking-widest mb-4">Mensaje de WhatsApp</p>
                <div className="flex items-start gap-4 p-4 bg-[#122B1D] border border-green-primary/30 rounded-xl mb-4 hover:bg-[#163524] transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-white mb-1">WhatsApp · CreditoFlujo ✓</h5>
                    <p className="font-sans text-xs text-white/80 leading-relaxed">
                      ¡Hola Juan! Tu solicitud de préstamo ha sido <span className="text-green-primary font-semibold">aprobada</span>. 🎉 Envíanos 'OK' para procesar el desembolso.
                    </p>
                    <p className="text-[10px] text-muted-dark mt-1.5">Hace 2 minutos ✓✓</p>
                  </div>
                </div>
                <p className="text-xs font-sans text-muted-dark text-center">
                  Recibirás la notificación directamente en tu WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 - Recibe tu Dinero */}
      <section
        ref={s4.ref as React.RefObject<HTMLElement>}
        className="py-20 lg:py-28 bg-very-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s4.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div
                className="font-heading font-extrabold text-[100px] leading-none select-none"
                style={{ WebkitTextStroke: '2px #F5A623', color: 'transparent' }}
              >
                04
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-dark mb-4 mt-2">Recibe tu Dinero</h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Una vez aprobado y confirmado el crédito, realizamos el desembolso de inmediato.
                El monto se transfiere directamente a tu cuenta bancaria. Sin demoras, sin intermediarios.
              </p>
              <Link
                to="/solicitar"
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(61,184,42,0.3)] transition-all duration-200"
              >
                Empezar proceso ahora <ArrowRight size={18} />
              </Link>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 flex flex-col gap-4 max-w-sm mx-auto transition-all duration-700 delay-200",
              s4.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              {[
                {
                  icon: <CreditCard size={20} className="text-green-primary" />,
                  label: 'Transferencia Bancaria',
                  badge: 'Inmediata',
                  badgeColor: 'bg-green-primary/10 text-green-primary',
                },
                {
                  icon: <CheckCircle size={20} className="text-muted-dark" />,
                  label: 'Retiro en Efectivo',
                  badge: 'Ventanillas aliadas',
                  badgeColor: 'bg-navy-mid/30 text-muted-dark',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 border border-navy-border bg-navy-brand/30 rounded-xl flex items-center justify-between hover:border-green-primary/30 hover:bg-navy-brand/50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy-mid flex items-center justify-center group-hover:bg-navy-mid/70 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-heading font-bold text-text-dark group-hover:text-off-white transition-colors">{item.label}</span>
                  </div>
                  <span className={cn("text-sm font-sans font-medium px-3 py-1 rounded-full", item.badgeColor)}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={sFaq.ref as React.RefObject<HTMLElement>}
        className="bg-navy-deep py-20 lg:py-28"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className={cn(
            "font-heading font-extrabold text-3xl sm:text-4xl text-center text-off-white mb-4 transition-all duration-700",
            sFaq.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Preguntas Frecuentes
          </h3>
          <p className={cn(
            "font-sans text-muted-dark text-center mb-10 transition-all duration-700 delay-100",
            sFaq.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Resolvemos tus dudas antes de que apliques.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ transitionDelay: sFaq.inView ? `${i * 80}ms` : '0ms' }}
                className={cn(
                  "transition-all duration-700",
                  sFaq.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <FaqItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-muted-dark mb-4">¿Tienes más preguntas?</p>
            <Link
              to="/contacto"
              className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-green-primary/50 text-green-primary font-sans font-semibold hover:bg-green-primary/10 hover:shadow-[0_0_16px_rgba(61,184,42,0.15)] transition-all duration-200"
            >
              Contactar a un asesor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
