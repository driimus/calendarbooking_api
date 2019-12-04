module.exports = (Calendar) => {
  Calendar.schema = `CREATE TABLE IF NOT EXISTS calendar(
    id SERIAL PRIMARY KEY,
    user_id INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES users(id)'},
    activity_id INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES activity(id)'},
    from_ts TIMESTAMPTZ NOT NULL,
    to_ts TIMESTAMPTZ NOT NULL,
    location TEXT
  )`;
  return true;
};
