"use client";

import Header from './Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building, CreditCard, Bell, Lock, HelpCircle } from 'lucide-react';

export default function SettingsContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Save Changes
            </button>
          </div>
          
          <Tabs defaultValue="profile" className="mb-6">
            <TabsList className="grid grid-cols-6 mb-6">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-blue-600" />
                      </div>
                      <div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm">
                          Upload Photo
                        </button>
                        <button className="ml-2 text-sm text-gray-500 hover:text-gray-700">
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="123 Main St, New York, NY 10001"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                  <CardDescription>
                    Manage your company information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-10 h-10 text-gray-500" />
                      </div>
                      <div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm">
                          Upload Logo
                        </button>
                        <button className="ml-2 text-sm text-gray-500 hover:text-gray-700">
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="ProAcc Financial Services"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg p-2">
                          <option>Accounting</option>
                          <option>Finance</option>
                          <option>Consulting</option>
                          <option>Technology</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg p-2">
                          <option>1-10 employees</option>
                          <option>11-50 employees</option>
                          <option>51-200 employees</option>
                          <option>201-500 employees</option>
                          <option>500+ employees</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Address
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="456 Business Ave, Suite 200, San Francisco, CA 94107"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tax ID / EIN
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="12-3456789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          className="w-full border border-gray-300 rounded-lg p-2"
                          defaultValue="https://proacc.example.com"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Settings</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-blue-800">Professional Plan</h3>
                          <p className="text-sm text-blue-600">$49/month, billed annually</p>
                        </div>
                        <button className="bg-white border border-blue-300 text-blue-600 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-50">
                          Change Plan
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Payment Method</h3>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                        </div>
                      </div>
                      <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                        + Add Payment Method
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Billing History</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Receipt</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 1, 2023</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Professional Plan - Annual</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$588.00</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Paid</span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                <button className="text-blue-600 hover:text-blue-800">Download</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 1, 2022</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Professional Plan - Annual</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$588.00</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Paid</span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                <button className="text-blue-600 hover:text-blue-800">Download</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Invoice Reminders</p>
                            <p className="text-sm text-gray-500">Get notified when invoices are due</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Payment Notifications</p>
                            <p className="text-sm text-gray-500">Get notified when payments are received</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Project Updates</p>
                            <p className="text-sm text-gray-500">Get notified about project status changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Updates</p>
                            <p className="text-sm text-gray-500">Receive news and promotional offers</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Notification Frequency</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Reminder Timing
                          </label>
                          <select className="w-full border border-gray-300 rounded-lg p-2">
                            <option>1 day before due</option>
                            <option>3 days before due</option>
                            <option>1 week before due</option>
                            <option>2 weeks before due</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Summary Reports
                          </label>
                          <select className="w-full border border-gray-300 rounded-lg p-2">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Never</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm">
                          Enable
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Login Sessions</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Chrome on Windows</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">San Francisco, CA</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Now (Current)</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                <button className="text-gray-500 hover:text-gray-700">-</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Safari on iPhone</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">New York, NY</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                <button className="text-red-600 hover:text-red-800">Logout</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>
                    Get help with your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          Documentation
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Browse our detailed documentation to learn how to use ProAcc features.
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Documentation →
                        </button>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          FAQs
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Find answers to commonly asked questions about our services.
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View FAQs →
                        </button>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          Contact Support
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Need help? Our support team is ready to assist you.
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Contact Support →
                        </button>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          Video Tutorials
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Watch step-by-step tutorials on how to use ProAcc features.
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Watch Tutorials →
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Our support team is available Monday-Friday, 9am-5pm PT.
                      </p>
                      <div className="flex space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                          Live Chat
                        </button>
                        <button className="bg-white border border-blue-300 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50">
                          Email Support
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}