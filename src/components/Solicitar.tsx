import { useState, type FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const WA_NUMBER = "593999999999";

export function Solicitar() {
  const location = useLocation();
  const initialAmount = location.state?.amount || 1500;
  const initialTerm = location.state?.term || 12;

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    cedula: '',
    fecha: '',
    ciudad: '',
    whatsapp: '',
    email: '',
    empleo: 'Empleado en relación de dependencia',
    empleador: '',
    ingresos: '$401–$800',
    gastos: '$201–$500',
    banco: 'Banco Pichincha',
    cuenta: '',
    monto: initialAmount,
    plazo: initialTerm,
    destino: 'Emergencia personal',
    notas: '',
    acepta: false
  });

  const updateForm = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      submitForm();
    }
  };

  const goBack = (toStep: number) => {
    setStep(toStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitForm = () => {
    setIsSubmitting(true);
    const text = `Hola CreditoFlujo! Estoy enviando mi solicitud de crédito:

👤 DATOS PERSONALES
Nombre: ${formData.nombre} ${formData.apellidos}
Cédula: ${formData.cedula}
Fecha nac.: ${formData.fecha}
Ciudad: ${formData.ciudad}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}

💼 PERFIL FINANCIERO
Empleo: ${formData.empleo}
Ingresos: ${formData.ingresos}
Gastos fijos: ${formData.gastos}
Banco: ${formData.banco}

💰 PRÉSTAMO SOLICITADO
Monto: $${formData.monto}
Plazo: ${formData.plazo} meses
Destino: ${formData.destino}
Notas: ${formData.notas || 'Ninguna'}

¡Espero su respuesta!`;

    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    try {
      window.open(waLink, '_blank');
    } catch {
      // silently handle popup block
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const inputClass = "w-full h-12 px-4 rounded-lg border border-navy-border/40 bg-[rgba(13,24,41,0.6)] text-off-white placeholder-muted-dark focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 font-sans text-sm";
  const selectClass = "w-full h-12 px-4 rounded-lg border border-navy-border/40 bg-[rgba(13,24,41,0.8)] text-off-white focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 font-sans text-sm";

  // ── Success Screen ─────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-navy-deep flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-primary/10 via-transparent to-navy-deep pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-md w-full bg-navy-brand/80 backdrop-blur-xl rounded-2xl p-8 border border-green-primary/30 text-center shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(61,184,42,0.15)] relative z-10 animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-green-primary/15 border-2 border-green-primary/30 flex items-center justify-center mx-auto mb-6 animate-float">
            <CheckCircle size={52} className="text-green-primary" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-off-white mb-4">¡Solicitud Enviada!</h1>
          <p className="font-sans text-muted-dark text-base mb-6 leading-relaxed">
            Nuestro equipo revisará tu solicitud y te contactará por WhatsApp en menos de 24 horas.
          </p>
          <div className="bg-amber-urgency/10 border border-amber-urgency/30 rounded-xl p-4 mb-8">
            <p className="text-amber-urgency font-sans font-semibold text-sm flex items-center justify-center gap-2">
              <Zap size={16} /> Revisa tu WhatsApp — te contactamos pronto.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="btn-press w-full py-3.5 rounded-xl text-white font-sans font-bold bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 shadow-md transition-all duration-200"
            >
              Volver al inicio
            </Link>
            <Link
              to="/testimonios"
              className="w-full py-3 rounded-xl text-off-white/70 font-sans text-sm hover:text-off-white transition-colors duration-200"
            >
              Ver testimonios de clientes
            </Link>
          </div>
          <p className="font-sans text-xs text-muted-light mt-6">
            Eres la persona #3,247 en solicitar este mes 🎉
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="bg-transparent py-10 relative overflow-hidden text-center z-10">
        <div className="inline-block px-3 py-1 bg-amber-urgency/10 text-amber-urgency text-xs font-bold font-sans uppercase tracking-widest rounded-full border border-amber-urgency/20 mb-4 animate-pulse">
          ⚡ Cupos disponibles hoy
        </div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-off-white mb-3">
          Solicita tu Préstamo Ahora.
        </h1>
        <p className="font-sans text-muted-dark text-lg">
          Completa el formulario en 5 minutos — te contactamos en 24 horas.
        </p>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mt-8 px-4">
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {[
              { n: 1, label: 'Personal' },
              { n: 2, label: 'Financiero' },
              { n: 3, label: 'Préstamo' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-1.5">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all duration-300",
                  step > n
                    ? "bg-green-primary text-white shadow-[0_0_10px_rgba(61,184,42,0.4)]"
                    : step === n
                    ? "bg-green-primary/20 text-green-primary border border-green-primary"
                    : "bg-navy-mid text-muted-dark border border-navy-border"
                )}>
                  {step > n ? <Check size={14} /> : n}
                </div>
                <span className={cn(
                  "text-xs font-sans hidden sm:block transition-colors duration-200",
                  step === n ? "text-green-primary font-semibold" : "text-muted-dark"
                )}>
                  {label}
                </span>
                {n < 3 && <div className={cn("w-8 h-px transition-colors duration-300", step > n ? "bg-green-primary" : "bg-navy-border")} />}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-navy-mid rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-primary to-[#1A7A0A] transition-all duration-500 ease-out progress-shimmer"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-sans text-muted-dark mt-2">
            <span>Paso {step} de 3</span>
            <span>{Math.round((step / 3) * 100)}% completado</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10 relative z-10">

        {/* Main Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-navy-brand/60 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-navy-border/60 p-6 md:p-8">
            <form onSubmit={handleNext}>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="font-heading font-bold text-2xl text-text-dark border-b border-navy-border/40 pb-4">
                    1. Información Personal
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Nombres *</label>
                      <input required type="text" value={formData.nombre} onChange={e => updateForm('nombre', e.target.value)} className={inputClass} placeholder="Juan" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Apellidos *</label>
                      <input required type="text" value={formData.apellidos} onChange={e => updateForm('apellidos', e.target.value)} className={inputClass} placeholder="Pérez García" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Cédula de Identidad *</label>
                      <input required type="text" placeholder="0912345678" value={formData.cedula} onChange={e => updateForm('cedula', e.target.value)} className={inputClass} maxLength={10} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Fecha de Nacimiento *</label>
                      <input required type="date" value={formData.fecha} onChange={e => updateForm('fecha', e.target.value)} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">WhatsApp *</label>
                      <input required type="tel" placeholder="+593 9X XXX XXXX" value={formData.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">
                        Correo Electrónico <span className="text-muted-dark font-normal">(opcional)</span>
                      </label>
                      <input type="email" placeholder="tuemail@ejemplo.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} className={inputClass} />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Ciudad de Residencia *</label>
                      <input required type="text" placeholder="Guayaquil, Quito, Cuenca..." value={formData.ciudad} onChange={e => updateForm('ciudad', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="btn-press btn-shimmer px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-bold rounded-xl flex items-center gap-2 shadow-[0_8px_20px_rgba(61,184,42,0.3)] transition-all duration-200">
                      Continuar <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="font-heading font-bold text-2xl text-text-dark border-b border-navy-border/40 pb-4">
                    2. Información Financiera
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Tipo de Empleo *</label>
                      <select required value={formData.empleo} onChange={e => updateForm('empleo', e.target.value)} className={selectClass}>
                        <option>Empleado en relación de dependencia</option>
                        <option>Independiente / Freelance</option>
                        <option>Dueño de negocio</option>
                        <option>Jubilado</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Ingresos Mensuales *</label>
                      <select required value={formData.ingresos} onChange={e => updateForm('ingresos', e.target.value)} className={selectClass}>
                        <option>$200–$400</option>
                        <option>$401–$800</option>
                        <option>$801–$1,500</option>
                        <option>$1,501–$3,000</option>
                        <option>Más de $3,000</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Gastos Fijos Mensuales *</label>
                      <select required value={formData.gastos} onChange={e => updateForm('gastos', e.target.value)} className={selectClass}>
                        <option>$0–$200</option>
                        <option>$201–$500</option>
                        <option>$501–$1,000</option>
                        <option>Más de $1,000</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">Banco de Preferencia *</label>
                      <select required value={formData.banco} onChange={e => updateForm('banco', e.target.value)} className={selectClass}>
                        <option>Banco Pichincha</option>
                        <option>Banco Guayaquil</option>
                        <option>Banco Pacífico</option>
                        <option>Produbanco</option>
                        <option>Cooperativa de Ahorro</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-muted-dark font-normal flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-green-dim" /> No. de Cuenta
                        <span className="text-xs text-muted-dark">(Opcional – agiliza el proceso)</span>
                      </label>
                      <input type="text" value={formData.cuenta} onChange={e => updateForm('cuenta', e.target.value)} className={inputClass} placeholder="XXXXXXXXXXXX" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <button type="button" onClick={() => goBack(1)} className="btn-press px-6 py-4 border border-navy-border text-text-dark font-sans font-bold rounded-xl flex items-center gap-2 hover:bg-navy-mid/30 hover:border-green-primary/30 transition-all duration-200">
                      <ArrowLeft size={20} /> Atrás
                    </button>
                    <button type="submit" className="btn-press btn-shimmer px-8 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-bold rounded-xl flex items-center gap-2 shadow-[0_8px_20px_rgba(61,184,42,0.3)] transition-all duration-200">
                      Continuar <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="font-heading font-bold text-2xl text-text-dark border-b border-navy-border/40 pb-4">
                    3. Datos del Préstamo
                  </h2>
                  <div className="space-y-8">

                    {/* Mini Calculator */}
                    <div className="bg-navy-brand rounded-2xl p-6 text-white border-t-4 border-green-primary shadow-lg">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-off-white mb-2 text-center">Monto a solicitar</label>
                        <div className="flex justify-center mb-3">
                          <span className="font-heading font-bold text-4xl text-green-primary tabular-nums">
                            ${formData.monto.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="200" max="5000" step="100"
                          value={formData.monto}
                          onChange={(e) => updateForm('monto', Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #3DB82A 0%, #3DB82A ${((formData.monto - 200) / 4800) * 100}%, #0D1829 ${((formData.monto - 200) / 4800) * 100}%, #0D1829 100%)`
                          }}
                        />
                        <div className="flex justify-between text-muted-dark text-xs mt-2 font-sans">
                          <span>$200</span>
                          <span>$5,000</span>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-off-white mb-3 text-center">Plazo en meses</label>
                        <div className="grid grid-cols-5 gap-2">
                          {[3, 6, 12, 18, 24].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => updateForm('plazo', t)}
                              className={cn(
                                "py-2.5 rounded-xl text-sm font-sans font-bold transition-all duration-200",
                                formData.plazo === t
                                  ? "bg-green-primary text-white border-transparent shadow-[0_4px_12px_rgba(61,184,42,0.35)] scale-105"
                                  : "bg-transparent text-muted-dark border border-navy-border hover:border-green-primary/50 hover:text-off-white"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-navy-deep/60 p-4 rounded-xl flex justify-between items-center border border-navy-border/50">
                        <span className="text-sm font-sans text-muted-dark">Cuota estimada:</span>
                        <span className="font-heading font-bold text-xl text-white tabular-nums">
                          ${Math.floor((formData.monto / formData.plazo) + (formData.monto * 0.05)).toLocaleString()}
                          <span className="text-sm font-sans text-muted-dark font-normal">/mes</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-text-dark">¿Para qué usarás el préstamo? *</label>
                      <select required value={formData.destino} onChange={e => updateForm('destino', e.target.value)} className={selectClass}>
                        <option>Emergencia personal</option>
                        <option>Negocio / Inversión</option>
                        <option>Salud / Médico</option>
                        <option>Educación</option>
                        <option>Pago de otras deudas</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-normal text-muted-dark">Cuéntanos más (Opcional)</label>
                      <textarea
                        value={formData.notas}
                        onChange={e => updateForm('notas', e.target.value)}
                        placeholder="¿Hay algo que quieras que sepamos para agilizar tu solicitud?"
                        className="w-full h-24 p-4 rounded-lg border border-navy-border/40 bg-[rgba(13,24,41,0.6)] text-off-white placeholder-muted-dark focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all duration-200 resize-none font-sans text-sm"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        required
                        type="checkbox"
                        checked={formData.acepta}
                        onChange={e => updateForm('acepta', e.target.checked)}
                        className="mt-0.5 w-5 h-5 accent-green-primary shrink-0 cursor-pointer"
                      />
                      <span className="font-sans text-sm text-muted-light group-hover:text-off-white/80 transition-colors duration-200 leading-relaxed">
                        Acepto los <Link to="/contacto" className="text-green-dim hover:text-green-primary underline">términos y condiciones</Link> y la política de privacidad de CreditoFlujo. Autorizo la consulta de mi perfil para la evaluación de riesgo crediticio.
                      </span>
                    </label>

                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => goBack(2)}
                      className="btn-press w-full sm:w-auto px-6 py-4 border border-navy-border text-text-dark font-sans font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-navy-mid/30 hover:border-green-primary/30 transition-all duration-200"
                    >
                      <ArrowLeft size={20} /> Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-press btn-shimmer w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(61,184,42,0.35)] hover:shadow-[0_12px_28px_rgba(61,184,42,0.5)] transition-all duration-200 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <>Enviar mi solicitud →</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-28 space-y-5">
            {/* Trust Panel */}
            <div className="bg-navy-brand/70 backdrop-blur-xl p-6 rounded-2xl border border-green-primary/20 border-t-4 border-t-green-primary shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <h3 className="font-heading font-bold text-xl text-off-white mb-5 border-b border-navy-border/50 pb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-4 mb-6">
                {[
                  { title: '100% Online', desc: 'Sin filas ni papeleos presenciales.' },
                  { title: 'Sin Garantes', desc: 'Confiamos en tu perfil.' },
                  { title: 'Respuesta 24h', desc: 'Te contactamos por WhatsApp.' },
                  { title: 'Datos Seguros', desc: 'Encriptación nivel bancario.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3 font-sans text-sm text-off-white group">
                    <CheckCircle size={18} className="text-green-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                    <span><strong className="font-semibold">{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-navy-deep/50 rounded-xl p-4 border border-navy-border/50 flex flex-col gap-2">
                <p className="font-sans text-xs text-muted-dark uppercase tracking-widest font-bold">Monitor en vivo</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="font-sans font-medium text-sm text-success">
                    124 solicitudes recibidas hoy
                  </span>
                </div>
              </div>
            </div>

            {/* Support block */}
            <div className="bg-navy-brand/60 backdrop-blur-xl border border-navy-border p-6 rounded-2xl text-center hover:border-green-primary/20 transition-colors duration-200">
              <h4 className="font-heading font-bold text-lg text-off-white mb-2">¿Tienes dudas?</h4>
              <p className="font-sans text-sm text-muted-light mb-4 leading-relaxed">
                Un asesor real está en WhatsApp para ayudarte con el formulario.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola! Tengo dudas sobre el formulario de solicitud de préstamo.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn-press btn-shimmer inline-flex justify-center items-center gap-2 w-full bg-green-primary hover:bg-green-hover text-white font-sans font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-[0_8px_20px_rgba(61,184,42,0.3)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar a soporte
              </a>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
