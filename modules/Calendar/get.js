const { utils: { isId } } = require('../Utils');

/**
 * Retrieves an user's calendar event with a given ID.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {number} userId - The unique ID of the user to update.
 * @param {number} calendarId - The unique ID of the user to update.
 * @returns {object} Calendar event with the matching ID.
 * @throws {InvalidUserId} invalid User ID.
 * @throws {InvalidCalendartId} invalid Calendar ID.
 * @throws {NoEvent} Could not find event with ID "{calendarId}".
 */
async function get(userId, calendarId) {
  const uId = await isId(userId, 'User');
  const id = await isId(calendarId, 'Calendar');
  const sql = 'SELECT * FROM calendar WHERE id=$1 AND user_id=$2';
  const { rows: [event] } = await this.db.query(sql, [id, uId]);
  if (event === undefined) throw new Error(`Could not find event with ID "${id}"`);
  return event;
}

module.exports = (Calendar) => {
  Calendar.prototype.get = get;
  return true;
};
