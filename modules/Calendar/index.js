const Connection = require('../../db');

class Calendar {
  constructor() {
    return (async () => {
      this.db = new Connection();
      return this;
    })();
  }
}

require('./schema')(Calendar);

module.exports = Calendar;
