// src/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Configure Middleware Layers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// 2. Initialize Socket.io Gateway with restrictive CORS bounds
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Attach socket instance globally to app context for route injection access
app.set('socketio', io);

// 3. Document-Driven Socket Room Context Handshaking
io.on('connection', (socket) => {
  console.log(`Connected client network context established: ${socket.id}`);

  // Isolated workspace channels matching unique clinic IDs
  socket.on('join_clinic_room', ({ clinicId }) => {
    if (clinicId) {
      socket.join(`clinic_${clinicId}`);
      console.log(`Socket [${socket.id}] bound to channel: clinic_${clinicId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected client context: ${socket.id}`);
  });
});

// Register API Routes
app.use('/api/queue', require('./routes/queueRoutes'));

// 4. Fallback Base Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'HEALTHY', database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED' });
});

// 5. Database Connection Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic_queue';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB persistent cluster connection secure.');
    
    // 6. Execute server binding only after verified database handshakes
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Production engine actively executing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Critical Database connection failure exception:', err.message);
    process.exit(1);
  });