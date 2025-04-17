"use client";

import { useState } from 'react';
import AppLayout from './AppLayout';
import Header from './Header';
import InvoiceStats from './InvoiceStats';
import InvoiceList from './InvoiceList';
import { InvoiceStatus } from '@/types/invoiceTypes';
import { useInvoices } from '@/context/InvoiceContext';

export default function Dashboard() {
  const { invoices, updateInvoice } = useInvoices();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');
  const [customerFilter, setCustomerFilter] = useState<string | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Calculate statistics
  const overdueAmount = invoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const unpaidTotal = invoices
    .filter(invoice => invoice.status === 'unpaid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');
  const averagePaidTime = paidInvoices.length > 0 ? 8 : 0; // Mock value for demo
  
  const scheduledForToday = 5; // Mock value for demo

  // Filter invoices based on search, status, and customer
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchQuery === '' || 
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesCustomer = customerFilter === 'all' || invoice.customer === customerFilter;
    
    return matchesSearch && matchesStatus && matchesCustomer;
  });

  // Sort invoices by date
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Get unique customers for filter dropdown
  const customers = Array.from(new Set(invoices.map(invoice => invoice.customer)));

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Invoices</h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center">
                Create an invoice
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <InvoiceStats 
              overdueAmount={overdueAmount}
              unpaidTotal={unpaidTotal}
              averagePaidTime={averagePaidTime}
              scheduledForToday={scheduledForToday}
            />
            
            <InvoiceList 
              invoices={sortedInvoices}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              customerFilter={customerFilter}
              setCustomerFilter={setCustomerFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              customers={customers}
              onUpdateInvoice={updateInvoice}
            />
          </div>
        </main>
      </div>
    </AppLayout>
  );
}