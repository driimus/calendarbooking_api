
const Activity = require('../../modules/Activity');

const dummy = {
  title: 'So long and thanks for all the fish',
  description: `Test article description of a valid length
  that spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Priory St, Coventry, UK',
};

beforeEach(async (done) => {
  this.activity = await new Activity();
  done();
});

afterEach(async (done) => {
  this.activity.db.end();
  done();
});

describe('create()', () => {
  test('error if missing activity title', async (done) => {
    expect.assertions(1);
    // Activity object with no title.
    const { description, url, location } = dummy;
    await expect(this.activity.create({
      description, url, location,
    }))
      .rejects.toEqual(Error('Missing required fields'));
    done();
  });

  test('add valid activity', async (done) => {
    expect.assertions(1);
    // Complete activity object.
    const id = await this.activity.create(dummy);
    expect(id).toEqual(1);
    done();
  });
});
