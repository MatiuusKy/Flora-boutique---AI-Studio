import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconMapPin, IconClock, IconBrandWhatsapp, IconChevronDown, IconTruckDelivery, IconCalendarEvent, IconPackage } from "@tabler/icons-react";

const FAQ_ITEMS = [
  { q: "¿Entregan en departamentos y edificios?", a: "Sí, entregamos en conserjería si no hay nadie en el departamento, asegurándonos de dejar las flores en buenas manos." },
  { q: "¿Qué pasa si no hay nadie en la dirección?", a: "Intentaremos contactar al destinatario o a quien realiza el pedido. Si no logramos comunicarnos, el arreglo retornará al taller y se deberá coordinar (y pagar) un nuevo despacho." },
  { q: "¿Puedo programar una hora específica de entrega?", a: "Nuestros despachos se realizan en rangos de horario (AM y PM) debido a las rutas de los repartidores, pero siempre intentamos acercarnos a la hora solicitada si nos avisas con anticipación." },
  { q: "¿Hacen entregas los domingos?", a: "Los días domingo nuestro taller se encuentra cerrado. Sólo realizamos entregas especiales coordinadas previamente por WhatsApp o fechas importantes como el Día de la Madre." },
  { q: "¿Puedo incluir una tarjeta con mensaje?", a: "¡Por supuesto! Durante el checkout podrás escribir tu mensaje y nosotros lo transcribiremos a mano en una hermosa tarjeta sin costo adicional." }
];

export default function Delivery() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-32 bg-warm-white min-h-screen">
      
      {/* New D1 — Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          <span className="inline-block bg-burgundy/10 text-burgundy px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest">
            Entrega a domicilio
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic text-wine-black tracking-tighter">
            Servicio de Delivery de Flores en Santiago
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Cuidamos cada detalle para que tu arreglo llegue fresco e impecable, entregando sonrisas en todo Santiago.
          </p>
          <div className="inline-block bg-burgundy text-white px-6 py-3 rounded-full text-sm font-medium shadow-md">
            Mismo día si pides antes de las 14:00 hrs
          </div>
        </div>
      </section>

      {/* New D2 — ¿Cómo funciona? */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif italic text-center mb-16 text-burgundy">¿Cómo funciona?</h2>
          
          <div className="relative flex flex-col md:flex-row justify-between gap-10 md:gap-0">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0"></div>
            
            {[
              { 
                step: 1, 
                title: "Elige tu arreglo en el catálogo", 
                desc: "Explora nuestra colección y selecciona tu favorito.",
                icon: <IconPackage stroke={1.5} className="w-8 h-8 text-white" />
              },
              { 
                step: 2, 
                title: "Indica la dirección y fecha", 
                desc: "Completa los datos de envío en el proceso de pago.",
                icon: <IconCalendarEvent stroke={1.5} className="w-8 h-8 text-white" />
              },
              { 
                step: 3, 
                title: "Lo entregamos con cuidado", 
                desc: "Nuestros choferes expertos llevan tu pedido seguro.",
                icon: <IconTruckDelivery stroke={1.5} className="w-8 h-8 text-white" />
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1">
                <div className="w-20 h-20 rounded-full bg-burgundy flex items-center justify-center mb-6 shadow-xl relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-burgundy font-bold text-sm flex items-center justify-center shadow-sm border border-gray-100">
                    {item.step}
                  </div>
                  {item.icon}
                </div>
                <h3 className="font-sans font-bold text-lg mb-2 text-wine-black">{item.title}</h3>
                <p className="text-sm text-gray-500 max-w-[250px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fix D1 — Precios por Zona + Comunas */}
      <section className="py-20 bg-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif italic text-center mb-12 text-burgundy">Valores de despacho por zona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 bg-linen rounded-full flex items-center justify-center text-burgundy">
                <IconMapPin stroke={1.5} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zona Oriente</h3>
                <p className="text-xs text-gray-500 leading-relaxed h-12">Las Condes, Providencia, Ñuñoa, La Reina, Vitacura</p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-serif italic text-burgundy">$5.000</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 bg-linen rounded-full flex items-center justify-center text-burgundy">
                <IconMapPin stroke={1.5} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zona Centro / Sur</h3>
                <p className="text-xs text-gray-500 leading-relaxed h-12">La Florida, Macul, San Joaquín, Peñalolén, La Granja</p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-serif italic text-burgundy">$6.000 - $7.000</span>
              </div>
            </div>

            <div className="bg-burgundy text-white p-8 rounded-3xl shadow-md flex flex-col gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <IconMapPin stroke={1.5} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Otras comunas</h3>
                <p className="text-xs text-white/70 leading-relaxed h-12">Consulta disponibilidad y valores para tu comuna específica.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/20">
                <a href="https://wa.me/56939276233" className="text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                  Consultar WhatsApp <IconBrandWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* New D4 - Mapa Placeholder */}
          <div className="mb-20">
            <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
               <div className="absolute inset-0 bg-burgundy/5 group-hover:bg-burgundy/10 transition-colors"></div>
               <div className="text-center z-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl">
                 <IconMapPin stroke={1} className="w-12 h-12 text-burgundy mx-auto mb-3 opacity-50" />
                 <p className="text-gray-500 font-medium">Mapa de cobertura</p>
                 <p className="text-sm text-gray-400 italic mt-1">Zona Oriente y Sur/Centro Santiago</p>
               </div>
            </div>
          </div>

          {/* Existing "Comunas" List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 rounded-[3rem] shadow-sm">
            <div>
              <h3 className="text-2xl font-serif italic text-burgundy mb-6">Comunas con cobertura</h3>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> La Florida</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> La Granja</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> La Reina</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Las Condes</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Macul</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Ñuñoa</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Peñalolén</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Providencia</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> San Joaquín</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-50"></div> Vitacura</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="bg-warm-white border border-gray-100 p-6 rounded-2xl flex items-start gap-4">
                <IconClock className="w-6 h-6 text-burgundy shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-wine-black">Horarios y precios</h4>
                  <p className="text-sm text-gray-500 mt-2">Los envíos se realizan de Lunes a Sábado. Si necesitas un horario especial, podemos coordinarlo a través de WhatsApp.</p>
                </div>
              </div>
              <div className="bg-warm-white border border-gray-100 p-6 rounded-2xl">
                <h4 className="font-bold text-wine-black mb-2">¿Tu comuna no está en la lista?</h4>
                <p className="text-sm text-gray-500 mb-4">Realizamos entregas a otras comunas con un costo adicional sujeto a disponibilidad.</p>
                <a href="https://wa.me/56939276233" className="inline-block border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:border-burgundy hover:text-burgundy transition-colors">
                  Consultar delivery
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New D3 — FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-serif italic text-center mb-12 text-burgundy">Preguntas frecuentes</h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-warm-white">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-wine-black hover:bg-linen transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <IconChevronDown stroke={2} className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
