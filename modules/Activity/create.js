/**
 * Saves a new article submission.
 * @memberof Article.prototype
 *
 * @async
 * @param {object} activity - The activity object submitted.
 * @returns {boolean} On successful activity creation.
 */
async function create(activity) {
  await this.isValid(activity);
  const {
    title,
    description,
    url,
    location,
  } = activity;
  const sql = 'INSERT INTO activity VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id';
  const id = await this.db.query(sql, [title, description, url, location]);
  return id;
}

module.exports = (Activity) => {
  Activity.prototype.create = create;
  return true;
};
