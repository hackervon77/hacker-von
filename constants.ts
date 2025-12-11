import { Shuttle, ShuttleRoute, ShuttleStop } from './types';

export const STOPS: ShuttleStop[] = [
  { id: 'S1', name: 'Old Site Gate', x: 50, y: 50 },
  { id: 'S2', name: 'Library', x: 50, y: 200 },
  { id: 'S3', name: 'Science', x: 200, y: 300 },
  { id: 'S4', name: 'Casford', x: 350, y: 200 },
  { id: 'S5', name: 'Valco', x: 350, y: 50 },
  { id: 'S6', name: 'Diaspora', x: 200, y: 500 },
];

export const ROUTES: ShuttleRoute[] = [
  { id: 'R1', name: 'Campus Loop (Clockwise)', stops: ['S1', 'S2', 'S3', 'S6', 'S4', 'S5'], color: '#ef4444' }, // Red
  { id: 'R2', name: 'Science Express', stops: ['S6', 'S3', 'S2', 'S1'], color: '#3b82f6' }, // Blue
];

export const INITIAL_SHUTTLES: Shuttle[] = [
  { id: 'B1', driverName: 'Kwame A.', routeId: 'R1', status: 'active', currentStopId: 'S1', progress: 0, capacity: 40, occupancy: 12 },
  { id: 'B2', driverName: 'John D.', routeId: 'R1', status: 'active', currentStopId: 'S3', progress: 0.5, capacity: 40, occupancy: 35 },
  { id: 'B3', driverName: 'Emmanuel O.', routeId: 'R2', status: 'active', currentStopId: 'S6', progress: 0.1, capacity: 30, occupancy: 5 },
];

export const UCC_CONTEXT = `
You are an intelligent assistant for the University of Cape Coast (UCC) shuttle system.
The campus has key locations: Old Site, Science, Casford Hall, Valco Hall, and Diaspora (New Site).
Students use shuttles to move between lectures and hostels.
Current Routes:
1. Campus Loop (Red): Old Site -> Library -> Science -> Diaspora -> Casford -> Valco.
2. Science Express (Blue): Diaspora -> Science -> Library -> Old Site.
Operating hours: 6:00 AM to 10:00 PM.
Peak hours: 7:00 AM - 9:00 AM and 4:00 PM - 6:00 PM.
If a student asks about delays, apologize and suggest reporting it or checking the live map.
Keep answers concise and helpful.
`;
