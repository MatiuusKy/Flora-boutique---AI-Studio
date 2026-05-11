import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  MoreVertical,
  Plus,
  Filter,
  Users,
  Search
} from 'lucide-react';

const columns = [
  { id: 'todo', title: 'Pendiente', color: 'bg-gray-100 text-gray-400' },
  { id: 'in_progress', title: 'Armando', color: 'bg-blue-50 text-blue-500' },
  { id: 'ready', title: 'Listo', color: 'bg-secondary-sage/20 text-secondary-sage' },
  { id: 'delivered', title: 'En Ruta', color: 'bg-amber-50 text-amber-500' },
  { id: 'completed', title: 'Entregado', color: 'bg-green-50 text-green-500' },
];

const initialTasks = [
  { 
    id: '1', 
    customer: 'Carolina Herrera', 
    type: 'Ramo Deluxe Elixir', 
    priority: 'Alta', 
    time: '14:30', 
    comuna: 'Las Condes', 
    florist: 'Elena G.',
    status: 'in_progress',
    steps: ['Limpieza base', 'Corte tallos', 'Armado espiral', 'Aromatización Elixir'],
    completed: 3,
    estimated: '20 min'
  },
  { 
    id: '2', 
    customer: 'Jorge Valdivia', 
    type: '12 Rosas Rojas', 
    priority: 'Media', 
    time: '15:00', 
    comuna: 'Vitacura', 
    florist: 'Andrés B.',
    status: 'todo',
    steps: ['Selección rosas', 'Presentación caja'],
    completed: 0,
    estimated: '15 min'
  },
  { 
    id: '3', 
    customer: 'Maria Lopez', 
    type: 'Mix Estacional', 
    priority: 'Baja', 
    time: '17:00', 
    comuna: 'Ñuñoa', 
    florist: 'Elena G.',
    status: 'todo',
    steps: ['Mix flores', 'Papel seda'],
    completed: 0,
    estimated: '30 min'
  },
  { 
    id: '4', 
    customer: 'Ignacio Salas', 
    type: 'Orquídea Blanca', 
    priority: 'Alta', 
    time: '13:00', 
    comuna: 'Providencia', 
    florist: 'Andrés B.',
    status: 'ready',
    steps: ['Trasplante', 'Lazo seda', 'Tarjeta'],
    completed: 3,
    estimated: '10 min'
  },
  { 
    id: '5', 
    customer: 'Valentina Ross', 
    type: 'Caja Premium', 
    priority: 'Inmediata', 
    time: '12:00', 
    comuna: 'Lo Barnechea', 
    florist: 'Elena G.',
    status: 'delivered',
    steps: ['Armado', 'Gift box', 'Cinta luxury'],
    completed: 3,
    estimated: '45 min'
  },
];

export default function Production() {
  const [tasks, setTasks] = useState(initialTasks);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Alta': return 'text-red-500 bg-red-50';
      case 'Inmediata': return 'text-primary-custom bg-secondary-pink/20';
      case 'Media': return 'text-amber-500 bg-amber-50';
      default: return 'text-gray-400 bg-gray-50';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Centro de Producción</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Gestiona el flujo de armado y preparación floral.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input type="text" placeholder="Filtrar pedidos..." className="pl-10 pr-4 h-12 bg-white border border-gray-100 rounded-xl text-sm w-64 focus:ring-1 focus:ring-primary-custom/20 transition-all outline-none" />
             </div>
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-custom text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20 hover:scale-105 transition-all cursor-pointer">
                <Plus className="w-4 h-4" /> Nuevo Ramo
             </button>
          </div>
        </div>

        {/* Filters/Stats Bar */}
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shrink-0">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Users className="w-4 h-4 text-gray-400" />
                 <span className="text-xs font-bold text-gray-900">4 Floristas Activos</span>
              </div>
              <div className="w-px h-4 bg-gray-100" />
              <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4 text-amber-500" />
                 <span className="text-xs font-bold text-gray-900">Tiempo prom. armado: 18min</span>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
                 <Filter className="w-3 h-3" /> Prioridad
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
                 Florista
              </button>
           </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
          {columns.map((col) => (
            <div key={col.id} className="w-[340px] shrink-0 flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${col.color}`}>
                       {col.title}
                    </div>
                    <span className="text-xs font-bold text-gray-400">{tasks.filter(t => t.status === col.id).length}</span>
                 </div>
                 <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                 </button>
              </div>

              <div className="flex-1 space-y-4">
                <AnimatePresence>
                  {tasks.filter(t => t.status === col.id).map((task) => (
                    <motion.div
                      key={task.id}
                      layoutId={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary-custom/20 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                           {task.priority}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                           <Clock className="w-3 h-3" /> {task.time}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{task.type}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">{task.customer}</p>

                      {/* Checklist & Progress */}
                      {task.steps.length > 0 && (
                        <div className="space-y-3 mb-4">
                           <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400">
                              <span>Progreso Armado</span>
                              <span>{task.completed}/{task.steps.length} • {task.estimated}</span>
                           </div>
                           <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(task.completed / task.steps.length) * 100}%` }}
                                className="h-full bg-primary-custom"
                              />
                           </div>
                           <div className="flex flex-wrap gap-1">
                              {task.steps.slice(0, 2).map((s, i) => (
                                <span key={i} className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                                  i < task.completed ? 'bg-secondary-sage/10 border-secondary-sage/20 text-secondary-sage' : 'bg-gray-50 border-gray-100 text-gray-300'
                                }`}>
                                   {s}
                                </span>
                              ))}
                              {task.steps.length > 2 && <span className="text-[8px] font-bold text-gray-300 px-1.5 py-0.5">+{task.steps.length - 2}</span>}
                           </div>
                        </div>
                      )}

                      <div className="h-px bg-gray-50 w-full mb-4" />

                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-secondary-cream flex items-center justify-center text-[10px] font-bold text-primary-custom border border-primary-custom/10">
                               {task.florist[0]}
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 italic">{task.florist}</span>
                         </div>
                         <div className="flex items-center gap-1 text-[10px] font-medium text-gray-300">
                            <Truck className="w-3 h-3" />
                            {task.comuna}
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Empty placeholder if no tasks */}
                {tasks.filter(t => t.status === col.id).length === 0 && (
                  <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Vacío</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
