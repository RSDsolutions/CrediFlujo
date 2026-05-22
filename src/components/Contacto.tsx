import { useState, type FormEvent } from 'react';
import { Layout } from '@/components/Layout';
import { CheckCircle, Clock, Mail, MessageSquare, Phone } from 'lucide-react';

const WA_NUMBER = "593999999999";

export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    asunto: 'Información sobre préstamos',
    mensaje: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hola CreditoFlujo! Necesito ayuda:\n\nNombre: ${formData.nombre}\nAsunto: ${formData.asunto}\nMensaje: ${formData.mensaje}`;
    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass = "w-full h-12 px-4 rounded-lg border border-navy-border/40 bg-navy-deep/50 text-off-white placeholder-muted-dark focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 font-sans text-sm";
  const selectClass = "w-full h-12 px-4 rounded-lg border border-navy-border/40 bg-navy-deep/60 text-off-white focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 font-sans text-sm";

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-deep py-12 lg:py-20 text-center border-b border-navy-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/3 to-transparent pointer-events-none" />
        <div className="relative z-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-primary/10 border border-green-primary/20 text-green-dim font-sans font-bold text-xs uppercase tracking-wide mb-4">
            Soporte personalizado
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-4">Estamos para Ayudarte</h1>
          <p className="font-sans text-lg text-muted-dark max-w-2xl mx-auto">
            Un asesor financiero real te acompaña en todo el proceso. Sin bots, sin esperas eternas.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 lg:py-24 bg-navy-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-navy-brand/60 backdrop-blur-xl p-8 rounded-2xl border border-navy-border/50 shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:border-green-primary/20 transition-colors duration-300">
                <h2 className="font-heading font-bold text-2xl text-off-white mb-2">Envíanos un mensaje</h2>
                <p className="font-sans text-sm text-muted-dark mb-6">Responderemos en menos de 2 horas en horario de atención.</p>

                {sent && (
                  <div className="mb-6 bg-green-primary/10 border border-green-primary/30 rounded-xl p-4 flex items-center gap-3 animate-fade-in-up">
                    <CheckCircle size={20} className="text-green-primary shrink-0" />
                    <p className="font-sans text-sm text-green-dim font-medium">
                      ¡Mensaje enviado! Te abriremos WhatsApp para continuar.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-off-white/90">Nombre completo *</label>
                    <input
                      required
                      type="text"
                      placeholder="Juan Pérez"
                      value={formData.nombre}
                      onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-off-white/90">WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+593 9X XXX XXXX"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-off-white/90">
                        Email <span className="text-muted-dark font-normal">(opcional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-off-white/90">¿En qué podemos ayudarte? *</label>
                    <select
                      value={formData.asunto}
                      onChange={e => setFormData({ ...formData, asunto: e.target.value })}
                      className={selectClass}
                    >
                      <option>Información sobre préstamos</option>
                      <option>Estado de mi solicitud</option>
                      <option>Problemas con el formulario</option>
                      <option>Cómo realizar mis pagos</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-off-white/90">Mensaje *</label>
                    <textarea
                      required
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      value={formData.mensaje}
                      onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full h-32 p-4 rounded-lg border border-navy-border/40 bg-navy-deep/50 text-off-white placeholder-muted-dark focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 resize-none font-sans text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-press btn-shimmer w-full h-14 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_12px_28px_rgba(61,184,42,0.45)] transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Panel */}
            <div className="w-full lg:w-1/2">
              <div className="bg-navy-brand/70 backdrop-blur-xl p-8 rounded-2xl border border-green-primary/20 border-t-4 border-t-green-primary shadow-[0_16px_40px_rgba(0,0,0,0.3)] h-full flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(61,184,42,0.08)] transition-shadow duration-300">
                <h2 className="font-heading font-bold text-2xl text-white mb-8">Canales Directos</h2>

                <div className="space-y-5 mb-8 flex-1">
                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola CreditoFlujo! Necesito ayuda con mi solicitud.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-press btn-shimmer flex items-center justify-center gap-3 w-full h-14 bg-[#25D366] hover:bg-[#22C35E] text-white font-sans font-bold rounded-xl transition-all duration-200 hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] text-base"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp — Canal más rápido
                  </a>

                  {/* Email */}
                  <div className="pt-5 border-t border-navy-border/50 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-navy-mid flex items-center justify-center text-green-primary shrink-0 group-hover:bg-green-primary/20 transition-colors duration-200">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-muted-dark mb-1">Correo Electrónico</p>
                      <a
                        href="mailto:soporte@crediflujo.com"
                        className="font-heading font-bold text-lg text-off-white hover:text-green-primary transition-colors duration-200 link-underline"
                      >
                        soporte@crediflujo.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="pt-5 border-t border-navy-border/50 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy-mid flex items-center justify-center text-green-primary shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-muted-dark mb-2">Horario de Atención</p>
                      <div className="space-y-1">
                        <p className="font-sans text-off-white/90 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
                          Lunes a Viernes · 8:00 – 18:00
                        </p>
                        <p className="font-sans text-off-white/90 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-urgency" />
                          Sábados · 9:00 – 14:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response guarantee */}
                <div className="bg-green-primary/10 border border-green-primary/30 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle className="text-green-primary shrink-0" size={20} />
                  <p className="font-sans text-sm text-white/90 leading-relaxed">
                    <strong className="text-green-primary">Respondemos en menos de 2 horas</strong> dentro del horario de atención establecido.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ quick links */}
      <section className="py-16 bg-navy-brand/20 border-t border-navy-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading font-bold text-2xl text-off-white mb-4">¿Buscas respuestas rápidas?</h3>
          <p className="font-sans text-muted-dark mb-8">Tenemos una sección de preguntas frecuentes que puede resolver tu duda al instante.</p>
          <a
            href="/como-funciona#faq"
            className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-green-primary/50 text-green-primary font-sans font-semibold hover:bg-green-primary/10 hover:shadow-[0_0_16px_rgba(61,184,42,0.15)] transition-all duration-200"
          >
            <MessageSquare size={18} /> Ver preguntas frecuentes
          </a>
        </div>
      </section>
    </Layout>
  );
}
