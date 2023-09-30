const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true 
  },
  room: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Message', ModelSchema);