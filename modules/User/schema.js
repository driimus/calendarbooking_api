module.exports = (User) => {
  User.schema = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`;
  return true;
};
