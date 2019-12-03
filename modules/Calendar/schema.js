module.exports = (Calendar) => {
  Calendar.schema = `CREATE TABLE IF NOT EXISTS calendar(
    id SERIAL PRIMARY KEY,
    userId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES users(id)'},
    activityId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES activity(id)'},
    fromTs TIMESTAMPTZ NOT NULL,
    toTs TIMESTAMPTZ NOT NULL,
    location TEXT
  )`;
  return true;
};
