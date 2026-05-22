import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { CheckCircle, XCircle, ArrowRight, Shield } from 'lucide-react';
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

const requirements = [
  { label: 'Ser mayor de 18 años', desc: 'Edad mínima requerida.' },
  { label: 'Cédula de ciudadanía vigente ecuatoriana', desc: 'Documento de identidad en regla.' },
  { label: 'Número de celular activo con WhatsApp', desc: 'Para comunicarnos con agilidad.' },
  { label: 'Cuenta bancaria a tu nombre', desc: 'Para realizar el desembolso directo.' },
  { label: 'Ingresos mensuales demostrables', desc: 'Empleo, negocio, freelance u otro.' },
];

const notRequired = [
  'Garantes o codeudores',
  'Visitas presenciales en sucursales',
  'Papelería extensa o física',
  'Historial crediticio absolutamente impecable',
];

const eligibilityQuestions = [
  "¿Tienes más de 18 años?",
  "¿Tienes cédula ecuatoriana vigente?",
  "¿Tienes ingresos mensuales demostrables?",
  "¿Tienes cuenta bancaria activa a tu nombre?",
];

export function Requisitos() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const allChecked = checks.every(c => c);

  const s1 = useInView(0.1);
  const s2 = useInView(0.1);
  const s3 = useInView(0.1);

  const toggleCheck = (index: number) => {
    setChecks(prev => prev.map((v, i) => i === index ? !v : v));
  };

  const checkedCount = checks.filter(Boolean).length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-deep py-12 lg:py-20 text-center border-b border-navy-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/3 to-transparent pointer-events-none" />
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-primary/10 border border-green-primary/20 text-green-dim font-sans font-bold text-xs uppercase tracking-wide mb-4">
            <Shield size={12} /> 100% Transparente
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-4">Requisitos y Tarifas</h1>
          <p className="font-sans text-lg text-muted-dark max-w-2xl mx-auto">
            Sin letra pequeña, sin sorpresas. Aquí sabes todo antes de aplicar.
          </p>
        </div>
      </section>

      {/* Requirements Panels */}
      <section ref={s1.ref as React.RefObject<HTMLElement>} className="py-16 lg:py-24 bg-navy-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* What we ask */}
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <div className="bg-navy-brand/70 backdrop-blur-xl p-8 rounded-2xl border border-green-primary/30 shadow-[0_16px_40px_rgba(0,0,0,0.3)] h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(61,184,42,0.08)] transition-shadow duration-300">
                <h2 className="font-heading font-bold text-2xl text-off-white mb-6 flex items-center gap-2">
                  <CheckCircle size={24} className="text-green-primary" />
                  ¿Qué necesitas para aplicar?
                </h2>
                <ul className="space-y-4">
                  {requirements.map((req, i) => (
                    <li
                      key={req.label}
                      style={{ transitionDelay: s1.inView ? `${i * 80}ms` : '0ms' }}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl hover:bg-green-primary/5 transition-all duration-200 group cursor-default",
                        s1.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      )}
                    >
                      <CheckCircle
                        className="text-green-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
                        size={20}
                      />
                      <div>
                        <span className="font-sans font-semibold text-off-white text-sm">{req.label}</span>
                        <p className="font-sans text-muted-dark text-xs mt-0.5">{req.desc}</p>
                      </div>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-navy-mid/30 border border-navy-border/30 mt-2">
                    <XCircle className="text-muted-dark shrink-0 mt-0.5" size={20} />
                    <span className="font-sans text-muted-dark text-sm italic">
                      NO necesitas: garantes, propiedades, o historial crediticio perfecto.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What we don't ask */}
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700 delay-200",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="bg-navy-brand p-8 rounded-2xl border-t-4 border-green-primary shadow-[0_16px_40px_rgba(0,0,0,0.3)] h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(61,184,42,0.08)] transition-shadow duration-300">
                <h2 className="font-heading font-bold text-2xl text-off-white mb-6 flex items-center gap-2">
                  <XCircle size={24} className="text-error" />
                  ¿Qué NO pedimos?
                </h2>
                <ul className="space-y-4">
                  {notRequired.map((item, i) => (
                    <li
                      key={item}
                      style={{ transitionDelay: s1.inView ? `${(i + requirements.length) * 60}ms` : '0ms' }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-error/5 transition-all duration-200 group cursor-default"
                    >
                      <XCircle
                        className="text-error/70 shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-error transition-all duration-200"
                        size={20}
                      />
                      <span className="font-sans text-off-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-green-primary/10 border border-green-primary/30 rounded-xl">
                  <p className="font-sans text-sm text-off-white/90 leading-relaxed">
                    <span className="text-green-primary font-semibold">Nuestro enfoque:</span> evaluamos tu capacidad de pago actual, no tu pasado financiero. Confiamos en las personas.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rates Table */}
      <section ref={s2.ref as React.RefObject<HTMLElement>} className="py-16 lg:py-20 bg-navy-brand/30 border-y border-navy-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "transition-all duration-700",
            s2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="bg-navy-brand/80 backdrop-blur-xl rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] overflow-hidden border border-navy-border/50">
              <div className="p-6 md:p-8 border-b border-navy-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-white">Tarifas Claras</h2>
                  <p className="font-sans text-sm text-muted-dark mt-1">Sin costos ocultos. Tasas sujetas a perfil crediticio.</p>
                </div>
                <Shield size={32} className="text-green-primary/60" />
              </div>

              <table className="w-full text-left">
                <tbody className="divide-y divide-navy-border/50">
                  {[
                    { label: 'Tasa de interés mensual', value: 'Desde 3.5%', valueClass: 'text-green-primary font-bold text-lg' },
                    { label: 'Comisión de apertura', value: '$0 — Gratis', valueClass: 'text-green-primary font-bold' },
                    { label: 'Costo de consulta / simulación', value: '$0 — Gratis', valueClass: 'text-green-primary font-bold' },
                    { label: 'Penalización por prepago', value: 'Ninguna', valueClass: 'text-off-white' },
                    { label: 'Cargo por gestión adicional', value: 'Ninguno', valueClass: 'text-off-white' },
                  ].map((row, i) => (
                    <tr key={row.label} className="hover:bg-navy-hover/50 transition-colors duration-150 group">
                      <td className="p-4 md:p-5 font-sans text-off-white/80 font-medium text-sm group-hover:text-off-white transition-colors">{row.label}</td>
                      <td className={cn("p-4 md:p-5 font-sans text-sm", row.valueClass)}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-5 bg-navy-deep/50 border-t border-navy-border/50 flex justify-between items-center">
                <p className="font-sans text-xs text-muted-dark">*Tasas referenciales. Se confirman según evaluación.</p>
                <Link
                  to="/solicitar"
                  className="btn-press inline-flex items-center gap-1.5 text-green-primary hover:text-green-dim font-heading font-bold text-sm tracking-wide transition-colors duration-200"
                >
                  Simular mi cuota <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section ref={s3.ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-navy-deep">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "transition-all duration-700",
            s3.inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          )}>
            <div className="bg-navy-brand/70 backdrop-blur-xl p-8 rounded-2xl border border-green-primary/30 shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_24px_rgba(61,184,42,0.1)] text-center">
              <h2 className="font-heading font-extrabold text-2xl text-off-white mb-2">¿Califico para un préstamo?</h2>
              <p className="font-sans text-sm text-muted-dark mb-8">Responde estas 4 preguntas y descúbrelo en segundos.</p>

              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-2 flex-1 rounded-full transition-all duration-400",
                      checks[i] ? "bg-green-primary shadow-[0_0_8px_rgba(61,184,42,0.5)]" : "bg-navy-mid"
                    )}
                  />
                ))}
              </div>
              <p className="font-sans text-xs text-muted-dark mb-6">{checkedCount} de 4 confirmados</p>

              <div className="space-y-3 mb-8">
                {eligibilityQuestions.map((q, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col sm:flex-row items-center sm:justify-between gap-3 p-4 rounded-xl border transition-all duration-300",
                      checks[i]
                        ? "bg-green-primary/10 border-green-primary/40 shadow-[0_0_12px_rgba(61,184,42,0.1)]"
                        : "bg-navy-mid/30 border-navy-border hover:border-green-primary/20"
                    )}
                  >
                    <span className={cn(
                      "font-sans font-semibold text-sm text-center sm:text-left transition-colors duration-200",
                      checks[i] ? "text-off-white" : "text-off-white/70"
                    )}>
                      {q}
                    </span>
                    <button
                      onClick={() => toggleCheck(i)}
                      className={cn(
                        "btn-press flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 shrink-0",
                        checks[i]
                          ? "bg-green-primary text-white shadow-[0_4px_12px_rgba(61,184,42,0.35)] scale-105"
                          : "border border-navy-border text-muted-dark hover:border-green-primary/50 hover:text-green-dim"
                      )}
                    >
                      {checks[i] ? <><CheckCircle size={14} /> Sí</> : 'Sí'}
                    </button>
                  </div>
                ))}
              </div>

              {allChecked ? (
                <div className="animate-scale-in">
                  <div className="bg-green-primary/10 border border-green-primary/40 p-6 rounded-xl mb-6 shadow-[0_0_20px_rgba(61,184,42,0.1)]">
                    <div className="text-3xl mb-2">🎉</div>
                    <h3 className="font-heading font-bold text-xl text-green-primary mb-2">¡Muy probablemente calificas!</h3>
                    <p className="font-sans text-sm text-off-white/80">Tienes el perfil ideal. Completa tu solicitud y recibe respuesta en 24 horas.</p>
                  </div>
                  <Link
                    to="/solicitar"
                    className="btn-press btn-shimmer inline-flex items-center justify-center gap-2 w-full py-4 text-white font-heading font-extrabold bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 rounded-xl transition-all duration-200 shadow-[0_8px_20px_rgba(61,184,42,0.35)]"
                  >
                    Solicitar Ahora <ArrowRight size={20} />
                  </Link>
                </div>
              ) : (
                <div className="text-sm font-sans text-muted-dark/70 italic py-4">
                  Responde "Sí" a todas las preguntas para ver tu resultado.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
