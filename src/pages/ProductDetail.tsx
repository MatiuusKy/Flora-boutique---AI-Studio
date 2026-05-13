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
      <div className="min-h-screen bg-secondary-neutral/10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Main Image Gallery-like Sticky Side */}
          <div className="lg:sticky lg:top-40 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] overflow-hidden rounded-[4rem] bg-white shadow-[0_50px_100px_-20px_rgba(88,10,45,0.1)] relative"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => toggleFavorite(Number(product.id))}
                className="absolute top-10 right-10 p-5 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl hover:bg-white transition-all transform active:scale-90"
              >
                <HeartIcon className={`w-6 h-6 transition-colors ${isProductFavorite ? 'fill-primary-custom text-primary-custom' : 'text-gray-400'}`} />
              </button>
            </motion.div>
            
            {/* Small info badge */}
            <div className="flex gap-6 p-10 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary-custom/5 flex items-center justify-center">
                <IconSparkles className="w-6 h-6 text-primary-custom" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-custom">Edición Limitada Fleur</p>
                <p className="text-sm text-gray-500 font-light italic">Diseño exclusivo de Flora Atelier para esta temporada.</p>
              </div>
            </div>
          </div>

          {/* Configuration Side */}
          <div className="space-y-12">
            <div>
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-10 hover:text-primary-custom transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Volver al Atelier
              </button>
              <p className="text-primary-custom font-bold text-xs tracking-[0.6em] uppercase mb-4">{product.category}</p>
              <h1 className="text-6xl md:text-7xl font-serif italic text-gray-900 leading-[0.9] tracking-tighter">{product.name}</h1>
              <div className="flex items-baseline gap-6 mt-8">
                 <p className="text-5xl text-primary-custom font-serif italic tracking-tighter">${totalPrice.toLocaleString('es-CL')}</p>
                 {currentSize?.extraPrice ? (
                   <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Base + ${currentSize.extraPrice.toLocaleString('es-CL')}</span>
                 ) : null}
              </div>
            </div>

            <div className="p-10 bg-white rounded-[3rem] border border-gray-50 shadow-sm">
              <p className="text-gray-500 leading-relaxed text-lg font-light italic">
                "{product.description}"
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-8">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Dimensión de la Obra</h3>
                <button 
                  onClick={() => setShowMeasureGuide(true)}
                  className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary-custom flex items-center gap-1 hover:underline"
                >
                  Colección Guía <Info className="w-3 h-3" />
                </button>
              </div>
              <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="flex gap-4 w-max">
                  {flowerSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`py-4 px-6 rounded-full border-2 transition-all flex flex-col items-center justify-center min-w-[100px] shrink-0 snap-start ${
                        selectedSize === size.value 
                          ? 'border-[#6B0F2B] bg-[#FBF0F3] shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-[#6B0F2B]/50'
                      }`}
                    >
                      <span className={`text-sm font-bold uppercase tracking-widest ${selectedSize === size.value ? 'text-[#6B0F2B]' : 'text-gray-900'}`}>
                        {size.label}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">{size.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color Selector */}
            {flowerColors.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 px-4">Paleta Cromática</h3>
                <div className="flex flex-wrap gap-5 p-4 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm">
                  {flowerColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="group relative"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-500 ${
                          selectedColor === color.name ? 'border-primary-custom scale-125 shadow-xl' : 'border-white shadow-inner'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <AnimatePresence>
                        {selectedColor === color.name && (
                          <motion.span 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] font-black text-primary-custom whitespace-nowrap"
                          >
                            {color.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA's */}
            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-[2] flex items-center justify-center gap-4 py-8 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all transform active:scale-95 shadow-[0_30px_60px_-15px_rgba(88,10,45,0.3)] ${
                  isAdded 
                    ? 'bg-green-600 text-white shadow-green-200' 
                    : 'bg-primary-custom text-white hover:brightness-110'
                }`}
              >
                {isAdded ? (
                  <>Adquirido <Check className="w-6 h-6" /></>
                ) : (
                  <>Reservar ahora <ShoppingBag className="w-6 h-6" /></>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-12 grid grid-cols-2 gap-8 border-t border-gray-100">
               <div className="space-y-2">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Moño de Seda</p>
                 <p className="text-[9px] text-gray-400 font-medium">Incluido en todos nuestros ramos premium.</p>
               </div>
               <div className="space-y-2">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Tarjeta Artesanal</p>
                 <p className="text-[9px] text-gray-400 font-medium">Personalizada con tu mensaje manuscrito.</p>
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
                <button onClick={() => setShowMeasureGuide(false)} className="p-2 hover:bg-gray-50 rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Nuestros Formatos</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm font-light text-gray-600">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-gray-900">Rosas</span>
                       <span>XS: 10 • S: 20 • M: 50 • L: 80 • XL: 100 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-gray-900">Astromelias</span>
                       <span>S: 10 • M: 20 • L: 30 • XL: 40 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-gray-900">Tulipanes</span>
                       <span>S: 10 • M: 20 • L: 30 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-gray-900">Girasoles</span>
                       <span>S: 10 • M: 20 • L: 30 Varas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                       <span className="font-bold text-gray-900">Gerberas</span>
                       <span>S: 10 • M: 20 • L: 30 • XL: 40 Varas</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                    * Todas nuestras flores son de importación directa y el tamaño puede variar levemente según la temporada. Los ramos incluyen moño de seda y tarjeta personalizada.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMeasureGuide(false)}
                className="w-full mt-10 py-4 bg-[#6B0F2B] text-white rounded-full text-sm font-medium shadow-xl shadow-[#6B0F2B]/20 active:scale-95 transition-all"
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
