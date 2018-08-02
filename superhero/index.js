const Superhero = require('./schema');

class SuperHero {
  constructor(io) {
    this.initConnection(io);
    this.initOnChangeListener(io);
  }

  initConnection(io) {
    io.on('connection', socket => {
      socket.on('hero', async hero => {
        await this.save(hero);
      });
    });
  }
  async initOnChangeListener(io) {
    Superhero.watch().on('change', data => {
      console.log('change _ \n', data);
      io.emit('hero', data.fullDocument.name);
    });
  }

  async save(hero) {
    await Superhero.create(hero);
  }
}

module.exports = {
  SuperHero: SuperHero,
};
