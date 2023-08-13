'use strict';

module.exports = (mongoose, Schema) => {
  const UserSchema = new Schema({
    user_id: { type: String }
  });

  return mongoose.model('Users', UserSchema);
};
