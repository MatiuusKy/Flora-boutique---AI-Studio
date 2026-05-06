import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f9] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative element */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <h1 className="text-[12rem] font-serif leading-none tracking-tighter text-primary/10">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-serif text-gray-800 italic">Perdido entre flores</h2>
          </div>
        </motion.div>

        <p className="mt-8 text-gray-500 max-w-xs leading-relaxed italic">
          "Parece que este pétalo se lo llevó el viento. La página que buscas ya no florece aquí."
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-12 bg-primary text-white px-10 py-4 rounded-full font-medium shadow-xl shadow-primary/20"
        >
          Volver al Jardín
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default NotFound;
