"use client";

import { PlusCircle, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center mr-10">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 10l-8-4m-8 4l8-4" />
              </svg>
            </div>
            <span className="text-xl font-bold">ProAcc</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
            <PlusCircle className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}