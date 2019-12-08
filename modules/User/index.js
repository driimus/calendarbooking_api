const Connection = require('../../db');

/** Class representing an activity. */
class User {
  /**
   * Create a database connection and initialise a new table if needed.
   */
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(User.schema);
      return this;
    })();
  }
}

// Extend base class
require('./schema')(User);
require('./is-available')(User);
require('./register')(User);
require('./does-exist')(User);
require('./login')(User);
require('./get-all')(User);

module.exports = User;
