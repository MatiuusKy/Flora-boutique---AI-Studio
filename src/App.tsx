/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Analytics from "./components/Analytics";
import PageTransition from "./components/PageTransition";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./components/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AIRecommendations from "./pages/admin/AIRecommendations";
import Production from "./pages/admin/Production";
import CRM from "./pages/admin/CRM";
import Logistics from "./pages/admin/Logistics";
import Calendar from "./pages/admin/Calendar";
import Inbox from "./pages/admin/Inbox";
import ProductManagement from "./pages/admin/ProductManagement";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Catalogo from "./pages/Catalogo";
import Delivery from "./pages/Delivery";
import Nosotros from "./pages/Nosotros";
import { CartProvider, CartContext } from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SaaSHero from "./components/SaaSHero";
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useContext } from 'react';
import { 
  ArrowRight, 
  Heart, 
  Truck, 
  MessageCircle,
  Sparkles,
  BarChart3,
  Search,
  Users,
  ShieldCheck,
  TrendingUp,
  BrainCircuit
} from "lucide-react";
import { products } from "./data/products";
import { cn } from "./lib/utils";

function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="fixed top-0 inset-x-0" />
      {children}
      <Footer />
    </>
  );
}

import AdminLanding from "./pages/AdminLanding";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Analytics />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/administrador" element={<AdminLanding />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil" element={<HeaderWrapper><Dashboard /></HeaderWrapper>} />
            
            {/* Flora Admin SaaS Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/crm" element={<CRM />} />
            <Route path="/admin/produccion" element={<Production />} />
            <Route path="/admin/logistica" element={<Logistics />} />
            <Route path="/admin/calendario" element={<Calendar />} />
            <Route path="/admin/inbox" element={<Inbox />} />
            <Route path="/admin/ai-center" element={<AIRecommendations />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/productos" element={<ProductManagement />} />
            
            <Route path="/checkout" element={<HeaderWrapper><Checkout /></HeaderWrapper>} />
            <Route path="/success" element={<HeaderWrapper><Success /></HeaderWrapper>} />
            <Route path="/producto/:slug" element={<HeaderWrapper><ProductDetail /></HeaderWrapper>} />
            <Route path="/catalogo" element={<HeaderWrapper><Catalogo /></HeaderWrapper>} />
            <Route path="/delivery" element={<HeaderWrapper><Delivery /></HeaderWrapper>} />
            <Route path="/nosotros" element={<HeaderWrapper><Nosotros /></HeaderWrapper>} />
            <Route path="/contacto" element={<HeaderWrapper><Contacto /></HeaderWrapper>} />
            <Route path="*" element={<HeaderWrapper><NotFound /></HeaderWrapper>} />
          </Routes>
        </AnimatePresence>
      </CartProvider>
    </BrowserRouter>
  );
}

function LoginPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f9] px-6 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48 blur-3xl" />
        
        <div className="z-10 w-full max-w-md">
          <div className="text-center mb-10">
             <a href="/" className="text-2xl font-serif font-bold text-primary tracking-tighter inline-block">
              FLORA<span className="font-light italic text-primary/40 uppercase tracking-widest text-xs ml-2">Admin</span>
            </a>
          </div>
          <Auth />
          <div className="mt-8 text-center">
            <a href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">← Volver al sitio</a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

import BoutiqueHero from "./components/BoutiqueHero";
import { GridBeam } from "./components/ui/grid-beam";

import { useNavigate } from "react-router-dom";

function Home() {
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
        <Header className="fixed top-0 inset-x-0" transparent={true} lightText={true} />
        
        <BoutiqueHero />

        {/* Grid Beam Feature Section */}
        <GridBeam className="py-32 md:py-48">
           <div className="max-w-7xl mx-auto px-6 text-center space-y-24">
              <div className="space-y-6">
                 <h4 className="text-[10px] md:text-xs uppercase tracking-[0.8em] font-black text-primary-custom/60">El Ritual Flora</h4>
                 <h2 className="text-5xl md:text-8xl font-serif italic text-gray-950 tracking-tighter leading-none">Donde el diseño encuentra <br className="hidden md:block" /> la naturaleza.</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
                 {[
                   { title: "Curaduría", desc: "Selección rigurosa de tallos bajo estándares de alta perfumería." },
                   { title: "Atelier", desc: "Diseños personalizados creados por maestros floristas internacionales." },
                   { title: "Entrega", desc: "Logística propia que garantiza la frescura absoluta en cada pétalo." }
                 ].map((step, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className="space-y-6 md:space-y-8"
                   >
                      <div className="text-6xl md:text-7xl font-serif italic text-primary-custom/5 font-black leading-none">0{i+1}</div>
                      <h3 className="text-2xl md:text-3xl font-serif italic text-gray-950">{step.title}</h3>
                      <p className="text-gray-500 font-light italic leading-relaxed text-sm md:text-base px-4">{step.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </GridBeam>

        {/* Catalog Section */}
        <section id="catalogo" className="py-32 md:py-48 bg-white">
           <div className="max-w-7xl mx-auto px-6 space-y-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                 <div className="space-y-6">
                    <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-secondary-sage">Colección Boutique</h4>
                    <h2 className="text-5xl md:text-8xl font-serif italic text-gray-950 tracking-tighter leading-none">Piezas de Autor</h2>
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {["Todos", "Rosas", "Mix", "Especiales"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-6 md:px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                          selectedCategory === cat ? "bg-primary-custom text-white shadow-xl scale-105" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                 {filteredProducts.map((product, i) => (
                   <motion.div
                     key={product.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: (i % 4) * 0.1 }}
                     className="group cursor-pointer"
                     onClick={() => navigate(`/producto/${product.slug}`)}
                   >
                      <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <Button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                addToCart({
                                  ...product,
                                  price: product.basePrice
                                }); 
                              }}
                              className="bg-white text-black rounded-full px-8 h-12 text-[10px] uppercase font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary-custom hover:text-white border-0"
                            >
                              Agregar al Carro
                            </Button>
                         </div>
                         <button 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(Number(product.id)); }}
                            className={cn(
                               "absolute top-8 right-8 p-4 rounded-full backdrop-blur-xl transition-all z-10",
                               favorites.includes(Number(product.id)) ? "bg-primary-custom text-white" : "bg-white/80 text-gray-400"
                            )}
                         >
                            <Heart className={cn("w-4 h-4", favorites.includes(Number(product.id)) && "fill-current")} />
                         </button>
                      </div>
                      <div className="px-4 space-y-2">
                         <h3 className="text-2xl font-serif italic text-gray-950 group-hover:text-primary-custom transition-colors">{product.name}</h3>
                         <div className="flex justify-between items-center">
                            <p className="text-xl font-serif tracking-tighter">${product.basePrice.toLocaleString('es-CL')}</p>
                            <span className="text-[10px] uppercase tracking-widest font-black text-primary-custom/0 group-hover:text-primary-custom/100 transition-all">Ver Detalle →</span>
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 md:py-32 bg-[#F5F4F0]">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.8em] font-black text-[#6B0F2B]">RESEÑAS REALES</h4>
              <h2 className="text-4xl md:text-6xl font-serif italic text-gray-950 tracking-tighter">Flores que hablan por sí solas</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                { name: "Valentina M.", text: "Llegaron puntual y hermosos. El arreglo superó todas mis expectativas, mis amigas preguntaron dónde las compré.", date: "hace 2 semanas" },
                { name: "Rodrigo A.", text: "Pedí para el cumpleaños de mi mamá con 2 horas de anticipación y llegaron perfectas. Servicio increíble.", date: "hace 1 mes" },
                { name: "Camila F.", text: "Las rosas duraron más de 10 días. Calidad premium de verdad, no es marketing.", date: "hace 2 meses" },
                { name: "Ignacio T.", text: "Tercer pedido que hago. Siempre perfectas, siempre a tiempo. Ya son mis flores de cabecera.", date: "hace 3 meses" }
              ].map((review, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm space-y-6"
                >
                  <div className="flex text-[#6B0F2B] gap-1">
                    {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                  </div>
                  <p className="text-lg md:text-xl font-serif italic text-gray-700 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-bold text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership / Club Section */}
        <section id="club" className="py-32 md:py-60 bg-[#121212] text-white overflow-hidden relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,10,45,0.2)_0%,transparent_70%)]" />
           <div className="max-w-5xl mx-auto px-6 text-center space-y-16 relative z-10">
              <h4 className="text-[10px] md:text-xs uppercase tracking-[1em] font-black text-primary-custom">Elixir Club</h4>
              <h2 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.8] mb-8">Sentimientos sin <br className="hidden md:block" /> interrupciones.</h2>
              <p className="text-lg md:text-3xl text-gray-400 font-light italic max-w-2xl mx-auto leading-relaxed">Suscripciones personalizadas para fechas memorables. Inmortaliza cada aniversario con el sello Flora.</p>
              <div className="flex justify-center pt-8">
                 <Button className="bg-white text-black px-12 md:px-20 h-20 md:h-24 rounded-full font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] hover:scale-105 transition-all shadow-3xl group">
                    Unirse al Club
                    <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 </Button>
              </div>
           </div>
        </section>

        {/* CTA Cuéntanos */}
        <section className="py-24 bg-white text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif italic text-gray-950 tracking-tighter">¿Buscas algo especial?</h2>
            <p className="text-lg text-gray-500 font-light max-w-xl mx-auto">
              Cuéntanos tu idea o envíanos una foto de referencia y lo diseñamos especialmente para ti.
            </p>
            <a 
              href="https://wa.me/56939276233" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#6B0F2B] text-white px-8 h-14 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-transform mt-4"
            >
              <IconBrandWhatsapp className="w-5 h-5" />
              COTIZAR POR WHATSAPP
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

import { Clock, MapPin, Send } from "lucide-react";
import { IconBrandInstagram, IconBrandWhatsapp, IconBuilding, IconMapPin, IconClock, IconSend, IconShoppingBag, IconScissors, IconGift } from "@tabler/icons-react";

function Contacto() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-[#F5F4F0] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h4 className="text-[10px] uppercase tracking-[0.8em] font-black text-[#6B0F2B]">ESTAMOS AQUI PARA TI</h4>
            <h1 className="text-5xl md:text-7xl font-serif italic text-gray-950 tracking-tighter">Hablemos</h1>
            <p className="text-gray-500 font-light italic text-lg">Respondemos en minutos. Escríbenos por WhatsApp o déjanos tu mensaje.</p>
          </div>

          <div className="bg-[#6B0F2B] text-white rounded-[2.5rem] p-10 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <IconBrandWhatsapp stroke={1.5} className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic mb-2">WhatsApp — Canal principal</h3>
                <a href="https://wa.me/56939276233" target="_blank" rel="noreferrer" className="text-3xl md:text-4xl font-bold tracking-tighter hover:text-white/80 transition-colors block mb-2">
                  +56 9 3927 6233
                </a>
                <p className="text-sm font-light text-white/70">Lunes a viernes 9:00–20:00 · Sábados 9:00–18:00</p>
              </div>
            </div>
            <a href="https://wa.me/56939276233" target="_blank" rel="noreferrer" className="bg-white text-[#6B0F2B] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform whitespace-nowrap z-10 relative">
               Escribir ahora
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm">
              <h3 className="text-3xl font-serif italic text-[#6B0F2B] mb-8">Déjanos un mensaje</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Nombre completo" className="w-full bg-[#F5F4F0] border-none rounded-xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none transition-all" required />
                </div>
                <div>
                  <input type="email" placeholder="Email" className="w-full bg-[#F5F4F0] border-none rounded-xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none transition-all" required />
                </div>
                <div className="flex gap-4">
                  <div className="w-24 bg-[#F5F4F0] rounded-xl px-4 py-4 text-gray-500 flex items-center justify-center font-medium">+56</div>
                  <input type="tel" placeholder="Teléfono" className="w-full bg-[#F5F4F0] border-none rounded-xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none transition-all" />
                </div>
                <div>
                  <select defaultValue="" className="w-full bg-[#F5F4F0] border-none rounded-xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Selecciona un motivo...</option>
                    <option value="cumpleanos">Cumpleaños</option>
                    <option value="aniversario">Aniversario</option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="condolencias">Condolencias</option>
                    <option value="empresa">Empresa</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <textarea placeholder="Cuéntanos qué necesitas..." rows={4} className="w-full bg-[#F5F4F0] border-none rounded-xl px-6 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none transition-all resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full bg-[#6B0F2B] text-white py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:brightness-110 transition-all flex items-center justify-center gap-3">
                  Enviar mensaje <IconSend stroke={1.5} className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-gray-400 italic">También puedes escribirnos a contacto.florabtq@gmail.com</p>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm flex items-start gap-6">
                <div className="w-14 h-14 bg-[#6B0F2B]/5 text-[#6B0F2B] rounded-2xl flex items-center justify-center shrink-0">
                  <IconMapPin stroke={1.5} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-serif italic text-gray-950 mb-2">Visítanos</h4>
                  <p className="text-gray-600 font-medium mb-1">Los Leones 2341, Local 8, Providencia, Santiago.</p>
                  <p className="text-sm text-gray-500 font-light italic">Retiro en taller disponible — coordinar por WhatsApp</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm flex items-start gap-6">
                <div className="w-14 h-14 bg-[#6B0F2B]/5 text-[#6B0F2B] rounded-2xl flex items-center justify-center shrink-0">
                  <IconClock stroke={1.5} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-serif italic text-gray-950 mb-2">Horarios</h4>
                  <p className="text-gray-600 text-sm mb-1">Lunes-Viernes: 09:30–19:30</p>
                  <p className="text-gray-600 text-sm mb-1">Sábados: 10:00–14:00</p>
                  <p className="text-gray-600 text-sm italic opacity-70">Domingos: Cerrado</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm flex items-start gap-6">
                <div className="w-14 h-14 bg-[#6B0F2B]/5 text-[#6B0F2B] rounded-2xl flex items-center justify-center shrink-0">
                  <IconBrandInstagram stroke={1.5} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-serif italic text-gray-950 mb-2">Redes</h4>
                  <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer" className="text-[#6B0F2B] hover:underline font-medium block mb-1">@floraboutique.cl</a>
                  <a href="https://wa.me/56939276233" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors text-sm italic">WhatsApp: enlace directo</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-[#6B0F2B] text-white p-14 md:p-20 rounded-[3rem] text-center max-w-4xl mx-auto space-y-8">
             <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <IconBuilding stroke={1.5} className="w-10 h-10" />
             </div>
             <h2 className="text-3xl md:text-5xl font-serif italic">¿Eres empresa?</h2>
             <p className="text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
               Flores para oficinas, eventos corporativos, regalos para clientes y suscripciones mensuales. Cotiza con nosotros.
             </p>
             <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#6B0F2B] transition-colors mt-4">
               Consultar para empresa
             </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
