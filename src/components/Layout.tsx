import { useState, useEffect, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileCTABar } from './MobileCTABar';
import { ScrollRestoration, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const WA_NUMBER = "593999999999";

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola CreditoFlujo! Me interesa solicitar un préstamo. ¿Pueden ayudarme?")}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      aria-label="Volver arriba"
      className={cn(
        "scroll-top-btn",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-navy-deep text-off-white selection:bg-green-primary/30">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1 overflow-x-hidden relative">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-green-primary/4 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-navy-brand/30 rounded-full blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4 z-0" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-green-primary/2 rounded-full blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
      <ScrollToTop />
    </div>
  );
}
