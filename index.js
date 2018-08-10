const app = require('express')(),
  express = require('express');
(http = require('http').Server(app)),
  (io = require('socket.io')(http)),
  (port = process.env.PORT || 3000),
  (mongoose = require('mongoose'));
require('./db');

const { Graph } = require('./graph/');
new Graph(io);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/insert', (req, res) => {
  res.sendFile(__dirname + '/insert.html');
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
