/**
 * Creates a new tag
 *
 * @param {object} tag - Object containing all the comment information
 * @returns {number} The Tag unique identifier
 */

async function create(newTag) {
    await this.isValid(newTag);
    const sql = 'INSERT INTO taggedUsers (taggedUserId, taggedByUserId, calendarItemId) VALUES ($1,$2,$3) RETURNING id';
    const { rows: [tag] } = await this.db.query(sql, [
      newTag.taggedUserId,
      newTag.taggedByUserId,
      newTag.calendarItemId,
    ]);
    return tag.id;
  }
  
  module.exports = (Tag) => {
    Tag.prototype.create = create;
    return true;
  };
  