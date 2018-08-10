let mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect('mongodb://localhost:31000/' + 'poc?replicaSet=rs0')
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
  }
}

module.exports = new Database();
