const Connection = require('../../db');

/** Class representing a calendar event. */
class Calendar {
  /**
   * Create a database connection and initialise a new table if needed.
   */
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(Calendar.schema);
      return this;
    })();
  }
}

require('./get')(Calendar);
require('./schema')(Calendar);
require('./create')(Calendar);
require('./update')(Calendar);
require('./remove')(Calendar);
require('./is-valid')(Calendar);
require('./get-all')(Calendar);
require('./get-between')(Calendar);
require('./getAllByUserTagged')(Calendar);

module.exports = Calendar;
