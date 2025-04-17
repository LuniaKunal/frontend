"use client";

import Header from './Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSalesData, mockExpenseCategories, mockInvoiceAging } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { formatCurrency } from '@/utils/formatUtils';

export default function ReportsContent() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reports</h1>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>All time</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Export
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>
                  Monthly comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockSalesData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--chart-1))" />
                      <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  By category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockExpenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockExpenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Invoice Aging</CardTitle>
              <CardDescription>
                Outstanding invoices by age
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockInvoiceAging}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="period" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      name="Current" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overdue30" 
                      name="1-30 Days" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overdue60" 
                      name="31-60 Days" 
                      stroke="hsl(var(--chart-3))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overdue90" 
                      name="61-90 Days" 
                      stroke="hsl(var(--chart-4))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}