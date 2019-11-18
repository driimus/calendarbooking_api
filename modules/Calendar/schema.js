module.exports = (Calendar) => {
  Calendar.schema = `CREATE TABLE IF NOT EXISTS calendar(
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    activityId INT REFERENCES activity(id),
    fromTs TIMESTAMPTZ NOT NULL,
    toTs TIMESTAMPTZ NOT NULL,
    location TEXT
  )`;
  return true;
};
