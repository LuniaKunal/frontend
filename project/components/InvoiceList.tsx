"use client";

import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Calendar, Edit2 } from 'lucide-react';
import { Invoice, InvoiceStatus } from '@/types/invoiceTypes';
import { formatCurrency } from '@/utils/formatUtils';
import FilterDropdown from './FilterDropdown';
import EditInvoiceModal from './EditInvoiceModal';

interface InvoiceListProps {
  invoices: Invoice[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: InvoiceStatus | 'all';
  setStatusFilter: (status: InvoiceStatus | 'all') => void;
  customerFilter: string | 'all';
  setCustomerFilter: (customer: string | 'all') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  customers: string[];
  onUpdateInvoice: (updatedInvoice: Invoice) => void;
}

export default function InvoiceList({
  invoices,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  customerFilter,
  setCustomerFilter,
  sortOrder,
  setSortOrder,
  customers,
  onUpdateInvoice
}: InvoiceListProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Count invoices by status
  const allCount = invoices.length;
  const unpaidCount = invoices.filter(invoice => invoice.status === 'unpaid').length;
  const overdueCount = invoices.filter(invoice => invoice.status === 'overdue').length;

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getStatusBadgeClass = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter invoice number"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded-lg text-sm font-medium ${statusFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setStatusFilter('all')}
              >
                All Invoices <span className="ml-1 px-1.5 py-0.5 bg-white rounded-md text-xs">{allCount}</span>
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm font-medium ${statusFilter === 'unpaid' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setStatusFilter('unpaid')}
              >
                Unpaid <span className="ml-1 px-1.5 py-0.5 bg-white rounded-md text-xs">{unpaidCount}</span>
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm font-medium ${statusFilter === 'overdue' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setStatusFilter('overdue')}
              >
                Overdue <span className="ml-1 px-1.5 py-0.5 bg-white rounded-md text-xs">{overdueCount}</span>
              </button>
            </div>
            
            <button 
              className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            
            <div className="relative">
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50">
                Newest First
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <FilterDropdown 
            customers={customers}
            customerFilter={customerFilter}
            setCustomerFilter={setCustomerFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={toggleSortOrder}
              >
                <div className="flex items-center">
                  Date
                  {sortOrder === 'asc' ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount Due
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {invoice.status === 'paid' ? '-' : formatCurrency(invoice.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => setSelectedInvoice(invoice)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <EditInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onSave={(updatedInvoice) => {
            onUpdateInvoice(updatedInvoice);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
}