const Connection = require('../../db');

class User {
  constructor() {
    return (async () => {
      this.db = new Connection();
      return this;
    })();
  }
}

// Extend base class
require('./schema')(User);
require('./is-available')(User);
require('./register')(User);

module.exports = User;
