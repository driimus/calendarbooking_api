/**
 * Saves a new calendar event.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {object} calendar - The calendar object submitted.
 * @returns {number} ID of the created event.
 */
async function create(calendar) {
  await this.isValid(calendar);
  const sql = `INSERT INTO calendar
    VALUES (DEFAULT, $1, $2, to_timestamp($3), to_timestamp($4), $5)
    RETURNING id
  `;
  const { rows: [res] } = await this.db.query(sql, [
    calendar.userId,
    calendar.activityId,
    calendar.start / 1000.0,
    calendar.end / 1000.0,
    calendar.location,
  ]);
  return res.id;
}

module.exports = (Calendar) => {
  Calendar.prototype.create = create;
  return true;
};
