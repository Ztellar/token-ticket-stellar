import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, MapPin, Ticket } from 'lucide-react';
import { useStellar } from '@/hooks/use-stellar';

interface PurchasedTicket {
  id: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  priceInCLP: string;
  transactionHash: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'expired';
}

export const UserTickets = () => {
  const { account } = useStellar();
  const [tickets, setTickets] = useState<PurchasedTicket[]>([]);

  // En una aplicación real, esto vendría de una API que consulte la blockchain
  // Para el demo, simulamos algunos tickets
  useEffect(() => {
    if (account) {
      // Obtener tickets comprados desde localStorage
      const storedTickets = localStorage.getItem('purchased-tickets');
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    }
  }, [account]);

  const handleViewTransaction = (hash: string) => {
    window.open(`https://stellar.expert/explorer/testnet/tx/${hash}`, '_blank');
  };

  if (!account) {
    return (
      <Card className="gradient-card border-primary/20">
        <CardContent className="pt-6 text-center">
          <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Conecta tu billetera Stellar para ver tus tickets
          </p>
        </CardContent>
      </Card>
    );
  }

  if (tickets.length === 0) {
    return (
      <Card className="gradient-card border-primary/20">
        <CardContent className="pt-6 text-center">
          <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">No tienes tickets aún</h3>
          <p className="text-muted-foreground mb-4">
            Compra tu primer ticket para verlo aquí
          </p>
          <Button asChild variant="hero">
            <a href="/events">Explorar Eventos</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mis Tickets</h2>
        <Badge variant="outline">{tickets.length} ticket(s)</Badge>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="gradient-card border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {ticket.eventDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {ticket.venue}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {ticket.status === 'active' ? 'Activo' : ticket.status === 'used' ? 'Usado' : 'Expirado'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Precio pagado:</span>
                <span className="font-medium">${ticket.priceInCLP} CLP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fecha de compra:</span>
                <span>{ticket.purchaseDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hash de transacción:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {ticket.transactionHash}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleViewTransaction(ticket.transactionHash)}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
