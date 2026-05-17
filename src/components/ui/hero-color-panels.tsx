import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "./border-beam";

interface Panel {
  id: number;
  color: string;
  flowerImage: string;
}

export const HeroColorPanels = ({
  panels,
  className,
  title,
  subtitle,
  actions
}: {
  panels: Panel[];
  className?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions: React.ReactNode;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-carousel effect - switch images/colors automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [panels.length]);

  const activePanel = panels[activeIndex];

  return (
    <div className={cn("relative w-full h-screen overflow-hidden", className)}>
      {/* Animated Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activePanel.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Dynamic Image */}
          <img 
            src={activePanel.flowerImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
          {/* Theme overlay that matches the active color palette */}
          <div 
            className="absolute inset-0 transition-colors duration-1000 opacity-40 mix-blend-multiply"
            style={{ backgroundColor: activePanel.color }}
          />
          {/* Darkening gradient for readability - stronger overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Center Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl w-full py-16 px-8 md:px-20 pointer-events-auto relative z-20 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col items-center shadow-2xl"
        >
           {/* Collage Background inside the card - even more subtle for harmony */}
           <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-[0.12] pointer-events-none grayscale brightness-75 blur-[1px]">
             <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             <img src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             <img src="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             <img src="https://images.unsplash.com/photo-1544833058-e70f6ca256dc?q=40&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
           </div>

           {/* Section Border Beam - Premium palette sequence */}
           <BorderBeam 
             size={400} 
             duration={12} 
             colorFrom="#580A2D" 
             colorTo="#EFCEDA, #F5F2F0, #899B89, #580A2D" 
             borderWidth={2}
           />

           <div className="relative z-10 w-full flex flex-col items-center gap-8">
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="text-white tracking-tighter w-full flex justify-center"
             >
               {title}
             </motion.div>
             
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8 }}
               className="text-lg md:text-2xl text-white/95 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-md text-center"
             >
               {subtitle}
             </motion.div>

             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               className="w-full mt-4"
             >
               {actions}
             </motion.div>
           </div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
    </div>
  );
};
