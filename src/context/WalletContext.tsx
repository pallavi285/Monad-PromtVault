import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    // Simulate a brief delay for wallet connection
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setWalletAddress('0x3f5c71a39d84e578c7b8e19273c52a0a2df39ab4');
        resolve();
      }, 500);
    });
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  const isConnected = walletAddress !== null;

  return (
    <WalletContext.Provider value={{ walletAddress, isConnected, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
