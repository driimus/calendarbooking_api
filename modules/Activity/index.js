const Connection = require('../../db');

class Activity {
  constructor() {
    return (async () => {
      this.db = new Connection();
      return this;
    })();
  }
}

require('./schema')(Activity);
require('./is-valid')(Activity);

module.exports = Activity;
