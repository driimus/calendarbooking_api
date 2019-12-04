/**
 * Creates a new comment
 * 
 * @param {object} newComment - Object containing all the comment information
 * @returns {number} The comment unique identifier
 */ 

async function create(newComment){
    await this.isValid(newComment)
    const sql = 'INSERT INTO comment(userId, activityId, allText) VALUES ($1,$2,$3) RETURNING id'
    const {rows : [comment]} = await this.db.query(sql, [newComment.userId, newComment.activityId, newComment.allText])
    return comment.id
}

module.exports = (Comment) => {
    Comment.prototype.create = create;
    return true
}