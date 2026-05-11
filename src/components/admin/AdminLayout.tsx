import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Truck, 
  Calendar, 
  MessageSquare, 
  Settings, 
  ChevronRight,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  PieChart,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'IA Center', href: '/admin/ai-center', icon: Sparkles },
  { name: 'CRM Emocional', href: '/admin/crm', icon: Target },
  { name: 'Producción', href: '/admin/produccion', icon: Package },
  { name: 'Logística', href: '/admin/logistica', icon: Truck },
  { name: 'Calendario', href: '/admin/calendario', icon: Calendar },
  { name: 'Inbox', href: '/admin/inbox', icon: MessageSquare },
  { name: 'Analytics', href: '/admin/analytics', icon: PieChart },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <Link to="/admin" className="text-xl font-serif font-bold text-primary-custom tracking-tighter">
              FLORA<span className="font-light italic">Admin</span>
            </Link>
          ) : (
            <div className="w-8 h-8 bg-primary-custom rounded-lg mx-auto" />
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary-custom/5 text-primary-custom' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <span className="text-[13px] font-medium">{item.name}</span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1 h-4 bg-primary-custom rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className={`p-4 rounded-2xl bg-secondary-pink/10 space-y-3 ${!isSidebarOpen && 'hidden'}`}>
            <div className="flex items-center gap-2 text-primary-custom">
               <Sparkles className="w-4 h-4" />
               <span className="text-[11px] font-black uppercase tracking-widest">Plan Elixir</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              Tu florería está operando al 85% de capacidad.
            </p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full mt-4 flex items-center justify-center p-2 text-gray-400 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                type="text" 
                placeholder="Buscar pedidos, clientes o flores..." 
                className="w-full pl-10 pr-4 h-10 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-primary-custom/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-custom rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-gray-900">Flora Atelier</p>
                <p className="text-[10px] text-gray-400 font-medium">SANTIAGO, CL</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary-pink border border-primary-custom/10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
