"use client";

import { Calendar } from 'lucide-react';
import { InvoiceStatus } from '@/types/invoiceTypes';

interface FilterDropdownProps {
  customers: string[];
  customerFilter: string | 'all';
  setCustomerFilter: (customer: string | 'all') => void;
  statusFilter: InvoiceStatus | 'all';
  setStatusFilter: (status: InvoiceStatus | 'all') => void;
  onClose: () => void;
}

export default function FilterDropdown({
  customers,
  customerFilter,
  setCustomerFilter,
  statusFilter,
  setStatusFilter,
  onClose
}: FilterDropdownProps) {
  const handleApplyFilters = () => {
    onClose();
  };

  return (
    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">All Customers</label>
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value as string | 'all')}
          >
            <option value="all">All Customers</option>
            {customers.map((customer) => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">All Statuses</label>
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="draft">Draft</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Select date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Select date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}