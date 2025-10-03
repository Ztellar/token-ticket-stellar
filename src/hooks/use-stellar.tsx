import { useState, useEffect, useCallback } from 'react';
import { StellarService, StellarAccount, TransactionResult } from '@/services/stellar';

interface UseStellarReturn {
  account: StellarAccount | null;
  balance: { xlm: string; clp: string };
  isLoading: boolean;
  createAccount: () => Promise<void>;
  fundAccount: () => Promise<boolean>;
  buyTicket: (vendorPublicKey: string, priceInCLP: string, eventId: string) => Promise<TransactionResult>;
  refreshBalance: () => Promise<void>;
}

export const useStellar = (): UseStellarReturn => {
  const [account, setAccount] = useState<StellarAccount | null>(null);
  const [balance, setBalance] = useState({ xlm: '0', clp: '0' });
  const [isLoading, setIsLoading] = useState(false);

  // Cargar cuenta desde localStorage al inicializar
  useEffect(() => {
    const savedAccount = localStorage.getItem('stellar-account');
    if (savedAccount) {
      try {
        setAccount(JSON.parse(savedAccount));
      } catch (error) {
        console.error('Error loading saved account:', error);
      }
    }
  }, []);

  // Actualizar balance cuando cambie la cuenta
  useEffect(() => {
    if (account) {
      refreshBalance();
    }
  }, [account]);

  const createAccount = useCallback(async () => {
    setIsLoading(true);
    try {
      const newAccount = StellarService.generateAccount();
      setAccount(newAccount);
      localStorage.setItem('stellar-account', JSON.stringify(newAccount));
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fundAccount = useCallback(async (): Promise<boolean> => {
    if (!account) return false;

    setIsLoading(true);
    try {
      const success = await StellarService.fundAccount(account.publicKey);
      if (success) {
        // Esperar un momento para que la red procese la transacción
        setTimeout(refreshBalance, 3000);
      }
      return success;
    } catch (error) {
      console.error('Error funding account:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  const buyTicket = useCallback(async (
    vendorPublicKey: string,
    priceInCLP: string,
    eventId: string
  ): Promise<TransactionResult> => {
    if (!account) {
      return { success: false, error: 'No hay cuenta disponible' };
    }

    setIsLoading(true);
    try {
      const result = await StellarService.buyTicket(
        account.secretKey,
        vendorPublicKey,
        priceInCLP,
        eventId
      );

      if (result.success) {
        // Actualizar balance después de la compra
        setTimeout(refreshBalance, 2000);
      }

      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  const refreshBalance = useCallback(async () => {
    if (!account) return;

    try {
      const newBalance = await StellarService.getAccountBalance(account.publicKey);
      setBalance(newBalance);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, [account]);

  return {
    account,
    balance,
    isLoading,
    createAccount,
    fundAccount,
    buyTicket,
    refreshBalance
  };
};
