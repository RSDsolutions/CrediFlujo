import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface LoanCalculatorProps {
  className?: string;
  defaultAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  isFormVisible?: boolean;
}

export function LoanCalculator({
  className,
  defaultAmount = 1500,
  minAmount = 200,
  maxAmount = 5000,
  isFormVisible = true
}: LoanCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [term, setTerm] = useState(12);
  const navigate = useNavigate();

  // Approximate calculation for display
  const interestRate = 0.05;
  const monthlyPayment = Math.floor((amount / term) + (amount * interestRate));
  const totalPayment = monthlyPayment * term;
  const sliderPercent = ((amount - minAmount) / (maxAmount - minAmount)) * 100;

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    navigate('/solicitar', { state: { amount, term } });
  };

  return (
    <div className={cn(
      "bg-navy-brand/80 backdrop-blur-xl border border-green-primary/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(61,184,42,0.1)] overflow-hidden hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(61,184,42,0.15)] transition-shadow duration-300",
      className
    )}>
      <div className="p-6 md:p-8">
        <h3 className="font-heading font-bold text-off-white text-xl md:text-2xl mb-6 text-center">
          ¿Cuánto necesitas?
        </h3>

        {/* Amount Slider */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <span className="font-heading font-extrabold text-green-primary text-4xl md:text-5xl tracking-tight tabular-nums transition-all duration-150">
              ${amount.toLocaleString()}
            </span>
          </div>

          <div className="relative pt-1">
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3DB82A 0%, #3DB82A ${sliderPercent}%, rgba(13,24,41,0.8) ${sliderPercent}%, rgba(13,24,41,0.8) 100%)`
              }}
            />
            <div className="flex justify-between text-muted-dark text-xs mt-3 font-sans font-medium">
              <span>${minAmount.toLocaleString()}</span>
              <span className="text-green-primary/70 font-semibold text-center">
                {Math.round(sliderPercent)}% del máximo
              </span>
              <span>${maxAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Term Selection */}
        <div className="mb-8">
          <label className="block text-off-white font-sans text-sm font-semibold mb-3">
            Plazo de pago
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[6, 12, 18, 24].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={cn(
                  "py-2.5 px-1 rounded-lg text-[11px] uppercase tracking-wider font-sans font-bold transition-all duration-200",
                  term === t
                    ? "bg-gradient-to-br from-green-primary to-[#1A7A0A] text-white shadow-[0_4px_12px_rgba(61,184,42,0.3)] border-transparent scale-[1.04]"
                    : "bg-transparent text-muted-dark border border-navy-border hover:border-green-primary/60 hover:text-off-white hover:bg-navy-mid/30"
                )}
              >
                {t} m.
              </button>
            ))}
          </div>
        </div>

        {/* Results Preview */}
        <div className="bg-navy-deep/60 rounded-xl p-4 mb-6 border border-navy-border/50 hover:border-green-primary/20 transition-colors duration-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-off-white/80 font-sans font-medium text-sm">Cuota estimada</span>
            <span className="text-white font-heading font-bold text-2xl tabular-nums">
              ${monthlyPayment.toLocaleString()}
              <span className="text-sm font-sans text-muted-dark font-normal"> / mes</span>
            </span>
          </div>
          <div className="h-px bg-navy-border/50 mb-3" />
          <div className="flex justify-between items-center text-xs font-sans text-muted-dark mb-1">
            <span>Tasa referencial</span>
            <span>desde 5% mensual</span>
          </div>
          <div className="flex justify-between items-center text-xs font-sans text-muted-dark">
            <span>Total a pagar aprox.</span>
            <span className="font-semibold text-off-white/70">${totalPayment.toLocaleString()}</span>
          </div>
        </div>

        {/* Lead Form */}
        {isFormVisible && (
          <form className="space-y-3 mb-6" onSubmit={handleApply}>
            {[
              { type: 'text', placeholder: 'Nombre completo', required: true },
              { type: 'text', placeholder: 'Cédula de identidad', required: true },
              { type: 'tel', placeholder: 'WhatsApp (+593...)', required: true },
            ].map((field) => (
              <input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full bg-[#0D1829] rounded-lg border border-navy-border px-4 py-3 font-sans text-off-white placeholder-muted-dark focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all duration-200 text-sm"
              />
            ))}
            <button
              type="submit"
              className="btn-press btn-shimmer w-full mt-1 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-black text-lg py-4 rounded-xl transition-all duration-200 shadow-[0_10px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_14px_28px_rgba(61,184,42,0.45)] flex items-center justify-center gap-2"
            >
              Ver si califico <ArrowRight size={20} />
            </button>
          </form>
        )}

        {!isFormVisible && (
          <button
            type="button"
            onClick={() => navigate('/solicitar', { state: { amount, term } })}
            className="btn-press btn-shimmer w-full mb-6 bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 text-white font-heading font-black text-lg py-4 rounded-xl transition-all duration-200 shadow-[0_10px_20px_rgba(61,184,42,0.3)] hover:shadow-[0_14px_28px_rgba(61,184,42,0.45)] flex items-center justify-center gap-2"
          >
            Aplica con estos datos <ArrowRight size={20} />
          </button>
        )}

        <div className="flex items-center justify-center gap-2 text-xs font-sans text-muted-dark">
          <ShieldCheck size={14} className="text-green-dim shrink-0" />
          <span>Tus datos están seguros</span>
          <span>·</span>
          <span>Sin costo de consulta</span>
        </div>
      </div>
    </div>
  );
}
