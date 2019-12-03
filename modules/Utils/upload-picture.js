const fs = require('fs-extra');
const mime = require('mime-types');
const uuidv1 = require('uuid/v1');

/**
 * Saves a new image file to the filesystem.
 *
 * @async
 * @param {object} img - The submitted image.
 * @returns {string} Relative path to the public uploaded image.
 * @throws {InvalidImage} Uploaded file is not a valid image format.
 */
async function uploadPicture(img) {
  if (img.type.split('/')[0] !== 'image') throw new Error('Uploaded file is not a valid image format');
  const extension = mime.extension(img.type);
  // Use pseudo-random filename based on current time.
  const picPath = `uploads/${uuidv1()}.${extension}`;
  await fs.copy(img.path, `assets/${picPath}`);
  return picPath;
}

module.exports = uploadPicture;
