"use client";

import Header from './Header';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, Phone, Mail, MapPin, MoreHorizontal, User, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/formatUtils';
import { useClients } from '@/context/ClientContext';
import { useState } from 'react';

export default function ClientsContent() {
  const { clients } = useClients();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'totalBilled'>('name');

  // Filter clients based on search query and status
  const filteredClients = clients.filter(client => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      client.name.toLowerCase().includes(searchLower) ||
      client.company.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort clients based on selected criteria
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'company':
        return a.company.localeCompare(b.company);
      case 'totalBilled':
        return b.totalBilled - a.totalBilled;
      default:
        return 0;
    }
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Clients</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </button>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Active' | 'Inactive')}
              >
                <option value="all">All Clients</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'company' | 'totalBilled')}
              >
                <option value="name">Sort by Name</option>
                <option value="company">Sort by Company</option>
                <option value="totalBilled">Sort by Total Billed</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {sortedClients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <p className="text-sm text-gray-500">{client.company}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-600'}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{client.phone}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{client.address}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-blue-600 mb-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Total Billed
                      </div>
                      <p className="text-lg font-semibold">{formatCurrency(client.totalBilled)}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-green-600 mb-1">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Paid Amount
                      </div>
                      <p className="text-lg font-semibold">{formatCurrency(client.paidAmount)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-yellow-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Unpaid
                      </div>
                      <p className="text-lg font-semibold">{formatCurrency(client.unpaidAmount)}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-red-600 mb-1">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Overdue
                      </div>
                      <p className="text-lg font-semibold">{formatCurrency(client.overdueAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Last Invoice</p>
                      <p className="text-sm font-medium">
                        {client.lastInvoiceDate 
                          ? new Date(client.lastInvoiceDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          : 'No invoices'}
                      </p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
