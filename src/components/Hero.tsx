import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 gradient-hero opacity-90" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            El Futuro de las
            <span className="block gradient-cosmic bg-clip-text text-transparent">
              Entradas de Conciertos
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tickets únicos en blockchain que eliminan el fraude, controlan la reventa
            y convierten cada entrada en un coleccionable digital con beneficios exclusivos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg" className="gap-2">
              <Link to="/events">
                Explorar Eventos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="cosmic" size="lg">
              <Link to="/dashboard">
                Ver Mis Tickets
              </Link>
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="gradient-card p-6 rounded-lg border border-primary/20 glow-primary">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fraude Cero</h3>
              <p className="text-sm text-muted-foreground">
                Cada ticket es un token único en Stellar, imposible de falsificar
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg border border-accent/20 glow-accent">
              <TrendingDown className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Anti-Scalping</h3>
              <p className="text-sm text-muted-foreground">
                Control de reventa con precios máximos y comisiones para artistas
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg border border-primary/20 glow-primary">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Coleccionables</h3>
              <p className="text-sm text-muted-foreground">
                Beneficios exclusivos, airdrops aleatorios y recuerdos digitales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
