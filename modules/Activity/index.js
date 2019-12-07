const Connection = require('../../db');

/** Class representing an activity. */
class Activity {
  /**
   * Create a database connection and initialise a new table if needed.
   */
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(Activity.schema);
      return this;
    })();
  }
}

require('./schema')(Activity);
require('./create')(Activity);
require('./update')(Activity);
require('./remove')(Activity);
require('./is-valid')(Activity);

module.exports = Activity;
