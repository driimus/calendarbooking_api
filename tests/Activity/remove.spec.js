const Connection = require('../../db');
const Activity = require('../../modules/Activity');

const dummy = {
  title: 'So long and thanks for all the fish',
  description: `Test article description of a valid length
  that spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Priory St, Coventry, UK',
};

beforeAll(async (done) => {
  const db = new Connection();
  await db.query('SET search_path = pg_temp');
  db.end();
  done();
});

beforeEach(async (done) => {
  this.activity = await new Activity();
  done();
});

afterEach(async (done) => {
  this.activity.db.end();
  done();
});

afterAll(async (done) => {
  const db = new Connection();
  await db.query('SET search_path = public');
  db.end();
  done();
});

describe('create()', () => {
  test('error if invalid activity ID', async (done) => {
    expect.assertions(1);
    await expect(this.activity.remove('fish'))
      .rejects.toEqual(Error('invalid Activity ID'));
    done();
  });

  test('error if inexistent activity', async (done) => {
    expect.assertions(1);
    await expect(this.activity.remove(1))
      .rejects.toEqual(Error('Could not delete article with id 1'));
    done();
  });

  test('remove valid activity', async (done) => {
    expect.assertions(1);
    const id = await this.activity.create(dummy);
    const deleted = await this.activity.remove(id);
    expect(deleted).toBe(true);
    done();
  });
});
