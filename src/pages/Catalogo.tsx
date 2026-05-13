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
    <div className="pt-24 pb-24 bg-[#F5F4F0] min-h-screen">
      {/* New C2 — Banner contextual */}
      <div className="w-full bg-[#6B0F2B] text-white py-3 px-4 text-center text-xs md:text-sm font-medium tracking-wide">
        🚨 Día de la madre — Despacho mismo día · Pide antes de las 14:00 hrs · <Link to="#" className="underline hover:opacity-80">Ver colección →</Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-950 tracking-tighter mb-8 text-center text-[#6B0F2B]">Catálogo</h1>
        
        {/* Search */}
        <div className="max-w-xl mx-auto relative mb-12">
          <input 
            type="text" 
            placeholder="Buscar ramos, flores, regalos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#6B0F2B]/20 outline-none w-full"
          />
          <IconSearch stroke={1.5} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat ? 'bg-[#6B0F2B] text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-600">
            <span>Precio:</span>
            {["Todos", "Menos de $20.000", "$20.000-$35.000", "Más de $35.000"].map(price => (
              <button 
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`transition-colors ${selectedPrice === price ? 'text-[#6B0F2B] border-b border-[#6B0F2B]' : 'hover:text-[#6B0F2B]'}`}
              >
                {price}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-600">Color:</span>
            <div className="flex items-center gap-3">
              {COLORS.map(color => (
                <div key={color.name} className="relative group">
                  <button
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`w-6 h-6 rounded-full shadow-sm relative transition-all ${color.border || ''} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-[#6B0F2B] scale-110' : 'hover:scale-110'}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Tooltip Fix C3 */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                    {color.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 mb-8 border-b border-gray-200 pb-4">
          <p className="text-gray-500 text-[13px] mb-4 sm:mb-0">
            Mostrando {filteredProducts.length} de {products.length} arreglos
          </p>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-900 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              Ordenar por: {sortBy}
              <IconChevronDown stroke={2} className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-20 py-2 border border-gray-100"
                >
                  {["Más vendidos", "Precio: menor a mayor", "Precio: mayor a menor", "Más nuevos"].map(option => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                      className={`block w-full text-left px-4 py-3 text-[11px] font-sans font-bold uppercase tracking-widest transition-colors ${sortBy === option ? 'text-[#6B0F2B] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#6B0F2B]'}`}
                    >
                      {option} {sortBy === option && '✓'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-12">
            {filteredProducts.map((product, index) => (
              <Link 
                to={`/producto/${product.slug}`} 
                key={product.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative border border-transparent hover:border-gray-100"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-t-[12px]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Badge */}
                  {index % 3 === 0 && (
                    <div className="absolute top-3 left-3 bg-[#6B0F2B] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Destacado
                    </div>
                  )}
                  {index % 5 === 0 && (
                    <div className="absolute top-3 right-3 bg-[#EA580C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Oferta
                    </div>
                  )}
                  
                  {/* Hover Add to cart */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-[#6B0F2B] text-white py-3.5 rounded-md font-sans font-bold uppercase tracking-widest text-[11px] text-center shadow-lg hover:bg-opacity-90"
                    >
                      Agregar al carro
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-1.5">
                  <h3 className="font-sans font-medium text-[15px] text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-serif italic text-lg text-[#6B0F2B]">
                      ${product.basePrice.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      Medium
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
              <IconMoodSad stroke={1.5} className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-serif italic text-gray-900 mb-2">No encontramos arreglos con esos filtros</h3>
            <p className="text-gray-500 mb-8 max-w-sm">Prueba con otra categoría o escríbenos por WhatsApp para un diseño personalizado.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
                setSelectedPrice("Todos");
                setSelectedColor(null);
                setSortBy("Más vendidos");
              }}
              className="border-2 border-[#6B0F2B] text-[#6B0F2B] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#6B0F2B] hover:text-white transition-all"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
