/**
 * Utilities module.
 * @module utils
 */

const { readdirSync, lstatSync } = require('fs');
const path = require('path');

const models = readdirSync(path.resolve(__dirname, '../')).filter(
  (file) => lstatSync(path.join(path.resolve(__dirname, '../'), file)).isDirectory(),
);

const isModel = async (model) => {
  if (models.includes(model) === false) throw new Error(`model "${model}" does not exist`);
  return true;
};

const isInt = async (value, model) => {
  const int = parseInt(value, 10);
  if (Number.isInteger(int) === false) throw new Error(`${model} value "${value}" is not a number`);
  if (int < 1) throw new Error(`number "${value}" is not positive`);
  return int;
};

/**
 * Checks that a given value is an integer.
 *
 * @async
 * @param {number} id - The value to be validated.
 * @param {string} model - The identifier's corresponding model.
 * @returns {number} The parsed value.
 */
const isId = async (id, model) => {
  try {
    const uid = await isInt(id, model);
    await isModel(model);
    return uid;
  } catch (err) {
    if (err.message === `model "${model}" does not exist`) throw err;
    throw new Error(`invalid ${model} ID`);
  }
};

module.exports = { isId, isInt };
