export enum UserRole {
  STUDENT = 'STUDENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export interface ShuttleStop {
  id: string;
  name: string;
  x: number; // For schematic map
  y: number; // For schematic map
}

export interface ShuttleRoute {
  id: string;
  name: string;
  stops: string[]; // IDs of stops
  color: string;
}

export interface Shuttle {
  id: string;
  driverName: string;
  routeId: string;
  status: 'active' | 'break' | 'maintenance' | 'offline';
  currentStopId?: string; // If at a stop
  nextStopId?: string;
  progress: number; // 0 to 1 progress between stops for simulation
  capacity: number;
  occupancy: number;
}

export interface Report {
  id: string;
  type: 'delay' | 'breakdown' | 'crowding' | 'other';
  description: string;
  timestamp: number;
  status: 'pending' | 'resolved';
  severity: 'low' | 'medium' | 'high'; // AI inferred
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
