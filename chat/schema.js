let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
  message: String,
});

module.exports = mongoose.model('Chat', chatSchema);
