const {isId}  = require('../Utils/utils')


const FIELDS = {
    userId: (value) => isId(value, 'User'),
    activityId: (value)=> isId(value, 'Activity'),
    allText:(value)=>{
        if (typeof value !== 'string' || value.length === 0) throw new Error('Missing Comment Text');
    } 
}

async function isValid(comment) {
    const fields = Object.keys(FIELDS);
    fields.forEach((field) => {
      const valid = Object.prototype.hasOwnProperty.call(comment, field)
        && FIELDS[field](comment[field]);
      // Field must be an accepted type and be valid.
      if (valid === false) throw new Error(`Invalid comment ${field}: "${comment[field]}"`);
    });
    return true;
  }

module.exports = (Comment) => {
    Comment.prototype.isValid = isValid;
    return true;
}