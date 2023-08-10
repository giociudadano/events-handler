'use strict';

module.exports = (mongoose, Schema) => {
  const EventSchema = new Schema({
    name: { type: String, required: true }
  });

  return mongoose.model('Events', EventSchema);
};
