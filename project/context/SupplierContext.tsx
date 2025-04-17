"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useInvoices } from './InvoiceContext';

export interface Supplier {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
  commission: number;
  category: string;
}

interface SupplierWithMetadata extends Supplier {
  totalPaid: number;
  pendingPayments: number;
  overduePayments: number;
  lastPaymentDate: string | null;
}

interface SupplierContextType {
  suppliers: SupplierWithMetadata[];
  updateSupplier: (updatedSupplier: Supplier) => void;
}

const initialSuppliers: Supplier[] = [
  { 
    id: 1, 
    name: 'David Wilson', 
    company: 'Logistics Plus', 
    email: 'david@logisticsplus.com', 
    phone: '(555) 555-6677', 
    address: '567 Shipping Lane, Dallas, TX 75201',
    status: 'Inactive',
    commission: 6,
    category: 'Logistics'
  },
  { 
    id: 2, 
    name: 'Emily Davis', 
    company: 'Creative Designs', 
    email: 'emily@creativedesigns.com', 
    phone: '(555) 444-5566', 
    address: '321 Design Blvd, Portland, OR 97201',
    status: 'Inactive',
    commission: 10,
    category: 'Design Services'
  },
  { 
    id: 3, 
    name: 'Jennifer Taylor', 
    company: 'Quality Assurance Inc', 
    email: 'jennifer@qualityassurance.com', 
    phone: '(555) 666-7788', 
    address: '890 Quality Circle, Denver, CO 80201',
    status: 'Inactive',
    commission: 8,
    category: 'Quality Control'
  },
  { 
    id: 4, 
    name: 'Michael Brown', 
    company: 'Global Materials', 
    email: 'michael@globalmaterials.com', 
    phone: '(555) 333-4455', 
    address: '123 Material Rd, Atlanta, GA 30301',
    status: 'Inactive',
    commission: 7,
    category: 'Materials'
  },
  { 
    id: 5, 
    name: 'Robert Johnson', 
    company: 'Supply Chain Co', 
    email: 'robert@supplychain.com', 
    phone: '(555) 111-2233', 
    address: '789 Supply St, Chicago, IL 60601',
    status: 'Inactive',
    commission: 9,
    category: 'Supply Chain'
  },
  { 
    id: 6, 
    name: 'Sarah Miller', 
    company: 'Tech Components Ltd', 
    email: 'sarah@techcomponents.com', 
    phone: '(555) 222-3344', 
    address: '456 Tech Ave, San Jose, CA 95123',
    status: 'Inactive',
    commission: 8,
    category: 'Technology'
  }
];

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

export function SupplierProvider({ children }: { children: ReactNode }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const { invoices } = useInvoices();

  const suppliersWithMetadata = useMemo(() => {
    return suppliers.map(supplier => {
      const supplierInvoices = invoices.filter(invoice => invoice.supplier === supplier.name);
      const totalPaid = supplierInvoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const pendingPayments = supplierInvoices
        .filter(invoice => invoice.status === 'unpaid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const overduePayments = supplierInvoices
        .filter(invoice => invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      
      const sortedInvoices = [...supplierInvoices].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const lastPaymentDate = sortedInvoices.length > 0 ? sortedInvoices[0].date : null;

      // Update status based on invoice activity
      const hasRecentActivity = lastPaymentDate && 
        new Date(lastPaymentDate).getTime() > new Date().getTime() - 90 * 24 * 60 * 60 * 1000; // 90 days
      const status = hasRecentActivity ? 'Active' as const : 'Inactive' as const;

      return {
        ...supplier,
        totalPaid,
        pendingPayments,
        overduePayments,
        lastPaymentDate,
        status
      };
    });
  }, [suppliers, invoices]);

  const updateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(currentSuppliers =>
      currentSuppliers.map(supplier =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
  };

  return (
    <SupplierContext.Provider value={{ suppliers: suppliersWithMetadata, updateSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
}

export function useSuppliers() {
  const context = useContext(SupplierContext);
  if (context === undefined) {
    throw new Error('useSuppliers must be used within a SupplierProvider');
  }
  return context;
} 