'use strict';

module.exports = (mongoose, Schema) => {
  const EventSchema = new Schema({
    event_name: { type: String }
  });

  return mongoose.model('Events', EventSchema);
};
