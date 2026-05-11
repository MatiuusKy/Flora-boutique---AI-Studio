import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone,
  Maximize2,
  ChevronRight,
  TrendingUp,
  Fuel,
  Zap,
  MoreVertical,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

const drivers = [
  { id: '1', name: 'Rodrigo P.', status: 'En Ruta', deliveries: 8, efficiency: '98%', lat: -33.4489, lng: -70.6483 },
  { id: '2', name: 'Alvaro S.', status: 'Preparando', deliveries: 4, efficiency: '95%', lat: -33.4289, lng: -70.6283 },
  { id: '3', name: 'Marcela T.', status: 'Entregando', deliveries: 12, efficiency: '99%', lat: -33.4389, lng: -70.6383 },
];

const activeDeliveries = [
  { 
    id: '#9205', 
    customer: 'Sofia Valdés', 
    destination: 'Vitacura 1230', 
    status: 'En Ruta', 
    eta: '12 min', 
    priority: 'Alta',
    evidence: { required: true, status: 'pending', photo: null }
  },
  { 
    id: '#9204', 
    customer: 'Pilar Soto', 
    destination: 'Las Condes 8802', 
    status: 'Casi Llego', 
    eta: '3 min', 
    priority: 'Media',
    evidence: { required: true, status: 'uploaded', photo: 'https://images.unsplash.com/photo-1591886817179-880bb6daee30?w=100&h=100&fit=crop' }
  },
  { 
    id: '#9203', 
    customer: 'Andrés Bello', 
    destination: 'Providencia 12', 
    status: 'En Preparación', 
    eta: '45 min', 
    priority: 'Baja',
    evidence: { required: true, status: 'pending', photo: null }
  },
];

export default function Logistics() {
  return (
    <AdminLayout>
      <div className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Logística Inteligente: Región Metropolitana</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Monitoreo de delivery en tiempo real • Santiago, Chile.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
                Optimizar Rutas
             </button>
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary-custom text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20 hover:scale-105 transition-all cursor-pointer">
                Asignar Conductor
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
           {/* Left Sidebar: Active Drivers & Deliveries */}
           <div className="lg:col-span-4 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif italic text-gray-900">Conductores Activos</h3>
                    <span className="text-[10px] font-black uppercase text-secondary-sage bg-secondary-sage/10 px-2 py-1 rounded-full">{drivers.length} Online</span>
                 </div>
                 <div className="space-y-3">
                    {drivers.map(driver => (
                      <div key={driver.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-default">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-primary-custom overflow-hidden">
                               <img src={`https://i.pravatar.cc/100?u=${driver.id}`} alt={driver.name} />
                            </div>
                            <div>
                               <h4 className="text-sm font-bold text-gray-900">{driver.name}</h4>
                               <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{driver.status}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xs font-bold text-primary-custom">{driver.efficiency}</p>
                            <p className="text-[9px] text-gray-400 font-medium">Efficiency</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 pt-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif italic text-gray-900">Seguimiento de Despacho</h3>
                 </div>
                 <div className="space-y-4">
                    {activeDeliveries.map(delivery => (
                      <div key={delivery.id} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 relative group">
                         <div className="flex justify-between items-start">
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-primary-custom">{delivery.id}</p>
                               <h4 className="text-sm font-bold text-gray-900">{delivery.customer}</h4>
                               <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" /> {delivery.destination}
                               </p>
                            </div>
                            <div className="text-right">
                               <p className="text-sm font-black text-gray-900 italic">{delivery.eta}</p>
                               <p className="text-[9px] text-gray-400 font-medium">ETA</p>
                            </div>
                         </div>
                         
                         {/* Evidence Block */}
                         {delivery.evidence.required && (
                           <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Camera className={`w-3.5 h-3.5 ${delivery.evidence.status === 'uploaded' ? 'text-green-500' : 'text-gray-400'}`} />
                                 <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Logística: Evidencia</span>
                              </div>
                              {delivery.evidence.photo ? (
                                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white shadow-sm">
                                   <img src={delivery.evidence.photo} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="text-[8px] font-bold text-amber-500 px-2 py-0.5 bg-amber-50 rounded italic">Requerido</div>
                              )}
                           </div>
                         )}

                         <div className="flex items-center justify-between pt-2">
                            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              delivery.status === 'Casi Llego' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                               {delivery.status}
                            </div>
                            <div className="flex gap-2">
                               <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-custom transition-all">
                                  <Phone className="w-3 h-3" />
                                </button>
                               <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-custom transition-all">
                                  <Navigation className="w-3 h-3" />
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Section: Interactive Map & Stats */}
           <div className="lg:col-span-8 flex flex-col gap-8 h-full">
              <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative group">
                 {/* Local Scope Indicator */}
                 <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Santiago Centro / Oriente En Vivo</span>
                 </div>
                 {/* Map Placeholder with Image Overlay */}
                 <div className="absolute inset-0 bg-[#F5F5F5] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-20 grayscale brightness-125" 
                      alt="Map Grid" 
                    />
                    {/* Simulated Path */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <svg width="400" height="200" viewBox="0 0 400 200" fill="none" className="opacity-40">
                          <motion.path 
                            d="M10 100 Q 100 10 200 100 T 390 100" 
                            stroke="#580A2D" 
                            strokeWidth="2" 
                            strokeDasharray="5,5" 
                            animate={{ strokeDashoffset: [0, -100] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          />
                       </svg>
                    </div>

                    {/* Driver Markers */}
                    {drivers.map((d, i) => (
                      <motion.div 
                        key={d.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute"
                        style={{ left: `${30 + i * 20}%`, top: `${40 + i * 10}%` }}
                      >
                         <div className="relative group cursor-pointer">
                            <div className="p-2 bg-primary-custom rounded-xl shadow-xl animate-pulse">
                               <Truck className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                               {d.name} • {d.status}
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>

                 {/* Map Controls */}
                 <div className="absolute top-6 right-6 flex flex-col gap-3">
                    <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:text-primary-custom transition-all">
                       <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:text-primary-custom transition-all">
                       <Navigation className="w-5 h-5" />
                    </button>
                 </div>

                 {/* Fleet Stats Floating Card */}
                 <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-6">
                    {[
                      { icon: Fuel, title: 'Combustible', value: '$84.200', change: '-5%' },
                      { icon: Clock, title: 'Tiempo en Tráfico', value: '42 min', change: '+2min' },
                      { icon: TrendingUp, title: 'Optimización', value: '92%', change: '+12%' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white shadow-2xl flex items-center gap-4">
                         <div className="p-3 bg-primary-custom/5 rounded-2xl text-primary-custom">
                            <stat.icon className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{stat.title}</p>
                            <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Botonera Logística IA Section */}
              <div className="p-8 bg-secondary-cream/30 rounded-[3rem] border border-secondary-cream/50 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Zap className="w-5 h-5 text-primary-custom" />
                       <h3 className="text-xl font-serif italic text-gray-900">IA Logística</h3>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom">Ver Detalle</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <p className="text-sm font-medium italic text-gray-600">"El tráfico en Comuna Las Condes aumentará un 20% a las 18:00. Sugerimos agrupar estos 3 pedidos ahora."</p>
                       <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom flex items-center gap-2 hover:translate-x-1 transition-transform">
                          Aplicar Agrupación <ChevronRight className="w-3 h-3" />
                       </button>
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm font-medium italic text-gray-600">"Rodrigo P. está a 5 min de una entrega fallida por falta de estacionamiento. Enviando puntos de carga alternativa."</p>
                       <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom flex items-center gap-2 hover:translate-x-1 transition-transform">
                          Notificar Conductor <ChevronRight className="w-3 h-3" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
