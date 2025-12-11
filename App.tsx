import React, { useState, useEffect } from 'react';
import { UserRole, Shuttle } from './types';
import { INITIAL_SHUTTLES } from './constants';
import StudentView from './components/StudentView';
import DriverView from './components/DriverView';
import AdminView from './components/AdminView';
import ChatAssistant from './components/ChatAssistant';
import { Bus, User, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [shuttles, setShuttles] = useState<Shuttle[]>(INITIAL_SHUTTLES);

  // Simulation effect to move shuttles
  useEffect(() => {
    const interval = setInterval(() => {
      setShuttles(prevShuttles => 
        prevShuttles.map(shuttle => {
          if (shuttle.status !== 'active') return shuttle;
          
          let newProgress = shuttle.progress + 0.005; // Move slowly
          let nextStopId = shuttle.nextStopId;
          let currentStopId = shuttle.currentStopId;

          // Simple loop logic
          if (newProgress >= 1) {
             newProgress = 0;
             // Here we would realistically calculate next stop ID based on route
             // For simulation, we just loop the progress bar
          }
          
          return { ...shuttle, progress: newProgress };
        })
      );
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Bus size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">UCC Shuttle Track</h1>
          </div>
          
          {/* Role Switcher for Demo Purposes */}
          <div className="hidden md:flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setRole(UserRole.STUDENT)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${
                role === UserRole.STUDENT ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User size={14} /> Student
            </button>
            <button
              onClick={() => setRole(UserRole.DRIVER)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${
                role === UserRole.DRIVER ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bus size={14} /> Driver
            </button>
            <button
              onClick={() => setRole(UserRole.ADMIN)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${
                role === UserRole.ADMIN ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck size={14} /> Admin
            </button>
          </div>

          <div className="md:hidden">
             {/* Mobile simple role toggle */}
             <select 
               value={role} 
               onChange={(e) => setRole(e.target.value as UserRole)}
               className="bg-slate-800 text-xs text-white border-none rounded py-1 pl-2 pr-6"
             >
                <option value={UserRole.STUDENT}>Student</option>
                <option value={UserRole.DRIVER}>Driver</option>
                <option value={UserRole.ADMIN}>Admin</option>
             </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {role === UserRole.STUDENT && (
          <>
            <StudentView shuttles={shuttles} />
            <ChatAssistant />
          </>
        )}
        {role === UserRole.DRIVER && <DriverView shuttles={shuttles} />}
        {role === UserRole.ADMIN && <AdminView shuttles={shuttles} />}
      </main>
    </div>
  );
};

export default App;
