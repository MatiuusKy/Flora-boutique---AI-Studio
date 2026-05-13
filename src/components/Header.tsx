import { useContext, useState, useEffect } from "react";
import { CartContext } from "./Cart";
import { Link, useLocation } from "react-router-dom";
import { 
  IconSearch, 
  IconBrandInstagram, 
  IconUser, 
  IconShoppingBag, 
  IconBrandWhatsapp,
  IconMenu2,
  IconX
} from "@tabler/icons-react";

export default function Header({ transparent = false, lightText = false, className = "" }: { transparent?: boolean; lightText?: boolean; className?: string }) {
  const { cart, setIsOpen } = useContext(CartContext);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isSolid = !transparent || isScrolled;
  const headerBg = isSolid ? 'bg-white shadow-sm' : 'bg-transparent';
  const textColor = (!isSolid && lightText) ? 'text-white drop-shadow-sm' : 'text-gray-900';
  const logoSubColor = (!isSolid && lightText) ? 'text-white opacity-80' : 'text-[#6B0F2B]';

  return (
    <>
      <nav className={`w-full z-[100] transition-all duration-200 ease-in-out ${headerBg} ${className}`}>
        <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between h-20">
          
          {/* Left: Desktop Nav / Mobile Hamburger */}
          <div className="hidden lg:flex flex-1 items-center gap-8 text-[11px] uppercase tracking-[0.08em] font-sans font-bold">
            <Link to="/catalogo" className={`${textColor} hover:opacity-75 transition-opacity`}>Catálogo</Link>
            <Link to="/delivery" className={`${textColor} hover:opacity-75 transition-opacity`}>Delivery</Link>
            <Link to="/nosotros" className={`${textColor} hover:opacity-75 transition-opacity`}>Nosotros</Link>
            <Link to="/contacto" className={`${textColor} hover:opacity-75 transition-opacity`}>Contacto</Link>
          </div>
          
          <div className="flex lg:hidden flex-1 items-center">
            <button onClick={() => setMobileMenuOpen(true)} className={`${textColor}`}>
              <IconMenu2 stroke={1.5} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex flex-col items-center">
              <span className={`text-2xl font-serif font-bold tracking-tighter leading-none ${textColor}`}>
                FLORA
              </span>
              <span className={`text-[8px] font-sans font-black uppercase tracking-[1.4em] leading-none mt-1.5 pl-[1.4em] ${logoSubColor}`}>
                BOUTIQUE
              </span>
            </Link>
          </div>

          {/* Right: Icons & CTA */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <div className={`hidden md:flex items-center gap-5 ${textColor}`}>
              <button className="hover:opacity-75 transition-opacity"><IconSearch stroke={1.5} className="w-5 h-5" /></button>
              <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity"><IconBrandInstagram stroke={1.5} className="w-5 h-5" /></a>
              <button className="hover:opacity-75 transition-opacity"><IconUser stroke={1.5} className="w-5 h-5" /></button>
            </div>
            
            <button 
              onClick={() => setIsOpen(true)}
              className={`relative ${textColor} hover:opacity-75 transition-opacity`}
            >
              <IconShoppingBag stroke={1.5} className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#6B0F2B] text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>

            <a 
              href="https://wa.me/56939276233" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#6B0F2B] text-white px-5 py-2.5 rounded-full text-sm hover:brightness-110 transition-all font-medium"
            >
               Pedir ahora
               <IconBrandWhatsapp stroke={1.5} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-serif italic text-[#6B0F2B]">Menú</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <IconX stroke={1.5} className="text-gray-900" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-[13px] uppercase tracking-[0.1em] font-sans font-bold text-gray-900">
              <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#6B0F2B]">Catálogo</Link>
              <Link to="/delivery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#6B0F2B]">Delivery</Link>
              <Link to="/nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#6B0F2B]">Nosotros</Link>
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#6B0F2B]">Contacto</Link>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex gap-4 mb-6">
                <IconSearch stroke={1.5} className="w-5 h-5 text-gray-600" />
                <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer"><IconBrandInstagram stroke={1.5} className="w-5 h-5 text-gray-600" /></a>
                <IconUser stroke={1.5} className="w-5 h-5 text-gray-600" />
              </div>
              <a 
                href="https://wa.me/56939276233" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#6B0F2B] text-white px-5 py-4 rounded-full text-sm font-medium w-full"
              >
                 Pedir ahora
                 <IconBrandWhatsapp stroke={1.5} className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
