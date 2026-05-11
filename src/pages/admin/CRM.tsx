import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  Star, 
  MessageCircle, 
  TrendingUp, 
  UserPlus, 
  Filter, 
  Search,
  Sparkles,
  ChevronRight,
  Bell,
  Mail,
  Zap,
  Clock,
  ExternalLink
} from 'lucide-react';

const clients = [
  { 
    id: '1', 
    name: 'Carolina Herrera', 
    type: 'VIP', 
    lastPurchase: '12 May', 
    spent: '$850.000', 
    emotionalTriggers: ['Aniversario', 'Cumpleaños'],
    nextEvent: 'Aniversario (15 Jun)',
    notes: 'Prefiere rosas blancas y lirios. Nivel de detalle alto.',
    timeline: [
      { date: '12 May', event: 'Compra: Ramo Elixir Deluxe', sentiment: 'Positivo', type: 'purchase' },
      { date: '05 May', event: 'Interacción: WhatsApp (Consulta Tulipanes)', sentiment: 'Neutral', type: 'chat' },
      { date: '15 Abr', event: 'Evento: Cumpleaños Mamá', sentiment: 'Positivo', type: 'event' },
    ]
  },
  { 
    id: '2', 
    name: 'Jorge Valdivia', 
    type: 'Recurrente', 
    lastPurchase: '05 May', 
    spent: '$420.000', 
    emotionalTriggers: ['San Valentín', 'Día Madre'],
    nextEvent: 'Sin eventos próximos',
    notes: 'Ramos grandes impactantes. Girasoles son sus favoritos.',
    timeline: [
      { date: '05 May', event: 'Compra: 24 Girasoles', sentiment: 'Positivo', type: 'purchase' },
      { date: '14 Feb', event: 'Evento: San Valentín', sentiment: 'Positivo', type: 'event' },
    ]
  },
  { 
    id: '3', 
    name: 'Maria Lopez', 
    type: 'Nueva', 
    lastPurchase: '08 May', 
    spent: '$45.000', 
    emotionalTriggers: ['Cumpleaños'],
    nextEvent: 'Cumpleaños (20 May)',
    notes: 'Primera compra. Interesada en suscripción mensual.',
    timeline: [
      { date: '08 May', event: 'Compra: Mix Estacional Mini', sentiment: 'Neutral', type: 'purchase' },
    ]
  }
];

const EventCard = ({ title, date, client, type }: any) => (
  <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-primary-custom/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-secondary-pink/20 rounded-xl flex flex-col items-center justify-center text-primary-custom">
        <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{date.split(' ')[1]}</span>
        <span className="text-xl font-serif italic leading-none">{date.split(' ')[0]}</span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{client}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
       {type === 'trigger' && (
         <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3" /> Recordatorio IA
         </div>
       )}
       <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-primary-custom transition-all">
          <ChevronRight className="w-4 h-4" />
       </button>
    </div>
  </div>
);

export default function CRM() {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">CRM Emocional</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Gestiona relaciones, no solo transacciones. Detecta momentos icónicos.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
                <Filter className="w-4 h-4" /> Segmentos
             </button>
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-custom text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20 hover:scale-105 transition-all cursor-pointer">
                <UserPlus className="w-4 h-4" /> Nuevo Cliente
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main List */}
           <div className={`${selectedClient ? 'lg:col-span-4' : 'lg:col-span-8'} space-y-6 transition-all duration-500`}>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-serif italic text-gray-900">Directorio de Emociones</h3>
                 {!selectedClient && (
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                       <input type="text" placeholder="Buscar cliente..." className="pl-10 pr-4 h-10 bg-white border border-gray-100 rounded-xl text-sm w-64 focus:ring-1 focus:ring-primary-custom/20 outline-none" />
                    </div>
                 )}
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Cliente</th>
                        {!selectedClient && <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Status</th>}
                        {!selectedClient && <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400">Spent</th>}
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-400"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {clients.map((client) => (
                        <tr 
                          key={client.id} 
                          onClick={() => setSelectedClient(client)}
                          className={`hover:bg-gray-50/50 transition-colors group cursor-pointer ${selectedClient?.id === client.id ? 'bg-primary-custom/5 transition-all' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="w-9 h-9 rounded-full bg-secondary-pink/10 flex items-center justify-center text-primary-custom font-serif italic text-sm">
                                  {client.name[0]}
                               </div>
                               <div>
                                  <p className="text-xs font-bold text-gray-900">{client.name}</p>
                                  <p className="text-[9px] text-gray-400 font-medium">Último: {client.lastPurchase}</p>
                               </div>
                            </div>
                          </td>
                          {!selectedClient && (
                            <td className="px-6 py-4">
                               <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${client.type === 'VIP' ? 'bg-primary-custom text-white' : 'bg-gray-100 text-gray-400'}`}>
                                  {client.type}
                               </span>
                            </td>
                          )}
                          {!selectedClient && (
                            <td className="px-6 py-4">
                               <p className="text-sm font-black text-gray-900">{client.spent}</p>
                            </td>
                          )}
                          <td className="px-6 py-4 text-right">
                             <ChevronRight className={`w-4 h-4 text-gray-300 group-hover:text-primary-custom transition-all ${selectedClient?.id === client.id ? 'rotate-90' : ''}`} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Dynamic Dashboard / Detail */}
           <div className={`${selectedClient ? 'lg:col-span-8' : 'lg:col-span-4'} transition-all duration-500`}>
              <AnimatePresence mode="wait">
                 {selectedClient ? (
                   <motion.div 
                     key="detail"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-8"
                   >
                      <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                         <div className="flex justify-between items-start">
                            <div className="flex items-center gap-6">
                               <div className="w-20 h-20 rounded-full bg-secondary-pink/10 flex items-center justify-center text-3xl text-primary-custom font-serif italic">
                                  {selectedClient.name[0]}
                               </div>
                               <div className="space-y-1">
                                  <h2 className="text-3xl font-serif italic text-gray-900">{selectedClient.name}</h2>
                                  <div className="flex gap-2">
                                     <span className="px-3 py-1 bg-primary-custom text-white text-[9px] font-black uppercase tracking-widest rounded-full">{selectedClient.type}</span>
                                     <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-full">LTV: {selectedClient.spent}</span>
                                  </div>
                               </div>
                            </div>
                            <button onClick={() => setSelectedClient(null)} className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                               <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                               <h3 className="text-xl font-serif italic text-gray-900">Resumen Emocional</h3>
                               <div className="space-y-4">
                                  {selectedClient.timeline.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-4 relative">
                                       {i !== selectedClient.timeline.length - 1 && (
                                         <div className="absolute left-[11px] top-6 w-[1px] h-full bg-gray-100" />
                                       )}
                                       <div className={`w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center relative z-10 ${
                                         item.type === 'purchase' ? 'bg-primary-custom' : item.type === 'chat' ? 'bg-secondary-cream' : 'bg-secondary-sage'
                                       }`}>
                                          {item.type === 'purchase' ? <Heart className="w-3 h-3 text-white" /> : item.type === 'chat' ? <MessageCircle className="w-3 h-3 text-primary-custom" /> : <Calendar className="w-3 h-3 text-white" />}
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.date}</p>
                                          <p className="text-sm font-bold text-gray-900">{item.event}</p>
                                          <p className="text-[11px] italic text-gray-500">{item.sentiment} sentiment detected</p>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                            <div className="space-y-6">
                               <h3 className="text-xl font-serif italic text-gray-900">Notas de Estilo</h3>
                               <p className="p-5 bg-gray-50 rounded-2xl text-sm italic text-gray-600 leading-relaxed">
                                  "{selectedClient.notes}"
                               </p>
                               <div className="space-y-3">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Próximos Recordatorios</p>
                                  <div className="p-4 border border-secondary-pink/20 bg-secondary-pink/5 rounded-2xl flex items-center justify-between">
                                     <div className="flex items-center gap-3">
                                        <Zap className="w-4 h-4 text-primary-custom" />
                                        <span className="text-xs font-bold text-gray-900">{selectedClient.nextEvent}</span>
                                     </div>
                                     <ExternalLink className="w-4 h-4 text-primary-custom cursor-pointer" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="overview"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="space-y-8"
                   >
                      <div className="p-6 bg-primary-custom text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                         <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                               <Sparkles className="w-5 h-5" />
                               <h3 className="text-xl font-serif italic leading-none">IA Master Insight</h3>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed italic">
                               "Se detecta un patrón de compra bimensual en 15 clientes VIP. Recomendamos activar la Suscripción Elixir automáticamente antes del 15 de Mayo."
                            </p>
                            <button className="w-full h-12 bg-white text-primary-custom rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                               Optimizar Retención
                            </button>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h3 className="text-xl font-serif italic text-gray-900">Próximos Momentos</h3>
                         <div className="space-y-3">
                            <EventCard title="Aniversario de Bodas" date="15 May" client="Felipe Arancibia" type="trigger" />
                            <EventCard title="Cumpleaños Maria" date="20 May" client="Maria Lopez" />
                            <EventCard title="Cena Corporativa" date="22 May" client="Boutique Hotel" />
                         </div>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
