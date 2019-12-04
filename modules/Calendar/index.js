const Connection = require('../../db');

class Calendar {
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(Calendar.schema);
      return this;
    })();
  }
}

require('./schema')(Calendar);
require('./create')(Calendar);
require('./update')(Calendar);
require('./remove')(Calendar);
require('./is-valid')(Calendar);

module.exports = Calendar;
