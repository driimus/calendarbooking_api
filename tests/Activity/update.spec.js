const Connection = require('../../db');
const Activity = require('../../modules/Activity');

const dummy = {
  title: 'So long and thanks for all the fish',
  description: `Test article description of a valid length
  that spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Priory St, Coventry, UK',
};

const newDummy = {
  title: 'Updated thanks for all the fish',
  description: `Some renewed dummy description that has to be used
  and spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Exp Bvd, Bucharest, RO',
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

describe('update()', () => {
  test('error if missing activity title', async (done) => {
    expect.assertions(1);
    const id = await this.activity.create(dummy);
    // Activity object with no title.
    const { description, url, location } = newDummy;
    await expect(this.activity.update(id, {
      description, url, location,
    }))
      .rejects.toEqual(Error('Missing required fields'));
    done();
  });

  test('error if inexistent activity', async (done) => {
    expect.assertions(1);
    await expect(this.activity.update(1, newDummy))
      .rejects.toEqual(Error('Could not update article with id 1'));
    done();
  });

  test('update valid activity', async (done) => {
    expect.assertions(1);
    // Complete updated activity object.
    const id = await this.activity.create(dummy);
    const updated = await this.activity.update(id, newDummy);
    expect(updated).toBe(true);
    done();
  });
});
