const Connection = require('../../db');
const Calendar = require('../../modules/Calendar');

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
    activityId: 3,
    start: new Date(0).setDate(5),
    end: new Date(0).setDate(6),
    location: 'Priory St, Coventry, UK',
  },
  {
    userId,
    activityId: 5,
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
