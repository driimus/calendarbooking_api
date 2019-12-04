module.exports = (Comment) => {
  Comment.schema = `CREATE TABLE IF NOT EXISTS comment(
    id SERIAL PRIMARY KEY,
    userId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES users(id)'},
    activityId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES activity(id)'},
    allText TEXT NOT NULL,
    dateCreated TIMESTAMPTZ DEFAULT now(),
    dateModified TIMESTAMPTZ
  )`;
  return true;
};
