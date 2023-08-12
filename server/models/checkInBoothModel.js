'use strict';

module.exports = (mongoose, Schema) => {
  const CheckInBoothSchema = new Schema({
    booth_name: { type: String }
  });

  return mongoose.model('CheckIns', CheckInBoothSchema);
};
