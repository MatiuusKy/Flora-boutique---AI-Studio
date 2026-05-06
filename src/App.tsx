/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Analytics from "./components/Analytics";
import PageTransition from "./components/PageTransition";
import AnimatedCard from "./components/AnimatedCard";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./components/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { CartProvider, CartContext } from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { 
  Plus, 
  ShoppingBag, 
  User, 
  ArrowRight, 
  Search, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Globe,
  MessageCircle,
  Instagram
} from "lucide-react";
import ScrollExpandMedia from "./components/ui/scroll-expansion-hero";
import InteractiveSelector from "./components/ui/interactive-selector";

function HeaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
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
            <Route path="/admin" element={<AdminDashboard />} />
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
        {/* Decorative floral background hints */}
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

import { products } from "./data/products";
import { Star } from "lucide-react";

// ... previous components ...

function Home() {
  const { cart, setIsOpen, addToCart, favorites, toggleFavorite } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.5), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Handle hash scrolling
    if (window.location.hash === '#catalogo') {
      const element = document.getElementById('catalogo');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base font-sans overflow-x-hidden">
        <Header transparent={scrollProgress < 0.2} />
        
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="https://images.unsplash.com/photo-1597423228052-85aa1d37a81a?q=80&w=1600&auto=format&fit=crop"
          bgImageSrc="https://images.unsplash.com/photo-1520323232431-16722bcc7158?q=80&w=1600&auto=format&fit=crop"
          title="Flora Boutique"
          date="Diseño Floral"
          scrollToExpand="Desliza para descubrir"
          textBlend
        >
          {/* Main Content Revealed on Scroll */}
          <div className="space-y-32">
            {/* Intro & Benefits */}
            <section className="pt-20">
               <div className="max-w-4xl mx-auto text-center space-y-10">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary font-serif italic text-4xl">F</div>
                 <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 tracking-tight leading-tight">
                   ¿Quieres regalar algo único para un momento especial?
                 </h2>
                 <p className="text-xl text-gray-500 font-light italic max-w-2xl mx-auto leading-relaxed">
                   En Flora Boutique, cada pétalo cuenta una historia. Seleccionamos las flores más frescas para crear arreglos que perduren en la memoria.
                 </p>
               </div>

               <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mt-32">
                {[
                  { icon: Heart, title: "Satisfacción Garantizada", desc: "Arreglos hechos con amor" },
                  { icon: Truck, title: "Entrega el mismo día", desc: "Si compras antes de las 16:00" },
                  { icon: ShieldCheck, title: "Envíos a Domicilio", desc: "Llevamos flores donde necesites" },
                  { icon: ShoppingBag, title: "Compra fácil y rápido", desc: "Elige, paga y recibe" },
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                    <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 tracking-tight">{benefit.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 px-2">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Catalog Selector */}
            <section id="catalogo">
              <InteractiveSelector onSelect={(cat) => setSelectedCategory(cat)} />
            </section>

            {/* Product Grid Section */}
            <section id="product-grid" className="py-24">
              <div className="max-w-7xl mx-auto px-6 mb-16 space-y-4">
                 <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-primary">Explora la Colección</h3>
                 <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 tracking-tight">
                   {selectedCategory === 'Todos' ? 'Nuestra Selección Completa' : selectedCategory}
                 </h2>
              </div>

              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       </div>
                       <div className="px-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                            <div className="flex gap-0.5">
                               {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-primary text-primary" />)}
                            </div>
                          </div>
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
            </section>

            {/* How to buy Section */}
            <section id="como-pedir" className="bg-white/50 backdrop-blur-sm py-32 rounded-[4rem]">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-4 tracking-tight">¿Cómo comprar?</h2>
                <p className="text-gray-400 font-light mb-24 max-w-lg mx-auto">Estos son los pasos a seguir si deseas comprar nuestros productos.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                  <div className="absolute top-24 left-[15%] right-[15%] h-px bg-gray-100 hidden md:block" />
                  
                  {[
                    { step: "1", title: "Selecciona tus flores", desc: "Elige entre todas nuestras opciones las que más te gusten.", icon: Search },
                    { step: "2", title: "Agregalas al carrito", desc: "Haz clic en 'Añadir al Carrito' una vez tengas tus favoritas.", icon: ShoppingBag },
                    { step: "3", title: "Paga Online", desc: "Llena tus datos de envío y paga de forma segura.", icon: ShieldCheck },
                    { step: "4", title: "¡Recibe tu compra!", desc: "Una vez hagas todos los pasos, recibirás tu compra.", icon: Truck },
                  ].map((item, i) => (
                    <div key={i} className="relative z-10 group">
                      <div className="w-48 h-48 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-gray-100 mb-10 border border-gray-50 group-hover:scale-110 transition-transform duration-500">
                        <div className="relative">
                           <item.icon className="w-12 h-12 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                           <span className="absolute -top-4 -right-4 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg">Paso {item.step}</span>
                        </div>
                      </div>
                      <h4 className="text-xl font-serif text-gray-900 mb-3">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light px-4">{item.desc}</p>
                      {i < 3 && <ArrowRight className="w-6 h-6 text-gray-200 mt-8 mx-auto md:hidden" />}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </ScrollExpandMedia>

        <Footer />
        
        {/* Floating WhatsApp */}
        <a 
          href="https://wa.me/56912345678" 
          target="_blank"
          className="fixed bottom-10 right-10 z-[100] flex items-center gap-4 group"
        >
          <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-50 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">¿No sabes qué elegir?</p>
            <p className="text-sm font-bold text-gray-900">¡Háblanos!</p>
          </div>
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform relative">
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-ping" />
          </div>
        </a>
      </div>
    </PageTransition>
  );
}


function Category() {
  const { category } = useParams();
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
  
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


