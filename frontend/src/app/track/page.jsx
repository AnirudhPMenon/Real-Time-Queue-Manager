"use client";
import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { Clock, Activity, Users, ArrowRight, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PatientTrackingScreen() {
  const clinicId = "clinic_123";
  const { queueState } = useSocket(clinicId);
  
  const [myToken, setMyToken] = useState(null);
  const [isCheckingURL, setIsCheckingURL] = useState(true);
  const [manualInput, setManualInput] = useState('');
  
  // NEW: State to hold our beautiful inline error message
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCode = params.get('code');
    
    if (urlCode) {
      fetch(`http://localhost:5000/api/queue/verify/${urlCode}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setMyToken(data.tokenNumber);
          }
          setIsCheckingURL(false);
        })
        .catch(() => setIsCheckingURL(false));
    } else {
      setIsCheckingURL(false);
    }
  }, []);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any old errors
    if (!manualInput.trim()) return;
    
    const cleanCode = manualInput.trim().toLowerCase();
    
    try {
      const res = await fetch(`http://localhost:5000/api/queue/verify/${cleanCode}`);
      const data = await res.json();

      if (data.success) {
        setMyToken(data.tokenNumber);
        window.history.pushState({}, '', `?code=${cleanCode}`);
      } else {
        // NEW: Set the inline error instead of an alert popup
        setErrorMessage("Invalid Access Code. Please check your SMS and try again.");
      }
    } catch (err) {
      setErrorMessage("Connection error. Please ensure the server is running.");
    }
  };

  if (isCheckingURL) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 font-medium">Loading your ticket...</div>;
  }

  // --- THE SELF-SERVICE PORTAL ---
  if (myToken === null) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl max-w-sm w-full text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Search size={100} />
          </div>
          
          <div className="bg-indigo-100 text-indigo-600 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Users size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Track Your Queue</h2>
          <p className="text-slate-500 text-sm mb-6">
            Enter your secure access code below to view your live estimated wait time.
          </p>

          <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
            
            {/* NEW: The elegant inline error box */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                {errorMessage}
              </div>
            )}

            <input 
              type="text" 
              autoFocus
              placeholder="e.g. a1b2c3" 
              value={manualInput}
              onChange={(e) => {
                setManualInput(e.target.value);
                if (errorMessage) setErrorMessage(''); // Clear error the moment they start typing again
              }}
              className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all text-center text-xl font-bold text-slate-800 tracking-widest uppercase ${
                errorMessage ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-500'
              }`}
            />
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Access Live Tracker <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- THE LIVE TRACKER MATH ENGINE ---
  const highestCompleted = queueState.completedList?.length > 0 
    ? Math.max(...queueState.completedList.map(t => t.tokenNumber)) 
    : 0;

  let patientStatus = 'WAITING';
  if (queueState.currentlyServing === myToken) {
    patientStatus = 'ACTIVE';
  } else if (myToken <= highestCompleted) {
    patientStatus = 'COMPLETED';
  }

  const baseReferenceToken = queueState.currentlyServing || highestCompleted || 0;
  const positionInQueue = Math.max(0, myToken - baseReferenceToken);
  
  const estimatedWaitMinutes = positionInQueue > 0 
    ? Math.round(positionInQueue * queueState.rollingAverageTime) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] p-8 text-center relative overflow-hidden">
        
        <div className="flex justify-between items-center w-full absolute top-0 left-0 px-6 py-5 bg-white/40 border-b border-white/50">
          <div className="flex items-center gap-2 font-bold text-slate-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-sm">
            <Users size={16} className="text-blue-500" />
            Now Serving: <span className="text-blue-600 text-lg">#{queueState.currentlyServing || '--'}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-100/80 px-3 py-1.5 rounded-full shadow-sm tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            LIVE SYNC
          </div>
        </div>

        <h2 className="text-slate-500 font-medium mb-1 mt-16">Your Token</h2>
        <div className="text-7xl font-black text-slate-800 mb-8 tracking-tight">#{myToken}</div>

        {/* --- DYNAMIC UI BASED ON STATUS --- */}
        {patientStatus === 'COMPLETED' ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 py-6 px-4 rounded-3xl shadow-sm flex flex-col items-center">
            <CheckCircle2 size={40} className="mb-3 text-emerald-500" />
            <h3 className="text-xl font-bold mb-1">Appointment Complete</h3>
            <p className="text-sm font-medium opacity-80">This token has already been served.</p>
          </div>
        ) : patientStatus === 'ACTIVE' ? (
          <div className="bg-indigo-600 text-white py-6 rounded-3xl shadow-lg animate-pulse">
            <h3 className="text-2xl font-bold mb-3">It's Your Turn!</h3>
            <div className="bg-white/20 inline-block px-6 py-2 rounded-full font-bold text-xl tracking-wide border border-white/40">
              Proceed to {queueState.activeRoom || 'the Doctor'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center">
              <Users className="text-blue-500 mb-2" size={28} />
              <div className="text-3xl font-bold text-slate-800">{positionInQueue}</div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Ahead of You</div>
            </div>
            
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center">
              <Clock className="text-orange-400 mb-2" size={28} />
              <div className="text-3xl font-bold text-slate-800">{estimatedWaitMinutes}<span className="text-lg">m</span></div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Est. Wait</div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Activity size={14} /> Doctor's current rolling pace: {queueState.rollingAverageTime} min/patient
        </div>

      </div>
    </div>
  );
}