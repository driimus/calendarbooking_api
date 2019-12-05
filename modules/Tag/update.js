const {isId} = require('../Utils/utils')
/**
 * Update the Tag status
 *
 * @param {object} tag - Object containing all the comment information
 * @returns {object} The updated tag
 */

async function update(tagUpdate) {
    await isId(tagUpdate.id, 'Tag');
    const sql = 'UPDATE taggedUsers SET status=$1 WHERE id=$2 Returning *';
    const { rows: [tag] } = await this.db.query(sql, [
      tagUpdate.status,
      tagUpdate.id,
    ]);
    return tag;
  }
  
  module.exports = (Tag) => {
    Tag.prototype.update = update;
    return true;
  };
  