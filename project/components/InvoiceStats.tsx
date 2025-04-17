"use client";

import { Clock, AlertCircle, Hourglass, Calendar } from 'lucide-react';
import { formatCurrency } from '@/utils/formatUtils';

interface InvoiceStatsProps {
  overdueAmount: number;
  unpaidTotal: number;
  averagePaidTime: number;
  scheduledForToday: number;
}

export default function InvoiceStats({
  overdueAmount,
  unpaidTotal,
  averagePaidTime,
  scheduledForToday
}: InvoiceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2 p-3 rounded-full bg-orange-50">
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(overdueAmount)}</div>
          <div className="text-gray-500 text-sm">Overdue amount</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2 p-3 rounded-full bg-blue-50">
            <AlertCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(unpaidTotal)}</div>
          <div className="text-gray-500 text-sm">Unpaid amount</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2 p-3 rounded-full bg-purple-50">
            <Hourglass className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">{averagePaidTime} <span className="text-sm font-normal">days</span></div>
          <div className="text-gray-500 text-sm">Average paid time</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2 p-3 rounded-full bg-green-50">
            <Calendar className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{scheduledForToday} <span className="text-sm font-normal">invoices</span></div>
          <div className="text-gray-500 text-sm">Scheduled for today</div>
        </div>
      </div>
    </div>
  );
}