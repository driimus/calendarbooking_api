const { isId } = require('../Utils/utils');

const FIELDS = {
  taggedUserId: (value) => isId(value, 'User'),
  taggedByUserId: (value) => isId(value, 'User'),
  calendarItemId: (value) => isId(value, 'Calendar'),
};

async function isValid(tag) {
  const fields = Object.keys(FIELDS);
  fields.forEach((field) => {
    const valid = Object.prototype.hasOwnProperty.call(tag, field)
        && FIELDS[field](tag[field]);
    // Field must be an accepted type and be valid.
    if (valid === false) throw new Error(`Invalid Tag ${field}: "${tag[field]}"`);
  });
  return true;
}

module.exports = (Tag) => {
  Tag.prototype.isValid = isValid;
  return true;
};
