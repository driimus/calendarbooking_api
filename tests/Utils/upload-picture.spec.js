const mock = require('mock-fs');
const fs = require('fs-extra');

const { uploadPicture } = require('../../modules/Utils');

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
