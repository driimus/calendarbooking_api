const Connection = require('../../db');

class Tag {
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(Tag.schema);
      return this;
    })();
  }
}

require('./schema')(Tag);
require('./create')(Tag);
require('./isValid')(Tag);

module.exports = Tag;
