"use client";
import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { Users, Volume2, Monitor, DoorOpen } from 'lucide-react';

export default function PublicTvScreen() {
  const clinicId = "clinic_123";
  const { queueState } = useSocket(clinicId);
  const [lastCalled, setLastCalled] = useState(null);

  // Play a gentle chime when a NEW patient is called to any room
  useEffect(() => {
    if (queueState.currentlyServing && queueState.currentlyServing !== lastCalled) {
      setLastCalled(queueState.currentlyServing);
      // In a real browser environment, you would play an audio file here.
      // e.g., new Audio('/chime.mp3').play();
    }
  }, [queueState.currentlyServing, lastCalled]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 p-6 flex justify-between items-center shadow-lg z-10">
        <div className="flex items-center gap-3">
          <Monitor className="text-blue-400" size={32} />
          <h1 className="text-3xl font-bold tracking-tight text-white">City Care Clinic</h1>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest uppercase bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Live Queue
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-8 gap-12">
        
        {/* Left Side: LIVE MULTI-ROOM DISPLAY */}
        <div className="flex flex-col bg-gradient-to-b from-blue-600 to-indigo-900 rounded-[3rem] shadow-2xl border border-blue-400/30 p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Volume2 size={250} />
          </div>
          
          <h2 className="text-4xl font-semibold text-blue-200 mb-8 uppercase tracking-widest border-b border-blue-400/30 pb-6 z-10 flex items-center gap-4">
            <DoorOpen size={40} /> Please Proceed To
          </h2>
          
          <div className="flex-1 flex flex-col gap-6 z-10 justify-center">
            {!queueState.activeList || queueState.activeList.length === 0 ? (
              <div className="text-center text-blue-200/50 text-4xl font-medium italic">
                Waiting for doctors...
              </div>
            ) : (
              queueState.activeList.map(patient => (
                <div 
                  key={patient.tokenNumber} 
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex justify-between items-center shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-500"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold text-blue-300 uppercase tracking-widest bg-blue-900/50 inline-block px-4 py-1 rounded-xl w-fit">
                      {patient.assignedRoom}
                    </span>
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {patient.patientName}
                    </span>
                  </div>
                  <div className="text-8xl font-black text-white drop-shadow-2xl">
                    #{patient.tokenNumber}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Next in Line */}
        <div className="flex flex-col bg-slate-800/40 rounded-[3rem] p-10 border border-slate-700 shadow-xl">
          <h2 className="text-3xl font-semibold text-slate-300 mb-8 flex items-center gap-3 border-b border-slate-700 pb-6">
            <Users className="text-indigo-400" /> Up Next To Be Called
          </h2>
          
          {queueState.waitingList?.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-2xl text-slate-500 italic">
              No patients waiting.
            </div>
          ) : (
            <div className="flex flex-col gap-6 overflow-hidden">
              {queueState.waitingList?.slice(0, 5).map((patient, index) => (
                <div key={patient.tokenNumber} className="bg-slate-800 border border-slate-600/50 p-6 rounded-3xl flex justify-between items-center shadow-md">
                  <div className="flex items-center gap-6">
                    <div className="bg-slate-700 text-slate-300 text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="text-3xl font-medium text-white">{patient.patientName}</span>
                  </div>
                  <span className="text-indigo-400 font-black text-5xl">#{patient.tokenNumber}</span>
                </div>
              ))}
            </div>
          )}
          
          {queueState.waitingList?.length > 5 && (
            <div className="mt-8 text-center text-slate-400 text-xl font-medium">
              + {queueState.waitingList.length - 5} more patients waiting
            </div>
          )}
        </div>

      </div>
    </div>
  );
}