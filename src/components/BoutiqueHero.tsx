import React from "react";
import { HeroColorPanels } from "./ui/hero-color-panels";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

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
          <div className="flex flex-col items-center relative gap-6">
            <span className="inline-block bg-white/5 text-white px-5 py-2.5 rounded-full text-[9px] uppercase font-bold tracking-[0.3em] backdrop-blur-xl mb-6 border border-white/20 shadow-xl">
              Santiago - Zona Oriente
            </span>
            <div className="text-center">
              <h1 className="text-6xl md:text-9xl font-serif italic text-white tracking-tighter drop-shadow-2xl font-light">
                Flores con alma.
              </h1>
            </div>
          </div>
        }
        subtitle={
          <p className="text-sm md:text-lg text-white/80 font-light tracking-wide max-w-lg mx-auto">
            Diseño floral boutique para celebrar la vida, el amor y los instantes que perduran forever.
          </p>
        }
        actions={
          <div className="flex flex-col items-center gap-10 w-full mt-8">
            <div className="flex gap-8 md:gap-20 pt-4 w-full max-w-lg justify-center text-white text-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-serif italic font-light">100%</span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60 mt-2">Premium</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-serif italic font-light">24h</span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60 mt-2">Envío Express</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-serif italic font-light">Atelier</span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60 mt-2">Diseño Autor</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-xl mt-8">
              <Link to="/catalogo" className="w-full sm:w-auto flex-1">
                <Button size="xl" className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full h-16 md:h-16 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:scale-105 shadow-xl">
                  Explorar Colección
                </Button>
              </Link>
              
              <Link to="/nosotros" className="w-full sm:w-auto flex-1">
                <Button variant="outline" size="xl" className="w-full bg-white/5 text-white border-white/20 hover:bg-white/10 rounded-full h-16 md:h-16 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-md transition-all hover:scale-105">
                  <span className="flex items-center justify-center">
                    El Atelier
                    <ArrowRight className="ml-3 w-4 h-4 opacity-50" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </section>
  );
};

export default BoutiqueHero;
