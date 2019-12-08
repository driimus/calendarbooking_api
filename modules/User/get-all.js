/**
 * Retrieves a list of all the users.
 * @memberof User.prototype
 *
 * @async
 * @returns {object[]} List of all the users.
 * @throws {NoUsers} No users found within date range.
 */
async function getAll() {
  const { rows: users } = await this.db.query('SELECT id,username FROM users');
  if (users.length === 0) throw new Error('No users found');
  return users;
}

module.exports = (Calendar) => {
  Calendar.prototype.getAll = getAll;
  return true;
};
