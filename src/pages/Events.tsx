import { Navigation } from "@/components/Navigation";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock data for events
const events = [
  {
    id: "1",
    title: "Rock en Concierto",
    artist: "The Electric Waves",
    date: "15 Dic 2024",
    location: "Arena CDMX",
    price: "150",
    ticketsAvailable: 234,
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    category: "Rock",
  },
  {
    id: "2",
    title: "Noche de Jazz",
    artist: "Blue Moon Ensemble",
    date: "20 Dic 2024",
    location: "Teatro Nacional",
    price: "200",
    ticketsAvailable: 89,
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    category: "Jazz",
  },
  {
    id: "3",
    title: "Festival Electrónico",
    artist: "DJ Matrix & Friends",
    date: "28 Dic 2024",
    location: "Parque Central",
    price: "180",
    ticketsAvailable: 456,
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    category: "Electrónica",
  },
  {
    id: "4",
    title: "Acústico Intimista",
    artist: "Luna y Mar",
    date: "05 Ene 2025",
    location: "Café Cultural",
    price: "100",
    ticketsAvailable: 45,
    imageUrl: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
    category: "Acústico",
  },
  {
    id: "5",
    title: "Metal Fest",
    artist: "Iron Thunder",
    date: "12 Ene 2025",
    location: "Estadio Norte",
    price: "220",
    ticketsAvailable: 678,
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80",
    category: "Metal",
  },
  {
    id: "6",
    title: "Pop Latino",
    artist: "Estrellas del Sur",
    date: "18 Ene 2025",
    location: "Auditorio Principal",
    price: "175",
    ticketsAvailable: 312,
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    category: "Pop",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubre <span className="bg-clip-text">Eventos</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Lista de conciertos y eventos disponibles.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos, artistas, ubicaciones..."
              className="pl-10"
            />
          </div>
          <Button variant="cosmic" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
