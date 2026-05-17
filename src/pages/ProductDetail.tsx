import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../components/PageTransition";
import { analytics } from "../lib/analytics";
import { useEffect, useContext, useState, useMemo } from "react";
import { CartContext } from "../components/Cart";
import { Check, ShoppingBag, Heart as HeartIcon, ChevronLeft, Info, X } from "lucide-react";
import { IconSparkles } from "@tabler/icons-react";
import { products } from "../data/products";
import { FLOWER_SIZES, FLOWER_COLORS, FlowerType } from "../types";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);

  const product = useMemo(() => products.find(p => p.slug === slug), [slug]);
  const isProductFavorite = favorites.includes(Number(product?.id || 0));
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (product) {
      analytics.viewContent(product.slug, product.name, product.basePrice, product.category);
      // Default selections
      const sizes = FLOWER_SIZES[product.category as FlowerType] || [];
      if (sizes.length > 0) setSelectedSize(sizes[0].value);
      
      const colors = FLOWER_COLORS[product.category as FlowerType] || [];
      if (colors.length > 0) setSelectedColor(colors[0].name);
    }
  }, [product]);

  if (!product) return <div className="p-20 text-center">Cargando...</div>;

  const flowerSizes = FLOWER_SIZES[product.category as FlowerType] || [];
  const flowerColors = FLOWER_COLORS[product.category as FlowerType] || [];
  
  const currentSize = flowerSizes.find(s => s.value === selectedSize);
  const totalPrice = product.basePrice + (currentSize?.extraPrice || 0);

  const handleAddToCart = () => {
    analytics.addToCart(product.slug, product.name, totalPrice);
    addToCart({
      ...product,
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      price: totalPrice,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-warm-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Main Image Gallery-like Sticky Side */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[3/4] overflow-hidden bg-linen relative"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => toggleFavorite(Number(product.id))}
                className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:scale-105 transition-all transform active:scale-95"
              >
                <HeartIcon className={`w-5 h-5 transition-colors ${isProductFavorite ? 'fill-wine-black text-wine-black' : 'text-gray-400'}`} />
              </button>
            </motion.div>
            
            {/* Small info badge */}
            <div className="flex items-center gap-6 p-6 border border-gray-100 bg-white shadow-sm">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                <IconSparkles stroke={1} className="w-5 h-5 text-wine-black" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-wine-black">Edición Limitada Fleur</p>
                <p className="text-xs text-gray-500 font-light italic">Diseño exclusivo de Flora Atelier para esta temporada.</p>
              </div>
            </div>
          </div>

          {/* Configuration Side */}
          <div className="space-y-12">
            <div>
              <button 
                onClick={() => navigate('/catalogo')} 
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-400 mb-10 hover:text-wine-black transition-colors"
              >
                <ChevronLeft strokeWidth={1} className="w-4 h-4" /> Volver a la Colección
              </button>
              <p className="text-wine-black font-bold text-[10px] tracking-[0.3em] uppercase mb-4">{product.category}</p>
              <h1 className="text-5xl md:text-6xl font-serif italic text-wine-black leading-[1.1] tracking-tighter mb-6">{product.name}</h1>
              <div className="flex items-end gap-6 mt-6 pb-8 border-b border-gray-100">
                 <p className="text-4xl text-wine-black font-light tracking-tight">${totalPrice.toLocaleString('es-CL')}</p>
                 {currentSize?.extraPrice ? (
                   <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Ref + ${currentSize.extraPrice.toLocaleString('es-CL')}</span>
                 ) : null}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-gray-500 leading-relaxed text-sm md:text-base font-light italic">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Dimensión de la Obra</h3>
                <button 
                  onClick={() => setShowMeasureGuide(true)}
                  className="text-[9px] uppercase tracking-[0.2em] font-bold text-wine-black flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  Guía de Tallas <Info className="w-3 h-3" />
                </button>
              </div>
              <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="flex gap-3 w-max">
                  {flowerSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`py-4 px-6 border transition-all flex flex-col items-center justify-center min-w-[120px] shrink-0 ${
                        selectedSize === size.value 
                          ? 'border-wine-black bg-linen' 
                          : 'border-gray-200 bg-white hover:border-gray-400'
                      }`}
                    >
                      <span className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-1 ${selectedSize === size.value ? 'text-wine-black' : 'text-gray-500'}`}>
                        {size.label}
                      </span>
                      <span className="text-[9px] text-gray-400 font-light uppercase tracking-widest">{size.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color Selector */}
            {flowerColors.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Tono Floral</h3>
                <div className="flex flex-wrap gap-4">
                  {flowerColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="group relative flex items-center gap-3 border border-gray-200 px-4 py-2 hover:border-gray-400 transition-colors"
                      style={{ borderColor: selectedColor === color.name ? '#111827' : '' }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full border border-gray-200 shadow-inner`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${selectedColor === color.name ? 'text-wine-black' : 'text-gray-500'}`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA's */}
            <div className="flex flex-col gap-4 pt-8">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full flex items-center justify-center gap-4 py-6 font-bold uppercase tracking-[0.3em] text-[10px] transition-all ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-wine-black text-white hover:bg-black hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>Adquirido <Check strokeWidth={2} className="w-4 h-4" /></>
                ) : (
                  <>Añadir a la bolsa <ShoppingBag strokeWidth={1.5} className="w-4 h-4" /></>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">Despacho seguro · Garantía de frescura</p>
            </div>

            {/* Trust Badges */}
            <div className="pt-10 grid grid-cols-2 gap-8 border-t border-gray-100">
               <div className="space-y-2">
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-wine-black">Moño de Seda</p>
                 <p className="text-xs text-gray-500 font-light">Incluido en todos nuestros ramos premium.</p>
               </div>
               <div className="space-y-2">
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-wine-black">Tarjeta Artesanal</p>
                 <p className="text-xs text-gray-500 font-light">Personalizada con tu mensaje manuscrito.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Measure Guide Modal */}
      <AnimatePresence>
        {showMeasureGuide && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMeasureGuide(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[3rem] shadow-2xl z-[110] p-12"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif italic">Guía de Medidas</h2>
                <button onClick={() => setShowMeasureGuide(false)} className="p-2 hover:bg-linen rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-burgundy">Nuestros Formatos</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm font-light text-gray-600">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-wine-black">Rosas</span>
                       <span>XS: 10 • S: 20 • M: 50 • L: 80 • XL: 100 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-wine-black">Astromelias</span>
                       <span>S: 10 • M: 20 • L: 30 • XL: 40 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-wine-black">Tulipanes</span>
                       <span>S: 10 • M: 20 • L: 30 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-wine-black">Girasoles</span>
                       <span>S: 10 • M: 20 • L: 30 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-wine-black">Gerberas</span>
                       <span>S: 10 • M: 20 • L: 30 • XL: 40 Varas</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-linen p-6 rounded-2xl">
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                    * Todas nuestras flores son de importación directa y el tamaño puede variar levemente según la temporada. Los ramos incluyen moño de seda y tarjeta personalizada.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMeasureGuide(false)}
                className="w-full mt-10 py-4 bg-burgundy text-white rounded-full text-sm font-medium shadow-xl shadow-burgundy/20 active:scale-95 transition-all"
              >
                Cerrar guía
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ProductDetail;
