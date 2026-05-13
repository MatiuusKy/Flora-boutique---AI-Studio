import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const CartContext = React.createContext<{
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, delta: number) => void;
  clearCart: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  total: number;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  favorites: [],
  toggleFavorite: () => {},
  isOpen: false,
  setIsOpen: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('flora_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('flora_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('flora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flora_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  }, []);

  const addToCart = useCallback((product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Parse price safely
      let numericPrice = 0;
      if (typeof product.price === 'string') {
        numericPrice = parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
      } else if (typeof product.price === 'number') {
        numericPrice = product.price;
      }
      
      return [...prev, { ...product, quantity: 1, price: numericPrice }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number | string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number | string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const contextValue = useMemo(() => ({ 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    favorites,
    toggleFavorite,
    isOpen, 
    setIsOpen, 
    total 
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, favorites, toggleFavorite, isOpen, total]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
};

const CartDrawer = () => {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, total } = React.useContext(CartContext);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif italic">Tu Carrito</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="w-12 h-12 mb-4" />
                  <p className="text-sm uppercase tracking-widest font-medium">El carrito está vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {(item as any).selectedSize && (
                          <span className="text-[8px] uppercase tracking-widest font-black opacity-50 block mt-1">
                            • {(item as any).selectedSize} • {(item as any).selectedColor}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center border border-[#6B0F2B] text-[#6B0F2B] rounded transition-colors hover:bg-[#6B0F2B] hover:text-white"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center border border-[#6B0F2B] text-[#6B0F2B] rounded transition-colors hover:bg-[#6B0F2B] hover:text-white"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          <span className="text-gray-400 font-normal mr-1">${item.price.toLocaleString('es-CL')} x {item.quantity} =</span>
                          ${(item.price * item.quantity).toLocaleString('es-CL')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <div className="flex justify-between items-center text-gray-900 pb-4 border-b border-gray-200/50">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Subtotal</span>
                  <span className="text-2xl font-serif italic text-[#6B0F2B]">${total.toLocaleString('es-CL')}</span>
                </div>
                <div className="pt-3 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full bg-[#6B0F2B] text-white py-[14px] rounded-full font-medium shadow-xl shadow-[#6B0F2B]/20 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    Finalizar compra
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="w-full bg-transparent border border-[#6B0F2B] text-[#6B0F2B] py-[14px] rounded-full font-medium flex items-center justify-center transition-all hover:bg-gray-50 text-sm"
                  >
                    Seguir comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
