const { isId } = require('../Utils/utils');

/**
 * Retrieve a comment by the its unique identifier
 *
 * @param {int} activityId
 * @returns {object} Comment matching the id
 */


async function getAllByActivityId(activityId) {
  const id = await isId(activityId, 'Activity');
  const sql = 'SELECT * FROM comment WHERE activityId=$1';
  const { rows } = await this.db.query(sql, [id]);
  if (rows.length === 0) throw new Error(`No comments available for the activity with id ${id}`);
  return rows;
}

module.exports = (Comment) => {
  Comment.prototype.getAllByActivityId = getAllByActivityId;
  return true;
};
