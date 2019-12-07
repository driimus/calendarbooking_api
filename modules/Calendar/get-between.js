const { utils: { isId } } = require('../Utils');

const day = 24 * 60 * 60 * 1000;

function daysBetween(from, to, dayCount = 1) {
  const [start, end] = [parseInt(from, 10), parseInt(to, 10)];

  const valid = typeof start === 'number'
    && typeof end === 'number'
    && end - start >= dayCount * day;
  if (valid === false) throw new Error('Time interval is too short');
  return [start, end];
}

/**
 * Retrieves a list of calendar events filtered by date interval.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {number} userId - The unique ID of the user to update.
 * @param {number} from - Start date as ms from UNIX epoch.
 * @param {number} to - End date as ms from UNIX epoch.
 * @returns {object[]} List of calendar events within the given interval.
 * @throws {NoEvents} No events found within date range.
 * @throws {InvalidRange} Time interval is too short.
 */
async function getBetween(userId, from, to) {
  const id = await isId(userId, 'User');
  const [start, end] = daysBetween(from, to);
  const sql = `SELECT * FROM calendar
    WHERE user_id=$1 AND from_ts >= to_timestamp($2) AND to_ts <= to_timestamp($3)
  `;
  const { rows: events } = await this.db.query(sql, [id, start / 1000.0, end / 1000.0]);
  if (events.length === 0) throw new Error('No events found within date range');
  return events;
}

module.exports = (Calendar) => {
  Calendar.prototype.getBetween = getBetween;
  return true;
};
