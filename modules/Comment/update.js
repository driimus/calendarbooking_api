const { isId } = require('../Utils/utils');
/**
 * Updates a comment
 *
 * @param {object} newComment - Object containing all the comment information
 * @returns {number} The comment unique identifier
 */

async function update(newComment) {
    await this.isValid(newComment);
    await isId(newComment.id, 'Comment');
    const sql = 'UPDATE comment SET (allText, dateModified)=($1, now()) WHERE id=$2 RETURNING id'
    const { rows: [comment] } = await this.db.query(sql, [
      newComment.allText,
      newComment.id,
    ]);
    return comment.id;
  }
  
  module.exports = (Comment) => {
    Comment.prototype.update = update;
    return true;
  };
  