import React, { useState } from 'react';
import { Shuttle, Report } from '../types';
import MapVisualization from './MapVisualization';
import { STOPS, ROUTES } from '../constants';
import { Clock, AlertTriangle, MapPin, CheckCircle } from 'lucide-react';
import { analyzeReport } from '../services/geminiService';

interface StudentViewProps {
  shuttles: Shuttle[];
}

const StudentView: React.FC<StudentViewProps> = ({ shuttles }) => {
  const [activeTab, setActiveTab] = useState<'track' | 'schedule' | 'report'>('track');
  const [reportText, setReportText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    setIsSubmitting(true);
    // Use Gemini to categorize report before "sending" to backend
    const analysis = await analyzeReport(reportText);
    
    // Simulate API call
    console.log("Submitting Report:", { text: reportText, ...analysis });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setReportText('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => setActiveTab('track')}
          className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'track' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Live Tracking
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'schedule' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Schedules
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'report' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Report Issue
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        {activeTab === 'track' && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)] min-h-[500px]">
            {/* Map Container */}
            <div className="flex-1 min-h-[300px] lg:h-full">
               <MapVisualization shuttles={shuttles} userRole="STUDENT" />
            </div>
            
            {/* Nearby Stops / ETAs */}
            <div className="lg:w-80 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock size={18} /> Estimated Arrivals
              </h3>
              <div className="grid gap-3">
                {STOPS.slice(0, 4).map((stop, i) => (
                  <div key={stop.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-800">{stop.name}</h4>
                      <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">
                        {Math.floor(Math.random() * 10) + 2} min
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={12} /> Closest Shuttle: Route {i % 2 === 0 ? 'Red' : 'Blue'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Shuttle Routes & Schedules</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ROUTES.map(route => (
                <div key={route.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: route.color }}></div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{route.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">Operating Daily: 06:00 - 22:00</p>
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stops Sequence</div>
                      <div className="relative pl-4 border-l-2 border-slate-100 space-y-4">
                        {route.stops.map((stopId) => {
                          const stop = STOPS.find(s => s.id === stopId);
                          return (
                            <div key={stopId} className="relative">
                              <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300"></div>
                              <span className="text-slate-700">{stop?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="max-w-xl mx-auto mt-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" /> Report an Issue
              </h2>
              <p className="text-slate-500 mb-6">
                Help us improve! Report delays, breakdowns, or overcrowding.
                Our AI analyzes your report to prioritize critical incidents.
              </p>

              {submitStatus === 'success' ? (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg flex items-center gap-3 animate-in fade-in">
                  <CheckCircle />
                  <span>Report submitted successfully! Thank you.</span>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      required
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border-slate-300 bg-slate-50 p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
                      placeholder="e.g., Bus broken down near Science, very crowded..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Analyzing & Sending...' : 'Submit Report'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;
