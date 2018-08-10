const GraphSchema = require('./schema');
const logger = require('../utils/logger').logger;

class Graph {
  constructor(io) {
    this.initConnection(io);
    this.initOnChangeListener(io);
  }

  initConnection(io) {
    io.on('connection', socket => {
      console.log('listener called!');
      this.socketListener(socket);
    });
  }

  socketListener(socket) {
    socket.on('point', async point => {
      await this.save(point);
    });
  }

  async initOnChangeListener(io) {
    GraphSchema.watch().on('change', data => {
      // logger.info(new Date(), data);
      if (data.operationType === 'insert') {
        io.emit(
          'add',
          { x: data.fullDocument.x, y: data.fullDocument.y } || 'deleted!!!!'
        );
      }
    });
  }

  async save(point) {
    await GraphSchema.create(point);
  }
}

module.exports = {
  Graph: Graph,
};
