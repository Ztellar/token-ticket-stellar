import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Link, AlertCircle } from 'lucide-react';
import { useStellar } from '@/hooks/use-stellar';
import { StellarService } from '@/services/stellar';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface StellarPurchaseProps {
  eventId: string;
  eventTitle: string;
  priceInCLP: string;
  onPurchaseSuccess?: (transactionHash: string) => void;
}

export const StellarPurchase = ({
  eventId,
  eventTitle,
  priceInCLP,
  onPurchaseSuccess
}: StellarPurchaseProps) => {
  const { account, balance, buyTicket } = useStellar();
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [vendorPublicKey, setVendorPublicKey] = useState<string>('');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [showDialog, setShowDialog] = useState(false);

  // Obtener cuenta del vendedor al montar el componente
  useEffect(() => {
    const initVendorAccount = async () => {
      const vendorKey = await StellarService.getOrCreateVendorAccount();
      setVendorPublicKey(vendorKey);
    };
    initVendorAccount();
  }, []);

  const handlePurchase = async () => {
    if (!account) {
      toast.error('Necesitas una billetera Stellar para comprar');
      return;
    }

    if (!vendorPublicKey) {
      toast.error('Error obteniendo cuenta del vendedor. Intenta recargar la página.');
      return;
    }

    const xlmBalance = parseFloat(balance.xlm);
    const totalPriceInCLP = parseFloat(priceInCLP) * ticketCount;
    const requiredXLM = totalPriceInCLP * 0.001; // Conversión CLP a XLM

    if (xlmBalance < requiredXLM) {
      toast.error('Balance insuficiente', {
        description: `Necesitas al menos ${requiredXLM.toFixed(3)} XLM para esta compra`
      });
      return;
    }

    setIsProcessing(true);
    setPurchaseStatus('processing');
    setErrorMessage('');

    try {
      const result = await buyTicket(vendorPublicKey, totalPriceInCLP.toString(), eventId);

      if (result.success && result.transactionHash) {
        setPurchaseStatus('success');
        setTransactionHash(result.transactionHash);
        setShowDialog(true);

        // Guardar estado de compra completada
        localStorage.setItem('completed-purchase', 'true');
        localStorage.setItem('purchase-transaction', result.transactionHash);

        // Guardar detalles de los tickets comprados
        const storedTickets = JSON.parse(localStorage.getItem('purchased-tickets') || '[]');
        const newTicket = {
          id: `${Date.now()}`,
          eventTitle,
          eventDate: new Date().toLocaleDateString(),
          venue: 'Lugar del Evento', // Puedes ajustar esto según corresponda
          priceInCLP: totalPriceInCLP.toString(),
          transactionHash: result.transactionHash,
          purchaseDate: new Date().toLocaleDateString(),
          status: 'active'
        };
        storedTickets.push(newTicket);
        localStorage.setItem('purchased-tickets', JSON.stringify(storedTickets));

        onPurchaseSuccess?.(result.transactionHash);

        toast.success('¡Compra exitosa!', {
          description: 'Tu ticket ha sido registrado en la blockchain de Stellar'
        });
      } else {
        setPurchaseStatus('error');
        setErrorMessage(result.error || 'Error desconocido en la transacción');
        toast.error('Error en la compra', {
          description: result.error
        });
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';

      setPurchaseStatus('error');
      setErrorMessage(errorMessage);
      toast.error('Error en la compra');
    } finally {
      setIsProcessing(false);
    }
  };

  const convertToXLM = (clpAmount: string): number => {
    return parseFloat(clpAmount) * 0.001;
  };

  const canPurchase = account && parseFloat(balance.xlm) > 0 && purchaseStatus === 'idle';

  return (
    <>
      <Card className="gradient-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 text-primary" />
            Pago con Stellar
            <Badge variant="secondary" className="ml-auto">
              Blockchain
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Resumen de la compra */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Evento:</span>
              <span className="font-medium">{eventTitle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Precio por ticket:</span>
              <span className="font-medium">${priceInCLP} CLP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cantidad de tickets:</span>
              <input
                type="number"
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border rounded"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span className="font-medium">${(parseFloat(priceInCLP) * ticketCount).toFixed(2)} CLP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Equivalente XLM:</span>
              <span className="font-medium">{(convertToXLM(priceInCLP) * ticketCount).toFixed(3)} XLM</span>
            </div>
          </div>

          {/* Estado de la cuenta */}
          {!account && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Necesitas crear una billetera Stellar primero
              </AlertDescription>
            </Alert>
          )}

          {account && parseFloat(balance.xlm) === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Tu billetera necesita fondos. Usa el botón "Financiar Demo" en tu billetera.
              </AlertDescription>
            </Alert>
          )}

          {/* Estados de la compra */}
          {purchaseStatus === 'processing' && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Procesando transacción en la blockchain de Stellar...
              </AlertDescription>
            </Alert>
          )}

          {purchaseStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Botones de acción */}
          <div className="space-y-2">
            {purchaseStatus === 'idle' && (
              <Button
                onClick={handlePurchase}
                disabled={!canPurchase || isProcessing}
                variant="hero"
                size="lg"
                className="w-full gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Comprar con Stellar
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            * Transacción segura y verificable en Stellar Testnet
          </div>
        </CardContent>
      </Card>

      {/* Pop-up de confirmación */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Compra Exitosa!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tu transacción ha sido registrada exitosamente en la blockchain de Stellar.
          </p>
          <p className="text-sm text-muted-foreground">
            Hash de la transacción: <code className="break-all text-xs bg-muted px-2 py-1 rounded">{transactionHash}</code>
          </p>
          <DialogFooter>
            <Button asChild variant="hero">
              <a href="/dashboard">Ir a Mis Tickets</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
