'use strict';

module.exports = (Activity) =>
  (Activity.schema = `
CREATE TABLE IF NOT EXISTS activity(
	id INTEGER PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	url TEXT,
	location TEXT
)`);
