"use client";
import Link from "next/link";
import { Monitor, Smartphone, Activity, Tv } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-200">
          <Activity size={14} /> Live Sync Active
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
          Digital Queue Manager
        </h1>
        <p className="text-lg text-slate-500">
          Select a view below to test the bi-directional WebSocket synchronization. 
          For the best experience, open these links side-by-side.
        </p>
      </div>

      {/* Portal Cards - Upgraded to 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* 1. Receptionist Portal */}
        <Link 
          href="/receptionist" 
          className="group relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center text-center"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <Monitor size={100} />
          </div>
          <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:-translate-y-1 transition-transform">
            <Monitor size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Receptionist View</h2>
          <p className="text-slate-500 text-sm">
            Access the command dashboard. Add patients and control the active queue with sub-3 second keyboard workflows.
          </p>
        </Link>

        {/* 2. Public TV Board (THE NEW CARD) */}
        <Link 
          href="/tv" 
          className="group relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center text-center"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <Tv size={100} />
          </div>
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:-translate-y-1 transition-transform">
            <Tv size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Public TV Board</h2>
          <p className="text-slate-500 text-sm">
            Open the waiting room large-screen display. Watch the multi-room routing algorithm assign patients in real-time.
          </p>
        </Link>

        {/* 3. Patient Portal */}
        <Link 
          href="/track" 
          className="group relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center text-center"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <Smartphone size={100} />
          </div>
          <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:-translate-y-1 transition-transform">
            <Smartphone size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Patient Tracker</h2>
          <p className="text-slate-500 text-sm">
            View the live mobile interface. Watch the estimated wait time dynamically compute without refreshing the page.
          </p>
        </Link>

      </div>

      {/* Evaluator Note */}
      <div className="mt-16 text-center text-xs text-slate-400 font-medium max-w-md">
        Built for the Wooble Hackathon • Powered by Next.js, Express, and Socket.io
      </div>

    </div>
  );
}