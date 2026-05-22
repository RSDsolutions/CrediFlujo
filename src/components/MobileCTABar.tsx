import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      if (window.scrollY > 200 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Hide on /solicitar page (since they are already there)
  if (location.pathname === '/solicitar') return null;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-green-cta p-4 lg:hidden shadow-[0_-8px_20px_0_rgba(27,42,74,0.3)] transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-white font-heading font-extrabold text-[15px] leading-tight mb-1">
            ¿Necesitas dinero hoy?
          </p>
          <Link 
            to="/solicitar"
            className="inline-block bg-white text-green-primary px-5 py-2 rounded-full font-sans font-bold text-sm shadow-md"
          >
            Solicitar Ahora &rarr;
          </Link>
        </div>
        <button 
          onClick={() => {
            setIsDismissed(true);
            setIsVisible(false);
          }}
          className="text-white/80 p-2 hover:bg-white/10 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
