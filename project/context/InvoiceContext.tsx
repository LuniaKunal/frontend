"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Invoice } from '@/types/invoiceTypes';
import { mockInvoices as initialInvoices } from '@/data/mockData';

interface InvoiceContextType {
  invoices: Invoice[];
  updateInvoice: (updatedInvoice: Invoice) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(currentInvoices =>
      currentInvoices.map(invoice =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <InvoiceContext.Provider value={{ invoices, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
} 