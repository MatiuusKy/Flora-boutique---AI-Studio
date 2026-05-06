import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../../components/PageTransition";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Tag, 
  Package,
  MoreVertical,
  X,
  Upload,
  Info
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "draft";
  image: string;
  isFeatured?: boolean;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Ramo Rosas Luxury", price: 45990, stock: 12, category: "Rosas", status: "active", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=200&auto=format&fit=crop" },
    { id: "2", name: "Girasoles del Sol", price: 28500, stock: 4, category: "Girasoles", status: "active", image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=200&auto=format&fit=crop" },
    { id: "3", name: "Tulipanes Holanda", price: 32000, stock: 25, category: "Tulipanes", status: "draft", image: "https://images.unsplash.com/photo-1520323232431-16722bcc7158?q=80&w=200&auto=format&fit=crop" },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar Mini */}
        <aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-8 space-y-8 sticky top-0 h-screen">
          <a href="/admin" className="text-xl font-serif font-bold text-primary">F</a>
          <nav className="flex flex-col space-y-6">
            <a href="/admin" className="p-3 text-gray-400 hover:text-primary transition-colors"><Package className="w-5 h-5" /></a>
            <button className="p-3 bg-primary/5 text-primary rounded-xl"><Tag className="w-5 h-5" /></button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <a href="/admin" className="text-[10px] uppercase tracking-widest font-bold">Admin</a>
                <span className="text-sm">/</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Catálogo</span>
              </div>
              <h1 className="text-4xl font-serif italic text-gray-900">Gestión de Productos</h1>
            </div>
            
            <button 
              onClick={() => setIsAdding(true)}
              className="mt-6 md:mt-0 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium shadow-xl shadow-primary/20 flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" /> Nuevo Arreglo
            </button>
          </header>

          {/* Info Card Ads (Respuesta a la pregunta del usuario) */}
          <div className="mb-8 bg-primary/5 p-6 rounded-[2rem] border border-primary/10 flex items-start gap-4">
            <div className="bg-primary p-2 rounded-lg text-white">
              <Info className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-primary mb-1">Nota sobre Google & Meta Ads</h4>
              <p className="text-xs text-primary/80 leading-relaxed max-w-2xl">
                El tracking (medición) es gratuito de configurar. El pago es solo por la inversión publicitaria diaria cuando lances las campañas. Recomendamos empezar con presupuestos bajos para validar qué canales traen clientes más rentables.
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o SKU..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm border-none outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <select className="bg-gray-50 px-6 py-3 rounded-2xl text-sm border-none outline-none font-medium text-gray-500">
              <option>Todas las Categorías</option>
              <option>Rosas</option>
              <option>Girasoles</option>
              <option>Temporada</option>
            </select>
          </div>

          {/* Table Design */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-50">
                    <th className="px-8 py-6 font-medium">Producto</th>
                    <th className="px-8 py-6 font-medium">Categoría</th>
                    <th className="px-8 py-6 font-medium">Precio</th>
                    <th className="px-8 py-6 font-medium">Stock</th>
                    <th className="px-8 py-6 font-medium">Estado</th>
                    <th className="px-8 py-6 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                          <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{product.category}</span>
                      </td>
                      <td className="px-8 py-5 text-sm font-serif">${product.price.toLocaleString('es-CL')}</td>
                      <td className="px-8 py-5">
                        <span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-500' : 'text-gray-900'}`}>
                          {product.stock} un.
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'active' ? 'bg-green-400' : 'bg-gray-300'}`} />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            {product.status === 'active' ? 'Activo' : 'Borrador'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modern SlideOver for adding products */}
      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsAdding(false)}
               className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col pt-10"
            >
              <div className="px-10 flex justify-between items-center mb-10">
                 <div>
                   <h2 className="text-3xl font-serif italic text-gray-900 leading-none">Nuevo Arreglo</h2>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mt-2">Detalles del catálogo artesanal</p>
                 </div>
                 <button 
                  onClick={() => setIsAdding(false)}
                  className="p-3 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-10 custom-scrollbar">
                {/* Image Upload Area */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Imagen del Producto</label>
                  <div className="group relative w-full aspect-video bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center hover:bg-gray-100 transition-all cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-300 group-hover:text-primary transition-colors mb-2" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest group-hover:text-gray-600">Arrastra o haz click para subir</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Nombre</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="Ej: Rosas de Medianoche" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Categoría</label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 text-gray-500">
                      <option>Rosas</option>
                      <option>Temporada</option>
                      <option>Lujo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Precio Inicial</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                      <input type="number" className="w-full bg-gray-50 border-none rounded-2xl pl-10 pr-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="0" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Stock Actual</label>
                    <input type="number" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20" placeholder="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Descripción</label>
                  <textarea rows={4} className="w-full bg-gray-50 border-none rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Escribe los detalles del arreglo..." />
                </div>

                {/* Tags & Options */}
                <div className="space-y-4">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Etiquetas Especiales</label>
                   <div className="flex flex-wrap gap-4">
                     {['Destacado', 'Recomendado', 'Temporada', 'Edición Limitada'].map((tag) => (
                       <button 
                        key={tag}
                        className="px-5 py-2.5 rounded-full border border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:border-primary/30 hover:text-primary transition-all"
                       >
                         {tag}
                       </button>
                     ))}
                   </div>
                </div>
              </div>

              <div className="p-10 border-t border-gray-50 flex gap-6 mt-auto bg-gray-50/50">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-8 py-4 rounded-full border border-gray-100 text-sm font-medium text-gray-400 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-[2] bg-primary text-white px-8 py-4 rounded-full text-sm font-medium shadow-xl shadow-primary/20"
                >
                  Publicar en Tienda
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ProductManagement;

