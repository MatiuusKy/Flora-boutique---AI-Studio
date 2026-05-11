'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CatalogItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

const catalogItems: CatalogItem[] = [
  {
    id: 'rosas',
    title: 'Rosas',
    subtitle: 'EL AMOR EN CADA PÉTALO',
    image: 'https://images.unsplash.com/photo-1548849170-e622d4f92330?q=80&w=800&auto=format&fit=crop',
    category: 'Rosas'
  },
  {
    id: 'tulipanes',
    title: 'Tulipanes',
    subtitle: 'ELEGANCIA PRIMAVERAL',
    image: 'https://images.unsplash.com/photo-1520323232431-16722bcc7158?q=80&w=800&auto=format&fit=crop',
    category: 'Tulipanes'
  },
  {
    id: 'girasoles',
    title: 'Girasoles',
    subtitle: 'ENERGÍA & COLOR',
    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=800&auto=format&fit=crop',
    category: 'Girasoles'
  },
  {
    id: 'lirios',
    title: 'Lirios',
    subtitle: 'PUREZA & FRAGANCIA',
    image: 'https://images.unsplash.com/photo-1508784411316-02b8cddec60a?q=80&w=800&auto=format&fit=crop',
    category: 'Lirios'
  },
  {
    id: 'mix',
    title: 'Mix',
    subtitle: 'LO MEJOR DE ESTACIÓN',
    image: 'https://images.unsplash.com/photo-1596003901066-61be212239bb?q=80&w=800&auto=format&fit=crop',
    category: 'Mix'
  }
];

export default function InteractiveSelector({ onSelect }: { onSelect: (category: string) => void }) {
  const [activeId, setActiveId] = useState<string | null>('girasoles');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16 space-y-6">
        <div className="w-12 h-px bg-primary-custom/10 mx-auto" />
        <p className="text-[10px] uppercase tracking-[0.8em] font-bold text-primary-custom">LA COLECCIÓN</p>
        <h2 className="text-6xl md:text-8xl font-serif text-gray-900 italic tracking-tighter leading-none">Explora cada <br /> <span className="text-primary-custom">Esencia</span></h2>
        <p className="text-gray-400 font-light italic text-xl">Piezas únicas diseñadas para evocar lo inolvidable.</p>
      </div>

      <div className="flex flex-col md:flex-row h-[700px] gap-6">
        {catalogItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => {
              setActiveId(item.id);
              onSelect(item.category);
              const element = document.getElementById('product-grid');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer h-full transition-all duration-500 ease-out flex-1 ${
              activeId === item.id ? 'md:flex-[3]' : 'md:flex-[0.5]'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${activeId === item.id ? 'opacity-40' : 'opacity-60'}`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
              <motion.div
                initial={false}
                animate={{
                  opacity: activeId === item.id ? 1 : 0,
                  y: activeId === item.id ? 0 : 20,
                  x: activeId === item.id ? 0 : -20,
                  rotate: activeId === item.id ? 0 : -90
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-2 pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/80">{item.subtitle}</p>
                <h3 className="text-5xl md:text-6xl font-serif italic text-white leading-none">{item.title}</h3>
              </motion.div>

              {/* Vertical Title when collapsed */}
              <motion.div
                initial={false}
                animate={{
                  opacity: activeId === item.id ? 0 : 1,
                  y: activeId === item.id ? -20 : 0,
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-white rotate-[-90deg] whitespace-nowrap opacity-60">
                  {item.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
