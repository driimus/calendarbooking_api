const { utils: { isId } } = require('../Utils');

/**
 * Deletes an existent activity.
 * @memberof Article.prototype
 *
 * @async
 * @param {number} activityId - Identifier of the activity to remove.
 * @returns {boolean} On successful activity deletion.
 */
async function remove(activityId) {
  const id = await isId(activityId, 'Activity');
  const sql = 'DELETE FROM activity WHERE id=$1';
  const { rowCount: deletes } = await this.db.query(sql, [id]);
  if (deletes === 0) throw new Error(`Could not delete article with id ${id}`);
  return true;
}

module.exports = (Activity) => {
  Activity.prototype.remove = remove;
  return true;
};
