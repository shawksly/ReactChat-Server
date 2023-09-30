const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  messages: Array,
  ownerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
