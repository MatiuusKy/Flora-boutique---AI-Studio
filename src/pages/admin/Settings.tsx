import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'motion/react';
import { 
  Building2, 
  Truck, 
  Zap, 
  Share2, 
  Users, 
  Palette, 
  Bell, 
  CreditCard, 
  ShieldCheck,
  ChevronRight,
  Flower,
  Globe,
  Smartphone,
  Lock,
  ExternalLink
} from 'lucide-react';

const SettingsCategory = ({ title, desc, icon: Icon, items }: any) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-secondary-pink/10 rounded-2xl text-primary-custom">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-xl font-serif italic text-gray-900 leading-none">{title}</h3>
        <p className="text-xs text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item: any, i: number) => (
        <button 
          key={i} 
          className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between text-left hover:border-primary-custom/20 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
             <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary-custom/5 transition-colors">
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary-custom" />
             </div>
             <div>
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.status || 'Configurar'}</p>
             </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-primary-custom transition-all" />
        </button>
      ))}
    </div>
  </div>
);

export default function Settings() {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-16 pb-20">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-serif italic text-gray-900 tracking-tighter">Centro de Control</h1>
          <p className="text-sm text-gray-400 font-medium">Orquesta cada detalle de tu operación floral y digitalización SaaS.</p>
        </div>

        {/* Business Settings */}
        <SettingsCategory 
          title="Negocio & Identidad"
          desc="Gestión de marca, sucursales y presencia digital."
          icon={Building2}
          items={[
            { name: 'Branding & Perfil', icon: Palette, status: 'Flora Atelier Premium' },
            { name: 'Sucursales & Talleres', icon: Globe, status: '2 Activas' },
            { name: 'Catálogo de Especies', icon: Flower, status: '124 Items' },
            { name: 'Horarios de Operación', icon: Bell, status: 'Mon-Sun' },
          ]}
        />

        {/* Delivery & Logistics */}
        <SettingsCategory 
          title="Logística & Cobertura"
          desc="Costos por comuna, flota y tiempos de entrega."
          icon={Truck}
          items={[
            { name: 'Zonas de Despacho', icon: Globe, status: '12 Comunas' },
            { name: 'Gestión de Repartidores', icon: Users, status: '4 Online' },
            { name: 'Tarifas Dinámicas', icon: CreditCard, status: 'Configurado' },
            { name: 'Tracking Experiencia', icon: Smartphone, status: 'White-label' },
          ]}
        />

        {/* Automations & IA */}
        <SettingsCategory 
          title="Inteligencia & Workflow"
          desc="Motores de automatización y sensibilidad de IA."
          icon={Zap}
          items={[
            { name: 'Recordatorios Emocionales', icon: Bell, status: 'IA Activa' },
            { name: 'Flow de WhatsApp', icon: Smartphone, status: 'Integrado' },
            { name: 'IA Sensibilidad', icon: Zap, status: 'Moderado' },
            { name: 'Reglas de Producción', icon: Lock, status: 'Custom' },
          ]}
        />

        {/* Integrations & Security */}
        <SettingsCategory 
          title="Ecosistema & Seguridad"
          desc="Conexiones con Meta, Shopify y pasarelas de pago."
          icon={Share2}
          items={[
            { name: 'Meta Ads & Instagram', icon: Share2, status: 'Conectado' },
            { name: 'Pasarelas de Pago', icon: CreditCard, status: 'MercadoPago' },
            { name: 'Usuarios & Roles', icon: Users, status: '6 Usuarios' },
            { name: 'Seguridad & API', icon: ShieldCheck, status: 'Enterprise' },
          ]}
        />

        {/* Danger Zone / Plan Info */}
        <div className="p-8 bg-primary-custom/5 border border-primary-custom/10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                 <div className="h-2 w-2 bg-primary-custom rounded-full animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary-custom">Plan Actual: Elixir Master</span>
              </div>
              <h3 className="text-xl font-serif italic text-gray-900">Estás operando con el OS Floral más avanzado.</h3>
              <p className="text-xs text-gray-400 font-medium">Siguiente facturación: 1 de Junio, 2026</p>
           </div>
           <button className="px-8 h-12 bg-white text-gray-900 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
              Gestionar Suscripción <ExternalLink className="w-3 h-3" />
           </button>
        </div>
      </div>
    </AdminLayout>
  );
}
