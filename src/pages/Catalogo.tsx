import React, { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconChevronDown, IconMoodSad } from "@tabler/icons-react";
import { CartContext } from "../components/Cart";
import { products } from "../data/products";

// Helper to check if string contains term
const matches = (text: string, term: string) => text.toLowerCase().includes(term.toLowerCase());

const CATEGORIES = ["Todos", "Amor", "Bodas & Eventos", "Condolencias", "Cumpleaños", "Día de la madre", "Nacimientos", "Ramos"];
const COLORS = [
  { name: 'Rojo', hex: '#E53E3E' },
  { name: 'Rosado', hex: '#ED64A6' },
  { name: 'Blanco', hex: '#FFFFFF', border: 'border-gray-200' },
  { name: 'Amarillo', hex: '#ECC94B' },
  { name: 'Naranja', hex: '#ED8936' },
  { name: 'Morado', hex: '#9F7AEA' },
  { name: 'Verde', hex: '#48BB78' },
];

export default function Catalogo() {
  const { addToCart, setIsOpen } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPrice, setSelectedPrice] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Más vendidos");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Extend mock products slightly to fit new categories if we want, or just mock the logic.
  // We'll mock the filter logic: since products don't have "Amor" natively, we will fake it or just let "Todos" be the only working one for demo.
  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(p => matches(p.name, searchTerm) || matches(p.description, searchTerm));
    }
    
    // Price filter
    if (selectedPrice === "Menos de $20.000") {
      result = result.filter(p => p.basePrice < 20000);
    } else if (selectedPrice === "$20.000-$35.000") {
      result = result.filter(p => p.basePrice >= 20000 && p.basePrice <= 35000);
    } else if (selectedPrice === "Más de $35.000") {
      result = result.filter(p => p.basePrice > 35000);
    }

    // Color filter (mocking since products don't have color)
    if (selectedColor) {
      // Just filter randomly or pass to show something
      result = result.filter((_, i) => i % 2 !== 0); 
    }

    // Category filter (mocking)
    if (selectedCategory !== "Todos") {
      result = result.filter(p => true); // Show all to avoid empty states for mock, or actual filter if we had it
    }

    // Sort
    if (sortBy === "Precio: menor a mayor") {
      result = [...result].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "Precio: mayor a menor") {
      result = [...result].sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "Más nuevos") {
      result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [searchTerm, selectedCategory, selectedPrice, selectedColor, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.basePrice, quantity: 1, image: product.image });
    setIsOpen(true);
  };

  return (
    <div className="pt-24 pb-24 bg-warm-white min-h-screen">
      {/* New C2 — Banner contextual */}
      <div className="w-full bg-[#1A1A1A] text-white py-2.5 px-4 text-center text-[10px] md:text-[11px] font-sans font-bold tracking-[0.2em] uppercase">
        Despacho mismo día en Providencia y Las Condes · Pide antes de las 14:00 hrs
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-20">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif italic text-wine-black tracking-tighter mb-4 text-center">Catálogo de Flores y Arreglos Florales</h1>
          <p className="text-center text-gray-500 font-light max-w-lg mx-auto text-sm md:text-base">Descubre nuestra exclusiva colección botánica. Elaboramos arreglos florales artesanales en Santiago, ideales para regalos, aniversarios, y matrimonios con despacho a todo el sector oriente y centro.</p>
        </header>

        {/* Search */}
        <div className="max-w-md mx-auto relative mb-12">
          <input 
            type="text" 
            placeholder="Buscar ramos, flores, regalos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-6 py-3 border-b border-gray-200 bg-transparent focus:border-wine-black outline-none transition-colors text-sm font-light italic"
          />
          <IconSearch stroke={1} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-10 mb-16 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  selectedCategory === cat ? 'bg-wine-black text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-wine-black border border-gray-200 hover:border-wine-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">Rango</span>
              {["Todos", "Menos de $20.000", "$20.000-$35.000", "Más de $35.000"].map(price => (
                <button 
                  key={price}
                  onClick={() => setSelectedPrice(price)}
                  className={`text-[11px] font-medium tracking-wide transition-colors ${selectedPrice === price ? 'text-wine-black border-b border-wine-black' : 'text-gray-400 hover:text-wine-black'}`}
                >
                  {price}
                </button>
              ))}
            </div>

            <div className="hidden md:block w-px h-6 bg-gray-200"></div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">Tono</span>
              <div className="flex items-center gap-3">
                {COLORS.map(color => (
                  <div key={color.name} className="relative group">
                    <button
                      onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                      className={`w-5 h-5 rounded-full shadow-inner relative transition-all ${color.border || ''} ${selectedColor === color.name ? 'ring-1 ring-offset-2 ring-wine-black scale-110' : 'hover:scale-110'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-wine-black text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 flex items-center justify-center">
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-wine-black rotate-45"></span>
                      <span className="relative z-10">{color.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 mb-10 pb-4">
          <p className="text-gray-400 text-xs font-light italic tracking-wide mb-4 sm:mb-0">
            {filteredProducts.length} creaciones disponibles
          </p>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-wine-black transition-opacity hover:opacity-70"
            >
              Filtro: {sortBy}
              <IconChevronDown stroke={1} className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-4 w-56 bg-white shadow-2xl z-20 py-2 border border-gray-100"
                >
                  {["Más vendidos", "Precio: menor a mayor", "Precio: mayor a menor", "Más nuevos"].map(option => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                      className={`block w-full text-left px-5 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.1em] transition-colors ${sortBy === option ? 'text-wine-black bg-linen/50' : 'text-gray-400 hover:bg-linen hover:text-wine-black'}`}
                    >
                      {option} {sortBy === option && '·'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-x-12 md:gap-y-16">
            {filteredProducts.map((product, index) => (
              <Link 
                to={`/producto/${product.slug}`} 
                key={product.id}
                className="group flex flex-col items-center text-center transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white w-full shadow-sm mb-5 group-hover:shadow-xl transition-shadow duration-500">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Badge */}
                  {index % 3 === 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-wine-black text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
                      Recomendado
                    </div>
                  )}
                  {index % 5 === 0 && (
                    <div className="absolute top-4 right-4 bg-burgundy/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
                      Nuevo
                    </div>
                  )}
                  
                  {/* Hover Add to cart */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-wine-black text-white py-3 font-sans font-bold uppercase tracking-[0.2em] text-[9px] text-center shadow-lg hover:bg-black transition-colors"
                    >
                      Añadir a la bolsa
                    </button>
                  </div>
                </div>
                
                <h3 className="font-serif italic text-lg md:text-xl text-wine-black leading-tight mb-1 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <span className="text-sm text-gray-500 font-light">
                  ${product.basePrice.toLocaleString('es-CL')}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <IconMoodSad stroke={1} className="w-16 h-16 text-gray-200 mb-6" />
            <h3 className="text-3xl font-serif italic text-wine-black mb-3">Colección no encontrada</h3>
            <p className="text-gray-400 mb-8 max-w-sm font-light text-sm">Explora otras categorías o contáctanos para un diseño a medida en nuestro taller.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
                setSelectedPrice("Todos");
                setSelectedColor(null);
                setSortBy("Más vendidos");
              }}
              className="border-b border-wine-black text-wine-black pb-1 font-bold uppercase tracking-[0.15em] text-[10px] hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
