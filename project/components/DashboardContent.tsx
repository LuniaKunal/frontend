"use client";

import Header from './Header';
import SalesOverview from './SalesOverview';
import RecentInvoices from './RecentInvoices';
import TopClients from './TopClients';
import { mockSalesData } from '@/data/mockData';

export default function DashboardContent() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>All time</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SalesOverview salesData={mockSalesData} />
            </div>
            <div>
              <TopClients />
            </div>
          </div>
          
          <div className="mb-6">
            <RecentInvoices />
          </div>
        </div>
      </main>
    </>
  );
}