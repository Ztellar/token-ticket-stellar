import * as StellarSdk from '@stellar/stellar-sdk';

// Configuración para Testnet de Stellar
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks.TESTNET;

export interface StellarAccount {
  publicKey: string;
  secretKey: string;
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export class StellarService {

  // Generar una nueva cuenta para el demo
  static generateAccount(): StellarAccount {
    const keypair = StellarSdk.Keypair.random();
    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret()
    };
  }

  // Financiar cuenta en testnet (para el demo)
  static async fundAccount(publicKey: string): Promise<boolean> {
    try {
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
      return response.ok;
    } catch (error) {
      console.error('Error funding account:', error);
      return false;
    }
  }

  // Obtener balance de la cuenta
  static async getAccountBalance(publicKey: string): Promise<{ xlm: string; clp: string }> {
    try {
      const account = await server.loadAccount(publicKey);
      let xlmBalance = '0';
      let clpBalance = '0';

      account.balances.forEach((balance: { asset_type: string; balance: string; asset_code?: string }) => {
        if (balance.asset_type === 'native') {
          xlmBalance = balance.balance;
        } else if (balance.asset_code === 'CLP') {
          clpBalance = balance.balance;
        }
      });

      return { xlm: xlmBalance, clp: clpBalance };
    } catch (error) {
      console.error('Error getting balance:', error);
      return { xlm: '0', clp: '0' };
    }
  }

  // Crear transacción de compra de ticket
  static async buyTicket(
    buyerSecretKey: string,
    vendorPublicKey: string,
    priceInCLP: string,
    eventId: string
  ): Promise<TransactionResult> {
    try {
      const buyerKeypair = StellarSdk.Keypair.fromSecret(buyerSecretKey);
      const buyerAccount = await server.loadAccount(buyerKeypair.publicKey());

      // Convertir CLP a XLM para la demo (tasa simulada: 1 CLP = 0.001 XLM)
      const priceInXLM = (parseFloat(priceInCLP) * 0.001).toString();

      const transaction = new StellarSdk.TransactionBuilder(buyerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: networkPassphrase,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: vendorPublicKey,
            asset: StellarSdk.Asset.native(), // XLM
            amount: priceInXLM,
          })
        )
        .addMemo(StellarSdk.Memo.text(`Ticket compra: ${eventId}`))
        .setTimeout(30)
        .build();

      transaction.sign(buyerKeypair);

      const result = await server.submitTransaction(transaction);

      return {
        success: true,
        transactionHash: result.hash
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error buying ticket:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Obtener o crear cuenta del vendedor válida para el demo
  static async getOrCreateVendorAccount(): Promise<string> {
    // Intentar usar una cuenta existente guardada
    let vendorAccount = localStorage.getItem('stellar-vendor-account');

    if (!vendorAccount) {
      // Crear nueva cuenta de vendedor
      const vendorKeypair = StellarSdk.Keypair.random();
      vendorAccount = vendorKeypair.publicKey();

      // Financiar la cuenta del vendedor
      try {
        const response = await fetch(`https://friendbot.stellar.org?addr=${vendorAccount}`);
        if (response.ok) {
          localStorage.setItem('stellar-vendor-account', vendorAccount);
          console.log('Cuenta de vendedor creada y financiada:', vendorAccount);
        }
      } catch (error) {
        console.error('Error financiando cuenta de vendedor:', error);
      }
    }

    return vendorAccount;
  }
}
