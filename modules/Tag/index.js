'use strict';

const db = require('../../db');

class Tag {
  constructor() {
    return (async () => {
      this.db = new db();
      return this;
    })();
  }
}

require('./schema')(Tag);

module.exports = Tag;
