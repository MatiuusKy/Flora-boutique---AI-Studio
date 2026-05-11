import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Heart, 
  Calendar as CalendarIcon,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const currentMonth = 'Mayo 2026';

const events = [
  { day: 12, title: 'Aniversario Carolina', type: 'Suscripción', color: 'bg-primary-custom' },
  { day: 12, title: 'Boda Flores/Soto', type: 'Evento', color: 'bg-secondary-sage' },
  { day: 15, title: 'Día de la Madre (Peak)', type: 'Feriado', color: 'bg-red-500' },
  { day: 18, title: 'Renovación Stock IA', type: 'Operativo', color: 'bg-blue-500' },
  { day: 20, title: 'Cumpleaños Sofia', type: 'CRM', color: 'bg-secondary-pink' },
];

export default function Calendar() {
  return (
    <AdminLayout>
      <div className="space-y-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Calendario Floral</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Planificación estratégica de fechas peak y compromisos emocionales.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
                Vista Mes
             </button>
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-custom text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20 hover:scale-105 transition-all cursor-pointer">
                <Plus className="w-4 h-4" /> Nuevo Evento
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1">
          {/* Calendar Grid */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-2xl font-serif italic text-gray-900">{currentMonth}</h3>
                <div className="flex items-center gap-4">
                   <button className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400"><ChevronLeft className="w-5 h-5" /></button>
                   <button className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400"><ChevronRight className="w-5 h-5" /></button>
                </div>
             </div>

             <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/30">
                {days.map(day => (
                  <div key={day} className="py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">
                    {day}
                  </div>
                ))}
             </div>

             <div className="flex-1 grid grid-cols-7 grid-rows-5 h-full">
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 3; // Offset for May 2026 starting Friday (approx)
                  const dayEvents = events.filter(e => e.day === day);
                  const isCurrentMonth = day > 0 && day <= 31;
                  
                  return (
                    <div 
                      key={i} 
                      className={`min-h-[120px] p-4 border-r border-b border-gray-50 transition-all hover:bg-gray-50/50 group relative ${!isCurrentMonth ? 'opacity-20' : ''}`}
                    >
                       <span className={`text-sm font-serif italic ${day === 11 ? 'text-primary-custom font-black' : 'text-gray-400'}`}>
                          {isCurrentMonth ? day : ''}
                       </span>
                       
                       <div className="mt-3 space-y-1.5">
                          {dayEvents.map((e, idx) => (
                            <div key={idx} className="flex flex-col">
                               <div className={`h-1 rounded-full w-full mb-1 ${e.color}`} />
                               <p className="text-[9px] font-bold text-gray-900 leading-tight truncate">{e.title}</p>
                            </div>
                          ))}
                       </div>

                       {isCurrentMonth && (
                         <button className="absolute bottom-2 right-2 p-1.5 bg-gray-50 rounded-lg text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="w-3 h-3" />
                         </button>
                       )}
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Right Sidebar: Peak Alerts & Filters */}
          <div className="lg:col-span-4 space-y-8">
             <div className="p-8 bg-secondary-pink/10 rounded-[2.5rem] border border-secondary-pink/20 space-y-6">
                <div className="flex items-center gap-3">
                   <Sparkles className="w-6 h-6 text-primary-custom" />
                   <h3 className="text-xl font-serif italic text-gray-900">Alerta Peak IA</h3>
                </div>
                <div className="space-y-4">
                   <div className="p-5 bg-white/60 rounded-2xl border border-white space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Próxima Gran Fecha</p>
                      <h4 className="text-xl font-serif italic text-gray-900">Día de la Madre</h4>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        "Faltan 4 días. El 65% de tus clientes recurrentes aún no reserva. Recomendamos lanzar campaña de fidelización inmediata."
                      </p>
                      <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom flex items-center gap-2">
                         Enviar Campaña <ArrowRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="text-xl font-serif italic text-gray-900">Leyenda de Eventos</h3>
                <div className="grid grid-cols-1 gap-3">
                   {[
                     { label: 'Suscripciones VIP', color: 'bg-primary-custom', count: 12 },
                     { label: 'Eventos Corporativos', color: 'bg-secondary-sage', count: 4 },
                     { label: 'Fechas Peak', color: 'bg-red-500', count: 2 },
                     { label: 'Cronograma IA', color: 'bg-blue-500', count: 8 },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 group cursor-default">
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${item.color}`} />
                           <span className="text-sm font-bold text-gray-800">{item.label}</span>
                        </div>
                        <span className="text-xs font-black text-gray-300 group-hover:text-gray-900 transition-colors">{item.count}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                   <h3 className="text-xl font-serif italic leading-tight">Proyección de Carga Mensual</h3>
                   <div className="flex items-end gap-2 h-16 pt-4">
                      {[40, 60, 30, 90, 50, 70, 85].map((h, i) => (
                        <div key={i} className="w-full bg-white/10 rounded-t-sm relative">
                           <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             className={`w-full absolute bottom-0 rounded-t-sm ${h > 80 ? 'bg-primary-custom' : 'bg-white/30'}`}
                           />
                        </div>
                      ))}
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Semana 4 : Capacidad al 85%</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
