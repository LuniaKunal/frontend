import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Sidebar from '@/components/Sidebar';
import { InvoiceProvider } from '@/context/InvoiceContext';
import { ClientProvider } from '@/context/ClientContext';
import { SupplierProvider } from '@/context/SupplierContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Dashboard',
  description: 'Modern invoice management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InvoiceProvider>
          <ClientProvider>
            <SupplierProvider>
              <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  {children}
                </div>
              </div>
              <Toaster />
            </SupplierProvider>
          </ClientProvider>
        </InvoiceProvider>
      </body>
    </html>
  );
}