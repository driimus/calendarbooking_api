const Connection = require('../../db');

/** Class representing an activity. */
class Tag {
  /**
   * Create a database connection and initialise a new table if needed.
   */
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
require('./update')(Tag);

module.exports = Tag;
