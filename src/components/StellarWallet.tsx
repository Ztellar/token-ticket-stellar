import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy, RefreshCw, Coins, CheckCircle } from 'lucide-react';
import { useStellar } from '@/hooks/use-stellar';
import { toast } from 'sonner';

export const StellarWallet = () => {
  const { account, balance, isLoading, createAccount, fundAccount, refreshBalance } = useStellar();
  const [isFunding, setIsFunding] = useState(false);

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account.publicKey);
      toast.success('Dirección copiada al portapapeles');
    }
  };

  const handleFundAccount = async () => {
    setIsFunding(true);
    const success = await fundAccount();
    setIsFunding(false);

    if (success) {
      toast.success('¡Cuenta financiada exitosamente!', {
        description: 'Se han añadido 10,000 XLM a tu cuenta para el demo'
      });
    } else {
      toast.error('Error al financiar la cuenta');
    }
  };

  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(2);
  };

  const convertXLMtoCLP = (xlmAmount: string) => {
    // Tasa de conversión simulada: 1 XLM = 1000 CLP
    return (parseFloat(xlmAmount) * 1000).toFixed(0);
  };

  if (!account) {
    return (
      <Card className="gradient-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Billetera Stellar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Necesitas una billetera Stellar para comprar tickets con blockchain.
          </p>
          <Button
            onClick={createAccount}
            disabled={isLoading}
            variant="hero"
            className="w-full"
          >
            {isLoading ? 'Creando...' : 'Crear Billetera Demo'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Billetera Stellar
          <Badge variant="outline" className="ml-auto">
            Demo
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dirección de la cuenta */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Dirección Pública</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-2 py-1 bg-muted rounded text-xs">
              {account.publicKey.slice(0, 20)}...{account.publicKey.slice(-10)}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyAddress}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Balance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-1">
              <Coins className="h-4 w-4 text-primary" />
              XLM
            </label>
            <div className="text-lg font-bold">
              {formatBalance(balance.xlm)}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">
              CLP Equivalente
            </label>
            <div className="text-lg font-bold text-accent">
              ${convertXLMtoCLP(balance.xlm)}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          {parseFloat(balance.xlm) === 0 && (
            <Button
              onClick={handleFundAccount}
              disabled={isFunding}
              variant="hero"
              size="sm"
              className="flex-1"
            >
              {isFunding ? 'Financiando...' : 'Financiar Demo'}
            </Button>
          )}
          <Button
            onClick={refreshBalance}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {parseFloat(balance.xlm) > 0 && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            Cuenta lista para comprar tickets
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * Esta es una cuenta de prueba en Stellar Testnet
        </div>
      </CardContent>
    </Card>
  );
};
