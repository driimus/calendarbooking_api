const { stringBetween } = require('../Utils');

/** * Activity schema validation helper. */
const validate = {
  title: (title) => stringBetween(title, 6, 36),
  description: (description) => stringBetween(description, 0, 180),
  url: (url) => {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    return pattern.test(url);
  },
  location: (location) => stringBetween(location, 0, 60),
};

/**
 * Validates an Activity object.
 * @memberof Activity.prototype
 *
 * @async
 * @param {object} activity - The activity object to check.
 * @returns {boolean} If the activity is valid.
 * @throws {MissingField} Missing required fields.
 * @throws {InvalidField} Invalid activity {field}.
 */
async function isValid(activity) {
  const fields = Object.keys(activity);
  // Activities should have a title and some other descriptor.
  if (!fields.includes('title') || fields.length < 2) throw new Error('Missing required fields');
  fields.forEach((field) => {
    const valid = Object.prototype.hasOwnProperty.call(validate, field)
      && validate[field](activity[field]);
    // Field must be an accepted type and be valid.
    if (valid === false) throw new Error(`Invalid activity ${field}: "${activity[field]}"`);
  });
  return true;
}

module.exports = (Activity) => {
  Activity.prototype.isValid = isValid;
  return true;
};
