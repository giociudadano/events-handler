'use strict';

module.exports = (mongoose, Schema) => {
  const CheckInBoothSchema = new Schema({
    user_id: { type: String },
    event_name: { type: String },
    booth_name: { type: String },
    timestamp: { type: Date }
  });

  return mongoose.model('Booth-CheckIns', CheckInBoothSchema);
};
