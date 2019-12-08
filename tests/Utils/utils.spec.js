const mock = require('mock-fs');
const fs = require('fs-extra');

const { uploadPicture, utils } = require('../../modules/Utils');

describe('uploadPicture()', () => {
  test('upload a valid PNG picture', async (done) => {
    expect.assertions(1);
    const image = { path: 'mockdir/some.png', type: 'image/png' };
    await mock({
      mockdir: {
        'some.png': Buffer.from([1, 1, 2, 3, 5, 8, 13]),
      },
    });
    const updated = await uploadPicture(image);
    expect(fs.existsSync(`assets/${updated}`)).toBe(true);
    await mock.restore();
    done();
  });

  test('error if file is not an image', async (done) => {
    expect.assertions(1);
    const soundFile = { path: 'mockdir/some.wav', type: 'audio/x-wav' };
    await mock({
      mockdir: {
        'some.wav': Buffer.from([1, 1, 2, 3, 5, 8, 13]),
      },
    });
    await expect(uploadPicture(soundFile)).rejects.toEqual(
      Error('Uploaded file is not a valid image format'),
    );
    await mock.restore();
    done();
  });
});

describe('isId()', () => {
  test('convert an inexistent model ID', async (done) => {
    expect.assertions(1);
    await expect(utils.isId(1, 'movies'))
      .rejects.toEqual(Error('model "movies" does not exist'));
    done();
  });

  test('convert a valid Activity ID', async (done) => {
    expect.assertions(1);
    const id = '3';
    const isValid = await utils.isId(id, 'Activity');
    expect(isValid).toBe(3);
    done();
  });

  test('convert a valid User ID', async (done) => {
    expect.assertions(1);
    const id = '3';
    const isValid = await utils.isId(id, 'User');
    expect(isValid).toBe(3);
    done();
  });

  test('error if missing ID', async (done) => {
    expect.assertions(1);
    const id = undefined;
    await expect(utils.isId(id, 'User'))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });

  test('error if ID is non-numeric', async (done) => {
    expect.assertions(1);
    const id = 'horse';
    await expect(utils.isId(id, 'Activity'))
      .rejects.toEqual(Error('invalid Activity ID'));
    done();
  });

  test('error if ID is negative', async (done) => {
    expect.assertions(1);
    const id = -5;
    await expect(utils.isId(id, 'Activity'))
      .rejects.toEqual(Error('invalid Activity ID'));
    done();
  });

  test('error if ID is null', async (done) => {
    expect.assertions(1);
    const id = 0;
    await expect(utils.isId(id, 'Activity'))
      .rejects.toEqual(Error('invalid Activity ID'));
    done();
  });
});

describe('isInt()', () => {
  test('convert a valid Activity ID', async (done) => {
    expect.assertions(1);
    const id = '3';
    const isValid = await utils.isInt(id, 'Activity');
    expect(isValid).toBe(3);
    done();
  });

  test('convert a valid float Activity ID', async (done) => {
    expect.assertions(1);
    const id = 3.54363;
    const isValid = await utils.isInt(id, 'Activity');
    expect(isValid).toBe(3);
    done();
  });

  test('error if missing ID', async (done) => {
    expect.assertions(1);
    const id = undefined;
    await expect(utils.isInt(id, 'User ID'))
      .rejects.toEqual(Error('User ID value "undefined" is not a number'));
    done();
  });

  test('error if ID is non-numeric', async (done) => {
    expect.assertions(1);
    const id = 'horse';
    await expect(utils.isInt(id, 'Activity ID'))
      .rejects.toEqual(Error('Activity ID value "horse" is not a number'));
    done();
  });

  test('error if ID is negative', async (done) => {
    expect.assertions(1);
    const id = -5;
    await expect(utils.isInt(id, 'Activity ID'))
      .rejects.toEqual(Error('number "-5" is not positive'));
    done();
  });

  test('error if ID is null', async (done) => {
    expect.assertions(1);
    const id = 0;
    await expect(utils.isInt(id, 'rating'))
      .rejects.toEqual(Error('number "0" is not positive'));
    done();
  });
});
