"use client";

import Header from './Header';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Eye, MoreHorizontal, Search, Filter, Plus } from 'lucide-react';

const documents = [
  { id: 1, name: 'Annual Financial Report 2023', type: 'PDF', size: '2.4 MB', date: '15 Apr 2023', category: 'Financial' },
  { id: 2, name: 'Tax Return Form 2023', type: 'PDF', size: '1.8 MB', date: '10 Mar 2023', category: 'Tax' },
  { id: 3, name: 'Client Contract - Acme Corp', type: 'DOCX', size: '540 KB', date: '28 Feb 2023', category: 'Legal' },
  { id: 4, name: 'Employee Handbook v2.0', type: 'PDF', size: '3.2 MB', date: '15 Jan 2023', category: 'HR' },
  { id: 5, name: 'Marketing Strategy 2023', type: 'PPTX', size: '4.7 MB', date: '05 Jan 2023', category: 'Marketing' },
  { id: 6, name: 'Vendor Agreement - TechSupply', type: 'PDF', size: '1.2 MB', date: '20 Dec 2022', category: 'Legal' },
  { id: 7, name: 'Q4 2022 Financial Statement', type: 'XLSX', size: '890 KB', date: '10 Dec 2022', category: 'Financial' },
  { id: 8, name: 'Board Meeting Minutes', type: 'PDF', size: '450 KB', date: '28 Nov 2022', category: 'Corporate' },
];

export default function DocumentsContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Documents</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </button>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>All Categories</option>
                <option>Financial</option>
                <option>Tax</option>
                <option>Legal</option>
                <option>HR</option>
                <option>Marketing</option>
                <option>Corporate</option>
              </select>
              
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>Date: Newest First</option>
                <option>Date: Oldest First</option>
                <option>Name: A-Z</option>
                <option>Name: Z-A</option>
                <option>Size: Largest First</option>
                <option>Size: Smallest First</option>
              </select>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Eye className="h-4 w-4 text-gray-500" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}