import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import SaaSHero from "../components/SaaSHero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { 
  BarChart3, 
  Heart, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Users 
} from "lucide-react";

const AdminLanding = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FDFCFB] font-sans overflow-x-hidden">
        <Header className="fixed top-0 inset-x-0" transparent={true} />
        
        <SaaSHero />

        {/* Feature Grid: Three Pillars */}
        <section id="soluciones" className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-24 space-y-4">
                 <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-primary-custom/40">Ecosistema Operacional</h4>
                 <h2 className="text-4xl md:text-6xl font-serif italic text-gray-950 tracking-tighter">Tres pilares de crecimiento</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                 {[
                   { icon: BarChart3, title: "Analytics de Autor", desc: "IA entrenada para predecir mermas y picos de demanda según el calendario floral global." },
                   { icon: Heart, title: "Fidelidad Emocional", desc: "CRM inteligente que humaniza tu base de datos mediante recordatorios de hitos sentimentales." },
                   { icon: Truck, title: "Logística Inteligente", desc: "Control total de flota con seguimiento en tiempo real y optimización de rutas frágiles." }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group space-y-6 p-8 rounded-[2.5rem] hover:bg-primary-custom/5 transition-all duration-500"
                   >
                      <div className="w-14 h-14 bg-primary-custom/5 group-hover:bg-primary-custom/10 rounded-2xl flex items-center justify-center text-primary-custom transition-colors">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-serif italic text-gray-950">{item.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed">
                         {item.desc}
                      </p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- SECTION: SaaS Showcase / Detail --- */}
        <section className="py-32 bg-[#FDFCFB]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(88,10,45,0.15)] bg-primary-custom/10 p-1">
                <div className="w-full h-full bg-white rounded-[3.8rem] overflow-hidden flex items-center justify-center p-10">
                   {/* Mock UI Composition */}
                   <div className="w-full space-y-8">
                      <div className="h-4 w-1/3 bg-gray-100 rounded-full" />
                      <div className="grid grid-cols-2 gap-4">
                         <div className="aspect-square bg-primary-custom/5 rounded-3xl flex items-center justify-center">
                            <TrendingUp className="text-primary-custom w-10 h-10" />
                         </div>
                         <div className="aspect-square bg-secondary-pink/10 rounded-3xl flex items-center justify-center">
                            <Users className="text-primary-custom w-10 h-10" />
                         </div>
                      </div>
                      <div className="h-32 bg-gray-50 rounded-3xl" />
                      <div className="flex gap-4">
                         <div className="h-10 flex-1 bg-gray-50 rounded-full" />
                         <div className="h-10 w-20 bg-primary-custom/10 rounded-full" />
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary-custom text-white p-14 rounded-[3.5rem] shadow-2xl hidden md:block max-w-[280px]">
                <p className="text-3xl font-serif italic leading-tight">"Flora Admin elevó mi ticket promedio en un 34% en 3 meses."</p>
                <div className="h-px w-20 bg-white/30 my-6" />
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-black">Valentina R. • Boutique Curator</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-primary-custom">Gestión de Élite</h4>
                <h2 className="text-5xl md:text-7xl font-serif italic text-gray-950 leading-[0.95] tracking-tighter">
                  Tecnología que <br /> se siente humana
                </h2>
              </div>
              <div className="space-y-6 text-lg md:text-xl text-gray-500 font-light italic leading-relaxed">
                <p>
                  No construimos solo software; construimos la infraestructura que permite a los artistas florales centrarse en su arte mientras nosotros dominamos la complejidad operativa.
                </p>
                <p>
                  Nuestra interfaz premium reduce la fricción en el ingreso de pedidos y automatiza el seguimiento de última milla, garantizando una experiencia de marca consistente desde el primer clic hasta la entrega.
                </p>
              </div>
              <div className="flex flex-wrap gap-12 pt-10 border-t border-gray-100">
                <div className="space-y-1">
                  <h5 className="text-3xl md:text-4xl font-black text-primary-custom tracking-tighter">Cloud-Native</h5>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Acceso Global 24/7</p>
                </div>
                <div className="space-y-1">
                  <h5 className="text-3xl md:text-4xl font-black text-primary-custom tracking-tighter">Zero-Waste</h5>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">IA de Merma Cero</p>
                </div>
              </div>
              <Button size="lg" className="h-16 rounded-full px-12 bg-primary-custom text-white font-bold uppercase tracking-widest shadow-xl">
                 Leer Whitepaper
              </Button>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION: SaaS Stats / Social Proof --- */}
        <section id="clientes" className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-6 text-center space-y-24">
              <div className="space-y-4">
                 <h4 className="text-[10px] uppercase tracking-[0.8em] font-black text-gray-300">Escala Global</h4>
                 <h2 className="text-4xl md:text-6xl font-serif italic text-gray-950 tracking-tighter">Confiado por florerías de autor</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                 {[
                   { label: "Florerías Activas", value: "850+" },
                   { label: "Órdenes Procesadas", value: "1.2M" },
                   { label: "Ahorro en Merma", value: "22%" },
                   { label: "NPS de Clientes", value: "98" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="space-y-2"
                   >
                      <h3 className="text-5xl md:text-7xl font-serif text-primary-custom tracking-tighter">{stat.value}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">{stat.label}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- SECTION: PRICING --- */}
        <section id="precios" className="py-40 bg-[#FDFCFB]">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-24 space-y-6">
                 <h4 className="text-[10px] uppercase tracking-[0.8em] font-black text-primary-custom/40">Inversión Especializada</h4>
                 <h2 className="text-5xl md:text-7xl font-serif italic text-gray-950 tracking-tighter">Planes que crecen contigo</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {[
                   { 
                     name: "Boutique", 
                     price: "49", 
                     desc: "Para florerías emergentes con foco en diseño de autor.",
                     features: ["Hasta 300 órdenes/mes", "Analytics Básico", "CRM Emocional I", "Soporte vía Chat"]
                   },
                   { 
                     name: "Premium", 
                     price: "99", 
                     desc: "El estándar para florerías de lujo con múltiples puntos de venta.",
                     popular: true,
                     features: ["Órdenes Ilimitadas", "Predicción de Merma IA", "Logística Multi-Flota", "API Acceso Directo"]
                   },
                   { 
                     name: "Enterprise", 
                     price: "Custom", 
                     desc: "Para cadenas regionales y operaciones de exportación masiva.",
                     features: ["White-label App", "Account Manager", "SLA del 99.99%", "Integración SAP/ERP"]
                   }
                 ].map((plan, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className={`p-12 rounded-[3.5rem] border ${plan.popular ? 'bg-primary-custom text-white border-primary-custom shadow-2xl scale-105 z-10' : 'bg-white border-gray-100 text-gray-900 shadow-sm'}`}
                   >
                      <div className="space-y-2 mb-10">
                         {plan.popular && <span className="text-[8px] uppercase tracking-[0.3em] font-black bg-white/20 px-4 py-1.5 rounded-full">Sugerido por expertos</span>}
                         <h3 className="text-3xl font-serif italic">{plan.name}</h3>
                         <p className={`text-sm font-light ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>{plan.desc}</p>
                      </div>
                      <div className="mb-12">
                         <span className="text-5xl md:text-6xl font-serif tracking-tighter">
                            {plan.price !== "Custom" && "$"}
                            {plan.price}
                         </span>
                         {plan.price !== "Custom" && <span className="text-xs font-black tracking-widest opacity-60 ml-2">/MES</span>}
                      </div>
                      <ul className="space-y-6 mb-12 border-t border-current/10 pt-10">
                         {plan.features.map((f, fi) => (
                           <li key={fi} className="flex items-center gap-3 text-sm font-light tracking-wide italic">
                              <ShieldCheck className="w-4 h-4 opacity-40 shrink-0" />
                              {f}
                           </li>
                         ))}
                      </ul>
                      <Button className={`w-full h-16 rounded-full font-bold uppercase tracking-widest text-[10px] ${plan.popular ? 'bg-white text-primary-custom hover:opacity-90' : 'bg-primary-custom text-white hover:scale-105'}`}>
                         {plan.price === "Custom" ? "Contactar Ventas" : "Comenzar Trial"}
                      </Button>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- SECTION: Final CTA --- */}
        <section className="py-40 bg-primary-custom relative overflow-hidden">
           {/* Abstract Floral Element */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(239,206,218,0.1)_0%,transparent_70%)]" />
           
           <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
              <h2 className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter leading-[0.9]">Transforma tu operación <br /> floral hoy mismo.</h2>
              <p className="text-xl md:text-3xl text-secondary-pink/60 font-light italic max-w-2xl mx-auto">Únete a la nueva generación de negocios florales inteligentes.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                 <Button className="bg-white text-primary-custom px-12 h-20 rounded-full font-bold uppercase text-[12px] tracking-[0.4em] hover:scale-105 transition-all shadow-2xl">
                    Agendar Demo Personalizada
                 </Button>
                 <Button variant="ghost" className="text-white/60 hover:text-white uppercase tracking-widest text-[11px] font-black">
                    Ver Planes
                 </Button>
              </div>
           </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AdminLanding;
