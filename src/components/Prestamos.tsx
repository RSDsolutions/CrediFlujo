import { useRef, useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { LoanCalculator } from '@/components/LoanCalculator';
import { User, Briefcase, Zap, CheckCircle, ArrowRight } from 'lucide-react';
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

export function Prestamos() {
  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();
  const s4 = useInView();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-deep py-12 lg:py-20 border-b border-navy-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/3 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-primary/10 border border-green-primary/20 text-green-dim font-sans font-bold text-xs uppercase tracking-wide mb-4">
            Préstamos 100% en línea
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-4">Nuestros Préstamos</h1>
          <p className="font-sans text-muted-dark text-lg max-w-2xl mx-auto">
            Diseñados para adaptarse a tus necesidades. Flexibles, transparentes y rápidos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: 'Personal', anchor: '#personal' },
              { label: 'Negocio', anchor: '#negocio' },
              { label: 'Emergencia', anchor: '#emergencia' },
            ].map((t) => (
              <a
                key={t.anchor}
                href={t.anchor}
                className="btn-press px-5 py-2.5 rounded-full border border-navy-border text-off-white font-sans font-medium text-sm hover:border-green-primary/50 hover:bg-navy-mid/30 hover:text-green-primary transition-all duration-200"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Préstamo Personal */}
      <section
        ref={s1.ref as React.RefObject<HTMLElement>}
        className="py-16 lg:py-24 bg-very-light shrink-0 scroll-mt-20"
        id="personal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-primary/10 text-green-primary font-sans font-bold text-xs uppercase tracking-wide rounded-full mb-6 border border-green-primary/20">
                <User size={14} /> Personas naturales
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-dark mb-4">
                Préstamo Personal
              </h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Ideal para compras, consolidación de deudas, viajes o cualquier proyecto personal. Tú decides en qué usarlo.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Monto disponible', value: '$200 – $2,000', highlight: true },
                  { label: 'Plazos de pago', value: '3 a 12 meses', highlight: false },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-brand/40 p-4 rounded-xl border border-navy-border shadow-sm hover:border-green-primary/30 transition-colors duration-200">
                    <div className="text-xs text-muted-dark font-semibold uppercase mb-1">{item.label}</div>
                    <div className={cn("font-heading font-bold text-2xl", item.highlight ? "text-green-primary" : "text-text-dark")}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-sans font-semibold text-text-dark mb-4">Requisitos principales:</h4>
                <ul className="space-y-3">
                  {['Cédula vigente', 'Mayor de 18 años y residir en Ecuador', 'Ingresos demostrables'].map((req) => (
                    <li key={req} className="flex items-center gap-3 font-sans text-sm text-muted-dark group">
                      <CheckCircle size={16} className="text-green-primary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/solicitar"
                state={{ amount: 1000, term: 12 }}
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_12px_28px_rgba(61,184,42,0.45)] transition-all duration-200"
              >
                Solicitar Préstamo Personal <ArrowRight size={18} />
              </Link>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 max-w-md mx-auto transition-all duration-700 delay-200",
              s1.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <LoanCalculator defaultAmount={1000} isFormVisible={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Préstamo para Negocio */}
      <section
        ref={s2.ref as React.RefObject<HTMLElement>}
        className="py-16 lg:py-24 bg-navy-brand/20 border-y border-navy-border shrink-0 scroll-mt-20"
        id="negocio"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s2.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="flex gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-primary/10 text-green-primary font-sans font-bold text-xs uppercase tracking-wide rounded-full border border-green-primary/20">
                  <Briefcase size={14} /> Emprendedores
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-urgency/10 text-amber-urgency border border-amber-urgency/20 font-sans font-bold text-xs uppercase tracking-wide rounded-full">
                  Más solicitado
                </div>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-dark mb-4">
                Préstamo para Negocio
              </h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Inyecta liquidez a tu empresa. Ideal para capital de trabajo, compra de inventario, equipos o expansión.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Monto disponible', value: '$500 – $5,000', highlight: true },
                  { label: 'Plazos de pago', value: 'Hasta 24 meses', highlight: false },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-brand/40 p-4 rounded-xl border border-navy-border shadow-sm hover:border-green-primary/30 transition-colors duration-200">
                    <div className="text-xs text-muted-dark font-semibold uppercase mb-1">{item.label}</div>
                    <div className={cn("font-heading font-bold text-2xl", item.highlight ? "text-green-primary" : "text-text-dark")}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-sans font-semibold text-text-dark mb-4">Requisitos principales:</h4>
                <ul className="space-y-3">
                  {['Actividad económica activa (mín. 6 meses)', 'RUC o RISE (opcional, pero agiliza)', 'No requiere garante comercial'].map((req) => (
                    <li key={req} className="flex items-center gap-3 font-sans text-sm text-muted-dark group">
                      <CheckCircle size={16} className="text-green-primary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/solicitar"
                state={{ amount: 3000, term: 18 }}
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_12px_28px_rgba(61,184,42,0.45)] transition-all duration-200"
              >
                Solicitar Préstamo para Negocio <ArrowRight size={18} />
              </Link>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 max-w-md mx-auto transition-all duration-700 delay-200",
              s2.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <LoanCalculator defaultAmount={3500} minAmount={500} maxAmount={5000} isFormVisible={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Préstamo de Emergencia */}
      <section
        ref={s3.ref as React.RefObject<HTMLElement>}
        className="py-16 lg:py-24 bg-very-light shrink-0 scroll-mt-20"
        id="emergencia"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className={cn(
              "w-full lg:w-1/2 transition-all duration-700",
              s3.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-urgency/10 text-amber-urgency font-sans font-bold text-xs uppercase tracking-wide rounded-full mb-6 border border-amber-urgency/20">
                <Zap size={14} fill="currentColor" /> Rápido
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-text-dark mb-4">
                Préstamo de Emergencia
              </h2>
              <p className="font-sans text-lg text-muted-light mb-8 leading-relaxed">
                Cubre imprevistos médicos, reparaciones urgentes o liquidez inmediata. El proceso más rápido de nuestra línea.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Monto disponible', value: '$200 – $1,000', highlight: true },
                  { label: 'Respuesta en', value: 'Pocas horas', highlight: false },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-brand/40 p-4 rounded-xl border border-navy-border shadow-sm hover:border-amber-urgency/20 transition-colors duration-200">
                    <div className="text-xs text-muted-dark font-semibold uppercase mb-1">{item.label}</div>
                    <div className={cn("font-heading font-bold text-2xl", item.highlight ? "text-green-primary" : "text-text-dark")}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-sans font-semibold text-text-dark mb-4">Características:</h4>
                <ul className="space-y-3">
                  {['Mínimos requisitos documentales', 'Desembolso prioritario', 'Plazo corto (1 a 6 meses)'].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 font-sans text-sm text-muted-dark group">
                      <CheckCircle size={16} className="text-green-primary shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/solicitar"
                state={{ amount: 500, term: 3 }}
                className="btn-press btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-amber-urgency to-[#D4880A] text-navy-deep font-heading font-bold rounded-xl hover:brightness-110 shadow-[0_8px_20px_rgba(245,166,35,0.3)] hover:shadow-[0_12px_28px_rgba(245,166,35,0.45)] transition-all duration-200"
              >
                Solicitar Emergencia Express <Zap size={18} />
              </Link>
            </div>

            <div className={cn(
              "w-full lg:w-1/2 max-w-md mx-auto transition-all duration-700 delay-200",
              s3.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <div className="bg-navy-brand p-8 rounded-2xl shadow-xl text-center text-white border-t-4 border-amber-urgency hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_24px_rgba(245,166,35,0.1)] transition-all duration-300">
                <Zap size={48} className="text-amber-urgency mx-auto mb-4 animate-float" fill="currentColor" />
                <h3 className="font-heading font-bold text-2xl mb-2">Emergencia Express</h3>
                <p className="font-sans text-sm text-off-white/80 mb-6 leading-relaxed">
                  Elige esta opción en el formulario de solicitud si necesitas atención prioritaria. Proceso acelerado.
                </p>
                <Link
                  to="/solicitar"
                  state={{ amount: 500, term: 3 }}
                  className="btn-press btn-shimmer inline-block w-full py-4 text-white font-heading font-bold text-lg bg-green-cta hover:brightness-110 rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(61,184,42,0.39)]"
                >
                  Aplicar ahora →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        ref={s4.ref as React.RefObject<HTMLElement>}
        className="bg-navy-deep py-20 lg:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={cn(
            "font-heading font-extrabold text-3xl sm:text-4xl text-off-white text-center mb-12 transition-all duration-700",
            s4.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Compara nuestras opciones
          </h2>

          <div className={cn(
            "overflow-x-auto pb-4 transition-all duration-700 delay-200",
            s4.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <table className="w-full text-left bg-navy-brand rounded-2xl overflow-hidden shadow-2xl min-w-[700px]">
              <thead className="bg-[#101A2D]">
                <tr>
                  <th className="p-6 font-sans font-bold text-off-white border-b border-navy-border uppercase text-xs tracking-wider">Característica</th>
                  <th className="p-6 font-sans font-bold text-off-white border-b border-navy-border uppercase text-xs tracking-wider">Personal</th>
                  <th className="p-6 font-sans font-bold text-green-primary border-b border-navy-border uppercase text-xs tracking-wider bg-green-primary/5">Negocio <span className="text-amber-urgency">(Popular)</span></th>
                  <th className="p-6 font-sans font-bold text-amber-urgency border-b border-navy-border uppercase text-xs tracking-wider">Emergencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-border">
                {[
                  { label: 'Montos', personal: '$200 – $2,000', negocio: '$500 – $5,000', emergencia: '$200 – $1,000', negocioHighlight: true },
                  { label: 'Plazo', personal: '3 a 12 meses', negocio: 'Hasta 24 meses', emergencia: '1 a 6 meses', negocioHighlight: true },
                  { label: 'Tiempo de aprobación', personal: '24 horas', negocio: '24 horas', emergencia: 'Pocas horas', emergenciaHighlight: true },
                  { label: 'Requisitos adicionales', personal: 'Ninguno', negocio: 'RUC o act. comercial', emergencia: 'Ninguno' },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-navy-hover/50 transition-colors duration-150 group">
                    <td className="p-6 font-sans font-medium text-muted-dark group-hover:text-off-white/80 transition-colors">{row.label}</td>
                    <td className="p-6 font-sans text-off-white">{row.personal}</td>
                    <td className={cn("p-6 font-sans bg-green-primary/5", row.negocioHighlight ? "text-green-primary font-bold" : "text-off-white")}>{row.negocio}</td>
                    <td className={cn("p-6 font-sans", row.emergenciaHighlight ? "text-amber-urgency font-bold" : "text-off-white")}>{row.emergencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/solicitar"
              className="btn-press btn-shimmer inline-flex items-center gap-2 text-white font-heading font-bold border border-green-primary px-8 py-3.5 rounded-full hover:bg-green-primary/10 hover:shadow-[0_0_20px_rgba(61,184,42,0.2)] transition-all duration-200"
            >
              Comenzar solicitud general <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
