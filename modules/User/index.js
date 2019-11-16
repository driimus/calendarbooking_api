'use strict';

const db = require('../../db');

class User {
  constructor() {
    return (async () => {
      this.db = new db();
      return this;
    })();
  }
}

require('./schema')(User);

module.exports = User;
