import { motion } from "motion/react";
import { useState } from "react";

interface AnimatedCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

const AnimatedCard = ({ image, name, price, category }: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container with Zoom effect */}
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Floating Category Tag */}
      <motion.span 
        className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-medium rounded-full"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {category}
      </motion.span>

      {/* Content Overlay */}
      <motion.div 
        className="p-5"
        animate={{ backgroundColor: isHovered ? "rgba(250, 245, 247, 1)" : "rgba(255, 255, 255, 1)" }}
      >
        <h3 className="text-lg font-serif text-gray-800">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">{price}</span>
          <motion.div
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
            className="text-xs uppercase tracking-tighter font-semibold"
          >
            Ver detalle →
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle border reveal */}
      <motion.div 
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default AnimatedCard;
