import React, { useMemo } from 'react';
import { Shuttle, ShuttleRoute, ShuttleStop } from '../types';
import { STOPS, ROUTES } from '../constants';

interface MapVisualizationProps {
  shuttles: Shuttle[];
  userRole: 'STUDENT' | 'DRIVER' | 'ADMIN';
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ shuttles }) => {
  
  // Helper to interpolate position between two stops based on progress
  const getShuttlePosition = (shuttle: Shuttle) => {
    const route = ROUTES.find(r => r.id === shuttle.routeId);
    if (!route) return { x: 0, y: 0 };

    // Find indices of stops
    let currentStopIndex = -1;
    if (shuttle.currentStopId) {
       currentStopIndex = route.stops.indexOf(shuttle.currentStopId);
    } else if (shuttle.nextStopId) {
        // approximate logical previous stop
        const nextIndex = route.stops.indexOf(shuttle.nextStopId);
        currentStopIndex = nextIndex - 1;
        if (currentStopIndex < 0) currentStopIndex = route.stops.length - 1;
    }

    if (currentStopIndex === -1) currentStopIndex = 0; // Fallback

    const currentStopId = route.stops[currentStopIndex];
    const nextStopId = route.stops[(currentStopIndex + 1) % route.stops.length];

    const startStop = STOPS.find(s => s.id === currentStopId);
    const endStop = STOPS.find(s => s.id === nextStopId);

    if (!startStop || !endStop) return { x: 0, y: 0 };

    // Linear interpolation
    const x = startStop.x + (endStop.x - startStop.x) * shuttle.progress;
    const y = startStop.y + (endStop.y - startStop.y) * shuttle.progress;

    return { x, y };
  };

  return (
    <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden relative shadow-inner border border-slate-200">
      <svg viewBox="0 0 400 550" className="w-full h-full preserve-3d">
        {/* Draw Routes */}
        {ROUTES.map((route, idx) => {
          // Create SVG path string connecting stops
          const pathD = route.stops.map((stopId, i) => {
            const stop = STOPS.find(s => s.id === stopId);
            return `${i === 0 ? 'M' : 'L'} ${stop?.x} ${stop?.y}`;
          }).join(' ') + ' Z'; // Close loop

          // Offset slightly so lines don't overlap perfectly
          const offset = idx * 6 - 3; 

          return (
            <path
              key={route.id}
              d={pathD}
              fill="none"
              stroke={route.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
              transform={`translate(${offset}, ${offset})`}
            />
          );
        })}

        {/* Draw Stops */}
        {STOPS.map(stop => (
          <g key={stop.id} transform={`translate(${stop.x}, ${stop.y})`}>
            <circle r="12" fill="white" stroke="#334155" strokeWidth="2" />
            <circle r="4" fill="#334155" />
            <text
              y="24"
              textAnchor="middle"
              className="text-[10px] font-bold fill-slate-700 select-none uppercase tracking-wide"
              style={{ fontSize: '12px' }}
            >
              {stop.name}
            </text>
          </g>
        ))}

        {/* Draw Shuttles */}
        {shuttles.map(shuttle => {
          const pos = getShuttlePosition(shuttle);
          const route = ROUTES.find(r => r.id === shuttle.routeId);
          return (
            <g
              key={shuttle.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="transition-all duration-1000 ease-linear"
            >
              {/* Pulse effect */}
              <circle r="16" fill={route?.color} className="animate-ping opacity-20" />
              {/* Bus Icon */}
              <circle r="10" fill={route?.color} stroke="white" strokeWidth="2" />
              <text y="4" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                {shuttle.id}
              </text>
              {/* Info Label */}
              <g transform="translate(12, -12)">
                <rect x="0" y="-10" width="60" height="20" rx="4" fill="rgba(0,0,0,0.7)" />
                <text x="5" y="4" fill="white" fontSize="8">
                  {shuttle.occupancy}/{shuttle.capacity} Pax
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm text-xs border border-slate-200">
        <h4 className="font-bold mb-2 text-slate-700">Routes</h4>
        {ROUTES.map(r => (
          <div key={r.id} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></div>
            <span>{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapVisualization;
