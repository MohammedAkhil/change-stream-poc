const clients = {};
let clientId = 0;
const CHAT = 'chat';
const GRAPH = 'graph';

class Event {
  constructor(req, res, type) {
    this.type = type;
    this.init(req, res);
    this.onAdd(res, type);
    this.onClose(req);
  }

  static get clients() {
    return clients;
  }

  static get clientId() {
    return clientId;
  }

  init(req, res) {
    req.socket.setTimeout(Number.MAX_VALUE);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('\n');
  }

  getType() {
    return this.type;
  }

  onAdd(res, type) {
    ++clientId;
    clients[clientId] = res;
    clients[clientId].type = type;
  }

  onClose(req) {
    req.on('close', () => {
      delete clients[clientId];
    });
  }

  static pushMessage(message, type) {
    console.log('Clients: ' + Object.keys(clients) + ' <- ' + message);
    Object.keys(clients)
      .filter(clientId => {
        return clients[clientId].type === type;
      })
      .forEach(clientId => {
        clients[clientId].write('event: ' + type + '\n');
        clients[clientId].write('data: ' + JSON.stringify(message) + '\n\n'); // <- Push a message to a single attached client
      });
  }
}

module.exports = Event;
