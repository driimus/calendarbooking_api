module.exports = (Tag) => {
  Tag.schema = `CREATE TABLE IF NOT EXISTS taggedUsers(
    id SERIAL PRIMARY KEY,
    taggedUserId INT REFERENCES users(id),
    taggedByUserId INT REFERENCES users(id),
    calendarItemId INT REFERENCES calendar(id),
    accepted BOOL NOT NULL DEFAULT FALSE
  )`;
  return true;
};
