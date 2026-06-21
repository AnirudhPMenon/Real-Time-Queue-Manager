"use client";
import { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket'; 
import { Users, UserPlus, ArrowRight, ListTodo, History, CheckCircle2, QrCode, X } from 'lucide-react';
import QRCode from 'react-qr-code'; 

export default function ReceptionistDashboard() {
  const clinicId = "clinic_123"; 
  const { queueState } = useSocket(clinicId); 
  
  const [patientName, setPatientName] = useState('');
  const [myRoom, setMyRoom] = useState('AUTO');
  const [selectedQR, setSelectedQR] = useState(null); 

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && !selectedQR) {
        e.preventDefault();
        callNextPatient();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myRoom, selectedQR]);

  const addPatient = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    
    await fetch('http://localhost:5000/api/queue/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clinicId, patientName })
    });
    setPatientName(''); 
  };

  const callNextPatient = async () => {
    await fetch('http://localhost:5000/api/queue/next', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clinicId, roomNumber: myRoom }) 
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const generateTrackingUrl = (code) => {
    return `${window.location.origin}/track?code=${code}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 relative">
      
      {/* QR CODE MODAL */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center relative max-w-sm w-full animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedQR(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4">
              <QrCode size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Scan to Track</h2>
            <p className="text-slate-500 text-center mb-8 text-sm">
              Point your phone camera here to instantly view your live wait time.
            </p>
            <div className="bg-white border-4 border-indigo-50 p-4 rounded-2xl shadow-sm mb-6">
              <QRCode value={generateTrackingUrl(selectedQR)} size={200} className="text-slate-800" />
            </div>
            <p className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest">
              Code: {selectedQR}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Command Bar & Waiting List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-3xl p-6 flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <UserPlus className="text-blue-500" /> Queue Entry
            </h1>
            <form onSubmit={addPatient} className="flex flex-col gap-4">
              <input 
                type="text" 
                autoFocus
                placeholder="Type patient name & hit Enter..." 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg"
              />
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-3xl p-6 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
                <ListTodo className="text-indigo-500" /> Up Next ({queueState.waitingList?.length || 0})
              </h2>
              {queueState.waitingList?.length === 0 ? (
                <div className="text-slate-400 italic text-center py-8">Queue is empty.</div>
              ) : (
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2">
                  {queueState.waitingList?.map((patient, index) => (
                    <div key={patient.tokenNumber} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 text-slate-500 font-bold h-8 w-8 rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-slate-800">{patient.patientName}</span>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-indigo-600 font-black text-lg leading-none mb-1">#{patient.tokenNumber}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedQR(patient.accessCode)}
                            className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 bg-slate-100 px-2 py-1 rounded border border-slate-200 transition-colors uppercase tracking-widest"
                          >
                            <QrCode size={12} /> QR
                          </button>
                          <button 
                            onClick={() => window.open(`/track?code=${patient.accessCode}`, '_blank')}
                            className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200 transition-colors uppercase tracking-widest shadow-sm"
                          >
                            🔗 Open Link
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-100/50 backdrop-blur-xl border border-white/50 shadow-inner rounded-3xl p-6 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-500">
                <History className="text-slate-400" /> Recently Completed
              </h2>
              {queueState.completedList?.length === 0 ? (
                <div className="text-slate-400 italic text-center py-8">No completed patients yet.</div>
              ) : (
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2">
                  {queueState.completedList?.map((patient) => (
                    <div key={patient.tokenNumber} className="bg-white/60 border border-slate-200/60 p-3 rounded-2xl flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <div>
                          <div className="font-semibold text-slate-700 text-sm">{patient.patientName} <span className="text-slate-400 font-normal">#{patient.tokenNumber}</span></div>
                          <div className="text-xs text-slate-400">{patient.assignedRoom || 'Room 1'}</div>
                        </div>
                      </div>
                      <span className="text-slate-400 text-xs font-medium bg-slate-200/50 px-2 py-1 rounded-lg">
                        {formatTime(patient.completedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Control & Active Rooms */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl rounded-3xl p-8 text-white flex flex-col relative overflow-hidden h-full min-h-[500px]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Users size={120} />
          </div>
          
          <h2 className="text-xl font-bold text-blue-100 mb-6 flex items-center gap-2 border-b border-blue-400/30 pb-4 z-10">
            <CheckCircle2 size={24} /> Currently with Doctors
          </h2>

          <div className="flex-1 flex flex-col gap-4 mb-8 w-full z-10 overflow-y-auto pr-2">
            {!queueState.activeList || queueState.activeList.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-blue-200/50 italic font-medium">
                All doctor rooms are empty.
              </div>
            ) : (
              queueState.activeList.map(patient => (
                <div key={patient.tokenNumber} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 flex justify-between items-center shadow-lg hover:bg-white/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">
                      {patient.assignedRoom}
                    </span>
                    <span className="font-bold text-xl text-white leading-none">
                      {patient.patientName}
                    </span>
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-md">
                    #{patient.tokenNumber}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full mt-auto z-10 pt-4 border-t border-blue-400/30">
            <div className="w-full mb-4 z-10 relative">
              <select 
                value={myRoom} 
                onChange={(e) => setMyRoom(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 appearance-none text-center font-medium shadow-inner backdrop-blur-sm cursor-pointer"
              >
                <option value="AUTO" className="text-slate-800 font-bold">⚡ Auto-Assign Available Room</option>
                <option disabled className="text-slate-400">────────────────</option>
                <option value="Room 1" className="text-slate-800 font-medium">Clear Room & Assign: Doctor A (Room 1)</option>
                <option value="Room 2" className="text-slate-800 font-medium">Clear Room & Assign: Doctor B (Room 2)</option>
                <option value="Room 3" className="text-slate-800 font-medium">Clear Room & Assign: Doctor C (Room 3)</option>
              </select>
            </div>

            <button 
              onClick={callNextPatient}
              className="group w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold text-xl py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 z-10"
            >
              Call Next <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-center text-blue-200 text-sm z-10">Or press <kbd className="bg-blue-800/30 px-2 py-1 rounded text-white font-mono text-xs">Spacebar</kbd></p>
          </div>
        </div>

      </div>
    </div>
  );
}