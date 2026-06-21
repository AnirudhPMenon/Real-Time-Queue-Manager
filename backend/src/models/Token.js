const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  clinicId: { type: String, required: true, index: true },
  patientName: { type: String, required: true, trim: true },
  tokenNumber: { type: Number, required: true },
  accessCode: { type: String, required: true, unique: true, index: true }, 
  assignedRoom: { type: String, default: null }, 
  status: { 
    type: String, 
    enum: ['WAITING', 'ACTIVE', 'COMPLETED', 'HOLD'], 
    default: 'WAITING',
    index: true 
  },
  issuedAt: { type: Date, default: Date.now },
  calledAt: { type: Date },      
  completedAt: { type: Date }    
});

// Ensure a compound index exists for clean querying
if (!mongoose.models.Token) {
  TokenSchema.index({ clinicId: 1, tokenNumber: 1 }, { unique: true });
}

module.exports = mongoose.models.Token || mongoose.model('Token', TokenSchema);