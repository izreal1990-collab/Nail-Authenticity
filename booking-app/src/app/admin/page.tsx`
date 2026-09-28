import React from 'react';
import { Calendar, User, CheckCircle, Clock, X } from 'lucide-react';

type Appointment = {
  id: string;
  customer_name: string;
  customer_email: string;
  service_name: string;
  start_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', customer_name: 'Jane Doe', customer_email: 'jane@example.com', service_name: 'Full Set Acrylics', start_time: '2026-10-01T10:00:00Z', status: 'confirmed' },
  { id: '2', customer_name: 'Sarah Smith', customer_email: 'sarah@example.com', service_name: 'Gel Manicure', start_time: '2026-10-01T13:00:00Z', status: 'pending' },
  { id: '3', customer_name: 'Mia Wong', customer_email: 'mia@example.com', service_name: 'Nail Art (Detailed)', start_time: '2026-10-02T09:00:00Z', status: 'confirmed' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Business Manager</h1>
          <p className="text-gray-500 text-sm">Manage your Nail Authenticity schedule</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors">
            + New Manual Booking
          </button>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">Today's Appointments</div>
            <div className="text-3xl font-bold text-gray-800">4</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">Pending Deposits</div>
            <div className="text-3xl font-bold text-pink-600">2</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-xs font-bold uppercase mb-1">Weekly Revenue</div>
            <div className="text-3xl font-bold text-gray-800">$420.00</div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">Upcoming Bookings</h2>
            <div className="flex gap-2">
              <select className="text-sm border border-gray-200 rounded-md p-1 outline-none">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Confirmed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_APPOINTMENTS.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{app.customer_name}</div>
                      <div className="text-xs text-gray-400">{app.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.service_name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        {new Date(app.start_time).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark Completed">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Cancel">
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
