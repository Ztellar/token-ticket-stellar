import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Gift, TrendingUp } from "lucide-react";
import ticketCollectible from "@/assets/ticket-collectible.jpg";

// Mock data for owned tickets
const ownedTickets = [
  {
    id: "1",
    event: "Rock en Concierto",
    artist: "The Electric Waves",
    date: "15 Dic 2024",
    location: "Arena CDMX",
    tokenId: "TKT-0001-STELLAR-XYZ",
    benefits: ["Meet & Greet Elegible", "Airdrop Activo"],
  },
  {
    id: "2",
    event: "Noche de Jazz",
    artist: "Blue Moon Ensemble",
    date: "20 Dic 2024",
    location: "Teatro Nacional",
    tokenId: "TKT-0002-STELLAR-ABC",
    benefits: ["Contenido Exclusivo"],
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="gradient-cosmic bg-clip-text text-transparent">TokenTickets</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Tus coleccionables digitales verificados en blockchain
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Total de Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{ownedTickets.length}</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Beneficios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">3</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Valor de Colección</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">350 XLM</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Owned Tickets */}
        <h2 className="text-2xl font-bold mb-6">Tickets en Mi Wallet</h2>
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {ownedTickets.map((ticket) => (
            <Card key={ticket.id} className="gradient-card border-primary/20 glow-primary">
              <div className="flex gap-6 p-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={ticketCollectible}
                    alt="Token Collectible"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{ticket.event}</h3>
                    <p className="text-muted-foreground">{ticket.artist}</p>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{ticket.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Token ID:</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {ticket.tokenId}
                    </code>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {ticket.benefits.map((benefit, index) => (
                      <Badge key={index} className="bg-accent/20 text-accent border-accent/50">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Airdrops Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Meet & Greet VIP</p>
                  <p className="text-sm text-muted-foreground">The Electric Waves</p>
                </div>
                <Button size="sm" variant="default">Reclamar</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Merchandising Exclusivo</p>
                  <p className="text-sm text-muted-foreground">Camiseta Edición Limitada</p>
                </div>
                <Button size="sm" variant="default">Reclamar</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Valor de Reventa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Vende tus tickets de forma segura con precio máximo controlado por el organizador.
                Los artistas reciben comisión automática en cada reventa.
              </p>
              <Button variant="cosmic" className="w-full">
                Ver Mercado Secundario
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
