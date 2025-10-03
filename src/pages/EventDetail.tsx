import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Shield, Award, Sparkles, ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();
  
  const handlePurchase = () => {
    toast.success("¡Ticket comprado exitosamente!", {
      description: "Tu TokenTicket ha sido emitido en la blockchain de Stellar",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/events" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver a eventos
          </Link>
        </Button>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden gradient-card border border-primary/20 glow-primary">
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80"
                alt="Concert"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                Rock
              </Badge>
            </div>
          </div>
          
          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Rock en Concierto</h1>
              <p className="text-xl text-muted-foreground">The Electric Waves</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>15 de Diciembre, 2024 - 20:00 hrs</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Arena CDMX, Ciudad de México</span>
              </div>
            </div>
            
            <div className="gradient-card p-6 rounded-lg border border-primary/20">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">150</span>
                <span className="text-xl text-muted-foreground">XLM</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">234 tickets disponibles</p>
              <Button onClick={handlePurchase} variant="hero" size="lg" className="w-full">
                Comprar TokenTicket
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Beneficios de este TokenTicket</h3>
              
              <Card className="gradient-card border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="h-5 w-5 text-primary" />
                    Verificación Blockchain
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Token único e imposible de falsificar en la red Stellar
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="h-5 w-5 text-accent" />
                    Coleccionable Digital
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Diseño artístico único que conservarás como recuerdo permanente
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Airdrops Exclusivos
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Posibilidad aleatoria de recibir pases VIP, merchandising o contenido exclusivo
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Event Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Sobre el Evento</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Electric Waves regresan a la Arena CDMX con su esperado tour 2024. 
            Experimenta una noche inolvidable con sus mejores éxitos y nuevas canciones del álbum "Waves of Thunder". 
            Este concierto marca un hito especial: todos los tickets son TokenTickets en blockchain, 
            garantizando autenticidad y ofreciendo beneficios exclusivos a través de Stellar Network. 
            Los poseedores de este ticket entrarán automáticamente en sorteos para meet & greets, 
            contenido detrás de cámaras y merchandising limitado.
          </p>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
