import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../../components/PageTransition";
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { 
  BarChart3, 
  ShoppingBag, 
  MessageCircle, 
  Instagram, 
  TrendingUp, 
  Users, 
  Plus,
  ArrowUpRight,
  Search,
  X,
  CreditCard,
  User as UserIcon,
  Globe,
  LayoutDashboard,
  Box
} from "lucide-react";
import { products as baseProducts } from "../../data/products";

const COLORS = ['#580A2D', '#97224A', '#DB2777', '#F472B6', '#FDA4AF'];

const AdminDashboard = () => {
  const [isRegisteringSale, setIsRegisteringSale] = useState(false);
  
  const orders = useMemo(() => {
    const saved = localStorage.getItem('flora_orders');
    return saved ? JSON.parse(saved) : [];
  }, []);

  const inventory = useMemo(() => {
    const saved = localStorage.getItem('flora_inventory');
    return saved ? JSON.parse(saved) : baseProducts;
  }, []);

  // Compute chart data
  const channelData = useMemo(() => {
    const channels = ['Web', 'WhatsApp', 'Instagram', 'Manual'];
    return channels.map(channel => ({
      name: channel,
      value: orders.filter((o: any) => o.channel === channel).length,
      total: orders.filter((o: any) => o.channel === channel).reduce((acc: number, o: any) => acc + (o.total || 0), 0)
    })).filter(c => c.value > 0);
  }, [orders]);

  const stats = [
    { label: "Ventas Totales", value: `$${orders.reduce((acc: number, o: any) => acc + (o.total || 0), 0).toLocaleString('es-CL')}`, change: "+12%", icon: TrendingUp, color: "text-green-500" },
    { label: "Pedidos", value: orders.length.toString(), change: "+5%", icon: ShoppingBag, color: "text-primary" },
    { label: "Canal Web", value: orders.filter((o: any) => o.channel === "Web").length.toString(), change: "+18%", icon: Globe, color: "text-blue-400" },
    { label: "Canal Redes", value: orders.filter((o: any) => ['WhatsApp', 'Instagram'].includes(o.channel)).length.toString(), change: "-2%", icon: MessageCircle, color: "text-pink-500" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FDFCFD] flex">
        {/* Sidebar */}
        <aside className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-10 space-y-10 sticky top-0 h-screen z-20 shadow-sm">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-primary/20">F</div>
          <nav className="flex flex-col space-y-8">
            <a href="/admin" className="p-3.5 bg-primary text-white rounded-2xl shadow-xl shadow-primary/10 transition-all"><LayoutDashboard className="w-6 h-6" /></a>
            <a href="/admin/productos" className="p-3.5 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"><Box className="w-6 h-6" /></a>
            <button className="p-3.5 text-gray-300 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"><Users className="w-6 h-6" /></button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Dashboard Hero Header */}
          <div className="bg-primary px-12 pt-20 pb-40 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
             <div className="relative z-10">
               <h1 className="text-4xl md:text-5xl font-serif leading-tight">Buenos días, Flora.</h1>
               <p className="text-white/60 mt-2 text-sm max-w-lg italic font-light">Tu florería está floreciendo hoy. Aquí tienes el resumen de las últimas 24 horas.</p>
               
               <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => setIsRegisteringSale(true)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Venta Manual
                </button>
                <a 
                  href="/admin/productos"
                  className="bg-white text-primary px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-2xl hover:shadow-white/20 transition-all"
                >
                  Nuevo Producto
                </a>
               </div>
             </div>
          </div>

          {/* Overlapping Content Container */}
          <div className="max-w-7xl mx-auto px-12 -mt-20 relative z-10 pb-20">
             {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-50 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-serif text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Distribution - DONUT CHART */}
              <section className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 flex flex-col items-center">
                 <h2 className="text-lg font-serif italic mb-8 w-full">Distribución de Ventas</h2>
                 <div className="w-full h-64 relative">
                   <ResponsiveContainer width="100%" height="100%">
                     <RePieChart>
                       <Pie
                         data={channelData.length > 0 ? channelData : [{name: 'Sin datos', value: 1}]}
                         cx="50%"
                         cy="50%"
                         innerRadius={64}
                         outerRadius={90}
                         paddingAngle={8}
                         dataKey="value"
                         stroke="none"
                       >
                         {channelData.map((_, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} />
                         ))}
                       </Pie>
                       <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const percentage = orders.length > 0 ? ((data.value / orders.length) * 100).toFixed(0) : 0;
                            return (
                              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 flex flex-col gap-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{data.name}</p>
                                <p className="text-sm font-bold text-gray-900">{data.value} ventas ({percentage}%)</p>
                                <p className="text-xs text-primary font-serif italic">${data.total?.toLocaleString('es-CL')}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                       />
                     </RePieChart>
                   </ResponsiveContainer>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <p className="text-2xl font-serif text-gray-900 leading-none">{orders.length}</p>
                      <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mt-1">Total</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    {channelData.map((channel, idx) => (
                      <div key={channel.name} className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                         <div>
                           <p className="text-[10px] font-bold text-gray-900">{channel.name}</p>
                           <p className="text-[9px] text-gray-400">{channel.value} ventas</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Inventory Dashboard View */}
              <section className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-lg font-serif italic">Control de Stock</h2>
                  <a href="/admin/productos" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline transition-all">Ver todos</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {inventory.slice(0, 4).map((item: any) => (
                    <div key={item.slug} className="group p-6 rounded-[2rem] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${item.stock < 5 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                          {item.stock < 5 ? 'Crítico' : 'Saludable'}
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">{item.name}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold text-gray-400">
                           <span>Stock Actual</span>
                           <span className={item.stock < 5 ? 'text-red-500' : 'text-gray-900'}>{item.stock} / 20</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.stock / 20) * 100}%` }}
                            className={`h-full rounded-full ${item.stock < 5 ? 'bg-red-400' : 'bg-primary'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Real Table of Orders */}
              <section className="lg:col-span-3 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
                 <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-serif italic text-gray-900">Historial de Ventas</h2>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Transacciones procesadas en tiempo real</p>
                    </div>
                    <div className="flex gap-4">
                       <button className="px-5 py-2.5 bg-gray-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all">Exportar .CSV</button>
                    </div>
                 </div>
                 <div className="overflow-x-auto px-6 pb-10">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-50">
                             <th className="px-8 py-6 font-bold">Resumen de Orden</th>
                             <th className="px-8 py-6 font-bold">Cliente / Email</th>
                             <th className="px-8 py-6 font-bold">Canal</th>
                             <th className="px-8 py-6 font-bold">Total Final</th>
                             <th className="px-8 py-6 font-bold">Estado</th>
                             <th className="px-8 py-6 font-bold text-right">Detalle</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {orders.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-8 py-20 text-center text-gray-300 italic">No hay ventas registradas aún.</td>
                            </tr>
                          ) : orders.map((order: any) => (
                            <tr key={order.id} className="group hover:bg-gray-50/50 transition-all">
                               <td className="px-8 py-6">
                                  <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">{order.id}</p>
                                  <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter">Realizada el {new Date(order.date).toLocaleDateString('es-CL')}</p>
                               </td>
                               <td className="px-8 py-6">
                                  <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                                  <p className="text-[10px] text-gray-400">{order.email}</p>
                               </td>
                               <td className="px-8 py-6">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                                    order.channel === 'Web' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
                                  }`}>
                                    {order.channel || 'E-Commerce'}
                                  </span>
                               </td>
                               <td className="px-8 py-6">
                                  <p className="text-base font-serif italic text-gray-900">${(order.total || 0).toLocaleString('es-CL')}</p>
                               </td>
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{order.status}</span>
                                  </div>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <button className="p-3 bg-gray-50 text-gray-300 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                                     <ArrowUpRight className="w-4 h-4" />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Manual Sale SlideOver */}
      <AnimatePresence>
        {isRegisteringSale && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsRegisteringSale(false)}
               className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 35, stiffness: 350 }}
              className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col pt-12"
            >
              <div className="px-12 flex justify-between items-center mb-12">
                 <div>
                   <h2 className="text-4xl font-serif italic text-gray-900 leading-none">Venta Manual</h2>
                   <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mt-4">Punto de Venta Omnicanal</p>
                 </div>
                 <button 
                  onClick={() => setIsRegisteringSale(false)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto px-12 pb-12 space-y-12 custom-scrollbar">
                
                {/* Channel Selector */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Canal de Originación</label>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { id: 'WhatsApp', icon: MessageCircle, label: 'WhatsApp' },
                      { id: 'Instagram', icon: Instagram, label: 'Instagram' },
                      { id: 'Manual', icon: UserIcon, label: 'Presencial' },
                      { id: 'Web', icon: Globe, label: 'E-Commerce' },
                    ].map((item) => (
                       <button 
                        key={item.id}
                        className="flex flex-col items-center justify-center p-6 rounded-3xl border border-gray-100 hover:border-primary group transition-all"
                       >
                         <item.icon className="w-6 h-6 text-gray-300 group-hover:text-primary mb-3" />
                         <span className="text-[9px] uppercase font-bold text-gray-400 group-hover:text-primary">{item.label}</span>
                       </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-8">
                   <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Identificación Cliente</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="Ej: Marcela Benavides" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Selección de Producto</label>
                      <div className="relative">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                        <input type="text" className="w-full bg-gray-50 border-none rounded-3xl pl-16 pr-8 py-5 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="Buscar en el catálogo..." />
                      </div>
                    </div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Monto Final</label>
                      <div className="relative">
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 font-bold">$</span>
                        <input type="number" className="w-full bg-gray-50 border-none rounded-3xl pl-12 pr-8 py-5 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="0" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Estado de Pago</label>
                      <select className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 text-sm font-medium focus:ring-2 focus:ring-primary/20 text-gray-400">
                        <option>Completado</option>
                        <option>Pendiente</option>
                        <option>Anticipo</option>
                      </select>
                    </div>
                  </div>
                </div>
  
                <div className="p-12 border-t border-gray-50 flex gap-6 mt-auto">
                  <button 
                    onClick={() => setIsRegisteringSale(false)}
                    className="flex-1 px-8 py-5 rounded-full border border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-gray-800 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => setIsRegisteringSale(false)}
                    className="flex-[2] bg-primary text-white px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl shadow-primary/30 hover:brightness-110 transition-all"
                  >
                    Confirmar Registro
                  </button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default AdminDashboard;

