const Token = require('../models/Token');
const { getRollingAverageMinutes } = require('../utils/analytics');
const crypto = require('crypto');

// 1. Helper to broadcast state to all Socket clients
// 1. Update your broadcastState function
const broadcastState = async (io, clinicId) => {
  const waitingPatients = await Token.find({ clinicId, status: 'WAITING' })
    .sort({ tokenNumber: 1 })
    .select('tokenNumber patientName accessCode') 
    .limit(10); 

  // NEW: Fetch ALL patients currently in a room
  const activePatients = await Token.find({ clinicId, status: 'ACTIVE' })
    .sort({ assignedRoom: 1 }) 
    .select('tokenNumber patientName assignedRoom calledAt');

  const completedPatients = await Token.find({ clinicId, status: 'COMPLETED' })
    .sort({ completedAt: -1 }) 
    .select('tokenNumber patientName assignedRoom completedAt')
    .limit(10); 

  const rollingAvg = await getRollingAverageMinutes(clinicId);

  io.to(`clinic_${clinicId}`).emit('queue_mutated', {
    waitingList: waitingPatients, 
    activeList: activePatients, // <-- Add this to the payload
    completedList: completedPatients,
    tokensAheadCount: waitingPatients.length,
    rollingAverageTime: rollingAvg
  });
};
// 2. Add Patient (Scrubbed of Twilio)
exports.addPatient = async (req, res) => {
  const { clinicId, patientName } = req.body;
  const io = req.app.get('socketio');

  try {
    const lastToken = await Token.findOne({ clinicId }).sort({ tokenNumber: -1 });
    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;
    const accessCode = crypto.randomBytes(3).toString('hex');

    const newToken = await Token.create({ 
      clinicId, 
      patientName, 
      tokenNumber: nextTokenNumber, 
      accessCode, 
      status: 'WAITING' 
    });
    
    await broadcastState(io, clinicId);
    return res.status(201).json({ success: true, token: newToken });
  } catch (error) {
    console.error("Backend Error adding patient:", error);
    return res.status(500).json({ success: false, message: 'Failed to add patient.' });
  }
};

// 3. Call Next Patient (Auto-Routing Load Balancer)
exports.callNextPatient = async (req, res) => {
  const { clinicId, roomNumber } = req.body;
  const io = req.app.get('socketio');

  try {
    let targetRoom = roomNumber;

    if (targetRoom === 'AUTO') {
      const allRooms = ['Room 1', 'Room 2', 'Room 3'];
      const activeSessions = await Token.find({ clinicId, status: 'ACTIVE' });
      const occupiedRooms = activeSessions.map(t => t.assignedRoom);
      const availableRooms = allRooms.filter(r => !occupiedRooms.includes(r));

      if (availableRooms.length > 0) {
        targetRoom = availableRooms[0];
      } else {
        const oldestActive = await Token.findOne({ clinicId, status: 'ACTIVE' }).sort({ calledAt: 1 });
        targetRoom = oldestActive ? oldestActive.assignedRoom : 'Room 1';
      }
    }

    await Token.findOneAndUpdate(
      { clinicId, status: 'ACTIVE', assignedRoom: targetRoom },
      { status: 'COMPLETED', completedAt: new Date() }
    );

    const nextActive = await Token.findOneAndUpdate(
      { clinicId, status: 'WAITING' },
      { status: 'ACTIVE', calledAt: new Date(), assignedRoom: targetRoom },
      { sort: { tokenNumber: 1 }, new: true }
    );

    if (nextActive) {
      io.to(`clinic_${clinicId}`).emit('queue_mutated', {
        currentlyServing: nextActive.tokenNumber,
        activeRoom: targetRoom
      });
    }

    await broadcastState(io, clinicId);
    return res.status(200).json({ success: true, activeToken: nextActive, assignedRoom: targetRoom });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Queue mutation failure.' });
  }
};

// 4. Initial Hydration Route (Fixes the Page Load crash)
exports.getQueueState = async (req, res) => {
  const { clinicId } = req.params;
  
  try {
    const waitingPatients = await Token.find({ clinicId, status: 'WAITING' })
      .sort({ tokenNumber: 1 })
      .select('tokenNumber patientName accessCode')
      .limit(10); 

    // NEW: Fetch ALL patients currently in a room
    const activePatients = await Token.find({ clinicId, status: 'ACTIVE' })
      .sort({ assignedRoom: 1 }) 
      .select('tokenNumber patientName assignedRoom calledAt');

    const completedPatients = await Token.find({ clinicId, status: 'COMPLETED' })
      .sort({ completedAt: -1 }) 
      .select('tokenNumber patientName assignedRoom completedAt')
      .limit(10); 

    const rollingAvg = await getRollingAverageMinutes(clinicId);

    return res.status(200).json({
      success: true,
      waitingList: waitingPatients,
      activeList: activePatients, // <-- Add this to the payload
      completedList: completedPatients,
      tokensAheadCount: waitingPatients.length,
      rollingAverageTime: rollingAvg
    });
  } catch (error) {
    console.error("Error fetching initial state:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 5. Verify Magic Link Code
exports.verifyAccessCode = async (req, res) => {
  try {
    const token = await Token.findOne({ accessCode: req.params.code });
    if (!token) return res.status(404).json({ success: false, message: "Invalid code" });
    
    return res.json({ success: true, tokenNumber: token.tokenNumber, clinicId: token.clinicId });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};