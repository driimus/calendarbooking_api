
const Connection = require('../../db');
const Activity = require('../../modules/Activity');

const dummy = {
  title: 'So long and thanks for all the fish',
  description: `Test activity description of a valid length
  that spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Priory St, Coventry, UK',
};

beforeAll(async (done) => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp`);
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

describe('isValid()', () => {
  test('error if missing activity title', async (done) => {
    expect.assertions(1);
    // Activity object with no title.
    const { description, url, location } = dummy;
    await expect(this.activity.isValid({
      description, url, location,
    }))
      .rejects.toEqual(Error('Missing required fields'));
    done();
  });

  test('error if incomplete activity', async (done) => {
    expect.assertions(1);
    // Activity object with no descriptors.
    const { title } = dummy;
    await expect(this.activity.isValid({ title }))
      .rejects.toEqual(Error('Missing required fields'));
    done();
  });

  test('error if invalid activity title', async (done) => {
    expect.assertions(3);
    const {
      title, description, url, location,
    } = dummy;
    // Activity object with title that is too short.
    await expect(this.activity.isValid({
      title: title.slice(0, 2), description, url, location,
    }))
      .rejects.toEqual(Error(`Invalid activity title: "${title.slice(0, 2)}"`));
    // Activity object with title that is too long.
    await expect(this.activity.isValid({
      title: `${title}${title}`, description, url, location,
    }))
      .rejects.toEqual(Error(`Invalid activity title: "${title}${title}"`));
    // Activity object with title that is too long.
    await expect(this.activity.isValid({
      title: Infinity, description, url, location,
    }))
      .rejects.toEqual(Error('Invalid activity title: "Infinity"'));
    done();
  });

  test('add valid activity', async (done) => {
    expect.assertions(1);
    // Complete activity object.
    await expect(this.activity.isValid(dummy)).resolves.toEqual(true);
    done();
  });
});
