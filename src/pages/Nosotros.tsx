import { motion } from "framer-motion";
import { 
  IconLeaf,
  IconHeart,
  IconSparkles,
  IconTruckDelivery,
  IconShoppingBag,
  IconScissors,
  IconGift,
  IconBrandInstagram
} from "@tabler/icons-react";

export default function Nosotros() {
  return (
    <div className="pt-24 pb-0 bg-[#FDFCFB]">
      
      {/* Existing - Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          <span className="inline-block bg-[#6B0F2B]/10 text-[#6B0F2B] px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest">
            Santiago - Zona Oriente
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic text-gray-950 tracking-tighter">
            Diseño floral boutique
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 py-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Flores" />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg -ml-8 md:-ml-12 mt-8">
              <img src="https://images.unsplash.com/photo-1508784411316-02b8cddec60a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detalle" />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg -ml-8 md:-ml-12">
              <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Arreglo" />
            </div>
          </div>
          
          <div className="flex gap-12 pt-8 border-t border-gray-100">
            <div>
              <p className="text-3xl font-serif italic text-[#6B0F2B]">100%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-1">Premium</p>
            </div>
            <div>
              <p className="text-3xl font-serif italic text-[#6B0F2B]">24h</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-1">Mismo día</p>
            </div>
            <div>
              <p className="text-3xl font-serif italic text-[#6B0F2B]">5.0</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-1">Reseñas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing - Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-serif italic text-center mb-16 text-[#6B0F2B]">Nuestra historia</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {[
              { year: "2020", title: "El inicio en pandemia", desc: "Comenzamos en la cocina de un departamento, enviando ramos a familiares que no podíamos ver. Nos dimos cuenta del poder que tenían las flores para conectar a las personas." },
              { year: "2021", title: "Primer taller", desc: "La demanda creció y nos mudamos a nuestro primer taller botánico en Ñuñoa. Empezamos a importar flores ecuatorianas y holandesas." },
              { year: "2022", title: "Expansión y eventos", desc: "Armamos un equipo y comenzamos a decorar matrimonios íntimos y eventos corporativos para grandes marcas." },
              { year: "Hoy", title: "Boutique digital", desc: "Lanzamos nuestra nueva plataforma para facilitar la experiencia de compra, manteniendo la misma dedicación artesanal del primer día." }
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-[#6B0F2B]">
                  <IconLeaf stroke={1.5} className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-[#F5F4F0] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <span className="text-xs font-serif italic text-[#6B0F2B] font-medium px-2 py-1 bg-white rounded-full">{item.year}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New N1 — La persona detrás de Flora */}
      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544833058-e70f6ca256dc?q=80&w=800&auto=format&fit=crop" 
                alt="Fundadora" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6B0F2B]">Nuestra fundadora</span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-950">
                María José <span className="italic relative z-10">Pérez</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  "Desde pequeña me cautivó la forma en que un simple arreglo floral podía transformar un espacio y el estado de ánimo de quien lo recibe. Empecé Flora Boutique con el sueño de llevar esa magia a más personas, con un enfoque en diseño moderno y calidad inigualable."
                </p>
                <p>
                  "Trabajamos de la mano con productores locales e internacionales para seleccionar solo los tallos más fuertes y hermosos. Cada creación que sale de nuestro taller lleva un pedacito de mi corazón."
                </p>
              </div>
              <blockquote className="text-2xl font-serif italic text-[#6B0F2B] pt-6 border-t border-gray-200">
                "Cada arreglo es una conversación sin palabras"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Existing - Lo que nos hace únicos (Fix N1 applied) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif italic text-center mb-16 text-[#6B0F2B]">Lo que nos hace únicos</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F5F4F0] p-8 rounded-[2rem] text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#6B0F2B] shadow-sm">
                <IconLeaf stroke={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Frescura garantizada</h3>
              <p className="text-sm text-gray-500">Flores compradas directamente cada madrugada en el mercado.</p>
            </div>
            
            <div className="bg-[#F5F4F0] p-8 rounded-[2rem] text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#6B0F2B] shadow-sm">
                <IconHeart stroke={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Diseño de autor</h3>
              <p className="text-sm text-gray-500">Arreglos armados a mano, sin procesos industriales. Cada uno es único.</p>
            </div>
            
            <div className="bg-[#F5F4F0] p-8 rounded-[2rem] text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#6B0F2B] shadow-sm">
                <IconSparkles stroke={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Calidad Premium</h3>
              <p className="text-sm text-gray-500">Seleccionamos rosas ecuatorianas y tulipanes de importación superior.</p>
            </div>
            
            <div className="bg-[#F5F4F0] p-8 rounded-[2rem] text-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#6B0F2B] shadow-sm">
                 <IconTruckDelivery stroke={1.5} className="w-8 h-8" />
               </div>
               <h3 className="font-bold text-gray-900 mb-3">Entrega confiable</h3>
               <p className="text-sm text-gray-500">Packaging que protege tu arreglo para que llegue intacto a destino.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New N2 — Nuestro proceso */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#6B0F2B] bg-[#6B0F2B]/20 inline-block px-3 py-1 rounded-full">Nuestro proceso</h4>
            <h2 className="text-3xl md:text-5xl font-serif italic">Flores que llegan frescas siempre</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
              <IconShoppingBag stroke={1.5} className="w-10 h-10 text-[#6B0F2B] mb-6" />
              <h3 className="font-bold text-lg mb-3">Selección en mercado</h3>
              <p className="text-sm text-white/60">Compramos directamente en el Mercado de las Flores cada madrugada.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
              <IconScissors stroke={1.5} className="w-10 h-10 text-[#6B0F2B] mb-6" />
              <h3 className="font-bold text-lg mb-3">Diseño artesanal</h3>
              <p className="text-sm text-white/60">Cada arreglo se diseña a mano según la ocasión y las preferencias del cliente.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
              <IconGift stroke={1.5} className="w-10 h-10 text-[#6B0F2B] mb-6" />
              <h3 className="font-bold text-lg mb-3">Entrega con cuidado</h3>
              <p className="text-sm text-white/60">Embalaje especial y transporte dedicado para que lleguen perfectas a su destino.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing - Galería Arreglos con alma (Fix N2 applied) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif italic text-gray-950 mb-4">Arreglos con alma</h2>
              <p className="text-gray-500 max-w-xl">Un vistazo a nuestras creaciones favoritas en el taller.</p>
            </div>
            <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-[#6B0F2B] font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
              Síguenos @floraboutique.cl <IconBrandInstagram className="w-4 h-4" />
            </a>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
              "https://images.unsplash.com/photo-1548849170-e622d4f92330?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1520698183186-0615468d374f?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519378018457-4c29a3a24245?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1596733230638-3486ec454a85?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1574765954605-7f9999026402?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534888062547-6691459a9307?q=80&w=600&auto=format&fit=crop"
            ].map((src, i) => (
              <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer" key={i} className="group relative block overflow-hidden rounded-2xl break-inside-avoid">
                <img src={src} alt="Galería" className="w-full transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[rgba(107,15,43,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <IconBrandInstagram stroke={1.5} className="w-8 h-8" />
                    <span className="font-bold text-xs uppercase tracking-widest">Ver en Instagram</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <a href="https://instagram.com/floraboutique.cl" target="_blank" rel="noreferrer" className="flex justify-center md:hidden items-center gap-2 text-[#6B0F2B] font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity mt-8">
            Síguenos @floraboutique.cl <IconBrandInstagram className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* New N3 — Reseñas (reused pattern) */}
      <section className="py-20 bg-[#F5F4F0]">
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

    </div>
  );
}
