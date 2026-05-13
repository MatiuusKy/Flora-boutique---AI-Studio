import React from "react";
import { HeroColorPanels } from "./ui/hero-color-panels";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BorderBeam } from "./ui/border-beam";

const BoutiqueHero = () => {
  const panels = [
    {
      id: 1,
      color: "#580A2D", // Profundo Burdeo (Principal)
      flowerImage: "https://images.unsplash.com/photo-1548610762-7c6cfe99c161?q=80&w=1600&auto=format&fit=crop", // Red Roses (Burdeo match)
    },
    {
      id: 2,
      color: "#EFCEDA", // Rosado Suave
      flowerImage: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?q=80&w=1600&auto=format&fit=crop", // Pink Roses (Soft match)
    },
    {
      id: 3,
      color: "#F5F2F0", // Off White/Beige
      flowerImage: "https://images.unsplash.com/photo-1520323232427-6b4b3830da59?q=80&w=1600&auto=format&fit=crop", // Mix Tulips (Neutral match)
    },
    {
      id: 4,
      color: "#899B89", // Verde Sage
      flowerImage: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=1600&auto=format&fit=crop", // Sunflowers (Vivid match)
    },
  ];

  return (
    <section className="relative w-full">
      <HeroColorPanels
        panels={panels}
        title={
          <div className="flex flex-col items-center relative gap-4">
            <span className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest backdrop-blur-md mb-4 border border-white/20">
              Santiago - Zona Oriente
            </span>
            <div className="text-center">
              <h1 className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter drop-shadow-md">
                Flores con alma.
              </h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <img 
                src="/flora-logo-white.png" 
                alt="" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto filter invert brightness-0 opacity-50"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          </div>
        }
        subtitle="Diseño floral boutique para momentos inolvidables."
        actions={
          <div className="flex flex-col items-center gap-10 w-full">
            <div className="flex gap-8 md:gap-16 pt-4 pb-8 w-full max-w-lg justify-center text-white text-center">
              <div>
                <p className="text-2xl md:text-3xl font-serif italic">100%</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Premium</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif italic">24h</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Mismo día</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif italic">5.0</p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/60 mt-1">Reseñas</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-2xl">
              <Button size="xl" className="relative bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-full px-12 h-16 md:h-20 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-xl transition-all hover:scale-105 overflow-hidden flex-1 min-w-[240px]">
                <span className="relative z-10">Ver Colección</span>
              </Button>
              
              <Button variant="outline" size="xl" className="relative bg-white/5 text-white border-white/10 hover:bg-white/10 rounded-full px-12 h-16 md:h-20 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-md transition-all hover:scale-105 overflow-hidden flex-1 min-w-[240px]">
                <span className="relative z-10 flex items-center justify-center">
                  Nuestro Atelier
                  <ArrowRight className="ml-4 w-4 h-4" />
                </span>
              </Button>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.5em] text-white/70"
            >
              Desliza para descubrir
            </motion.span>
          </div>
        }
      />
    </section>
  );
};

export default BoutiqueHero;
