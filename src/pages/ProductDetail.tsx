import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../components/PageTransition";
import { analytics } from "../lib/analytics";
import { useEffect, useContext, useState, useMemo } from "react";
import { CartContext } from "../components/Cart";
import { Check, ShoppingBag, Sparkles, Heart as HeartIcon, ChevronLeft, Info } from "lucide-react";
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
      <div className="min-h-screen bg-bg-base pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Main Image Gallery-like Sticky Side */}
          <div className="lg:sticky lg:top-32 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] overflow-hidden rounded-[3rem] bg-white shadow-2xl relative"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => toggleFavorite(Number(product.id))}
                className="absolute top-8 right-8 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all transform active:scale-90"
              >
                <HeartIcon className={`w-5 h-5 transition-colors ${isProductFavorite ? 'fill-primary text-primary' : 'text-gray-400'}`} />
              </button>
            </motion.div>
            
            {/* Small info badge */}
            <div className="flex gap-4 p-6 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Edición Limitada</p>
                <p className="text-xs text-gray-500 font-light">Diseño exclusivo de Flora Boutique para esta temporada.</p>
              </div>
            </div>
          </div>

          {/* Configuration Side */}
          <div className="space-y-12">
            <div>
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Volver a la boutique
              </button>
              <p className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-4">{product.category}</p>
              <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight tracking-tight">{product.name}</h1>
              <div className="flex items-baseline gap-4 mt-6">
                 <p className="text-4xl text-primary font-serif italic">${totalPrice.toLocaleString('es-CL')}</p>
                 {currentSize?.extraPrice ? (
                   <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Base + ${currentSize.extraPrice.toLocaleString('es-CL')}</span>
                 ) : null}
              </div>
            </div>

            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed text-sm font-light italic">
                "{product.description}"
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Seleccionar Tamaño</h3>
                <button 
                  onClick={() => setShowMeasureGuide(true)}
                  className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  Guía de medidas <Info className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {flowerSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                      selectedSize === size.value 
                        ? 'border-primary bg-primary/[0.02]' 
                        : 'border-white bg-white hover:border-gray-100'
                    }`}
                  >
                    <span className={`text-xs font-bold uppercase tracking-widest ${selectedSize === size.value ? 'text-primary' : 'text-gray-900'}`}>
                      Tamaño {size.label}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{size.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {flowerColors.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 px-2">Seleccionar Tono</h3>
                <div className="flex flex-wrap gap-4 p-2">
                  {flowerColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="group relative"
                    >
                      <div 
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name ? 'border-primary scale-110 shadow-lg' : 'border-transparent shadow-sm'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <AnimatePresence>
                        {selectedColor === color.name && (
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest font-bold text-primary whitespace-nowrap"
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
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-[2] flex items-center justify-center gap-3 py-6 rounded-full font-bold uppercase tracking-widest text-xs transition-all transform active:scale-95 shadow-2xl ${
                  isAdded 
                    ? 'bg-green-600 text-white shadow-green-200' 
                    : 'bg-primary text-white shadow-primary/30 hover:brightness-110'
                }`}
              >
                {isAdded ? (
                  <>¡Añadido! <Check className="w-5 h-5" /></>
                ) : (
                  <>Añadir al Carrito <ShoppingBag className="w-5 h-5" /></>
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
                  <Info className="w-5 h-5 text-gray-400 rotate-180" />
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
                className="w-full mt-10 py-5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Entendido
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ProductDetail;
