const { isId } = require('../Utils/utils');

/**
 * Retrieves all the Activities a user is tagged
 *
 * @param {int} taggedUserId Unique identifier for the user
 * @returns {object} Array of activities where a user is tagged
 */


async function getAllByUserTagged(userId) {
  const id = await isId(userId, 'User');
  const sql = `SELECT * FROM calendar 
  INNER JOIN taggedUsers ON calendar.id=taggedUsers.calendarItemId 
  WHERE taggedUserId=$1`;
  const { rows } = await this.db.query(sql, [id]);
  if (rows.length === 0) throw new Error(`No Activity Tags available for the User with id ${id}`);
  return rows;
}

module.exports = (Calendar) => {
  Calendar.prototype.getAllByUserTagged = getAllByUserTagged;
  return true;
};
