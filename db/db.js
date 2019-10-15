
const { Pool } = require('pg');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config.js')[environment];

const db = new Pool(config);
module.exports = db;
