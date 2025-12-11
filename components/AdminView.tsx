import React from 'react';
import { Shuttle, Report } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, AlertOctagon, Bus, Users } from 'lucide-react';

interface AdminViewProps {
  shuttles: Shuttle[];
}

const AdminView: React.FC<AdminViewProps> = ({ shuttles }) => {
  // Mock Analytics Data
  const usageData = [
    { name: '06:00', passengers: 120 },
    { name: '08:00', passengers: 450 },
    { name: '10:00', passengers: 300 },
    { name: '12:00', passengers: 200 },
    { name: '14:00', passengers: 350 },
    { name: '16:00', passengers: 500 },
    { name: '18:00', passengers: 400 },
  ];

  const reports: Report[] = [
    { id: '1', type: 'crowding', description: 'Bus 5 is full at Science', timestamp: Date.now(), status: 'pending', severity: 'medium' },
    { id: '2', type: 'delay', description: 'Long wait at Diaspora', timestamp: Date.now() - 3600000, status: 'resolved', severity: 'low' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Shuttles</p>
              <h3 className="text-2xl font-bold text-slate-900">{shuttles.length}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Bus size={20} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Daily Passengers</p>
              <h3 className="text-2xl font-bold text-slate-900">2,345</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users size={20} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. Wait Time</p>
              <h3 className="text-2xl font-bold text-slate-900">8m</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Activity size={20} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Issues</p>
              <h3 className="text-2xl font-bold text-slate-900">1</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertOctagon size={20} /></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Passenger Traffic (Today)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="passengers" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Recent Reports</h3>
          <div className="space-y-4">
            {reports.map(report => (
              <div key={report.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    report.severity === 'high' ? 'bg-red-100 text-red-700' : 
                    report.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {report.severity}
                  </span>
                  <span className="text-xs text-slate-400">1h ago</span>
                </div>
                <p className="text-sm text-slate-700 font-medium">{report.description}</p>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
