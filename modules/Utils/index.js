const uploadPicture = require('./upload-picture');
const utils = require('./utils');

function stringBetween(string, a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return typeof string === 'string'
    && string.length >= min
    && string.length <= max;
}

module.exports = {
  uploadPicture,
  stringBetween,
  utils,
};
