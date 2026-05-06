import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartContext } from "../components/Cart";
import PageTransition from "../components/PageTransition";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ChevronLeft, 
  Wallet, 
  Banknote,
  AlertCircle,
  CheckCircle2,
  User,
  LogIn,
  Globe,
  Facebook
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateRut, formatRut } from "../lib/rutUtils";
import { supabase } from "../lib/supabase";

const SANTIAGO_COMUNAS = [
  "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", 
  "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", 
  "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", 
  "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", 
  "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", 
  "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", 
  "Puente Alto", "Pirque", "San José de Maipo", "San Bernardo", "Buin", 
  "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", 
  "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", 
  "Peñaflor", "Colina", "Lampa", "Tiltil"
].sort();

const InputField = ({ label, name, placeholder, type = "text", fullWidth = false, value, onChange, error, prefix }: any) => (
  <div className={`space-y-1.5 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block px-1">
      {label}
    </label>
    <div className="relative group">
      {prefix && (
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
          {prefix}
        </span>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-white border-2 px-6 py-4 text-sm rounded-2xl transition-all outline-none ${prefix ? 'pl-20' : ''} ${
          error 
            ? 'border-red-200 focus:border-red-300 bg-red-50/10' 
            : 'border-transparent focus:border-primary/20 group-hover:border-gray-100'
        }`}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-1.5 text-red-500 mt-2 px-2"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SelectField = ({ label, name, options, value, onChange, error, fullWidth = false }: any) => (
  <div className={`space-y-1.5 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block px-1">
      {label}
    </label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-white border-2 px-6 py-4 text-sm rounded-2xl transition-all outline-none appearance-none cursor-pointer ${
          error 
            ? 'border-red-200 focus:border-red-300 bg-red-50/10' 
            : 'border-transparent focus:border-primary/20 group-hover:border-gray-100'
        }`}
      >
        <option value="">Seleccionar comuna...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <AnimatePresence>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-1.5 text-red-500 mt-2 px-2"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Checkout = () => {
  const { cart, total } = useContext(CartContext);
  const navigate = useNavigate();

  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

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
  const [shippingCost, setShippingCost] = useState(5000);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'flow' | 'transferencia'>('flow');

  useEffect(() => {
    if (deliveryMethod === 'domicilio') {
      setShippingCost(5000);
    } else {
      setShippingCost(3500);
    }
  }, [deliveryMethod]);

  const finalTotal = total + shippingCost;

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          loadProfile(session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session?.user) {
          loadProfile(session.user.id);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) {
        setFormData(prev => ({
          ...prev,
          rut: data.rut || "",
          nombre: data.full_name || "",
          email: data.email || "",
          telefono: data.phone || "",
          direccion: data.address || "",
          comuna: data.comuna || ""
        }));
      }
    } catch (err) {
      console.warn("Could not load profile:", err);
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/checkout'
      }
    });
  };

  const handleFacebookLogin = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: window.location.origin + '/checkout'
      }
    });
  };

  // Calculate min date (tomorrow in Chile time)
  const getMinDate = () => {
    const today = new Date();
    // Add 1 day
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.rut) {
      newErrors.rut = "El RUT es obligatorio";
    } else if (!validateRut(formData.rut)) {
      newErrors.rut = "RUT inválido";
    }

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (formData.telefono.length < 8) {
      newErrors.telefono = "Ingresa los 8 dígitos faltantes";
    }

    if (!formData.direccion) newErrors.direccion = "La dirección es obligatoria";
    if (!formData.comuna) newErrors.comuna = "Selecciona una comuna";
    if (!formData.fechaEntrega) newErrors.fechaEntrega = "Selecciona una fecha";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    let val = value;
    if (name === 'rut') {
      val = formatRut(value);
    } else if (name === 'telefono') {
      // Allow only digits and limit to 8 (since +56 9 is static)
      val = val.replace(/\D/g, '').slice(0, 8);
    }
    
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Save profile data if logged in
        if (session?.user) {
          await supabase.from('profiles').upsert({
            id: session.user.id,
            rut: formData.rut,
            full_name: formData.nombre,
            email: formData.email,
            phone: formData.telefono,
            address: formData.direccion,
            comuna: formData.comuna,
            updated_at: new Date()
          });
        }

        // Create order object
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
          channel: "Web",
          items: cart,
          deliveryDate: formData.fechaEntrega,
          telefono: `+56 9 ${formData.telefono}`,
          direccion: `${formData.direccion}, ${formData.depto ? formData.depto + ', ' : ''}${formData.comuna}`
        };
        
        // Save to local storage for the admin dashboard
        const existingOrders = JSON.parse(localStorage.getItem('flora_orders') || '[]');
        localStorage.setItem('flora_orders', JSON.stringify([newOrder, ...existingOrders]));

        // Deduct stock (Simple simulation with localStorage)
        const storedProducts = JSON.parse(localStorage.getItem('flora_inventory') || '[]');
        if (storedProducts.length > 0) {
          const updatedProducts = storedProducts.map((p: any) => {
            const itemInCart = cart.find(item => item.slug === p.slug);
            if (itemInCart) {
              return { ...p, stock: Math.max(0, p.stock - itemInCart.quantity) };
            }
            return p;
          });
          localStorage.setItem('flora_inventory', JSON.stringify(updatedProducts));
        }

        // Simulate Payment Gateway Redirect (e.g. Mercado Pago)
        // This prevents the "white screen" feeling by showing we are processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        navigate('/success', { state: { orderId } });
      } catch (err) {
        console.error("Error processing order:", err);
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f9]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session && !isGuest) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#faf8f9] pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl text-center">
            <header className="mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-serif italic text-gray-900">Bienvenido</h1>
              <p className="text-sm text-gray-500 mt-2 font-light italic">¿Cómo deseas continuar con tu compra?</p>
            </header>

            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:border-primary/20 transition-all group"
              >
                <LogIn className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                Ingresar con Google
              </button>

              <button 
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:border-primary/20 transition-all group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2]" />
                Ingresar con Meta
              </button>
              
              <button 
               onClick={() => setIsGuest(true)}
                className="w-full bg-primary text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-primary/20"
              >
                Continuar como Invitado
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-8 uppercase tracking-widest font-medium leading-relaxed">
              Al ingresar tus datos se guardarán automáticamente para que tus futuras compras sean más rápidas.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#faf8f9]">
        <h2 className="text-3xl font-serif italic mb-4">Tu carrito está vacío</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-10 py-4 rounded-full font-medium"
        >
          Volver a la Tienda
        </button>
      </div>
    );
  }

  const paymentOptions = [
    { id: "webpay", name: "Webpay Plus", desc: "Débito y Crédito", icon: CreditCard },
    { id: "mercadopago", name: "Mercado Pago", desc: "Billetera digital", icon: Wallet },
    { id: "transferencia", name: "Transferencia", desc: "Datos al confirmar", icon: Banknote },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf8f9] pt-24 pb-20 px-6">
        <AnimatePresence>
          {isSubmitting && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary z-[100] flex flex-col items-center justify-center text-white p-12 overflow-hidden"
            >
              {/* Background Floral Elements */}
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white/10 rounded-full"
              />
              <motion.div 
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] border-[60px] border-white/5 rounded-full"
              />

              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20 shadow-2xl"
                >
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white drop-shadow-lg">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </motion.div>
                    {/* Floating Petals Effect */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [-10, 10], 
                          x: [-5, 5],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2 + i, 
                          repeat: Infinity, 
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-200/40 rounded-full blur-[1px]"
                        style={{
                          transform: `rotate(${i * 60}deg) translateX(40px)`
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-3xl font-serif italic mb-4 tracking-wide">Preparando tu regalo floral</h2>
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/60 mb-2">Conectando con pasarela de pago seguro</p>
                <div className="flex gap-1.5 justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              <footer className="absolute bottom-12 text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
                Flora Boutique • Transacción Encriptada
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <header>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-primary transition-colors mb-6"
              >
                <ChevronLeft className="w-4 h-4" /> Volver a la boutique
              </button>
              <h1 className="text-4xl font-serif italic text-gray-900">Finalizar Pedido</h1>
              <p className="text-sm text-gray-500 mt-2 font-light italic">Tu arte floral está a solo unos pasos de llegar a su destino.</p>
            </header>

            <form id="checkout-form" className="space-y-12" onSubmit={handleSubmit}>
              <section className="space-y-8 p-1 bg-primary/[0.02] rounded-[2.5rem]">
                <div className="flex items-center gap-4 px-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-serif italic">1</div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-900">Contacto</h2>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Información del remitente</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                  <InputField label="RUT" name="rut" placeholder="12.345.678-9" fullWidth value={formData.rut} onChange={handleInputChange} error={errors.rut} />
                  <InputField label="Nombre completo" name="nombre" placeholder="Josefina Pérez" value={formData.nombre} onChange={handleInputChange} error={errors.nombre} />
                  <InputField label="Email" name="email" placeholder="josefina@ejemplo.com" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                  <InputField label="WhatsApp ( últimos 8 dígitos)" name="telefono" placeholder="1234 5678" prefix="+56 9" fullWidth value={formData.telefono} onChange={handleInputChange} error={errors.telefono} />
                </div>
              </section>

              <section className="space-y-8 p-1 bg-primary/[0.02] rounded-[2.5rem]">
                <div className="flex items-center gap-4 px-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-serif italic">2</div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-900">Método de entrega</h2>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">¿Cómo deseas recibir tu arte?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                  <button 
                    type="button"
                    onClick={() => setDeliveryMethod('domicilio')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative ${deliveryMethod === 'domicilio' ? 'border-primary bg-primary/[0.02]' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${deliveryMethod === 'domicilio' ? 'text-primary' : 'text-gray-400'}`}>Despacho a domicilio</span>
                      {deliveryMethod === 'domicilio' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-sm font-serif italic text-gray-900">Santiago ($5.000)</p>
                    <p className="text-[10px] text-gray-400 mt-1">Región Metropolitana</p>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setDeliveryMethod('retiro')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative ${deliveryMethod === 'retiro' ? 'border-primary bg-primary/[0.02]' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                       <span className={`text-[10px] uppercase tracking-widest font-bold ${deliveryMethod === 'retiro' ? 'text-primary' : 'text-gray-400'}`}>Retiro en Ñuñoa</span>
                       {deliveryMethod === 'retiro' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-sm font-serif italic text-gray-900">Gratis / Ñuñoa ($3.500)</p>
                    <p className="text-[10px] text-gray-400 mt-1">Recargo logístico</p>
                  </button>
                </div>
              </section>

              <section className="space-y-8 p-1 bg-primary/[0.02] rounded-[2.5rem]">
                <div className="flex items-center gap-4 px-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-serif italic">3</div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-900">Entrega</h2>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">¿Dónde enviamos el arte?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                  <InputField label="Dirección (Calle y Número)" name="direccion" placeholder="Av. Las Condes 1234" fullWidth value={formData.direccion} onChange={handleInputChange} error={errors.direccion} />
                  <InputField label="Depto / Oficina" name="depto" placeholder="Depto 402" value={formData.depto} onChange={handleInputChange} error={errors.depto} />
                  <SelectField 
                    label="Comuna" 
                    name="comuna" 
                    options={SANTIAGO_COMUNAS} 
                    value={formData.comuna} 
                    onChange={handleInputChange} 
                    error={errors.comuna} 
                  />
                  <div className={`space-y-1.5 md:col-span-2`}>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block px-1">
                      Fecha de Entrega (A partir de mañana)
                    </label>
                    <input 
                      type="date"
                      min={getMinDate()}
                      value={formData.fechaEntrega}
                      onChange={(e) => handleInputChange('fechaEntrega', e.target.value)}
                      className={`w-full bg-white border-2 px-6 py-4 text-sm rounded-2xl transition-all outline-none ${
                        errors.fechaEntrega 
                          ? 'border-red-200 focus:border-red-300 bg-red-50/10' 
                          : 'border-transparent focus:border-primary/20'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.fechaEntrega && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-red-500 mt-2 px-2 text-[10px] font-bold uppercase">
                          <AlertCircle className="w-3 h-3" /> {errors.fechaEntrega}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block px-1">Mensaje para la tarjeta (Opcional)</label>
                    <textarea 
                      value={formData.mensaje}
                      onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                      placeholder="Escribe un mensaje lleno de cariño..." 
                      rows={3} 
                      className="w-full bg-white border-2 border-transparent focus:border-primary/20 px-6 py-4 text-sm rounded-[1.5rem] transition-all outline-none resize-none" 
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-8 p-1 bg-primary/[0.02] rounded-[2.5rem]">
                <div className="flex items-center gap-4 px-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-serif italic">4</div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-900">Pago</h2>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Selecciona tu preferencia</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                        paymentMethod === opt.id 
                          ? 'border-primary bg-primary/[0.02]' 
                          : 'border-gray-50 hover:border-gray-100'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${paymentMethod === opt.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                        <opt.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${paymentMethod === opt.id ? 'text-primary' : 'text-gray-900'}`}>
                          {opt.name}
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium uppercase mt-0.5">{opt.desc}</p>
                      </div>
                      {paymentMethod === opt.id && (
                        <div className="ml-auto">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </form>
          </div>

          <aside className="relative">
            <div className="lg:sticky lg:top-24 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-primary/5">
              <h2 className="text-2xl font-serif italic mb-10">Resumen</h2>
              
              <div className="space-y-6 mb-12 max-h-[350px] overflow-y-auto pr-6 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-xs font-bold text-gray-900 leading-tight">{item.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium">Cant: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-serif italic text-gray-600">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-10 border-t border-gray-50">
                <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${total.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <span>Envío ({deliveryMethod === 'domicilio' ? 'Santiago' : 'Gestión Ñuñoa'})</span>
                  <span className="text-gray-900">${shippingCost.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-4">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-[0.3em]">Total Final</span>
                  <span className="text-4xl font-serif italic text-primary">${finalTotal.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white py-6 rounded-full font-medium shadow-2xl shadow-primary/30 mt-12 transition-all relative overflow-hidden group ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:brightness-110 hover:-translate-y-1'
                }`}
              >
                <span className={isSubmitting ? 'opacity-0' : 'opacity-100 group-hover:scale-105 transition-transform inline-block'}>
                  Completar mi pedido
                </span>
              </button>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Seguro 100%</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Entrega Premium</span>
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
