const { utils: { isId } } = require('../Utils');

/**
 * Updates an existent calendar.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {number} calendarId - The unique ID of the calendar to update.
 * @param {object} newCalendar - The calendar object submitted.
 * @returns {boolean} If the calendar was updated.
 */
async function update(calendarId, newCalendar) {
  const id = await isId(calendarId, 'Calendar');
  await this.isValid(newCalendar);
  const sql = `UPDATE calendar SET
    (activity_id, from_ts, to_ts, location) = ($3, to_timestamp($4), to_timestamp($5), $6)
    WHERE id=$1 AND user_id = $2
  `;
  const { rowCount: updates } = await this.db.query(sql, [
    id,
    newCalendar.userId,
    newCalendar.activityId,
    newCalendar.start / 1000.0,
    newCalendar.end / 1000.0,
    newCalendar.location,
  ]);
  if (updates === 0) throw new Error(`Could not update event with id ${id}`);
  return true;
}

module.exports = (Calendar) => {
  Calendar.prototype.update = update;
  return true;
};
