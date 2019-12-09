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
  const sql = `SELECT * FROM calendar
    INNER JOIN activity ON calendar.activity_id=activity.id
    WHERE user_id=$1
  `;
  const { rows } = await this.db.query(sql, [id]);
  if (rows.length === 0) throw new Error(`No events found for user ID "${id}"`);
  const events = rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    activityId: row.activity_id,
    start: new Date(row.from_ts),
    end: new Date(row.to_ts),
    title: row.title,
    description: row.description,
    url: row.url,
  }));
  return events;
}

module.exports = (Calendar) => {
  Calendar.prototype.getAll = getAll;
  return true;
};
