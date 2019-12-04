const Connection = require('../../db');

class Comment {
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
