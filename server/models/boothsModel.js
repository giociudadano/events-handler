'use strict';

module.exports = (mongoose, Schema) => {
  const BoothSchema = new Schema({
    booth_name: { type: String }
  });

  return mongoose.model('Booths', BoothSchema);
};
