const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  messages: Array,
  owner: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Room", RoomSchema);
