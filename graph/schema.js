let mongoose = require('mongoose');

let graphSchema = new mongoose.Schema({
  x: Object,
  y: Number,
});

module.exports = mongoose.model('Graph', graphSchema);
