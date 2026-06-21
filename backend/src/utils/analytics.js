// src/utils/analytics.js
const Token = require('../models/Token');

/**
 * Calculates the running average consultation time based on the last 5 completed sessions.
 */
async function getRollingAverageMinutes(clinicId, fallbackMinutesDefault = 15) {
  const result = await Token.aggregate([
    {
      $match: {
        clinicId: clinicId,
        status: 'COMPLETED',
        calledAt: { $exists: true },
        completedAt: { $exists: true }
      }
    },
    { $sort: { completedAt: -1 } },
    { $limit: 5 },
    {
      $project: {
        // Compute duration in ms, convert to fractional minutes
        durationMinutes: {
          $divide: [ { $subtract: ["$completedAt", "$calledAt"] }, 60000 ]
        }
      }
    },
    {
      $group: {
        _id: null,
        averageTime: { $avg: "$durationMinutes" }
      }
    }
  ]);

  if (!result || result.length === 0) {
    return fallbackMinutesDefault;
  }
  
  return Math.round(result[0].averageTime * 10) / 10;
}

module.exports = { getRollingAverageMinutes };