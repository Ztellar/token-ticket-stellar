import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  artist: string;
  date: string;
  location: string;
  price: string;
  ticketsAvailable: number;
  imageUrl: string;
  category?: string;
}

export const EventCard = ({
  id,
  title,
  artist,
  date,
  location,
  price,
  ticketsAvailable,
  imageUrl,
  category = "Rock",
}: EventCardProps) => {
  return (
    <Card className="gradient-card border-primary/20 overflow-hidden group hover:glow-primary transition-smooth">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {category}
        </Badge>
      </div>
      
      <CardHeader>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground">{artist}</p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Ticket className="h-4 w-4 text-primary" />
          <span className="text-foreground font-semibold">{ticketsAvailable} tickets disponibles</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Desde</p>
          <p className="text-2xl font-bold text-primary">${price}.000</p>
        </div>
        <Button asChild variant="default">
          <Link to={`/event/${id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
