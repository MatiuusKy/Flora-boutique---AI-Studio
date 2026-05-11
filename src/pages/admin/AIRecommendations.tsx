import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Truck, 
  ChevronRight,
  BrainCircuit,
  ArrowUpRight,
  Clock,
  Target,
  FlaskConical,
  Wand2
} from 'lucide-react';

const RecommendationCard = ({ type, title, description, impact, action, status = 'new' }: any) => {
  const getColors = () => {
    switch (type) {
      case 'opportunity': return { bg: 'bg-green-50', text: 'text-green-600', icon: TrendingUp };
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-600', icon: AlertTriangle };
      case 'marketing': return { bg: 'bg-primary-custom/5', text: 'text-primary-custom', icon: Target };
      default: return { bg: 'bg-blue-50', text: 'text-blue-600', icon: Zap };
    }
  };

  const colors = getColors();
  const Icon = colors.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-primary-custom/20 transition-all group overflow-hidden relative"
    >
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text}`}>
            <Icon className="w-6 h-6" />
          </div>
          {status === 'new' && (
            <span className="px-3 py-1 bg-primary-custom text-white text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse">
              Nuevo Insight
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-serif italic text-gray-900 leading-tight">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed italic">{description}</p>
        </div>

        <div className="flex items-center gap-4 py-4 border-y border-gray-50">
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Impacto Estimado</p>
            <p className="text-lg font-serif italic text-gray-900">{impact}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Confianza IA</p>
            <p className="text-lg font-serif italic text-primary-custom">98%</p>
          </div>
        </div>

        <button className="w-full h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary-custom transition-all group-hover:scale-[1.02] active:scale-95">
          {action} <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Decorative background element */}
      <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${colors.bg}`} />
    </motion.div>
  );
};

export default function AIRecommendations() {
  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-custom/10 text-primary-custom rounded-full">
              <BrainCircuit className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Neural Engine 4.0 Active</span>
            </div>
            <h1 className="text-5xl font-serif italic text-gray-900 tracking-tighter">AI Recommendations Center</h1>
            <p className="text-sm text-gray-400 font-medium max-w-xl">
              Tu asistente predictivo analiza billones de puntos de datos: historial de ventas, clima en Santiago, bodas agendadas y sentimientos en redes sociales.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary-pink/20 flex items-center justify-center text-primary-custom">
                  <Sparkles className="w-4 h-4" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Insights Hoy</p>
              <p className="text-xl font-serif italic text-gray-900">+4 Recomendaciones</p>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {['Todos', 'Logística', 'Inventario', 'Marketing', 'Producción'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              i === 0 ? 'bg-primary-custom text-white' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary-custom/20'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecommendationCard 
            type="opportunity"
            title="Alta Demanda: Rosas de Exportación"
            description="Se proyecta un incremento del 42% en ventas de rosas para este fin de semana. Motivo: Acumulación de 3 bodas en Vitacura y Providencia."
            impact="+ $1.2M Ingreso Est."
            action="Aumentar Stock Rosas"
          />
          
          <RecommendationCard 
            type="warning"
            title="Alerta de Merma: Tulipanes Lux"
            description="La humedad relativa en Santiago bajará drásticamente. Detectamos un riesgo de merma del 15% en el stock actual de tulipanes si no se ajusta la temperatura."
            impact="- $450k Ahorro Potencial"
            action="Ajustar Climatización"
          />

          <RecommendationCard 
            type="marketing"
            title="Campaña Aniversario Automática"
            description="12 clientes recurrentes cumplen aniversario este mes. No han tenido interacción en 60 días. Es el momento perfecto para el Cupón Elixir."
            impact="+25% Tasa Conversión"
            action="Activar Campaña"
          />

          <RecommendationCard 
            type="delivery"
            title="Optimización de Rutas: RM Oriente"
            description="Las nuevas obras en Av. Las Condes están retrasando entregas en 15 min. Hemos rediseñado las rutas de mañana para usar vías alternativas."
            impact="98% On-Time Delivery"
            action="Aplicar Nuevas Rutas"
          />
        </div>

        {/* Labs / Experimental Section */}
        <div className="p-10 bg-secondary-pink/5 rounded-[3rem] border border-secondary-pink/10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
            <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-primary-custom mx-auto lg:mx-0">
               <FlaskConical className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-serif italic text-gray-900 leading-tight">FloraLabs: Creative Suite</h2>
              <p className="text-sm text-gray-400 italic">Próximamente: Diseña ramos únicos pidiéndole a la IA que interprete el sentimiento del cliente.</p>
            </div>
            <button className="px-8 h-12 bg-primary-custom text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-custom/20">Unirse a la Beta</button>
          </div>
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3 p-4 text-center hover:shadow-lg transition-all cursor-pointer">
                <div className="p-2 bg-gray-50 rounded-xl">
                  <Wand2 className="w-4 h-4 text-gray-300" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Generador de Lirios Pro</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
