export type InvoiceStatus = 'paid' | 'unpaid' | 'draft' | 'overdue';

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  supplier: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  dueDate?: string;
}