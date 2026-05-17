import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const BANK_DETAILS = {
  destinatario: "Flora Boutique LTDA.",
  rut: "76.892.123-K",
  cuentaAlternativas: [
    "Banco Santander - Cuenta corriente 61799540",
    "Banco Estado - Cuenta corriente 1733851",
    "Banco BCI - Cuenta corriente 86066854",
    "Banco Chile - Cuenta corriente 1594581405"
  ],
  email: "contacto.florabtq@gmail.com",
};

export default function TransferReceipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order') || location.state?.orderId;
  const [order, setOrder] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('flora_orders') || '[]');
    const foundOrder = orders.find((o: any) => o.id === orderId);
    
    if (foundOrder) {
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
  }, [orderId]);

  if (!order) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSave = () => {
    // In a real app, upload files to server
    setIsSaved(true);
    setTimeout(() => {
       navigate('/success', { state: { orderId } });
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-warm-white pb-24 pt-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-serif text-burgundy mb-2 font-bold tracking-tight">Subir comprobantes de orden #{order.id}</h1>
                <p className="text-gray-900 font-medium text-sm">Validaremos y procesaremos tu pedido a la brevedad.</p>
              </div>
              <button 
                onClick={() => window.open(`/demo-email?order=${order.id}`, '_blank')}
                className="bg-wine-black text-[11px] font-bold tracking-widest uppercase text-white px-4 py-2 hover:bg-black transition-colors rounded-full shrink-0"
              >
                Ver Email de confirmación
              </button>
            </div>

            <div className="bg-white p-8 rounded-[1rem] shadow-[0_2px_10px_rgba(0,0,0,0.05)] space-y-6">
               <h3 className="text-lg font-bold font-sans text-gray-900">Adjunta tu comprobante:</h3>
               <p className="text-gray-900 text-sm font-medium">
                 Haz la transferencia a los datos indicados y adjunta el comprobante aquí para procesar tu pedido.
               </p>

               <div className="mt-8">
                 <div 
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onDrop={handleDrop}
                   className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${isDragging ? 'border-burgundy bg-burgundy/5' : 'border-gray-200 bg-white'}`}
                 >
                   <div className="space-y-4">
                     <label className="cursor-pointer inline-block border-2 border-burgundy text-burgundy px-10 py-3 font-semibold text-sm hover:bg-burgundy hover:text-white transition-colors">
                       Subir archivos
                       <input type="file" multiple className="hidden" onChange={handleFileChange} accept="application/pdf,image/jpeg,image/png" />
                     </label>
                     <p className="text-xs text-gray-500 font-medium">Puedes arrastrar tus archivos aquí.<br/>El formato puede ser: pdf, jpg, jpeg, png. El peso máximo es de 10 MB.</p>
                   </div>
                 </div>

                 {files.length > 0 && (
                   <div className="mt-6 space-y-2">
                     <h4 className="text-sm font-bold text-gray-900 mb-3">Archivos adjuntos:</h4>
                     {files.map((f, i) => (
                       <div key={i} className="flex items-center justify-between bg-gray-50 p-4 border border-gray-100 rounded shadow-sm">
                         <span className="text-sm truncate text-gray-900 font-medium">{f.name}</span>
                         <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                       </div>
                     ))}
                   </div>
                 )}
               </div>

               <div className="pt-6 flex justify-center">
                 <button 
                   onClick={handleSave} 
                   disabled={files.length === 0 || isSaved} 
                   className={`flex items-center justify-center gap-3 w-full py-4 font-semibold text-[14px] transition-all
                     ${files.length > 0 && !isSaved 
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                        : isSaved ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                 >
                   {isSaved ? 'Comprobantes enviados' : 'Guardar comprobantes'}
                 </button>
               </div>
            </div>
          </div>

          <aside className="w-full lg:w-1/3">
             <div className="bg-white p-8 rounded-[1rem] shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-32">
                <h3 className="text-[17px] font-bold font-sans text-burgundy mb-6">Datos para transferir a {BANK_DETAILS.destinatario}</h3>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                
                <div className="space-y-6">
                   <div>
                     <p className="text-xs font-bold text-gray-900 mb-1">Monto total a transferir:</p>
                     <p className="text-2xl font-bold text-burgundy tracking-tight">${order.total.toLocaleString('es-CL')}</p>
                     <p className="text-[10px] text-gray-500 mt-1 font-medium leading-tight">Este monto puede estar asociado a un comprobante o a la suma de ellos.</p>
                   </div>

                   <div>
                     <p className="text-xs font-bold text-gray-900 mb-1">Destinatario:</p>
                     <p className="text-sm text-gray-700">{BANK_DETAILS.destinatario}</p>
                   </div>

                   <div>
                     <p className="text-xs font-bold text-gray-900 mb-1">RUT:</p>
                     <p className="text-sm text-gray-700">{BANK_DETAILS.rut}</p>
                   </div>

                   <div>
                     <p className="text-xs font-bold text-gray-900 mb-1">Cuenta de destino (alternativas posibles):</p>
                     <ul className="text-sm text-gray-700 space-y-1">
                       {BANK_DETAILS.cuentaAlternativas.map((c, i) => <li key={i}>{c}</li>)}
                     </ul>
                   </div>

                   <div>
                     <p className="text-xs font-bold text-gray-900 mb-1">E-mail:</p>
                     <p className="text-sm text-gray-700">{BANK_DETAILS.email}</p>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
