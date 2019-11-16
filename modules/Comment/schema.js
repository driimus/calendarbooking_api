'use strict';

module.exports = (Comment) =>
  (Comment.schema = `
CREATE TABLE IF NOT EXISTS comment(
	id INTEGER PRIMARY KEY,
	userId INT REFERENCES users(id),
	activityId INT REFERENCES activity(id),
	allText TEXT NOT NULL,
	dateCreated TIMESTAMPTZ DEFAULT now(),
	dateModified TIMESTAMPTZ
)`);
