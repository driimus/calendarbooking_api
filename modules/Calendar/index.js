'use strict';

const db = require('../../db');

class Calendar {
  constructor() {
    return (async () => {
      this.db = new db();
      return this;
    })();
  }
}

require('./schema')(Calendar);

module.exports = Calendar;
