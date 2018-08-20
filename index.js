const app = require('express')(),
  express = require('express');
(http = require('http').Server(app)),
  (io = require('socket.io')(http)),
  (port = process.env.PORT || 3000),
  (mongoose = require('mongoose'));
const bodyParser = require('body-parser');

require('./db');

const chat = require('./chat/');
const graph = require('./graph/');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/chat/', chat);
app.use('/graph/', graph);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/chatter', function(req, res) {
  res.sendFile(__dirname + '/public/chat.html');
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
