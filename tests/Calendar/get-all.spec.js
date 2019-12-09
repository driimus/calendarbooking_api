const Connection = require('../../db');
const Calendar = require('../../modules/Calendar');

const activity = {
  title: 'So long and thanks for all the fish',
  description: `Test activity description of a valid length
  that spreads over multiple lines`,
  url: 'https://nodejs.dev/introduction-to-nodejs',
  location: 'Priory St, Coventry, UK',
};

const userId = 1;
const dummies = [
  {
    userId,
    activityId: 1,
    start: new Date(0).setDate(1),
    end: new Date(0).setDate(4),
    location: '',
  },
  {
    userId,
    activityId: 1,
    start: new Date(0).setDate(5),
    end: new Date(0).setDate(6),
    location: 'Priory St, Coventry, UK',
  },
  {
    userId,
    activityId: 1,
    start: new Date(0).setDate(1),
    end: new Date(0).setDate(2),
    location: 'Priory St, Coventry, UK',
  },
  // Event of another user.
  {
    userId: 99,
    activityId: 1,
    start: new Date(0).setDate(1),
    end: new Date(0).setDate(4),
    location: 'Exp Bvd, Bucharest, RO',
  },
];

beforeAll(async (done) => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp`);
  db.end();
  done();
});

beforeEach(async (done) => {
  this.calendar = await new Calendar();
  await this.calendar.db.query(`CREATE TABLE IF NOT EXISTS activity(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    location TEXT
  )`);
  await this.calendar.db.query(
    'INSERT INTO activity VALUES(DEFAULT, $1, $2)',
    [activity.title, activity.description],
  );
  // eslint-disable-next-line
  for(const dummy of dummies) await this.calendar.create(dummy);
  done();
});

afterEach(async (done) => {
  this.calendar.db.end();
  done();
});

describe('getAll()', () => {
  test('get user\'s events', async (done) => {
    expect.assertions(1);
    const events = await this.calendar.getAll(userId);
    expect(events).toHaveLength(3);
    done();
  });

  test('error if no events', async (done) => {
    expect.assertions(1);

    await expect(this.calendar.getAll(23423))
      .rejects.toEqual(Error('No events found for user ID "23423"'));
    done();
  });

  test('error if invalid user Id', async (done) => {
    expect.assertions(1);

    await expect(this.calendar.getAll('fish'))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });
});
