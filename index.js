const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose');
require('./db');
const { SuperHero } = require('./superhero/');
new SuperHero(io);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
