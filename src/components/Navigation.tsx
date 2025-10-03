import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, Wallet, User } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Ticket className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-cosmic bg-clip-text text-transparent">
            TicketPass
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            to="/events"
            className={`text-sm font-medium transition-smooth ${
              isActive("/events") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Eventos
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-smooth ${
              isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mis Tickets
          </Link>
          
          <Button variant="cosmic" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </nav>
  );
};
