import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartContext } from "../components/Cart";
import PageTransition from "../components/PageTransition";
import { 
  ChevronLeft, 
  AlertCircle,
  CheckCircle2,
  Check,
  Lock,
  Mail,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { IconShieldCheck, IconTruckDelivery } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { validateRut, formatRut } from "../lib/rutUtils";
import { supabase } from "../lib/supabase";
import { formatDate } from "../lib/utils";

const SANTIAGO_COMUNAS = [
  "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", 
  "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", 
  "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", 
  "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", 
  "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", 
  "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura"
].sort();

// Labels Style Utility
const labelStyle = "text-[11px] uppercase tracking-[0.08em] font-sans font-bold text-gray-500 block px-1 mb-1.5";

const InputField = ({ label, name, placeholder, type = "text", fullWidth = false, value, onChange, onBlur, error, success, prefix, icon: Icon, maxLength }: any) => (
  <div className={`space-y-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <label className={labelStyle}>
      {label}
    </label>
    <div className="relative group">
      {prefix && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 pointer-events-none z-10">
          {prefix}
        </span>
      )}
      {Icon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Icon className="w-5 h-5" />
        </span>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur && onBlur(name, value)}
        maxLength={maxLength}
        className={`w-full bg-white border-2 px-5 py-4 text-sm rounded-2xl transition-all outline-none font-sans ${prefix ? 'pl-16' : ''} ${Icon ? 'pl-14' : ''} ${
          error 
            ? 'border-red-200 focus:border-red-400 bg-red-50/10' 
            : success
              ? 'border-[#16a34a] focus:border-[#16a34a] bg-green-50/10'
              : 'border-gray-200 focus:border-[#6B0F2B] hover:border-gray-300'
        }`}
      />
      {success && !error && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#16a34a] pointer-events-none">
          <CheckCircle2 className="w-5 h-5" />
        </span>
      )}
    </div>
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex items-center gap-1.5 text-red-500 mt-1.5 px-2"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SelectField = ({ label, name, options, value, onChange, error, fullWidth = false }: any) => (
  <div className={`space-y-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <label className={labelStyle}>
      {label}
    </label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-white border-2 px-5 py-4 text-sm rounded-2xl transition-all outline-none appearance-none cursor-pointer font-sans ${
          error 
            ? 'border-red-200 focus:border-red-400 bg-red-50/10' 
            : 'border-gray-200 focus:border-[#6B0F2B] hover:border-gray-300'
        }`}
      >
        <option value="">Seleccionar comuna...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex items-center gap-1.5 text-red-500 mt-1.5 px-2"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const CustomDatePicker = ({ selectedDate, onSelect, error }: { selectedDate: string, onSelect: (d: string) => void, error: string }) => {
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { date: d, disabled: i === 0 };
  });

  const getDayName = (d: Date) => d.toLocaleDateString('es-CL', { weekday: 'short' });
  const getDayNum = (d: Date) => d.getDate();
  const getMonthName = (d: Date) => d.toLocaleDateString('es-CL', { month: 'short' });

  return (
    <div className="w-full space-y-1 relative">
      <label className={labelStyle}>Fecha de Entrega</label>
      <div className="overflow-x-auto pb-4 hide-scrollbar px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex gap-3 w-max pr-6">
          {dates.map((item, i) => {
            const dateStr = item.date.toISOString().split('T')[0];
            const isSelected = selectedDate === dateStr;
            const disabled = item.disabled;

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && onSelect(dateStr)}
                className={`flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl border-2 transition-all shrink-0 font-sans ${
                  disabled
                    ? 'opacity-35 cursor-not-allowed border-gray-200 bg-gray-50'
                    : isSelected 
                      ? 'border-[#6B0F2B] bg-[#FBF0F3] shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-[#6B0F2B] hover:bg-gray-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold ${isSelected && !disabled ? 'text-[#6B0F2B]' : 'text-gray-400'}`}>
                  {getDayName(item.date)}
                </span>
                <span className={`text-2xl font-serif mt-1 ${isSelected && !disabled ? 'text-[#6B0F2B]' : 'text-gray-900'}`}>
                  {getDayNum(item.date)}
                </span>
                <span className={`text-[10px] uppercase font-bold ${isSelected && !disabled ? 'text-[#6B0F2B]' : 'text-gray-400'}`}>
                  {getMonthName(item.date)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-red-500 px-2 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const STEPS = [
  { id: 1, title: 'Contacto' },
  { id: 2, title: 'Entrega' },
  { id: 3, title: 'Dirección' },
  { id: 4, title: 'Pago' },
  { id: 5, title: 'Confirmación' },
];

const Checkout = () => {
  const { cart, total } = useContext(CartContext);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [session, setSession] = useState<any>(null);
  
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    depto: "",
    comuna: "",
    fechaEntrega: "",
    mensaje: ""
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'retiro'>('domicilio');
  const [paymentMethod, setPaymentMethod] = useState<'webpay' | 'mercadopago' | 'transferencia'>('webpay');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const shippingCost = deliveryMethod === 'domicilio' ? 5000 : 0;
  const finalTotal = total + shippingCost;

  useEffect(() => {
    const savedData = localStorage.getItem('flora_checkout_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.deliveryMethod) setDeliveryMethod(parsed.deliveryMethod);
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flora_checkout_data', JSON.stringify({
      formData,
      deliveryMethod,
      paymentMethod
    }));
  }, [formData, deliveryMethod, paymentMethod]);

  const handleBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'rut') {
      const formattedEntry = formatRut(value);
      if (!validateRut(formattedEntry)) {
        setErrors(prev => ({ ...prev, rut: 'RUT inválido. Formato: 12.345.678-9' }));
      }
    }
  };

  // Real-time RUT formatting & other inputs
  const handleInputChange = (name: string, value: string) => {
    let val = value;
    if (name === 'rut') {
      val = formatRut(value);
      setErrors(prev => { const e = {...prev}; delete e.rut; return e; });
    } else if (name === 'telefono') {
      val = val.replace(/\D/g, '').slice(0, 8);
      if (val.length === 8) {
        setErrors(prev => { const e = {...prev}; delete e.telefono; return e; });
      }
    } else {
      if (value.trim()) {
         setErrors(prev => { const e = {...prev}; delete e[name]; return e; });
      }
    }
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const validateStep = (step: number) => {
    let newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.rut) newErrors.rut = "Obligatorio";
      else if (!validateRut(formData.rut)) newErrors.rut = "RUT Inválido";
      
      if (!formData.nombre) newErrors.nombre = "Obligatorio";
      
      if (!formData.email) newErrors.email = "Obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
      
      if (!formData.telefono) newErrors.telefono = "Obligatorio";
      else if (formData.telefono.length < 8) newErrors.telefono = "Faltan dígitos";
    }
    
    if (step === 3) {
      if (deliveryMethod === 'domicilio') {
        if (!formData.direccion) newErrors.direccion = "Obligatorio";
        if (!formData.comuna) newErrors.comuna = "Obligatorio";
      }
      if (!formData.fechaEntrega) newErrors.fechaEntrega = "Debes seleccionar una fecha";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(1) && validateStep(3)) {
      setIsSubmitting(true);
      try {
        const orderId = `FL-${Math.floor(Math.random() * 90000) + 10000}`;
        const newOrder = {
          id: orderId,
          customer: formData.nombre,
          email: formData.email,
          total: finalTotal,
          deliveryMethod,
          shippingCost,
          date: new Date().toISOString(),
          status: "Pagado",
          items: cart,
          deliveryDate: formData.fechaEntrega,
        };
        const existingOrders = JSON.parse(localStorage.getItem('flora_orders') || '[]');
        localStorage.setItem('flora_orders', JSON.stringify([newOrder, ...existingOrders]));
        
        await new Promise(r => setTimeout(r, 2000));
        setIsSubmitting(false);
        navigate('/success', { state: { orderId } });
      } catch (err) {
        setIsSubmitting(false);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
        <h2 className="text-3xl font-serif italic mb-4 text-[#6B0F2B]">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/')} className="bg-[#6B0F2B] text-white px-10 py-4 rounded-full font-medium">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6 font-sans">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#6B0F2B] z-[100] flex flex-col items-center justify-center text-white">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-white border-t-white/20 rounded-full mb-6" />
               <h2 className="text-2xl font-serif italic mb-2">Procesando pago...</h2>
               <p className="text-[11px] uppercase tracking-[0.08em] opacity-70">Conectando con pasarela segura</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto flex gap-12 flex-col lg:flex-row">
          
          {/* Main Content Form */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <header className="mb-10">
              <button onClick={() => navigate('/carrito')} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-gray-500 hover:text-[#6B0F2B] transition-colors mb-6">
                <ChevronLeft className="w-4 h-4" /> Volver al Carro
              </button>
              <h1 className="text-4xl font-serif italic text-gray-900">Finalizar Pedido</h1>
            </header>

            {/* Stepper Horizontal */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 top-4 w-full h-[2px] bg-gray-200 -z-10" />
              <div className="absolute left-0 top-4 h-[2px] bg-[#6B0F2B] -z-10 transition-all duration-500" style={{ width: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }} />
              
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;
                const isCompleted = activeStep > step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      isActive ? 'bg-[#6B0F2B] text-white ring-4 ring-[#FBF0F3]' : 
                      isCompleted ? 'bg-[#6B0F2B] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.08em] font-bold hidden sm:block ${isActive ? 'text-[#6B0F2B]' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form Steps */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              
              {/* STEP 1: CONTACTO */}
              {activeStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-serif italic text-[#6B0F2B] mb-6">Información de Contacto</h2>
                  <div className="flex flex-col gap-6">
                    <InputField label="RUT" name="rut" placeholder="12.345.678-9" value={formData.rut} onChange={handleInputChange} onBlur={handleBlur} error={errors.rut} success={validateRut(formData.rut)} maxLength={12} />
                    <InputField label="Nombre completo" name="nombre" placeholder="Josefina Pérez" value={formData.nombre} onChange={handleInputChange} error={errors.nombre} />
                    <InputField label="Email" name="email" type="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={handleInputChange} error={errors.email} />
                    <InputField label="WhatsApp" name="telefono" placeholder="1234 5678" prefix="+56 9" value={formData.telefono} onChange={handleInputChange} error={errors.telefono} maxLength={8} />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: METODO DE ENTREGA */}
              {activeStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-serif italic text-[#6B0F2B] mb-6">Método de entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setDeliveryMethod('domicilio')}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all ${deliveryMethod === 'domicilio' ? 'border-[#6B0F2B] bg-[#FBF0F3]' : 'border-gray-200 bg-white hover:border-[#6B0F2B]/50'}`}
                    >
                      <div className="absolute top-6 right-6">
                        {deliveryMethod === 'domicilio' ? (
                          <div className="w-6 h-6 rounded-full bg-[#6B0F2B] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-[#6B0F2B]" />
                        )}
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><IconTruckDelivery className="w-6 h-6 text-[#6B0F2B]"/></div>
                      </div>
                      <h3 className="text-sm uppercase tracking-[0.08em] font-bold text-gray-900 mb-1">Despacho a domicilio</h3>
                      <p className="text-sm font-serif italic text-gray-600 mb-2">Región Metropolitana</p>
                      <p className="text-lg font-serif text-[#6B0F2B]">$5.000</p>
                    </button>

                    <button 
                      onClick={() => setDeliveryMethod('retiro')}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all ${deliveryMethod === 'retiro' ? 'border-[#6B0F2B] bg-[#FBF0F3]' : 'border-gray-200 bg-white hover:border-[#6B0F2B]/50'}`}
                    >
                      <div className="absolute top-6 right-6">
                        {deliveryMethod === 'retiro' ? (
                          <div className="w-6 h-6 rounded-full bg-[#6B0F2B] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-[#6B0F2B]" />
                        )}
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><CheckCircle2 className="w-6 h-6 text-[#6B0F2B]"/></div>
                      </div>
                      <h3 className="text-sm uppercase tracking-[0.08em] font-bold text-gray-900 mb-1">Retiro en Taller</h3>
                      <p className="text-sm font-serif italic text-gray-600 mb-2">Comuna de Ñuñoa</p>
                      <p className="text-lg font-serif text-[#6B0F2B]">Gratis</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: DIRECCION Y FECHAS */}
              {activeStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-serif italic text-[#6B0F2B] mb-6">
                    {deliveryMethod === 'domicilio' ? 'Datos de Entrega' : 'Fecha y Mensaje'}
                  </h2>
                  <div className="flex flex-col gap-6">
                    {deliveryMethod === 'domicilio' && (
                      <div className="flex flex-col gap-6">
                        <InputField label="Dirección (Calle y Número)" name="direccion" placeholder="Av. Siempre Viva 123" fullWidth value={formData.direccion} onChange={handleInputChange} error={errors.direccion} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Depto / Oficina" name="depto" placeholder="Depto 402" value={formData.depto} onChange={handleInputChange} error={errors.depto} />
                          <SelectField label="Comuna" name="comuna" options={SANTIAGO_COMUNAS} value={formData.comuna} onChange={handleInputChange} error={errors.comuna} />
                        </div>
                      </div>
                    )}
                    
                    <CustomDatePicker 
                      selectedDate={formData.fechaEntrega} 
                      onSelect={(val) => handleInputChange('fechaEntrega', val)} 
                      error={errors.fechaEntrega} 
                    />

                    <div className="mt-4">
                      <label className={labelStyle}>Mensaje para la tarjeta floral</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-5 w-5 h-5 text-gray-400" />
                        <textarea 
                          value={formData.mensaje}
                          onChange={(e) => handleInputChange('mensaje', e.target.value)}
                          placeholder="Expresa lo que sientes, nosotros pondremos tus palabras en nuestra tarjeta de papelería fina..."
                          rows={4}
                          className="w-full bg-white border-2 border-gray-200 focus:border-[#6B0F2B] pl-14 pr-5 py-5 text-sm rounded-2xl transition-all outline-none resize-none font-serif italic"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PAGO */}
              {activeStep === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-serif italic text-[#6B0F2B] mb-6">Método de Pago</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {[
                       { id: 'webpay', name: 'Webpay Plus', desc: 'Débito / Crédito', logo: '💳' },
                       { id: 'mercadopago', name: 'Mercado Pago', desc: 'Billetera digital', logo: '📱' },
                       { id: 'transferencia', name: 'Transferencia bancaria', desc: 'Transferencia directa', logo: '🏦' }
                     ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setPaymentMethod(opt.id as any)}
                          className={`relative flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 transition-all ${paymentMethod === opt.id ? 'border-[#6B0F2B] bg-[#FBF0F3]' : 'border-gray-200 bg-white hover:border-[#6B0F2B]/50'}`}
                        >
                          <span className="text-3xl mb-3">{opt.logo}</span>
                          <span className={`text-[11px] uppercase tracking-widest font-bold mb-1 ${paymentMethod === opt.id ? 'text-[#6B0F2B]' : 'text-gray-900'}`}>{opt.name}</span>
                          <span className="text-[10px] text-gray-500 font-medium">{opt.desc}</span>
                          {paymentMethod === opt.id && <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#6B0F2B] flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>}
                        </button>
                     ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: CONFIRMACION */}
              {activeStep === 5 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                   <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-[#FBF0F3] rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle2 className="w-8 h-8 text-[#6B0F2B]" />
                     </div>
                     <h2 className="text-2xl font-serif italic text-[#6B0F2B]">Casi listo, revisa tu pedido</h2>
                   </div>
                   
                   <div className="bg-gray-50 p-6 rounded-2xl mb-8 space-y-4 text-sm font-sans">
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Remitente</span>
                        <span className="text-right font-medium">{formData.nombre} <br/> {formData.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Entrega / Pago</span>
                        <span className="text-right font-medium">
                          {deliveryMethod === 'domicilio' ? `${formData.direccion}, ${formData.comuna}` : 'Retiro en Taller (Ñuñoa)'}
                          <br/> {formatDate(formData.fechaEntrega)}
                        </span>
                      </div>
                      {formData.mensaje && (
                        <div className="flex justify-between border-b border-gray-200 pb-4">
                          <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Mensaje floral</span>
                          <span className="text-right font-serif italic text-[#6B0F2B] font-medium">{formData.mensaje}</span>
                        </div>
                      )}
                      <div className="flex justify-between pb-2">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Medio de pago</span>
                        <span className="font-medium uppercase text-[11px] tracking-widest">{paymentMethod === 'webpay' ? 'Webpay Plus' : paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Transferencia bancaria'}</span>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-gray-100">
                {activeStep > 1 && (
                  <button onClick={handleBack} className="px-6 py-4 rounded-full border-2 border-gray-200 font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all">
                    Atrás
                  </button>
                )}
                {activeStep < STEPS.length ? (
                  <button onClick={handleNext} disabled={activeStep === 4 && !paymentMethod} className="flex-1 bg-[#6B0F2B] text-white py-4 rounded-full font-bold text-sm shadow-lg shadow-[#6B0F2B]/20 hover:bg-[#85163a] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center">
                    {activeStep === 4 ? `Continuar a confirmación — ${paymentMethod === 'webpay' ? 'Webpay Plus' : paymentMethod === 'mercadopago' ? 'Mercado Pago' : paymentMethod ? 'Transferencia bancaria' : ''}` : `Continuar a ${STEPS[activeStep].title.toLowerCase()}`}
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-[#6B0F2B] text-white py-4 rounded-full font-bold text-sm shadow-xl shadow-[#6B0F2B]/30 hover:bg-[#85163a] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {paymentMethod === 'transferencia' ? 'Transferir y completar' : `Pagar con ${paymentMethod === 'webpay' ? 'Webpay Plus' : 'Mercado Pago'}`}
                  </button>
                )}
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <IconShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-gray-500">Pago Seguro 100%</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <IconTruckDelivery className="w-5 h-5 text-[#6B0F2B]" />
                <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-gray-500">Entrega Premium</span>
              </div>
            </div>
          </div>

          {/* Sidebar Resumen Sticky */}
          <aside className="w-full lg:w-[400px] order-1 lg:order-2 lg:sticky lg:top-32 h-max self-start z-10">
            
            {/* Mobile Accordion Toggle */}
            <div className="lg:hidden mb-4">
               <button 
                 onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                 className="flex w-full items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
               >
                 <span className="text-[11px] uppercase tracking-[0.08em] font-bold text-gray-900">Resumen de tu Pedido ({cart.length})</span>
                 <div className="flex items-center gap-2">
                   <span className="font-serif font-bold text-[#6B0F2B]">${finalTotal.toLocaleString('es-CL')}</span>
                   {mobileSummaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                 </div>
               </button>
            </div>

            <div className={`lg:block bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 ${mobileSummaryOpen ? 'block' : 'hidden'}`}>
              <h2 className="text-2xl font-serif italic mb-8 text-[#6B0F2B]">Resumen</h2>
              
              <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center">
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">{item.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-2">Cant: {item.quantity}</p>
                      <span className="text-sm font-serif italic text-gray-600">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-[0.08em] font-bold">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${total.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-[0.08em] font-bold">
                  <span>Envío ({deliveryMethod === 'domicilio' ? 'RM' : 'Taller'})</span>
                  <span className="text-gray-900">${shippingCost.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-gray-100 mt-4">
                  <span className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.1em]">Total Final</span>
                  <span className="text-4xl font-serif italic text-[#6B0F2B]">${finalTotal.toLocaleString('es-CL')}</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
