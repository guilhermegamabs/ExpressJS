const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    requried: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    requried: true,
  },
  creadtedAt: {
    type: mongoose.SchemaTypes.Date,
    requried: true,
    default: new Date(),
  },
});


module.exports = mongoose.model('users', UserSchema);