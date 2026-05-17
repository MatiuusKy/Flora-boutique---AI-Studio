import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function DemoEmail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order') || location.state?.orderId || 'FL-1499025';

  return (
    <div className="min-h-screen bg-[#FBF0F3] p-8 flex flex-col items-center">
      
      <div className="w-full max-w-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative border border-gray-100 rounded-xl overflow-hidden">
        
        <div className="text-white p-12 text-center h-48 flex items-center justify-center border-b border-gray-100" style={{ backgroundColor: '#580A2D' }}>
           <img 
              src="/logo_transparente.png" 
              alt="Flora Boutique" 
              className="max-h-32 object-contain"
           />
        </div>
        
        <div className="px-12 py-16 text-center space-y-8 h-full min-h-[400px]">
          <h2 className="text-xl font-bold font-sans text-gray-900 tracking-tight">¡Hola!</h2>
          
          <h3 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Hemos generado un número de orden</h3>
          
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">El número de tu orden es:</p>
            <p className="text-xl font-bold text-burgundy">#{orderId}</p>
          </div>

          <div className="pt-8 space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Estamos validando el pago de tu compra</h3>
            
            <p className="text-sm font-medium text-gray-700 pt-4">¿Aún no subes los comprobantes?</p>
            <p className="text-sm font-medium text-gray-700">hazlo aquí: <Link to={`/transferencia?order=${orderId}`} className="text-burgundy font-bold underline hover:text-wine-black transition-colors">subir comprobantes</Link></p>
            
            <div className="pt-6">
               <p className="text-sm text-gray-700 font-medium tracking-tight">Hazlo <span className="font-bold">antes de 3 horas</span> para evitar la cancelación del pedido</p>
               <p className="text-sm text-gray-700 font-medium tracking-tight">Si ya los subiste, validaremos el pago y te confirmaremos por email.</p>
            </div>
            
            <div className="pt-10">
               <p className="text-sm text-gray-900 font-bold">¡Saludos de la gran familia Flora Boutique!</p>
               <p className="text-[10px] text-gray-400 mt-4">Este es un email generado automáticamente. Por favor no responder.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
