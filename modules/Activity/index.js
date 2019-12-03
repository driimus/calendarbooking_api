const Connection = require('../../db');

class Activity {
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
require('./remove')(Activity);
require('./is-valid')(Activity);

module.exports = Activity;
