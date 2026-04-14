import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface PrintingProviderProps {
  children: ReactNode;
}

const PrintingContext = createContext<boolean | undefined>(undefined);

export const PrintingProvider = ({ children }: PrintingProviderProps) => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    setIsPrinting(window.matchMedia('print').matches);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return <PrintingContext.Provider value={isPrinting}>{children}</PrintingContext.Provider>;
};

export const usePrint = (): boolean => {
  const context = useContext(PrintingContext);
  if (context === undefined) {
    throw new Error('usePrint must be used within a PrintingProvider');
  }
  return context;
};
