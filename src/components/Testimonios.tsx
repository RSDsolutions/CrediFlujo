import { useRef, useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={cn("transition-colors", star <= rating ? "text-amber-urgency fill-amber-urgency" : "text-navy-mid")}
        />
      ))}
    </div>
  );
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-green-primary/20', 'bg-amber-urgency/20', 'bg-blue-500/20', 'bg-purple-500/20', 'bg-pink-500/20'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={cn("w-full h-full rounded-full flex items-center justify-center", color)}>
      <span className="font-heading font-bold text-off-white text-lg">{initials}</span>
    </div>
  );
}

const testimonials = [
  { name: 'Carlos M.', city: 'Quito', amount: '$1,200', type: 'Personal', rating: 5, quote: 'Necesitaba el dinero urgente para arreglar mi auto. Aplicar fue facilísimo y al día siguiente ya tenía el dinero en mi cuenta.', time: 'Hace 3 días' },
  { name: 'Diana R.', city: 'Guayaquil', amount: '$3,500', type: 'Negocio', rating: 5, quote: 'El préstamo me ayudó a comprar más inventario para mi tienda. Excelente servicio y la tasa es justa, no me pidieron garantes.', time: 'Hace 1 semana' },
  { name: 'Luis P.', city: 'Cuenca', amount: '$800', type: 'Emergencia', rating: 4, quote: 'Muy rápido el desembolso. Me salvaron de una emergencia médica. Lo recomiendo si necesitas dinero para ayer.', time: 'Hace 2 semanas' },
  { name: 'Ana T.', city: 'Manta', amount: '$2,000', type: 'Personal', rating: 5, quote: 'Estaba dudosa por ser en línea, pero el asesor de WhatsApp fue súper amable, me explicó todo claro. Aprobada sin problemas.', time: 'Hace 3 semanas' },
  { name: 'Pedro S.', city: 'Loja', amount: '$1,500', type: 'Negocio', rating: 5, quote: 'CreditoFlujo confió en mi emprendimiento. El proceso 100% digital me ahorró horas de estar haciendo filas en bancos.', time: 'Hace 1 mes' },
  { name: 'Sofia V.', city: 'Machala', amount: '$500', type: 'Emergencia', rating: 5, quote: 'Apliqué un martes en la noche y el miércoles a medio día ya tenía mi transferencia. Súper eficientes.', time: 'Hace 1 mes' },
];

const typeColors: Record<string, string> = {
  Personal: 'bg-green-primary/15 text-green-dim',
  Negocio: 'bg-blue-500/15 text-blue-400',
  Emergencia: 'bg-amber-urgency/15 text-amber-urgency',
};

export function Testimonios() {
  const heroRef = useRef<HTMLElement>(null);
  const statsSection = useInView(0.2);
  const featuredSection = useInView(0.1);
  const gridSection = useInView(0.05);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="bg-navy-deep py-12 lg:py-20 text-center border-b border-navy-border/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/3 to-transparent pointer-events-none" />
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-urgency/10 border border-amber-urgency/20 text-amber-urgency font-sans font-bold text-xs uppercase tracking-wide mb-4">
            ★ Más de 3,200 clientes satisfechos
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-4">Clientes que Confían en Nosotros</h1>
          <p className="font-sans text-lg text-muted-dark max-w-2xl mx-auto">
            Miles de historias de éxito y metas cumplidas en todo Ecuador.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section ref={statsSection.ref as React.RefObject<HTMLElement>} className="bg-navy-brand/60 backdrop-blur-md border-b border-navy-border/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: '+3,200', label: 'Clientes', color: 'text-green-primary' },
              { val: '4.8★', label: 'Calificación', color: 'text-amber-urgency' },
              { val: '$4.2M', label: 'Prestados', color: 'text-green-primary' },
              { val: '24h', label: 'Tiempo Prom.', color: 'text-amber-urgency' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-4 group"
                style={{ transitionDelay: statsSection.inView ? `${i * 80}ms` : '0ms' }}
              >
                <div className={cn(
                  "font-display text-2xl sm:text-3xl font-bold mb-1 transition-transform duration-300 group-hover:scale-110",
                  stat.color
                )}>
                  {stat.val}
                </div>
                <div className="text-xs text-muted-dark uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-navy-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Testimonial */}
          <div
            ref={featuredSection.ref as React.RefObject<HTMLElement>}
            className={cn(
              "mb-16 transition-all duration-700",
              featuredSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="bg-navy-brand/80 backdrop-blur-xl rounded-2xl w-full border border-green-primary/30 border-l-4 border-l-green-primary flex flex-col md:flex-row shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_24px_rgba(61,184,42,0.1)] overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(61,184,42,0.15)] transition-shadow duration-300">
              <div className="w-full md:w-1/3 bg-navy-mid/60 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-navy-border/50">
                <div className="w-24 h-24 rounded-full border-2 border-green-primary/50 mb-4 overflow-hidden bg-green-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-2xl text-green-primary">JM</span>
                </div>
                <h4 className="font-heading font-bold text-off-white text-xl mb-1">José Martinez</h4>
                <p className="font-sans text-muted-dark text-sm mb-3">Quito, Ecuador</p>
                <StarRating rating={5} />
              </div>
              <div className="p-8 lg:p-12 md:w-2/3">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-green-primary/10 text-green-dim text-xs font-bold font-sans uppercase rounded-full border border-green-primary/20">Préstamo para Negocio</span>
                  <span className="px-3 py-1 bg-navy-deep text-off-white text-xs font-bold font-sans uppercase rounded-full border border-navy-border/50">Recibió $4,000</span>
                </div>
                <blockquote className="font-sans text-xl lg:text-2xl text-off-white leading-relaxed italic border-l-4 border-green-primary pl-6 mb-8">
                  "La atención fue de primera. Yo necesitaba capital rápido para comprar maquinaria nueva para mi taller. Llené la solicitud en 10 minutos y al día siguiente el dinero estaba en mi cuenta. Muy serios y transparentes."
                </blockquote>
                <div className="flex items-center gap-2 text-xs font-sans text-muted-dark bg-navy-mid/30 px-4 py-2 rounded-full w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
                  Solicitó el lunes · Aprobado el martes · Recibió el miércoles
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div
            ref={gridSection.ref as React.RefObject<HTMLElement>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{ transitionDelay: gridSection.inView ? `${i * 80}ms` : '0ms' }}
                className={cn(
                  "bg-navy-brand/70 backdrop-blur-xl p-6 rounded-2xl border border-navy-border hover:border-green-primary/30 card-lift group transition-all duration-700",
                  gridSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden border border-navy-border/50 group-hover:border-green-primary/30 transition-colors duration-200">
                    <AvatarPlaceholder name={t.name} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-heading font-bold text-off-white text-base leading-tight">{t.name}</h5>
                    <p className="font-sans text-muted-dark text-xs">{t.city}</p>
                  </div>
                  <StarRating rating={t.rating} />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={cn("text-xs font-bold font-sans uppercase px-2.5 py-1 rounded-full", typeColors[t.type] || 'bg-navy-mid text-muted-dark')}>
                    {t.type}
                  </span>
                  <span className="font-heading font-bold text-green-primary text-lg">{t.amount}</span>
                </div>

                <p className="font-sans text-off-white/75 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>

                <div className="flex items-center gap-1.5 text-[11px] text-muted-dark">
                  <span className="w-1 h-1 rounded-full bg-muted-dark" />
                  {t.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-green-primary to-[#1A7A0A] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Únete a más de 3,200 ecuatorianos que ya confían en CreditoFlujo.
          </h2>
          <p className="font-sans text-white/80 mb-8">Sin compromisos. Consulta gratis. Respuesta en 24h.</p>
          <Link
            to="/solicitar"
            className="btn-press btn-shimmer inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-green-primary font-heading font-bold text-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            Solicitar mi préstamo <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
