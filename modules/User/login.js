const bcrypt = require('bcrypt-promise');

/**
 * Gets the user credentials from the database and compares with the input.
 *
 * @async
 * @param {string} username - Identifier of the user.
 * @param {string} password - The plaintext password.
 * @returns {number} The new account's unique identifier.
 */
async function login(username, password) {
  const pass = password;
  await this.doesExist('username', username);
  if (pass.length === 0) throw new Error('missing password');
  // Save username and encrypted password.
  const sql = 'SELECT * FROM users WHERE username=$1';
  const {
    rows: [user],
  } = await this.db.query(sql, [username]);
  const compPasswords = await bcrypt.compare(pass, user.password);
  if (compPasswords === false) {
    throw new Error(`invalid password for account ${username}`);
  }
  return user.id;
}

module.exports = (User) => {
  User.prototype.login = login;
  return true;
};
