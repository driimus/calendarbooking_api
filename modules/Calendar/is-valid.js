const { stringBetween, utils: { isId } } = require('../Utils');

/** * Activity schema validation helper. */
const validate = {
  // Calendar events should be at least 5 minutes long.
  date: (start, end) => parseInt(end, 10) - parseInt(start, 10) >= 5 * 60 * 1000,
  location: (location) => stringBetween(location, 0, 60),
};

const InvalidDurationErr = () => { throw new Error('Event must be at least 5 minutes long'); };

/**
 * Validates a Calendar event.
 * @memberof Calendar.prototype
 *
 * @async
 * @param {object} calendar - The calendar object to check.
 * @returns {boolean} If the event is valid.
 * @throws {InvalidDuration} Invalid event duration.
 */
async function isValid(calendar) {
  await isId(calendar.userId, 'User');
  await isId(calendar.activityId, 'Activity');
  if (calendar.location) validate.location(calendar.location);
  const valid = validate.date(calendar.start, calendar.end) || InvalidDurationErr();
  return valid;
}

module.exports = (Activity) => {
  Activity.prototype.isValid = isValid;
  return true;
};
