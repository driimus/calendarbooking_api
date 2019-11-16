'use strict';

const db = require('../../db');

class Comment {
  constructor() {
    return (async () => {
      this.db = new db();
      return this;
    })();
  }
}

require('./schema')(Comment);

module.exports = Comment;
