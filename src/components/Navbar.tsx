import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Préstamos', path: '/prestamos' },
    { name: '¿Cómo funciona?', path: '/como-funciona' },
    { name: 'Requisitos', path: '/requisitos' },
    { name: 'Testimonios', path: '/testimonios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-md border-b border-navy-border transition-all duration-300",
          scrolled
            ? "bg-[rgba(13,24,41,0.97)] shadow-[0_4px_24px_rgba(0,0,0,0.4),0_1px_0_rgba(61,184,42,0.08)]"
            : "bg-navy-deep/80"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo darkBg />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative font-sans text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 group",
                  location.pathname === link.path
                    ? "text-off-white"
                    : "text-muted-dark hover:text-off-white hover:bg-navy-mid/40"
                )}
              >
                {link.name}
                {/* Active indicator */}
                <span
                  className={cn(
                    "absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-green-primary transition-all duration-300",
                    location.pathname === link.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  )}
                />
                {/* Hover indicator */}
                {location.pathname !== link.path && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-green-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contacto"
              className="px-4 py-2 font-sans text-sm font-medium text-off-white/80 rounded-lg border border-navy-border hover:border-green-primary/50 hover:text-off-white hover:bg-navy-mid/30 transition-all duration-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/solicitar"
              className="btn-shimmer btn-press px-6 py-2.5 font-sans font-bold text-white rounded-full bg-gradient-to-br from-green-primary to-[#1A7A0A] hover:brightness-110 shadow-[0_0_18px_rgba(61,184,42,0.35)] hover:shadow-[0_0_28px_rgba(61,184,42,0.55)] transition-all duration-200"
            >
              Solicitar Crédito
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative p-2.5 text-green-primary rounded-lg hover:bg-navy-mid/40 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              )}
            >
              <X size={26} />
            </span>
            <span
              className={cn(
                "flex items-center justify-center transition-all duration-300",
                isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              )}
            >
              <Menu size={26} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-20 z-40 lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy-deep/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={cn(
            "relative flex flex-col h-full p-6 transition-transform duration-300 ease-out",
            isOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <nav className="flex flex-col gap-1 mb-6">
            {links.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ animationDelay: isOpen ? `${i * 60}ms` : '0ms' }}
                className={cn(
                  "flex items-center justify-between font-heading text-xl font-bold px-4 py-3.5 rounded-xl transition-all duration-200",
                  location.pathname === link.path
                    ? "text-green-primary bg-green-primary/10 border border-green-primary/30"
                    : "text-off-white hover:text-green-primary hover:bg-navy-mid/40",
                  isOpen ? "animate-fade-in-up" : ""
                )}
              >
                {link.name}
                <ChevronRight
                  size={18}
                  className={cn(
                    "transition-colors",
                    location.pathname === link.path ? "text-green-primary" : "text-muted-dark"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 mb-24">
            <Link
              to="/contacto"
              className="w-full py-3.5 text-center font-sans font-medium text-off-white rounded-xl border border-navy-border hover:bg-navy-mid/40 hover:border-green-primary/40 transition-all duration-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/solicitar"
              className="btn-press w-full text-center py-4 font-sans font-bold text-white rounded-xl bg-green-cta shadow-[0_4px_20px_rgba(61,184,42,0.4)] hover:brightness-110 transition-all duration-200"
            >
              Solicitar Crédito →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
