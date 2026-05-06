import { useContext } from "react";
import { CartContext } from "./Cart";
import { User, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ transparent }: { transparent?: boolean }) {
  const { cart, setIsOpen } = useContext(CartContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-700 ${
      transparent ? 'bg-transparent border-transparent pt-10' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-lg group-hover:rotate-12 transition-all transition-transform ${
            transparent ? 'bg-white text-primary shadow-white/10' : 'bg-primary text-white shadow-primary/20'
          }`}>F</div>
          <div className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${transparent ? 'text-white' : 'text-gray-900'}`}>
            FLORA<span className={`font-light italic ${transparent ? 'text-white/60' : 'text-primary'}`}>Boutique</span>
          </div>
        </Link>
        
        <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.3em] font-bold items-center">
          <a 
            href={isHome ? "#catalogo" : "/#catalogo"} 
            className={`transition-colors ${transparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            Catálogo
          </a>
          <a 
            href="#" 
            className={`transition-colors ${transparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            Galería
          </a>
          <a 
            href={isHome ? "#como-pedir" : "/#como-pedir"} 
            className={`transition-colors ${transparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            Cómo pedir
          </a>
          <a 
            href="#" 
            className={`transition-colors ${transparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            Contacto
          </a>
          
          <div className={`h-4 w-px ${transparent ? 'bg-white/20' : 'bg-gray-100'}`} />
          
          <Link 
            to="/perfil" 
            className={`p-3 rounded-2xl transition-all ${
              transparent ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-50 text-gray-400 hover:text-primary'
            }`}
          >
             <User className="w-5 h-5" />
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <ShoppingBag className={`w-6 h-6 transition-colors ${transparent ? 'text-white' : 'text-gray-900 group-hover:text-primary'}`} />
              {cart.reduce((a, b) => a + b.quantity, 0) > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
