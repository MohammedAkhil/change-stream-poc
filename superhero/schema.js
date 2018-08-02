let mongoose = require('mongoose');

let superheroSchema = new mongoose.Schema({
  name: String,
  alias: String,
  universe: String,
});

module.exports = mongoose.model('Superhero', superheroSchema);
