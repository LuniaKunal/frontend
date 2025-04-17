"use client";

import Header from './Header';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, Phone, Mail, MapPin, MoreHorizontal, User, TrendingUp, Clock, Percent, Tag } from 'lucide-react';
import { formatCurrency } from '@/utils/formatUtils';
import { useSuppliers } from '@/context/SupplierContext';
import { useState } from 'react';

export default function SuppliersContent() {
  const { suppliers } = useSuppliers();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name'>('name');

  // Get unique categories
  const categories = Array.from(new Set(suppliers.map(s => s.category)));

  // Filter suppliers based on search query and status
  const filteredSuppliers = suppliers.filter(supplier => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchLower) ||
      supplier.company.toLowerCase().includes(searchLower) ||
      supplier.email.toLowerCase().includes(searchLower) ||
      supplier.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort suppliers by name
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Suppliers</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </button>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search suppliers..."
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
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name')}
              >
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{supplier.name}</h3>
                      <p className="text-sm text-gray-500">{supplier.company}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-600'}`}>
                    {supplier.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{supplier.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{supplier.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-600">{supplier.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-blue-600 mb-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Total Paid
                    </div>
                    <p className="text-lg font-semibold">{formatCurrency(supplier.totalPaid)}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-yellow-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </div>
                    <p className="text-lg font-semibold">{formatCurrency(supplier.pendingPayments)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-purple-600 mb-1">
                      <Percent className="w-4 h-4 mr-1" />
                      Commission
                    </div>
                    <p className="text-lg font-semibold">{supplier.commission}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-green-600 mb-1">
                      <Tag className="w-4 h-4 mr-1" />
                      Category
                    </div>
                    <p className="text-lg font-semibold truncate">{supplier.category}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Last Payment</p>
                    <p className="text-sm font-medium">
                      {supplier.lastPaymentDate 
                        ? new Date(supplier.lastPaymentDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : 'No payments'}
                    </p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 