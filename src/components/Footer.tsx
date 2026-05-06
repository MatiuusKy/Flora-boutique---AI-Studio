import { Instagram, MessageCircle, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="md:col-span-2 space-y-10">
             <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white font-serif font-bold text-3xl">F</div>
              <h4 className="font-serif italic text-4xl text-white tracking-tight">Flora Boutique</h4>
            </div>
            <p className="text-gray-400 leading-relaxed font-light max-w-sm text-lg italic">
              Florería a Domicilio en Concepción, San Pedro de la Paz y Santiago. ¡Sorprende hoy con nuestras Flores y Arreglos Personalizados!
            </p>
            <div className="flex gap-6">
               <a href="#" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-8">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Enlaces rápidos</h5>
            <ul className="text-sm text-gray-400 font-light space-y-5">
              <li><a href="/categoria/Rosas" className="hover:text-white transition-colors">🌸 Día de las Madres</a></li>
              <li><a href="/categoria/Mix" className="hover:text-white transition-colors">Cumpleaños 🥳</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Panel Administración</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Contáctanos</h5>
            <div className="text-sm text-gray-400 font-light space-y-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Concepción</p>
                <p className="font-bold text-white tracking-widest">+56988359980</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Santiago</p>
                <p className="font-bold text-white tracking-widest">+56920814951</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email</p>
                <p className="font-medium text-white">ventas@tulip.cl</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
           <div className="space-y-2">
             <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold">© 2024 Flora Boutique • Hecho con amor</p>
             <p className="text-[9px] text-gray-700 font-light">Especialistas en arte floral y momentos inolvidables.</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Tienda Online Abierta</span>
              </div>
              <div className="flex items-center gap-3">
                 <Globe className="w-3 h-3 text-gray-600" />
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sucursal Concepción & Santiago</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
