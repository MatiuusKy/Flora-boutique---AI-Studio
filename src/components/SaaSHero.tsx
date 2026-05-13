import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { 
  ArrowRight, 
  TrendingUp, 
  Truck, 
  BrainCircuit, 
  Users, 
  MessageCircle,
  Sparkles,
  BarChart3,
  Heart
} from "lucide-react";

const SaaSHero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#FDFCFB]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary-custom/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-secondary-pink/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(253,252,251,1)_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Side: Content */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-custom/5 border border-primary-custom/10 text-primary-custom text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3 h-3" />
              <span>Flora Admin 2.0 ya está aquí</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-gray-950 leading-[1.05] tracking-tighter">
              El sistema operativo <br /> 
              <span className="text-primary-custom">inteligente</span> para <br />
              florerías modernas.
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Centraliza pedidos, delivery, CRM emocional, automatizaciones e inteligencia operacional en una sola plataforma diseñada para el lujo y la eficiencia.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
          >
            <Button className="bg-primary-custom text-white px-10 h-16 rounded-full font-bold uppercase text-[11px] tracking-[0.4em] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(88,10,45,0.3)]">
              Solicitar Demo
            </Button>
            <Button variant="ghost" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-primary-custom transition-all">
              Explorar Plataforma
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>

          {/* Social Proof / Trusted by */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="pt-8 border-t border-gray-100 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 w-full mb-2">Empoderando florerías de élite en:</span>
            <div className="flex gap-8 items-center">
              <span className="font-serif italic text-xl">Chile</span>
              <span className="font-serif italic text-xl">México</span>
              <span className="font-serif italic text-xl">Colombia</span>
              <span className="font-serif italic text-xl">España</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition */}
        <div className="relative h-[600px] lg:h-[700px] w-full mt-10 lg:mt-0">
          {/* Main "Dashboard" Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-[1.4] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
          >
             {/* Mock Dashboard UI */}
             <div className="w-full h-full flex flex-col">
                <div className="h-14 border-b border-gray-50 flex items-center px-8 justify-between">
                   <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-gray-200" />
                     <div className="w-2 h-2 rounded-full bg-gray-200" />
                     <div className="w-2 h-2 rounded-full bg-gray-200" />
                   </div>
                   <div className="h-6 w-32 bg-gray-50 rounded-full" />
                </div>
                <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                   <div className="col-span-2 space-y-6">
                      <div className="h-32 w-full bg-primary-custom/5 rounded-3xl" />
                      <div className="h-48 w-full bg-gray-50 rounded-3xl" />
                   </div>
                   <div className="space-y-6">
                      <div className="h-40 w-full bg-secondary-pink/10 rounded-3xl" />
                      <div className="h-40 w-full bg-gray-50 rounded-3xl" />
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Floating Insights */}
          
          {/* Revenue Insight */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[5%] z-20 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 flex items-center gap-4 group hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
               <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">+18% Revenue</p>
              <p className="text-lg font-serif italic text-gray-950 leading-none">Crecimiento IA</p>
            </div>
          </motion.div>

          {/* Logistics Insight */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[20%] right-[-5%] z-20 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 flex items-center gap-4 group hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 bg-primary-custom/10 rounded-2xl flex items-center justify-center text-primary-custom">
               <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">12 Deliveries</p>
              <p className="text-lg font-serif italic text-gray-950 leading-none">Rutas Activas</p>
            </div>
          </motion.div>

          {/* AI Forecast Ready */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] left-[-5%] z-20 bg-primary-custom p-4 px-6 rounded-full shadow-2xl flex items-center gap-3 group hover:scale-110 transition-transform cursor-pointer"
          >
            <BrainCircuit className="w-5 h-5 text-secondary-pink" />
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">AI Forecast Ready</span>
          </motion.div>

          {/* CRM Emotional Alert */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[5%] z-20 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-50 flex flex-col gap-4 max-w-[200px]"
          >
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-secondary-pink/30 flex items-center justify-center text-primary-custom">
                  <Heart className="w-4 h-4 fill-current" />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CRM Alert</span>
            </div>
            <p className="text-sm font-serif italic text-gray-900 leading-tight">Recordatorio: Aniversario Sr. Miller</p>
            <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
               <div className="w-3/4 h-full bg-primary-custom" />
            </div>
          </motion.div>

          {/* Secondary Decorative Elements (Floral abstraction) */}
          <div className="absolute -top-10 right-0 w-32 h-32 opacity-20 pointer-events-none">
             <div className="w-full h-full border-2 border-primary-custom/20 rounded-full animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaaSHero;
