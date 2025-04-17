"use client";

import Header from './Header';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Plus, Clock, CheckCircle, AlertCircle, MoreHorizontal } from 'lucide-react';

const projects = [
  { id: 1, name: 'Website Redesign', client: 'Acme Corp', deadline: '15 Jun 2023', status: 'In Progress', budget: 12000, spent: 5400 },
  { id: 2, name: 'Tax Preparation', client: 'Jane Cooper', deadline: '30 Apr 2023', status: 'Completed', budget: 2500, spent: 2500 },
  { id: 3, name: 'Financial Audit', client: 'GlobalTech Inc', deadline: '22 Jul 2023', status: 'Not Started', budget: 8000, spent: 0 },
  { id: 4, name: 'Quarterly Reports', client: 'Esther Howard', deadline: '10 Apr 2023', status: 'Overdue', budget: 1800, spent: 1200 },
  { id: 5, name: 'Bookkeeping Setup', client: 'Brooklyn Simmons', deadline: '05 Jun 2023', status: 'In Progress', budget: 3500, spent: 1800 },
  { id: 6, name: 'Investment Analysis', client: 'Cameron Williamson', deadline: '20 Jun 2023', status: 'In Progress', budget: 5000, spent: 2200 },
];

export default function ProjectsContent() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Not Started':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'Overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Projects</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>All Statuses</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Not Started</option>
                <option>Overdue</option>
              </select>
              
              <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>All Clients</option>
                <option>Acme Corp</option>
                <option>Jane Cooper</option>
                <option>GlobalTech Inc</option>
                <option>Esther Howard</option>
                <option>Brooklyn Simmons</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Budget</span>
                      <span className="text-sm font-medium">${project.spent} / ${project.budget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(project.spent / project.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getStatusIcon(project.status)}
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {project.deadline}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}