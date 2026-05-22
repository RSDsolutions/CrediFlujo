import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function Logo({ darkBg = false, className }: { darkBg?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 select-none", className)}>
      <div className="w-10 h-10 bg-navy-brand rounded-lg flex items-center justify-center relative border border-navy-border shrink-0">
        <span className="text-off-white font-extrabold text-2xl">C</span>
        <svg className="absolute bottom-1 right-1 w-5 h-5" viewBox="0 0 24 24">
          <path fill="#3DB82A" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-black leading-none flex tracking-tight">
          <span className={cn(darkBg ? "text-off-white" : "text-navy-deep")}>Credito</span>
          <span className="bg-gradient-to-br from-green-primary to-[#1A7A0A] bg-clip-text text-transparent">Flujo</span>
        </div>
        <span className="text-[9px] font-medium tracking-[0.3em] text-muted-dark mt-0.5 uppercase">
          Préstamos
        </span>
      </div>
    </Link>
  );
}
