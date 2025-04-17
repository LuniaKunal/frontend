"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '@/utils/formatUtils';
import { useMemo } from 'react';
import { useInvoices } from '@/context/InvoiceContext';

export default function TopClients() {
  const { invoices } = useInvoices();

  // Calculate client totals from paid invoices
  const data = useMemo(() => {
    const clientTotals = invoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((acc, invoice) => {
        acc[invoice.customer] = (acc[invoice.customer] || 0) + invoice.amount;
        return acc;
      }, {} as Record<string, number>);

    // Convert to array and sort by amount
    let sortedClients = Object.entries(clientTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Take top 4 clients and sum up the rest as "Others"
    const topClients = sortedClients.slice(0, 4);
    const othersValue = sortedClients.slice(4).reduce((sum, client) => sum + client.value, 0);

    // Add "Others" if there are more than 4 clients
    if (othersValue > 0) {
      topClients.push({ name: 'Others', value: othersValue });
    }

    // Assign colors
    return topClients.map((client, index) => ({
      ...client,
      color: `hsl(var(--chart-${index + 1}))`
    }));
  }, [invoices]);

  const totalPaid = data.reduce((sum, client) => sum + client.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalPaid) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-500">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Top Paying Clients</CardTitle>
        <CardDescription>
          Revenue from paid invoices: {formatCurrency(totalPaid)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((client, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: client.color }}></div>
                <span className="text-sm">{client.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{formatCurrency(client.value)}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({((client.value / totalPaid) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}