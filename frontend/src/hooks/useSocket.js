"use client";
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (clinicId) => {
  const socketRef = useRef(null);
  
  const [queueState, setQueueState] = useState({
    currentlyServing: null,
    activeRoom: null,
    tokensAheadCount: 0,
    rollingAverageTime: 15,
    waitingList: [],
    completedList: [],
    activeList: [] // <-- ACTIVE LIST READY
  });

  useEffect(() => {
    // --- INITIAL STATE HYDRATION ---
    fetch(`http://localhost:5000/api/queue/state/${clinicId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("✅ [HTTP] Initial State Loaded:", data);
          setQueueState({
            currentlyServing: data.currentlyServing,
            activeRoom: data.activeRoom,
            tokensAheadCount: data.tokensAheadCount,
            rollingAverageTime: data.rollingAverageTime,
            waitingList: data.waitingList || [],
            completedList: data.completedList || [],
            activeList: data.activeList || []
          });
        }
      })
      .catch((err) => console.error("Failed to fetch initial queue state", err));

    // --- SOCKET INITIALIZATION ---
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5000', {
        transports: ['websocket'],
        autoConnect: true,
      });
    }

    const socket = socketRef.current;

    const onConnect = () => {
      console.log("🟢 [SOCKET] Connected ID:", socket.id);
      socket.emit('join_clinic_room', { clinicId });
    };

    const onQueueMutated = (data) => {
      console.log("🔥 [SOCKET] LIVE SYNC PAYLOAD:", data);
      setQueueState(prev => ({
        ...prev, 
        currentlyServing: data.currentlyServing || prev.currentlyServing,
        activeRoom: data.activeRoom || prev.activeRoom,
        tokensAheadCount: data.tokensAheadCount ?? prev.tokensAheadCount,
        rollingAverageTime: data.rollingAverageTime || prev.rollingAverageTime,
        waitingList: data.waitingList || prev.waitingList,
        completedList: data.completedList || prev.completedList,
        activeList: data.activeList || prev.activeList
      }));
    };

    socket.on('connect', onConnect);
    socket.on('queue_mutated', onQueueMutated);

    if (socket.connected) {
      socket.emit('join_clinic_room', { clinicId });
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('queue_mutated', onQueueMutated);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [clinicId]);

  return { queueState };
};