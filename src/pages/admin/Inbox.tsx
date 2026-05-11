import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MessageCircle, 
  Globe, 
  Search, 
  Filter, 
  ChevronRight, 
  User, 
  ShoppingBag,
  MoreVertical,
  Star,
  Zap,
  Sparkles,
  CheckCircle2,
  Phone
} from 'lucide-react';

const chats = [
  { 
    id: '1', 
    source: 'Instagram', 
    customer: 'Valentina Ross', 
    message: 'Hola! Me encantó el ramo que subieron ayer. ¿Tienen disponible para envío hoy?', 
    time: '2m', 
    unread: true, 
    intent: 'Compra detected',
    ai_status: 'high_priority'
  },
  { 
    id: '2', 
    source: 'WhatsApp', 
    customer: 'Ignacio Soto', 
    message: 'Muchas gracias por las flores de ayer, a mi mamá le encantaron!', 
    time: '15m', 
    unread: false, 
    intent: 'Feedback positivo' 
  },
  { 
    id: '3', 
    source: 'Tiktok', 
    customer: 'Sofía Valdés', 
    message: '¿Hacen envíos a Colina?', 
    time: '1h', 
    unread: true, 
    intent: 'Consulta cobertura' 
  },
  { 
    id: '4', 
    source: 'Web', 
    customer: 'Ricardo Lagos', 
    message: 'Pedido #8821: Necesito cambiar la dedicatoria por favor.', 
    time: '3h', 
    unread: false, 
    intent: 'Modificar orden' 
  },
];

export default function Inbox() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Instagram': return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'WhatsApp': return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'Tiktok': return <div className="text-[10px] font-black italic">TT</div>;
      default: return <Globe className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Inbox Operacional</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Omnicanalidad centralizada con detección inteligente de intención.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Agent" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-custom flex items-center justify-center text-white text-xs font-bold z-10 shadow-lg">
                  +1
               </div>
            </div>
            <div className="bg-white px-6 h-12 rounded-xl border border-gray-100 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Concierge</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex gap-8 min-h-0">
           {/* Chat List */}
           <div className="w-[400px] flex flex-col space-y-6 shrink-0">
              <div className="relative shrink-0">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                 <input type="text" placeholder="Buscar conversación..." className="w-full pl-12 pr-4 h-12 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-1 focus:ring-primary-custom/20 outline-none transition-all" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                 {chats.map(chat => (
                   <motion.div
                     key={chat.id}
                     whileHover={{ x: 5 }}
                     onClick={() => setSelectedChat(chat)}
                     className={`p-5 rounded-[2rem] border transition-all cursor-pointer relative group ${
                       selectedChat.id === chat.id 
                       ? 'bg-white border-primary-custom/20 shadow-xl shadow-primary-custom/[0.03]' 
                       : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-100'
                     }`}
                   >
                     <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-gray-50 rounded-xl">
                              {getSourceIcon(chat.source)}
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-gray-900">{chat.customer}</h4>
                              <p className="text-[10px] text-gray-400 font-medium">{chat.source} • {chat.time}</p>
                           </div>
                        </div>
                        {chat.unread && (
                          <div className="w-2.5 h-2.5 bg-primary-custom rounded-full ring-4 ring-primary-custom/10" />
                        )}
                     </div>
                     <p className={`text-xs leading-relaxed ${chat.unread ? 'font-bold text-gray-900' : 'text-gray-500'} line-clamp-2`}>
                        {chat.message}
                     </p>
                     
                     {chat.intent && (
                       <div className="mt-4 flex items-center gap-2">
                          <div className="px-2 py-0.5 rounded-full bg-secondary-cream text-[9px] font-black uppercase tracking-widest text-primary-custom border border-primary-custom/10 italic">
                             {chat.intent}
                          </div>
                       </div>
                     )}
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Chat Window */}
           <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
              {/* Chat Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-md relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-pink/20 flex items-center justify-center text-primary-custom font-serif italic text-xl border border-primary-custom/5">
                       {selectedChat.customer[0]}
                    </div>
                    <div>
                       <h3 className="text-lg font-serif italic text-gray-900">{selectedChat.customer}</h3>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activo ahora vía {selectedChat.source}</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button className="p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-400"><Phone className="w-5 h-5" /></button>
                    <button className="p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-400"><Star className="w-5 h-5" /></button>
                    <button className="p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-400"><MoreVertical className="w-5 h-5" /></button>
                 </div>
              </div>

              {/* Chat Messages Placeholder */}
              <div className="flex-1 p-8 overflow-y-auto space-y-6 flex flex-col justify-end">
                 <div className="max-w-[70%] bg-gray-50 p-6 rounded-[2rem] rounded-bl-none">
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                       {selectedChat.message}
                    </p>
                 </div>
                 <div className="max-w-[70%] bg-primary-custom text-white p-6 rounded-[2.5rem] rounded-br-none self-end shadow-xl shadow-primary-custom/20">
                    <p className="text-sm leading-relaxed">
                       Hola {selectedChat.customer.split(' ')[0]}! Claro que sí, tenemos disponibilidad para hoy. ¿Te gustaría ver nuestro catálogo de temporada?
                    </p>
                 </div>
                 <div className="flex items-center gap-2 text-gray-300 italic text-[10px] self-end px-4">
                    <CheckCircle2 className="w-3 h-3" /> Leído hace 2 min
                 </div>
              </div>

              {/* Chat Input */}
              <div className="p-8 border-t border-gray-50 shrink-0 space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         placeholder="Escribe un mensaje..." 
                         className="w-full pl-6 pr-12 h-16 bg-gray-50 border-none rounded-[2rem] text-sm focus:ring-1 focus:ring-primary-custom/20 outline-none transition-all"
                       />
                       <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-custom text-white rounded-full transition-all hover:scale-110 active:scale-95 flex items-center justify-center">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                    <button className="w-16 h-16 bg-gray-900 text-white rounded-[2rem] flex items-center justify-center group hover:bg-black transition-all">
                       <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                 </div>
                 <div className="flex gap-4">
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom py-2 px-4 bg-primary-custom/5 border border-primary-custom/10 rounded-full hover:bg-primary-custom hover:text-white transition-all">
                       Enviar Catálogo
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom py-2 px-4 bg-primary-custom/5 border border-primary-custom/10 rounded-full hover:bg-primary-custom hover:text-white transition-all">
                       Agendar Callback
                    </button>
                 </div>
              </div>

              {/* Logic Sidebar Placeholder */}
              <div className="absolute top-8 right-full mr-8 w-80 space-y-6 hidden xl:block">
                 <div className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
                    <div className="flex items-center gap-2">
                       <Sparkles className="w-5 h-5 text-primary-custom" />
                       <h4 className="text-lg font-serif italic text-gray-900">IA Co-Pilot</h4>
                    </div>
                    <div className="space-y-4">
                       <p className="text-xs text-gray-500 italic leading-relaxed">
                          "Detección: Intención de compra alta. El cliente suele comprar cada 3 meses. Es su 3er mes."
                       </p>
                       <div className="p-4 bg-secondary-pink/10 rounded-2xl border border-secondary-pink/20">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary-custom mb-1">Respuesta sugerida</p>
                          <p className="text-[11px] text-gray-600 font-medium italic italic">"¡Qué bueno verte de nuevo! Como eres cliente recurrente, tengo un 15% para tu ramo de hoy."</p>
                       </div>
                       <button className="w-full text-[10px] font-black uppercase tracking-widest text-primary-custom py-3 border border-primary-custom/10 rounded-xl hover:bg-primary-custom hover:text-white transition-all">Usar Sugerencia</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
