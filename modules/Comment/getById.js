const { isId } = require('../Utils/utils');

/**
 * Retrieve a comment by the its unique identifier
 *
 * @param {int} commentId
 * @returns {object} Comment matching the id
 */


async function getById(commentId) {
  const id = await isId(commentId, 'Comment');
  const sql = 'SELECT * FROM comment WHERE id=$1';
  const { rows: [comment] } = await this.db.query(sql, [id]);
  if (comment === undefined) throw new Error(`Could not retrieve comment with id ${id}`);
  return comment;
}

module.exports = (Comment) => {
  Comment.prototype.getById = getById;
  return true;
};
