import { useEffect, useContext, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../components/Cart";
import PageTransition from "../components/PageTransition";
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Mail, 
  MessageCircle,
} from "lucide-react";
import { generatePDF } from "../lib/orderServices";

const Success = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Only run this once or when orderId changes
    const orders = JSON.parse(localStorage.getItem('flora_orders') || '[]');
    const foundOrder = orders.find((o: any) => o.id === orderId);
    
    if (foundOrder) {
      // Use a functional update or check to avoid loop
      setOrder((prev: any) => {
        if (prev?.id === foundOrder.id) return prev;
        return foundOrder;
      });
    } else if (!orderId && orders.length > 0) {
      setOrder((prev: any) => {
        if (prev?.id === orders[0].id) return prev;
        return orders[0];
      });
    }

    // Only clear once
    if (orderId && cart.length > 0) {
      clearCart();
    }
  }, [orderId, clearCart, cart.length]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f9] p-6 text-center">
        <h2 className="text-2xl font-serif italic mb-4">No encontramos los detalles de tu orden</h2>
        <button onClick={() => navigate('/')} className="text-primary font-bold uppercase tracking-widest text-xs">Volver a la tienda</button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf8f9] pt-24 pb-20 px-6 flex flex-col items-center">
        
        <header className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-200"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-serif italic text-gray-900">¡Gracias por tu pedido!</h1>
          <p className="text-sm text-gray-400 mt-2 font-medium tracking-[0.2em] uppercase">Tu regalo artesanal está en preparación</p>
        </header>

        <main className="w-full max-w-2xl">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            id="order-receipt"
            className="bg-white rounded-[3rem] shadow-2xl shadow-primary/10 overflow-hidden relative"
          >
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-[#faf8f9] rounded-full border-r border-gray-100 z-10 hidden md:block" />
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#faf8f9] rounded-full border-l border-gray-100 z-10 hidden md:block" />
            
            <div className="p-10 md:p-14 border-b-2 border-dashed border-gray-100 relative">
               <div className="flex justify-between items-start mb-10">
                 <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Orden de Compra</p>
                   <p className="text-2xl font-serif italic text-primary">{order.id}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Estado</p>
                   <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">Pago Confirmado</span>
                 </div>
               </div>

               <div className="space-y-6">
                 {order.items.map((item: any) => (
                   <div key={item.id} className="flex justify-between items-center text-sm">
                     <div className="flex gap-4">
                       <span className="text-gray-400 font-bold">x{item.quantity}</span>
                       <span className="text-gray-700">{item.name}</span>
                     </div>
                     <span className="font-serif italic text-gray-900">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                   </div>
                 ))}
               </div>

               <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-end">
                 <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Pagado</p>
                   <p className="text-4xl font-serif italic text-gray-900 leading-tight">${order.total.toLocaleString('es-CL')}</p>
                 </div>
                 <button 
                  onClick={() => generatePDF('order-receipt', `Comprobante-${order.id}.pdf`)}
                  className="p-4 bg-gray-50 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all group"
                >
                   <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                 </button>
               </div>
            </div>

            <div className="p-10 md:p-14 bg-gray-50/30">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex gap-4">
                   <div className="p-3 bg-white rounded-2xl border border-gray-100 text-primary">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Confirmación Email</p>
                     <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">Boleta y detalles enviados a {order.email}.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="p-3 bg-white rounded-2xl border border-gray-100 text-[#25D366]">
                     <MessageCircle className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Seguimiento WhatsApp</p>
                     <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">Recibirás fotos de tu ramo el {order.deliveryDate}.</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

          <div className="mt-12 flex flex-col md:flex-row gap-6">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 bg-white border border-gray-100 px-8 py-5 rounded-full text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all flex items-center justify-center gap-3"
            >
              Volver al inicio
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-primary text-white px-8 py-5 rounded-full text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"
            >
              Imprimir Recibo <Printer className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Success;
