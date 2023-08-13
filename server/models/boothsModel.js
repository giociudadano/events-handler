'use strict';

module.exports = (mongoose, Schema) => {
  const BoothSchema = new Schema({
    booth_name: { type: String },
    booth_limit: { type: Number }
  });

  return mongoose.model('Booths', BoothSchema);
};
