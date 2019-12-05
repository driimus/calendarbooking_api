const { utils: { isId } } = require('../Utils');

/**
 * Retrieves a list of calendar events filtered by date interval.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {number} userId - The unique ID of the user to update.
 * @returns {object[]} List of calendar events within the given interval.
 * @throws {NoEvents} No events found within date range.
 */
async function getAll(userId) {
  const id = await isId(userId, 'User');
  const sql = 'SELECT * FROM calendar WHERE user_id=$1';
  const { rows: events } = await this.db.query(sql, [id]);
  if (events.length === 0) throw new Error(`No events found for user ID "${id}"`);
  return events;
}

module.exports = (Calendar) => {
  Calendar.prototype.getAll = getAll;
  return true;
};
