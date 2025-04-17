"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useInvoices } from './InvoiceContext';

export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
}

interface ClientWithMetadata extends Client {
  totalBilled: number;
  paidAmount: number;
  unpaidAmount: number;
  overdueAmount: number;
  lastInvoiceDate: string | null;
}

interface ClientContextType {
  clients: ClientWithMetadata[];
  updateClient: (updatedClient: Client) => void;
}

const initialClients: Client[] = [
  { 
    id: 1, 
    name: 'Jane Cooper', 
    company: 'Acme Inc', 
    email: 'jane@acme.com', 
    phone: '(555) 123-4567', 
    address: '123 Main St, New York, NY 10001',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Esther Howard', 
    company: 'GlobalTech', 
    email: 'esther@globaltech.com', 
    phone: '(555) 234-5678', 
    address: '456 Park Ave, San Francisco, CA 94107',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Cameron Williamson', 
    company: 'Innovate LLC', 
    email: 'cameron@innovate.com', 
    phone: '(555) 345-6789', 
    address: '789 Broadway, Chicago, IL 60601',
    status: 'Inactive'
  },
  { 
    id: 4, 
    name: 'Brooklyn Simmons', 
    company: 'TechStart', 
    email: 'brooklyn@techstart.com', 
    phone: '(555) 456-7890', 
    address: '321 Oak St, Austin, TX 78701',
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'Leslie Alexander', 
    company: 'Design Co', 
    email: 'leslie@designco.com', 
    phone: '(555) 567-8901', 
    address: '567 Pine St, Seattle, WA 98101',
    status: 'Active'
  },
  { 
    id: 6, 
    name: 'Marvin McKinney', 
    company: 'Finance Plus', 
    email: 'marvin@financeplus.com', 
    phone: '(555) 678-9012', 
    address: '890 Elm St, Boston, MA 02108',
    status: 'Active'
  }
];

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const { invoices } = useInvoices();

  const clientsWithMetadata = useMemo(() => {
    return clients.map(client => {
      const clientInvoices = invoices.filter(invoice => invoice.customer === client.name);
      const totalBilled = clientInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
      const paidAmount = clientInvoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const unpaidAmount = clientInvoices
        .filter(invoice => invoice.status === 'unpaid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const overdueAmount = clientInvoices
        .filter(invoice => invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      
      const sortedInvoices = [...clientInvoices].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const lastInvoiceDate = sortedInvoices.length > 0 ? sortedInvoices[0].date : null;

      // Update status based on invoice activity
      const hasRecentActivity = lastInvoiceDate && 
        new Date(lastInvoiceDate).getTime() > new Date().getTime() - 90 * 24 * 60 * 60 * 1000; // 90 days
      const status = hasRecentActivity ? 'Active' as const : 'Inactive' as const;

      return {
        ...client,
        totalBilled,
        paidAmount,
        unpaidAmount,
        overdueAmount,
        lastInvoiceDate,
        status
      };
    });
  }, [clients, invoices]);

  const updateClient = (updatedClient: Client) => {
    setClients(currentClients =>
      currentClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <ClientContext.Provider value={{ clients: clientsWithMetadata, updateClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
} 