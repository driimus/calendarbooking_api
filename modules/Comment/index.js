const Connection = require('../../db');

class Comment {
  constructor() {
    return (async () => {
      this.db = new Connection();
      return this;
    })();
  }
}

require('./schema')(Comment);

module.exports = Comment;
