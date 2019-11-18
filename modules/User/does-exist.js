// User atributes for which availability checks are enabled.
const FIELDS = {
  username: (value) => {
    // Usernames must be a non-null string.
    if (typeof value !== 'string' || value.length === 0) throw new Error('missing username');
  },
};

/**
 * Checks whether the value is available for a given user attribute.
 *
 * @async
 * @param {string} field - Name of the user attribute.
 * @param value - Value to be searched for.
 */
async function doesExist(field, value) {
  if (Object.keys(FIELDS).includes(field) === false) throw new Error(`invalid field "${field}"`);
  // Validate the given value.
  FIELDS[field](value);
  // Check that the username is not taken.
  const sql = `SELECT id FROM users WHERE ${field}=$1 LIMIT 1`;
  const {
    rows: { length: exists },
  } = await this.db.query(sql, [value]);
  if (exists !== 1) throw new Error(`No ${field} "${value}" record in database`);
  return true;
}

module.exports = (User) => {
  User.prototype.doesExist = doesExist;
  return true;
};
