const Connection = require('../../db');

class Tag {
  constructor() {
    return (async () => {
      this.db = new Connection();
      return this;
    })();
  }
}

require('./schema')(Tag);

module.exports = Tag;
