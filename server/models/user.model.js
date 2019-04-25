const mongoose = require('mongoose');
/*eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

/*eslint-disable */
module.exports = User = mongoose.model('user', userSchema);
/* eslint-enable */
