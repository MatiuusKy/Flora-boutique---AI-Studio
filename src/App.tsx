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
import { CartProvider, CartContext } from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useContext } from 'react';
import { 
  ShoppingBag, 
  User, 
  ArrowRight, 
  Search, 
  Heart, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  Star,
  Sparkles
} from "lucide-react";
import InteractiveSelector from "./components/ui/interactive-selector";
import { products } from "./data/products";

function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="fixed top-0 inset-x-0" />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Analytics />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/categoria/:category" element={<HeaderWrapper><Category /></HeaderWrapper>} />
            <Route path="/about" element={<HeaderWrapper><About /></HeaderWrapper>} />
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
              FLORA<span className="font-light italic">Boutique</span>
            </a>
          </div>
          <Auth />
          <div className="mt-8 text-center">
            <a href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">← Volver a la tienda</a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Home() {
  const { favorites, toggleFavorite } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000&auto=format&fit=crop",
      title: "El lenguaje de",
      highlight: "las Flores",
      desc: "Manifestamos tus emociones más profundas a través del arte botánico y la elegancia del lujo natural."
    },
    {
      img: "https://images.unsplash.com/photo-1548849170-e622d4f92330?q=80&w=2000&auto=format&fit=crop",
      title: "Curaduría",
      highlight: "Exclusiva",
      desc: "Cada tallo cuenta una historia de sofisticación. Flores seleccionadas bajo estándares de alta costura."
    },
    {
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop",
      title: "Recuerdos",
      highlight: "Inolvidables",
      desc: "No regalamos ramos, diseñamos los puentes que unen tus sentimientos con las personas que amas."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;

      if (currentScrollY > heroHeight) {
        setIsHeaderVisible(currentScrollY > lastScrollY);
      } else {
        setIsHeaderVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const featuredProducts = products.slice(0, 4); // Best sellers
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { name: 'Rosas', img: 'https://images.unsplash.com/photo-1548849170-e622d4f92330?q=80&w=800&auto=format&fit=crop', desc: 'Elegancia eterna' },
    { name: 'Girasoles', img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=800&auto=format&fit=crop', desc: 'Energía y luz' },
    { name: 'Tulipanes', img: 'https://images.unsplash.com/photo-1520323232431-16722bcc7158?q=80&w=800&auto=format&fit=crop', desc: 'Sofisticación pura' },
    { name: 'Mix', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop', desc: 'Armonía floral' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FDFCFB] font-sans overflow-x-hidden">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: isHeaderVisible ? 0 : -100, 
            opacity: isHeaderVisible ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 inset-x-0 z-[100]"
        >
          <Header transparent={false} />
        </motion.div>
        
        {/* Main Hero with Background Carousel */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Carousel */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={heroSlides[currentSlide].img} 
                  className="w-full h-full object-cover scale-110" 
                  alt="Atelier Background" 
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#FDFCFB] via-[#FDFCFB]/40 to-transparent" />
          </div>

          {/* Static Content Overlay - Editorial Style */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
                {/* Editorial Content Overlay */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Brand Essence - Second on mobile */}
                <div className="lg:col-span-4 text-center lg:text-left space-y-6 order-2 lg:order-1">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="h-px w-12 bg-secondary-pink mx-auto lg:ml-0" />
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black text-secondary-cream italic">
                      L'Esprit de la Nature
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif italic text-white/90 leading-tight">
                      Curadores de instantes, arquitectos de la belleza efímera.
                    </h3>
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/60 leading-relaxed font-sans max-w-xs mx-auto lg:mx-0">
                      Desde nuestro atelier, seleccionamos cada tallo como una joya única para trascender el tiempo.
                    </p>
                  </motion.div>
                </div>
                {/* Center: Main Branding (What we sell & What we do) - Positioned first on mobile */}
                <div className="lg:col-span-4 flex flex-col items-center py-10 lg:py-0 order-1 lg:order-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 md:p-12 bg-black/10 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl space-y-8 w-full relative group max-w-lg mx-auto"
                  >
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-[1em] font-black text-secondary-sage opacity-80">
                        Haute Couture Florale
                      </h4>
                      <div className="relative">
                        <h1 className="text-[15vw] lg:text-[7rem] font-serif italic leading-[0.7] tracking-tighter text-white">
                          Flora
                        </h1>
                        <h2 className="text-[4vw] lg:text-[1.8rem] font-sans font-black uppercase tracking-[0.6em] text-primary-custom -mt-2">
                          Boutique
                        </h2>
                      </div>
                    </div>
                    
                    <div className="pt-8 relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-secondary-pink/30" />
                      <p className="text-lg md:text-xl font-serif italic text-white/90 leading-relaxed px-4">
                        "Curaduría botánica de élite <br /> para instantes trascendentales."
                      </p>
                    </div>

                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8" />
                  </motion.div>
                </div>

                {/* Right Side: Proposal & CTA - Positioned third on mobile */}
                <div className="lg:col-span-4 text-center lg:text-right space-y-8 order-3 lg:order-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-secondary-pink">
                        L'Elixir Collection
                      </h4>
                      <p className="text-xl md:text-2xl font-sans uppercase tracking-[0.15em] text-white font-light leading-snug">
                        Propuestas <span className="text-secondary-sage italic font-serif lowercase tracking-normal">deluxe</span> <br /> 
                        <span className="opacity-60">&</span> arte floral curado
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-4 items-center lg:items-end">
                      <a 
                        href="#nuestra-historia" 
                        className="group relative px-10 py-5 overflow-hidden rounded-full transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.05)] w-full lg:w-auto"
                      >
                        <div className="absolute inset-0 bg-white group-hover:bg-secondary-cream transition-colors" />
                        <span className="relative text-primary-custom text-[10px] font-black uppercase tracking-[0.4em]">
                          Quiénes Somos
                        </span>
                      </a>
                      <a 
                        href="#galeria" 
                        className="group relative px-10 py-5 overflow-hidden rounded-full border border-white/20 backdrop-blur-md hover:border-white transition-all w-full lg:w-auto"
                      >
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                          Nuestras Creaciones
                        </span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" 
                />
                <p className="text-[8px] uppercase tracking-[1em] text-white/30 font-bold ml-2">Experience</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION: OUR STORY / INSPIRATION --- */}
        <section id="nuestra-historia" className="py-40 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(88,10,45,0.15)]">
                <img 
                  src="https://images.unsplash.com/photo-1596438676698-e5a3c9a96b01?q=80&w=800&auto=format&fit=crop" 
                  className="w-full h-full object-cover" 
                  alt="Nuestra inspiración" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary-custom text-white p-14 rounded-[4rem] shadow-2xl hidden md:block max-w-sm">
                <p className="text-4xl font-serif italic leading-tight">"La elegancia es la única belleza que nunca se marchita."</p>
                <div className="h-px w-20 bg-white/30 my-6" />
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold">Flora Boutique • Essence</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-secondary-sage">Confianza & Distinción</h4>
                <h2 className="text-4xl md:text-7xl font-serif italic text-gray-900 leading-[0.95] tracking-tighter">
                  Un legado de <br /> sofisticación pura
                </h2>
              </div>
              <div className="space-y-6 text-lg md:text-xl text-gray-500 font-light italic leading-relaxed">
                <p>
                  Nacimos bajo la premisa de que las flores no son accesorios, sino protagonistas de los momentos más sublimes de la vida. 
                </p>
                <p>
                  Cada tallo en **Flora Boutique** es seleccionado bajo estándares de alta perfumería y diseño editorial. Nuestra inspiración es el lujo silencioso: ese que no grita, pero que todos notan.
                </p>
              </div>
              <div className="flex flex-wrap gap-12 pt-10 border-t border-gray-100">
                <div className="space-y-1">
                  <h5 className="text-3xl md:text-4xl font-black text-primary-custom tracking-tighter">Deluxe</h5>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Calidad Certificada</p>
                </div>
                <div className="space-y-1">
                  <h5 className="text-3xl md:text-4xl font-black text-primary-custom tracking-tighter">Elixir</h5>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Aromas de Autor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION: CATEGORIES / TYPES --- */}
        <section className="py-40 bg-secondary-neutral/20 uppercase-text overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-24">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary-custom">Nuestra Curaduría</h4>
                  <h2 className="text-4xl md:text-6xl font-serif italic text-gray-900 tracking-tighter leading-tight">Categorías de Élite</h2>
                </div>
                <p className="max-w-md text-gray-500 italic text-lg leading-relaxed lg:text-right">
                  Desde los clásicos eternos hasta composiciones de vanguardia, cada categoría refleja un elixir de emociones.
                </p>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                onClick={() => window.location.href = `/categoria/${cat.name}`}
                className="group cursor-pointer relative h-[650px] rounded-[3.5rem] overflow-hidden shadow-sm"
              >
                <img src={cat.img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-12 left-10 text-white space-y-3">
                  <h4 className="text-4xl font-serif italic leading-none">{cat.name}</h4>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-70 font-bold border-l border-white/30 pl-4">{cat.desc}</p>
                </div>
                <div className="absolute top-12 right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-primary-custom transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION: BEST SELLERS --- */}
        <section id="galeria" className="py-40 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-28 text-center space-y-6">
             <h4 className="text-[10px] uppercase tracking-[0.8em] font-bold text-secondary-sage">Iconos Flora</h4>
             <h2 className="text-4xl md:text-7xl font-serif italic text-gray-900 tracking-tighter">Nuestras más Vendidas</h2>
             <div className="w-24 h-px bg-primary-custom/10 mx-auto" />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div onClick={() => window.location.href = `/producto/${product.slug}`} className="cursor-pointer">
                   <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(88,10,45,0.12)] transition-all duration-1000">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      />
                   </div>
                   <div className="px-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-sage">{product.category}</span>
                        <div className="flex gap-1">
                           {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-primary-custom text-primary-custom" />)}
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif italic text-gray-900 group-hover:text-primary-custom transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-serif text-gray-900 tracking-tighter">${product.basePrice.toLocaleString('es-CL')}</span>
                        <div className="h-px flex-1 bg-gray-50" />
                      </div>
                   </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(Number(product.id));
                  }}
                  className={`absolute top-8 right-8 p-4 rounded-full backdrop-blur-xl transition-all shadow-xl ${
                    favorites.includes(Number(product.id)) 
                    ? 'bg-primary-custom text-white' 
                    : 'bg-white/90 text-gray-400 hover:text-primary-custom'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(Number(product.id)) ? 'fill-current' : ''}`} />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-32 text-center">
             <Button variant="outline" onClick={() => window.location.href = '#product-grid'} className="px-16 h-16 rounded-full text-[11px] font-black uppercase tracking-[0.3em] border-primary-custom/10 text-primary-custom hover:border-primary-custom transition-all">
                Explorar Colección Completa
             </Button>
          </div>
        </section>

        {/* --- SECTION: HOW TO BUY --- */}
        <section id="como-pedir" className="bg-[#FAF9F7] py-40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
               <div className="space-y-6">
                  <h4 className="text-[10px] uppercase tracking-[0.8em] font-bold text-primary-custom">Ritual de Compra</h4>
                  <h2 className="text-7xl font-serif italic text-gray-900 tracking-tighter leading-[0.9]">Fluidez en <br /> cada detalle</h2>
                  <p className="text-xl text-gray-500 italic font-light max-w-md leading-relaxed">
                    Hemos refinado la experiencia para que el acto de regalar sea tan placentero como recibir.
                  </p>
               </div>

               <div className="space-y-10">
                  {[
                    { title: "Boutique Digital", desc: "Nuestra plataforma de alta velocidad para pedidos instantáneos.", icon: ShoppingBag, color: "bg-secondary-pink" },
                    { title: "Concierge Personal", desc: "Expertos floristas a un clic de distancia vía WhatsApp.", icon: MessageCircle, color: "bg-secondary-cream" },
                    { title: "Suscripción Elixir", desc: "Nuestra membresía exclusiva para fechas icónicas.", icon: Sparkles, color: "bg-secondary-sage" },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-8 group cursor-default">
                       <div className={`w-16 h-16 shrink-0 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-6 ${step.color} text-primary-custom shadow-sm`}>
                          <step.icon className="w-7 h-7" />
                       </div>
                       <div>
                          <h4 className="text-2xl font-serif italic text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-base text-gray-400 font-light leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="aspect-square bg-white rounded-[5rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.08)] p-16 flex flex-col items-center justify-center text-center space-y-10 border border-gray-50">
                  <div className="w-28 h-28 bg-secondary-pink/20 rounded-full flex items-center justify-center text-primary-custom">
                     <Heart className="w-12 h-12 fill-current" />
                  </div>
                  <h3 className="text-4xl font-serif italic text-gray-900 leading-tight">¿Deseas algo <br /> verdaderamente único?</h3>
                  <p className="text-gray-500 text-lg max-w-xs mx-auto italic leading-relaxed">Nuestra línea **"Deluxe Custom"** es el epítome de la personalización floral.</p>
                  <Button className="bg-primary-custom text-white px-16 h-16 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:scale-105 transition-all shadow-xl">
                     Contactar Curador
                  </Button>
               </div>
               {/* Decorative blobs */}
               <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary-pink/30 rounded-full blur-[80px] -z-10" />
               <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary-sage/20 rounded-full blur-[80px] -z-10" />
            </div>
          </div>
        </section>

        {/* --- SECTION: MAIN CATALOG --- */}
        <section id="product-grid" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 mb-24 space-y-6 text-center">
             <h4 className="text-[10px] uppercase tracking-[0.8em] font-bold text-gray-300">Catálogo General</h4>
             <h2 className="text-6xl font-serif italic text-gray-900 tracking-tighter">
               Colección <span className="text-primary-custom">Boutique</span>
             </h2>
             <p className="max-w-xl mx-auto text-gray-400 italic text-lg mb-12">Filtra por tu flor favorita para encontrar el detalle perfecto.</p>
             <InteractiveSelector onSelect={(cat) => setSelectedCategory(cat)} />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-28">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="group relative"
              >
                <div onClick={() => window.location.href = `/producto/${product.slug}`} className="cursor-pointer">
                   <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      />
                   </div>
                   <div className="px-4 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-custom/30">{product.category}</span>
                      <h3 className="text-3xl font-serif text-gray-900 group-hover:text-primary-custom transition-colors italic leading-none">{product.name}</h3>
                      <p className="text-2xl font-serif text-gray-900 tracking-tighter">${product.basePrice.toLocaleString('es-CL')}</p>
                   </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(Number(product.id));
                  }}
                  className={`absolute top-10 right-10 p-5 rounded-full backdrop-blur-3xl transition-all shadow-2xl ${
                    favorites.includes(Number(product.id)) 
                    ? 'bg-primary-custom text-white' 
                    : 'bg-white/80 text-gray-400 hover:text-primary-custom'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(Number(product.id)) ? 'fill-current' : ''}`} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

function Category() {
  const { category } = useParams();
  const { favorites, toggleFavorite } = useContext(CartContext);
  
  const filteredProducts = products.filter(p => p.category === category);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base font-sans">
        
        <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                <a href="/" className="hover:underline">Boutique</a>
                <span>/</span>
                <span>Colección</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif text-gray-900 tracking-tight italic">
               {category}
             </h1>
             <p className="text-gray-400 font-light max-w-lg">
               Explora nuestra selección curada de {category?.toLowerCase()} importadas, diseñadas para momentos memorables.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div onClick={() => window.location.href = `/producto/${product.slug}`} className="cursor-pointer">
                   <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                   </div>
                   <div className="px-2 space-y-2">
                      <h3 className="text-xl font-serif text-gray-900 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-xl font-serif italic text-gray-900">${product.basePrice.toLocaleString('es-CL')}</p>
                   </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(Number(product.id));
                  }}
                  className={`absolute top-6 right-6 p-3.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
                    favorites.includes(Number(product.id)) 
                    ? 'bg-primary text-white' 
                    : 'bg-white/80 text-gray-400 hover:text-primary'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(Number(product.id)) ? 'fill-current' : ''}`} />
                </button>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-40 text-center space-y-6">
               <p className="text-gray-400 italic">No encontramos productos en esta categoría por el momento.</p>
               <a href="/" className="inline-block bg-primary text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">Volver al inicio</a>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

function About() {
  return (
    <PageTransition>
      <div className="p-20 text-center">
        <h1 className="text-4xl font-serif">Nuestra Esencia</h1>
        <p className="mt-4 text-gray-500">Diseñamos sentimientos en forma de flores.</p>
      </div>
    </PageTransition>
  );
}
