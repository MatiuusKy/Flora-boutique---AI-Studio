import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Map as MapIcon, 
  Zap, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Sparkles,
  MousePointer2,
  BookOpen,
  X,
  Info
} from 'lucide-react';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie,
  Tooltip as ReTooltip
} from 'recharts';

const salesByCommune = [
  { name: 'Las Condes', value: 45 },
  { name: 'Vitacura', value: 30 },
  { name: 'Providencia', value: 15 },
  { name: 'Lo Barnechea', value: 10 },
];

const hourlySales = [
  { time: '08:00', sales: 12 },
  { time: '10:00', sales: 45 },
  { time: '12:00', sales: 38 },
  { time: '14:00', sales: 65 },
  { time: '16:00', sales: 82 },
  { time: '18:00', sales: 54 },
  { time: '20:00', sales: 31 },
];

const COLORS = ['#580A2D', '#899B89', '#E1E6D6', '#EFCEDA'];

const analyticsDefinitions = [
  { term: 'Gasto Promedio', desc: 'Es el valor medio que gasta un cliente en cada pedido. Ayuda a saber si estamos vendiendo ramos más caros o baratos.' },
  { term: 'Costo de Atracción', desc: 'Lo que invertimos en publicidad para conseguir un (1) cliente nuevo. (Antes llamado CAC).' },
  { term: 'Valor por Cliente', desc: 'El dinero total que un cliente deja en tu florería a lo largo de toda su vida como comprador. (Antes llamado LTV).' },
  { term: 'Flores Perdidas', desc: 'El porcentaje de flores que se estropean o no se venden y deben ser descartadas (Merma).' },
  { term: 'Fidelidad / Abandono', desc: 'Mide cuántos clientes dejan de comprar después de un tiempo. Menos fidelidad significa más clientes perdidos.' },
  { term: 'Tasa de Compra', desc: 'De cada 100 personas que ven tu web, cuántas terminan comprando algo.' },
];

const DataDictionary = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" 
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] p-8 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif italic text-gray-900">Guía de Métricas</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Diccionario Flora OS</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-8">
            {analyticsDefinitions.map((item, i) => (
              <div key={i} className="space-y-2 group">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary-custom rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                  <h4 className="font-bold text-gray-900 text-sm">{item.term}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic pl-3">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-secondary-pink/5 rounded-2xl border border-secondary-pink/10">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-primary-custom shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 italic leading-relaxed">
                Toda la información es calculada automáticamente por el motor de IA basándose en tus ventas, inventario y comportamiento de clientes.
              </p>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AnalyticCard = ({ title, value, subValue, change, isPositive, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:border-primary-custom/20 transition-all group"
  >
    <div className="flex justify-between items-start">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-primary-custom/5 transition-colors">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary-custom" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-serif text-gray-900 leading-none">{value}</h3>
      <p className="text-[10px] text-gray-400 font-medium mt-1">{subValue}</p>
    </div>
  </motion.div>
);

export default function Analytics() {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  return (
    <AdminLayout>
      <DataDictionary isOpen={isDictionaryOpen} onClose={() => setIsDictionaryOpen(false)} />
      
      <div className="space-y-10 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Radiografía del Negocio</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Entiende el crecimiento y la operación de tu florería sin complicaciones.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
             <button 
               onClick={() => setIsDictionaryOpen(true)}
               className="flex items-center gap-2 px-6 h-12 rounded-xl bg-secondary-pink/10 text-primary-custom border border-primary-custom/10 text-[11px] font-black uppercase tracking-widest hover:bg-secondary-pink/20 transition-all cursor-pointer"
             >
                <BookOpen className="w-4 h-4" /> Guía de Métricas
             </button>
             <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
                <Calendar className="w-4 h-4" /> Mayo 2026
             </button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <AnalyticCard title="Gasto por Compra" value="$42.500" subValue="+$5.200 vs abril" change="+12%" isPositive={true} icon={BarChart3} />
           <AnalyticCard title="Costo Atracción" value="$8.400" subValue="Publicidad Online" change="-15%" isPositive={true} icon={Users} delay={0.1} />
           <AnalyticCard title="Valor por Cliente" value="$320.000" subValue="Historial de compras" change="+8.2%" isPositive={true} icon={TrendingUp} delay={0.2} />
           <AnalyticCard title="Flores Perdidas" value="3.4%" subValue="Foco en Tulipanes" change="-1.2%" isPositive={true} icon={PieChart} delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main Sales Analytics */}
           <div className="lg:col-span-8 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-2xl font-serif italic text-gray-900">Ventas en Tiempo y Espacio</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">¿Cuándo y dónde vendemos más?</p>
                 </div>
                 <div className="flex gap-2 justify-center">
                    <button className="px-3 py-1.5 rounded-lg bg-gray-50 text-[9px] font-black uppercase tracking-widest text-primary-custom border border-primary-custom/10">Ventas</button>
                    <button className="px-3 py-1.5 rounded-lg hover:bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 transition-all">Pedidos</button>
                 </div>
              </div>

              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlySales}>
                       <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#580A2D" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#580A2D" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis 
                         dataKey="time" 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                         dy={10}
                       />
                       <YAxis hide />
                       <Tooltip 
                         contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                       />
                       <Area 
                         type="monotone" 
                         dataKey="sales" 
                         stroke="#580A2D" 
                         strokeWidth={3}
                         fillOpacity={1} 
                         fill="url(#colorSales)" 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-50">
                 {[
                   { label: 'Tasa de Compra', value: '3.2%', status: 'Normal' },
                   { label: 'Tiempo Respuesta', value: '4m', status: 'Excelente' },
                   { label: 'Devoluciones', value: '0.2%', status: 'Bajo' },
                   { label: 'Fidelidad (Baja)', value: '4.1%', status: 'Atención' },
                 ].map((metric, i) => (
                   <div key={i} className="space-y-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{metric.label}</p>
                      <p className="text-xl font-serif italic text-gray-900">{metric.value}</p>
                      <div className="flex items-center justify-center md:justify-start gap-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${metric.status === 'Excelente' || metric.status === 'Normal' || metric.status === 'Bajo' ? 'bg-green-500' : 'bg-amber-500'}`} />
                         <span className="text-[9px] font-bold text-gray-400">{metric.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Distribution Analytics */}
           <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                 <h3 className="text-xl font-serif italic text-gray-900 text-center md:text-left">Comunas Top</h3>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <RePieChart>
                          <Pie
                            data={salesByCommune}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                             {salesByCommune.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                          </Pie>
                          <ReTooltip />
                       </RePieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="space-y-3">
                    {salesByCommune.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            <span className="text-xs font-bold text-gray-700">{item.name}</span>
                         </div>
                         <span className="text-xs font-black text-gray-300">{item.value}%</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Predictive Insight Box */}
              <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2">
                       <Zap className="w-5 h-5 text-primary-custom" />
                       <h3 className="text-xl font-serif italic leading-none">Asesor Maestro IA</h3>
                    </div>
                    <div className="space-y-4">
                       <p className="text-sm text-white/70 leading-relaxed italic">
                         "Basado en tus últimos 2 años, la demanda en Providencia subirá un 35% este finde por bodas. Te sugiero tener 2 floristas más de apoyo."
                       </p>
                       <button className="w-full h-12 bg-primary-custom text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                          Ver Plan Sugerido
                       </button>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary-custom/20 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
              </div>
           </div>
        </div>

        {/* Operational Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-2xl font-serif italic text-gray-900">Pasos a la Excelencia</h3>
                 <Sparkles className="w-5 h-5 text-gray-300" />
              </div>
              <div className="space-y-6">
                 {[
                   { label: 'Tiempo de Armado', value: '18 min', target: '15 min', progress: 85 },
                   { label: 'Eficiencia de Entrega', value: '96%', target: '98%', progress: 96 },
                   { label: 'Felicidad del Equipo', value: '4.8', target: '5.0', progress: 92 },
                 ].map((item, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                            <p className="text-lg font-serif italic text-gray-900">{item.value}</p>
                         </div>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Meta: {item.target}</p>
                      </div>
                      <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                         <div className="h-full bg-primary-custom rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-secondary-pink/5 rounded-[2.5rem] border border-secondary-pink/10 shadow-sm space-y-8">
              <h3 className="text-2xl font-serif italic text-gray-900">Consejos de Marketing IA</h3>
              <div className="space-y-4">
                 {[
                   { icon: MousePointer2, title: 'Anuncios en Redes', text: 'Tus anuncios rinden mejor en Vitacura. Si inviertes un poco más ahí, podrías vender un 20% más.', action: 'Potenciar Zona' },
                   { icon: Users, title: 'Evitar Clientes Perdidos', text: 'Notamos que algunos clientes no vuelven tras su 3ra compra. ¿Les enviamos un cupón sorpresa?', action: 'Enviar Regalo' },
                 ].map((insight, i) => (
                   <div key={i} className="p-5 bg-white rounded-2xl border border-secondary-pink/10 flex gap-4 items-start group hover:border-primary-custom/30 transition-all">
                      <div className="p-3 bg-secondary-pink/10 rounded-xl text-primary-custom group-hover:scale-110 transition-transform">
                         <insight.icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-2 flex-1">
                         <h4 className="text-sm font-bold text-gray-900">{insight.title}</h4>
                         <p className="text-xs text-gray-500 leading-relaxed italic">{insight.text}</p>
                         <button className="text-[9px] font-black uppercase tracking-widest text-primary-custom flex items-center gap-1 hover:translate-x-1 transition-transform">
                            {insight.action} <ChevronRight className="w-3 h-3" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
