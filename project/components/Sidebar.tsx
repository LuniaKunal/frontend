"use client";

import { useState } from 'react';
import { 
  LayoutGrid, 
  CircleDollarSign, 
  FileText, 
  ClipboardList, 
  Users, 
  Settings,
  BarChart,
  Truck
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [activePage, setActivePage] = useState('invoices');

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
      <div className="text-center mb-8">
        <span className="uppercase text-xs text-gray-500 font-medium">Menu</span>
      </div>
      <nav className="flex-1 flex flex-col items-center space-y-6">
        <Link 
          href="/dashboard" 
          className={`p-3 rounded-xl ${activePage === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('dashboard')}
        >
          <LayoutGrid className="w-6 h-6" />
        </Link>
        <Link 
          href="/" 
          className={`p-3 rounded-xl ${activePage === 'invoices' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('invoices')}
        >
          <CircleDollarSign className="w-6 h-6" />
        </Link>
        <Link 
          href="/reports" 
          className={`p-3 rounded-xl ${activePage === 'reports' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('reports')}
        >
          <BarChart className="w-6 h-6" />
        </Link>
        <Link 
          href="/documents" 
          className={`p-3 rounded-xl ${activePage === 'documents' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('documents')}
        >
          <FileText className="w-6 h-6" />
        </Link>
        <Link 
          href="/projects" 
          className={`p-3 rounded-xl ${activePage === 'projects' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('projects')}
        >
          <ClipboardList className="w-6 h-6" />
        </Link>
        <Link 
          href="/clients" 
          className={`p-3 rounded-xl ${activePage === 'clients' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('clients')}
        >
          <Users className="w-6 h-6" />
        </Link>
        <Link 
          href="/suppliers" 
          className={`p-3 rounded-xl ${activePage === 'suppliers' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('suppliers')}
        >
          <Truck className="w-6 h-6" />
        </Link>
      </nav>
      <div className="mb-8">
        <Link 
          href="/settings" 
          className={`p-3 rounded-xl ${activePage === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
          onClick={() => setActivePage('settings')}
        >
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </aside>
  );
}