import { Instagram, MessageCircle, Globe } from "lucide-react";

import { useLocation, Link } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isAdminLanding = location.pathname === "/administrador";

  return (
    <footer className="bg-[#1A030D] pt-32 pb-12 px-6 border-t border-primary-custom/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
          <div className="md:col-span-2 space-y-12 text-center md:text-left">
             <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl">
                <img src="https://storage.googleapis.com/static.ais.studio/artifacts/1b2be097-3815-4864-85d6-e024dd97f85e/flora_logo.png" alt="Flora Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-serif italic text-4xl text-white tracking-tighter">Flora</h4>
                <p className="text-[10px] font-sans font-bold tracking-[1.4em] text-primary-custom mt-2 uppercase pl-[1.4em]">
                  {isAdminLanding ? 'ADMIN' : 'BOUTIQUE'}
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed font-light max-w-sm text-xl italic">
              {isAdminLanding 
                ? "El sistema operativo de próxima generación para florerías modernas. Potenciando el arte floral con inteligencia operacional."
                : "Curando emociones a través del diseño floral de autor. Llevamos la esencia de la naturaleza a los espacios más exclusivos."}
            </p>
            <div className="flex gap-8">
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-sm"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-[10px] uppercase tracking-[0.5em] font-black text-primary-custom">
              {isAdminLanding ? 'Plataforma' : 'Navegación'}
            </h5>
            <ul className="text-sm text-gray-400 font-light space-y-6">
              {isAdminLanding ? (
                <>
                  <li><a href="#soluciones" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Módulos de IA</a></li>
                  <li><a href="#clientes" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Historias de Éxito</a></li>
                  <li><a href="#precios" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Planes & Precios</a></li>
                  <li><Link to="/login" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Acceso Cliente</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/nosotros" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Nosotros</Link></li>
                  <li><Link to="/catalogo" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Catálogo</Link></li>
                  <li><Link to="/delivery" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Delivery</Link></li>
                  <li><Link to="/contacto" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Contacto</Link></li>
                  <li><Link to="/administrador" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Flora Admin SaaS</Link></li>
                </>
              )}
            </ul>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-[10px] uppercase tracking-[0.5em] font-black text-primary-custom">
              {isAdminLanding ? 'Contacto Corporate' : 'Contacto Atelier'}
            </h5>
            <div className="text-sm text-gray-400 font-light space-y-8">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Hq Regional</p>
                <p className="font-serif italic text-white text-lg leading-tight">Santiago de Chile</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Canal Directo</p>
                <p className="font-medium text-white tracking-widest text-xs">
                  {isAdminLanding ? 'support@flora-admin.com' : 'contacto.florabtq@gmail.com'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 mt-10">
           <div className="space-y-3">
             <p className="text-[10px] uppercase tracking-[0.6em] text-gray-600 font-black">
               © 2024 Flora {isAdminLanding ? 'Admin' : 'Boutique'} • {isAdminLanding ? 'OPERATIONAL EXCELLENCE' : 'LUXURY FLORALS'}
             </p>
             <p className="text-[9px] text-gray-700 font-light uppercase tracking-widest">
                {isAdminLanding ? 'Hardware for the soul, software for the flow.' : 'Arte efímero, recuerdos eternos.'}
             </p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-12">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-secondary-sage animate-pulse" />
                 <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                   {isAdminLanding ? 'System Online' : 'Atelier Abierto'}
                 </span>
              </div>
              <div className="flex items-center gap-4">
                 <Globe className="w-4 h-4 text-gray-600" />
                 <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                   {isAdminLanding ? 'AWS Global Infra' : 'Global Delivery'}
                 </span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
