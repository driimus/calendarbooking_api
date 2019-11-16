'use strict';

const db = require('../../db');

class Activity {
  constructor() {
    return (async () => {
      this.db = new db();
      return this;
    })();
  }
}

require('./schema')(Activity);

module.exports = Activity;
