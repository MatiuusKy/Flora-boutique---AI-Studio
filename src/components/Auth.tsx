import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    if (!supabase) {
      console.error("Supabase no está configurado. Por favor, añade las variables de entorno.");
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Asegúrate de configurar este dominio en el dashboard de Supabase (Auth -> URL Configuration)
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error de autenticación:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-10 bg-white rounded-[2rem] shadow-sm border border-primary/5 max-w-sm mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-gray-900 italic">Bienvenida</h2>
        <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">
          Club de Fidelidad Flora
        </p>
      </div>

      <p className="text-sm text-gray-500 text-center leading-relaxed font-sans">
        Únete para recibir ofertas exclusivas, recordatorios de fechas especiales y acumular puntos en cada compra.
      </p>
      
      <div className="w-full space-y-3 pt-2">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-100 py-3.5 rounded-full hover:bg-gray-50 transition-all shadow-sm shadow-black/5"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4 opacity-80" alt="Google" />
          <span className="text-sm font-medium text-gray-600">Continuar con Google</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSocialLogin('facebook')}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3.5 rounded-full hover:bg-[#166fe5] transition-all shadow-md shadow-[#1877F2]/20"
        >
          <span className="text-sm font-medium">Acceder con Facebook</span>
        </motion.button>
      </div>
      
      <div className="pt-4 border-t border-gray-50 w-full text-center">
        <p className="text-[9px] text-primary font-bold uppercase tracking-widest opacity-60">
          Experiencia Artesanal Digital
        </p>
      </div>
    </div>
  );
};

export default Auth;
