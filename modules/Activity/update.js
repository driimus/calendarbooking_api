const { utils: { isId } } = require('../Utils');

/**
 * Updates an existent activity.
 * @memberof Activity.prototype
 *
 * @async
 * @param {number} activityId - The unique ID of the activity to update.
 * @param {object} newActivity - The activity object submitted.
 * @returns {boolean} If the activity was updated.
 */
async function update(activityId, newActivity) {
  const id = await isId(activityId, 'Activity');
  await this.isValid(newActivity);
  const {
    title,
    description,
    url,
    location,
  } = newActivity;
  const sql = `UPDATE activity SET
    (title, description, url, location) = ($2, $3, $4, $5)
    WHERE id=$1
  `;
  const { rowCount: updates } = await this.db.query(sql, [id, title, description, url, location]);
  if (updates === 0) throw new Error(`Could not update article with id ${id}`);
  return true;
}

module.exports = (Activity) => {
  Activity.prototype.update = update;
  return true;
};
