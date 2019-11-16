
const bcrypt = require('bcrypt-promise');

const saltRounds = 5;

/**
 * Creates a new user with the given credentials.
 *
 * @async
 * @param {string} username - Identifier of the user.
 * @param {string} password - The plaintext password.
 * @returns {number} The new account's unique identifier.
 */
async function register(username, password) {
  let pass = password;
  await this.isAvailable('username', username);
  if (pass.length === 0) throw new Error('missing password');
  // Save username and encrypted password.
  pass = await bcrypt.hash(pass, saltRounds);
  const sql = 'INSERT INTO users(username, password) VALUES($1, $2, $3) RETURNING id';
  const { rows: [user] } = await this.db.query(sql, [username, pass]);
  return user.id;
}

module.exports = (User) => {
  User.prototype.register = register;
  return true;
};
