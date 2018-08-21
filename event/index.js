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
    if (message) {
      const byType = clientId => clients[clientId].type === type;
      const writeEventType = clientId => {
        clients[clientId].write('event: ' + type + '\n');
        return clientId;
      };
      const writeEventContent = clientId =>
        clients[clientId].write('data: ' + JSON.stringify(message) + '\n\n');
      Object.keys(clients)
        .filter(byType)
        .map(writeEventType)
        .forEach(writeEventContent);
    }
  }
}

module.exports = Event;
