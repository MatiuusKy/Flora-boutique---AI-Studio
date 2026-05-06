import { motion } from "motion/react";
import PageTransition from "../components/PageTransition";
import { User, Package, MapPin, CreditCard, Gift, ChevronRight } from "lucide-react";

const Dashboard = () => {
  // Mock data - In a real app, this comes from Supabase
  const userStats = {
    totalSpent: 185900,
    ordersCount: 4,
    lastPurchase: "12 Mar, 2024",
    loyaltyPoints: 185900,
    targetForReward: 250000, // Amount needed for 50% discount
  };

  const recentOrders = [
    { id: "#4582", date: "12 Mar, 2024", total: 45990, status: "Entregado", product: "Ramo Rosas Luxury" },
    { id: "#4410", date: "14 Feb, 2024", total: 62000, status: "Entregado", product: "Pack San Valentín" },
  ];

  const rewardProgress = (userStats.loyaltyPoints / userStats.targetForReward) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf8f9] pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="mb-12">
            <a 
              href="/" 
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 hover:text-primary transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Volver a la boutique
            </a>
            <h1 className="text-4xl md:text-5xl font-serif italic text-gray-900">Hola, Florencia</h1>
            <p className="text-gray-500 mt-2 font-light tracking-wide uppercase text-[10px]">Miembro Gold • Flora Club</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar Stats & Loyalty */}
            <div className="space-y-8">
              {/* Loyalty Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-primary/5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <Gift className="text-primary w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Tu Regalia</span>
                </div>
                <h3 className="text-xl font-serif italic mb-2">Próximo Beneficio</h3>
                <p className="text-sm text-gray-500 mb-6 font-light">Llevas ${userStats.totalSpent.toLocaleString('es-CL')}. Te faltan ${(userStats.targetForReward - userStats.totalSpent).toLocaleString('es-CL')} para tu <span className="font-bold">50% de descuento</span>.</p>
                
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${rewardProgress}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-[10px] text-gray-400">{Math.round(rewardProgress)}% Completado</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[1.5rem] border border-gray-50 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Compras</p>
                  <p className="text-2xl font-serif">{userStats.ordersCount}</p>
                </div>
                <div className="bg-blue-50/30 p-6 rounded-[1.5rem] border border-blue-100 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">Invertido</p>
                  <p className="text-2xl font-serif text-blue-900 italic">${(userStats.totalSpent / 1000).toFixed(0)}k</p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Recent Orders */}
              <section className="bg-white rounded-[2rem] border border-gray-50 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-xl font-serif flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    Últimos Pedidos
                  </h2>
                  <button className="text-[10px] uppercase tracking-widest text-primary font-bold">Ver todos</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer group">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800">{order.product}</p>
                        <div className="flex gap-4 text-[10px] text-gray-400 uppercase tracking-wider font-light">
                          <span>ID: {order.id}</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-serif">${order.total.toLocaleString('es-CL')}</p>
                          <p className="text-[9px] text-green-500 font-bold uppercase tracking-tighter">{order.status}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm">
                  <h3 className="text-sm font-serif italic mb-6 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Dirección de Entrega
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 font-light">
                    <p className="font-medium text-gray-900">Florencia González</p>
                    <p>Av. Apoquindo 4501, Of 1202</p>
                    <p>Las Condes, Santiago</p>
                    <button className="pt-4 text-[10px] text-primary font-bold uppercase tracking-widest">Editar Dirección</button>
                  </div>
                </div>

                {/* Billing */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm">
                  <h3 className="text-sm font-serif italic mb-6 flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    Detalles de Facturación
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 font-light">
                    <p className="font-medium text-gray-900">76.842.XXX-X</p>
                    <p>Factura Electrónica</p>
                    <p>Termina en **** 4582</p>
                    <button className="pt-4 text-[10px] text-primary font-bold uppercase tracking-widest">Método de Pago</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
