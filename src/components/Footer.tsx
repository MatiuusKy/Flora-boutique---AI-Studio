import { Instagram, MessageCircle, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A030D] pt-32 pb-12 px-6 border-t border-primary-custom/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
          <div className="md:col-span-2 space-y-12">
             <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-custom rounded-[2rem] flex items-center justify-center text-white font-serif font-bold text-4xl shadow-2xl">F</div>
              <h4 className="font-serif italic text-5xl text-white tracking-tighter">Flora Boutique</h4>
            </div>
            <p className="text-gray-400 leading-relaxed font-light max-w-sm text-xl italic">
              Redefiniendo el arte floral a domicilio. Llevamos la esencia de la naturaleza a los espacios más exclusivos de Chile.
            </p>
            <div className="flex gap-8">
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-sm"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-[10px] uppercase tracking-[0.5em] font-black text-primary-custom">Navegación</h5>
            <ul className="text-sm text-gray-400 font-light space-y-6">
              <li><a href="/categoria/Rosas" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">🌸 Eventos Memorables</a></li>
              <li><a href="/categoria/Mix" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Aniversarios Elixir</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Panel Administrativo</a></li>
              <li><a href="#" className="hover:text-white transition-colors border-l border-white/5 pl-4 ml-[-1px]">Legales & Privacidad</a></li>
            </ul>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-[10px] uppercase tracking-[0.5em] font-black text-primary-custom">Atelier Contacto</h5>
            <div className="text-sm text-gray-400 font-light space-y-8">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Sede Central</p>
                <p className="font-serif italic text-white text-lg leading-tight">Santiago de Chile</p>
                <p className="font-bold text-white tracking-[0.2em] mt-1">+56 9 1234 5678</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-2">Atelier Digital</p>
                <p className="font-medium text-white tracking-widest">concierge@flora.cl</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 mt-10">
           <div className="space-y-3">
             <p className="text-[10px] uppercase tracking-[0.6em] text-gray-600 font-black">© 2024 Flora Boutique • LUXURY FLORALS</p>
             <p className="text-[9px] text-gray-700 font-light uppercase tracking-widest">Arte efímero, recuerdos eternos.</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-12">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-secondary-sage animate-pulse" />
                 <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Atelier Abierto</span>
              </div>
              <div className="flex items-center gap-4">
                 <Globe className="w-4 h-4 text-gray-600" />
                 <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Chile • Global Delivery</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
