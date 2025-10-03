import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StellarWallet } from "@/components/StellarWallet";
import { UserTickets } from "@/components/UserTickets";
import { Gift, Wallet, Activity } from "lucide-react";
import { useStellar } from "@/hooks/use-stellar";

const Dashboard = () => {
  const { account, balance } = useStellar();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mi <span className="gradient-cosmic bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestiona tu billetera Stellar y tus tickets digitales
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="gradient-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Balance XLM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {account ? parseFloat(balance.xlm).toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ≈ ${account ? (parseFloat(balance.xlm) * 1000).toFixed(0) : '0'} CLP
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Transacciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {localStorage.getItem('completed-purchase') ? '1' : '0'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                En blockchain
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Tickets Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {localStorage.getItem('completed-purchase') ? '1' : '0'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                NFTs coleccionables
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stellar Wallet Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Billetera Stellar</h2>
            <StellarWallet />

            {account && (
              <div className="mt-6">
                <Card className="gradient-card border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Estado de la Red</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Conectado a Stellar Testnet</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Transacciones instantáneas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Comisiones mínimas</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Tickets Section */}
          <div className="lg:col-span-2">
            <UserTickets />
          </div>
        </div>

        {/* How it works section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Cómo Funciona la Integración con Stellar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gradient-card border-primary/20 text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="font-bold mb-2">1. Billetera Segura</h3>
                <p className="text-sm text-muted-foreground">
                  Crea tu billetera Stellar con claves criptográficas únicas
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-accent/20 text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold mb-2">2. Financiación</h3>
                <p className="text-sm text-muted-foreground">
                  Obtén XLM para realizar transacciones en la red Stellar
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-primary/20 text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="font-bold mb-2">3. Compra Verificada</h3>
                <p className="text-sm text-muted-foreground">
                  Paga en CLP con conversión automática a XLM
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-accent/20 text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold mb-2">4. Blockchain</h3>
                <p className="text-sm text-muted-foreground">
                  Ticket registrado permanentemente en la blockchain
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
