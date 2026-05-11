import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  Truck, 
  AlertCircle, 
  Users, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Flower,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Lun', sales: 4200 },
  { name: 'Mar', sales: 3800 },
  { name: 'Mie', sales: 5100 },
  { name: 'Jue', sales: 4800 },
  { name: 'Vie', sales: 6500 },
  { name: 'Sab', sales: 8200 },
  { name: 'Dom', sales: 5900 },
];

const categoryData = [
  { name: 'Rosas', value: 45, color: '#580A2D' },
  { name: 'Tulipanes', value: 25, color: '#899B89' },
  { name: 'Girasoles', value: 20, color: '#E1E6D6' },
  { name: 'Orquídeas', value: 10, color: '#EFCEDA' },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-primary-custom/20 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-3xl font-serif text-gray-900 tracking-tighter">{value}</h3>
    
    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-24 h-24" />
    </div>
  </motion.div>
);

const AIInsightCard = ({ title, desc, action, type = 'blue' }: any) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    purple: 'bg-primary-custom/5 border-primary-custom/10 text-primary-custom',
    amber: 'bg-amber-50 border-amber-100 text-amber-700'
  };
  
  return (
    <div className={`p-5 rounded-2xl border ${colors[type as keyof typeof colors]} space-y-3 relative overflow-hidden`}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed italic">{desc}</p>
      <button className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
        {action} <ArrowRight className="w-3 h-3" />
      </button>

      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-serif italic text-gray-900 tracking-tighter"
            >
              Control Maestro
            </motion.h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Bienvenido de nuevo, Flora Atelier. Esto es lo que sucede hoy.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 h-12 rounded-xl bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer">
              Exportar Reporte
            </button>
            <button className="px-6 h-12 rounded-xl bg-primary-custom text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20 hover:scale-105 transition-all cursor-pointer">
              Nuevo Pedido
            </button>
          </div>
        </div>

        {/* Executive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Ventas del Día" 
            value="$1.240.000" 
            change="+12.5%" 
            isPositive={true} 
            icon={TrendingUp} 
          />
          <StatCard 
            title="Pedidos Activos" 
            value="34" 
            change="+8" 
            isPositive={true} 
            icon={ShoppingBag} 
            delay={0.1}
          />
          <StatCard 
            title="En Preparación" 
            value="12" 
            change="-2" 
            isPositive={true} 
            icon={Clock} 
            delay={0.2}
          />
          <StatCard 
            title="Stock Crítico" 
            value="Rosas Rojas" 
            change="5 tallos" 
            isPositive={false} 
            icon={AlertCircle} 
            delay={0.3}
          />
        </div>

        {/* Main Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-serif italic text-gray-900">Rendimiento Semanal</h3>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Revenue en clp</p>
              </div>
              <select className="bg-gray-50 border-none rounded-lg text-[10px] font-bold uppercase tracking-widest px-3 py-2 outline-none cursor-pointer">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
              </select>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#580A2D" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#580A2D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                    cursor={{ stroke: '#580A2D', strokeWidth: 1, strokeDasharray: '5 5' }}
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
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-primary-custom" />
              <h3 className="text-xl font-serif italic text-gray-900">IA Predictiva</h3>
            </div>
            
            <AIInsightCard 
              title="Predicción de Demanda" 
              desc="📈 Alta demanda esperada para rosas este fin de semana en RM Oriente." 
              action="Ver pedido sugerido"
              type="purple"
            />
            
            <AIInsightCard 
              title="Alerta de Inventario" 
              desc="⚠️ Posible merma elevada en tulipanes debido a ola de calor en Santiago." 
              action="Ajustar enfriadores"
              type="amber"
            />

            <AIInsightCard 
              title="CRM Predictivo" 
              desc="💡 Detectado: 15 clientes VIP con aniversario pronto. ¿Activar campaña automática?" 
              action="Activar Flow"
              type="purple"
            />

            <AIInsightCard 
              title="Logística Inteligente" 
              desc="🚚 Optimizar rutas rona Las Condes. Ahorro proyectado de 45 min en combustible." 
              action="Aplicar Ruteo"
              type="blue"
            />

            <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-4">
               <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Eficiencia Operativa</h4>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[11px] font-bold">
                        <span>Merma Semanal</span>
                        <span className="text-primary-custom">4.2%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-custom rounded-full" style={{ width: '4.2%' }} />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[11px] font-bold">
                        <span>Productividad Floristas</span>
                        <span className="text-green-500">92%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Categories & Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-serif italic text-gray-900">Top Categorías</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 0, right: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontStyle: 'italic', fill: '#111827' }} 
                      width={80}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif italic text-gray-900">CRM Emocional: Clientes Elite</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary-custom cursor-pointer hover:underline">Ver todos</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Matias Rodriguez', type: 'Aniversario', status: 'Inactivo', revenue: '$450k' },
                  { name: 'Sofía Valdés', type: 'Mensual VIP', status: 'Activo', revenue: '$920k' },
                  { name: 'Ricardo Lagos', type: 'Corporativo', status: 'Activo', revenue: '$1.2M' },
                  { name: 'Elena García', type: 'Cumpleaños', status: 'Atención', revenue: '$280k' },
                ].map((client, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary-cream flex items-center justify-center text-primary-custom font-serif italic">
                        {client.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{client.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{client.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-gray-900">{client.revenue}</p>
                       <p className={`text-[9px] uppercase tracking-widest font-black ${
                         client.status === 'Activo' ? 'text-green-500' : 
                         client.status === 'Inactivo' ? 'text-gray-300' : 'text-amber-500'
                       }`}>{client.status}</p>
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
