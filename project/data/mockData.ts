import { Invoice } from '@/types/invoiceTypes';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    customer: 'Jane Cooper',
    supplier: 'John Smith',
    date: '2024-03-15',
    amount: 2800,
    status: 'paid',
    dueDate: '2024-04-14'
  },
  {
    id: '2',
    number: 'INV-2024-002',
    customer: 'Esther Howard',
    supplier: 'Sarah Johnson',
    date: '2024-03-10',
    amount: 3200,
    status: 'unpaid',
    dueDate: '2024-04-09'
  },
  {
    id: '3',
    number: 'INV-2024-003',
    customer: 'Brooklyn Simmons',
    supplier: 'Michael Brown',
    date: '2025-02-28',
    amount: 4200,
    status: 'paid',
    dueDate: '2024-03-29'
  },
  {
    id: '4',
    number: 'INV-2024-004',
    customer: 'Leslie Alexander',
    supplier: 'Emily Davis',
    date: '2025-02-15',
    amount: 2500,
    status: 'overdue',
    dueDate: '2024-03-16'
  }, 
  {
    id: '3',
    number: 'INV-2024-003',
    customer: 'Brooklyn Simmons',
    supplier: 'David Wilson',
    date: '2025-02-28',
    amount: 3000,
    status: 'paid',
    dueDate: '2024-12-28'
  },
  {
    id: '5',
    number: 'INV-2024-005',
    customer: 'Arlene McCoy',
    supplier: 'John Smith',
    date: '2024-02-10',
    amount: 3800,
    status: 'unpaid',
    dueDate: '2024-03-11'
  },
  {
    id: '6',
    number: 'INV-2024-006',
    customer: 'Marvin McKinney',
    supplier: 'Sarah Johnson',
    date: '2024-02-05',
    amount: 2900,
    status: 'overdue',
    dueDate: '2024-03-06'
  },
  {
    id: '7',
    number: 'INV-2024-007',
    customer: 'Kathryn Murphy',
    supplier: 'Emily Davis',
    date: '2024-02-01',
    amount: 3500,
    status: 'overdue',
    dueDate: '2024-03-02'
  }
];

export const mockSalesData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 34000, profit: 18000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 39000, profit: 22000 },
  { month: 'May', revenue: 55000, expenses: 35000, profit: 20000 },
  { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 },
  { month: 'Jul', revenue: 72000, expenses: 43000, profit: 29000 },
  { month: 'Aug', revenue: 69000, expenses: 42000, profit: 27000 },
  { month: 'Sep', revenue: 74000, expenses: 45000, profit: 29000 },
  { month: 'Oct', revenue: 78000, expenses: 47000, profit: 31000 },
  { month: 'Nov', revenue: 83000, expenses: 49000, profit: 34000 },
  { month: 'Dec', revenue: 92000, expenses: 53000, profit: 39000 },
];

export const mockExpenseCategories = [
  { name: 'Salaries', value: 42000, color: 'hsl(var(--chart-1))' },
  { name: 'Office Rent', value: 15000, color: 'hsl(var(--chart-2))' },
  { name: 'Software', value: 8000, color: 'hsl(var(--chart-3))' },
  { name: 'Marketing', value: 12000, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 6000, color: 'hsl(var(--chart-5))' },
];

export const mockInvoiceAging = [
  { period: 'Jan', current: 32000, overdue30: 8000, overdue60: 3000, overdue90: 1000 },
  { period: 'Feb', current: 35000, overdue30: 7500, overdue60: 4000, overdue90: 1500 },
  { period: 'Mar', current: 33000, overdue30: 9000, overdue60: 3500, overdue90: 2000 },
  { period: 'Apr', current: 38000, overdue30: 10000, overdue60: 4500, overdue90: 2500 },
  { period: 'May', current: 42000, overdue30: 8500, overdue60: 5000, overdue90: 1800 },
  { period: 'Jun', current: 45000, overdue30: 7800, overdue60: 4200, overdue90: 1600 },
];