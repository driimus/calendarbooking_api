const Connection = require('../../db');

/** Class representing an activity. */
class Comment {
  /**
   * Create a database connection and initialise a new table if needed.
   */
  constructor() {
    return (async () => {
      this.db = new Connection();
      await this.db.query(Comment.schema);
      return this;
    })();
  }
}

require('./schema')(Comment);
require('./create')(Comment);
require('./isValid')(Comment);
require('./getById')(Comment);
require('./getAllByActivityId')(Comment);


module.exports = Comment;
