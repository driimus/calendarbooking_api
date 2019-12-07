module.exports = (Tag) => {
  Tag.schema = `CREATE TABLE IF NOT EXISTS taggedUsers(
    id SERIAL PRIMARY KEY,
    taggedUserId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES users(id)'},
    taggedByUserId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES users(id)'},
    calendarItemId INT ${process.env.NODE_ENV === 'test' ? '' : 'REFERENCES calendar(id)'},
    status TEXT DEFAULT 'pending'
    CHECK (status in ('pending','accepted','rejected'))
  )`;
  return true;
};
