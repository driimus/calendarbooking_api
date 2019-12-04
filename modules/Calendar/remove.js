const { utils: { isId } } = require('../Utils');

/**
 * Deletes an existent calendar.
 * @memberof Article.prototype
 *
 * @async
 * @param {number} calendarId - Identifier of the calendar to remove.
 * @returns {boolean} On successful calendar deletion.
 */
async function remove(calendarId, userId) {
  const id = await isId(calendarId, 'Calendar');
  const uId = await isId(userId, 'User');
  const sql = 'DELETE FROM calendar WHERE id=$1 AND user_id=$2';
  const { rowCount: deletes } = await this.db.query(sql, [id, uId]);
  if (deletes === 0) throw new Error(`Could not delete event with id ${id}`);
  return true;
}

module.exports = (Calendar) => {
  Calendar.prototype.remove = remove;
  return true;
};
