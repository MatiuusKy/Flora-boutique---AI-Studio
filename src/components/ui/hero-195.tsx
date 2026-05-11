import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero195Props {
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

export const Hero195 = ({
  title = "Domina tus métricas con Inteligencia Floral",
  description = "Analizamos cada pétalo de tus datos para que tomes las mejores decisiones. Sugerencias en tiempo real, predicciones de stock y rutas óptimas.",
  primaryAction = { text: "Ver Análisis", href: "#" },
  secondaryAction = { text: "Configurar Guías", href: "#" },
}: Hero195Props) => {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-8 inline-flex items-center rounded-full border border-primary-custom/10 bg-primary-custom/5 px-3 py-1 text-sm font-medium text-primary-custom">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-primary-custom"></span>
            Nuevo: Análisis de Merma IA
          </div>
          <h1 className="max-w-4xl font-serif text-5xl font-bold italic tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:text-2xl font-light">
            {description}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-14 rounded-full px-8 text-lg font-bold bg-primary-custom hover:bg-primary-custom/90">
              {primaryAction.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-lg font-bold border-2">
              {secondaryAction.text}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 -z-0 h-full w-full opacity-10 blur-3xl lg:opacity-20">
        <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary-custom"></div>
        <div className="absolute bottom-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-amber-500"></div>
      </div>
    </section>
  );
};
