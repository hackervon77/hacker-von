import React, { useState } from 'react';
import { Shuttle, ShuttleStop } from '../types';
import { STOPS } from '../constants';
import { Play, Pause, AlertTriangle, Users } from 'lucide-react';

interface DriverViewProps {
  shuttles: Shuttle[];
}

const DriverView: React.FC<DriverViewProps> = ({ shuttles }) => {
  // Mock logged in driver as first shuttle
  const myShuttle = shuttles[0];
  const [occupancy, setOccupancy] = useState(myShuttle.occupancy);
  const [isOnBreak, setIsOnBreak] = useState(false);

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Hello, {myShuttle.driverName}</h2>
            <p className="text-slate-500">Shuttle ID: <span className="font-mono text-slate-700">{myShuttle.id}</span></p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isOnBreak ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
            {isOnBreak ? 'On Break' : 'Active'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setIsOnBreak(!isOnBreak)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
              isOnBreak 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-amber-500 bg-amber-50 text-amber-700'
            }`}
          >
            {isOnBreak ? <Play size={32} className="mb-2" /> : <Pause size={32} className="mb-2" />}
            <span className="font-bold">{isOnBreak ? 'Resume Shift' : 'Take Break'}</span>
          </button>

          <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
            <AlertTriangle size={32} className="mb-2" />
            <span className="font-bold">Emergency</span>
          </button>
        </div>

        <div className="space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <Users size={18} /> Update Occupancy
            </h3>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                <input 
                    type="range" 
                    min="0" 
                    max={myShuttle.capacity} 
                    value={occupancy}
                    onChange={(e) => setOccupancy(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono font-bold text-lg w-16 text-right">{occupancy}/{myShuttle.capacity}</span>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4">Route Progress</h3>
        <div className="space-y-4">
            {STOPS.slice(0, 3).map((stop, i) => (
                <div key={stop.id} className={`flex items-center p-3 rounded-lg ${i === 0 ? 'bg-indigo-50 border border-indigo-200' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {i + 1}
                    </div>
                    <div>
                        <div className="font-bold text-slate-800">{stop.name}</div>
                        <div className="text-xs text-slate-500">{i === 0 ? 'Current Stop' : 'Next Stop'}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DriverView;
