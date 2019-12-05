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

describe('getBetween()', () => {
  test('get user\'s events', async (done) => {
    expect.assertions(1);
    const [from, to] = [new Date(0).setDate(1), new Date(0).setDate(8)];
    const events = await this.calendar.getBetween(userId, from, to);
    expect(events).toHaveLength(3);
    done();
  });

  test('error if no events', async (done) => {
    expect.assertions(1);
    const [from, to] = [new Date(0).setDate(3), new Date(0).setDate(5)];
    await expect(this.calendar.getBetween(userId, from, to))
      .rejects.toEqual(Error('No events found within date range'));
    done();
  });

  test('error if invalid user Id', async (done) => {
    expect.assertions(1);
    const [from, to] = [new Date(0).setDate(3), new Date(0).setDate(5)];
    await expect(this.calendar.getBetween('fish', from, to))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });

  test('error if invalid date range', async (done) => {
    expect.assertions(1);
    const [from, to] = [new Date(0).setHours(3), new Date(0).setHours(5)];
    await expect(this.calendar.getBetween(userId, from, to))
      .rejects.toEqual(Error('Time interval is too short'));
    done();
  });

  test('get user\'s events during interval', async (done) => {
    expect.assertions(1);
    const [from, to] = [new Date(0).setDate(3), new Date(0).setDate(8)];
    const events = await this.calendar.getBetween(userId, from, to);
    expect(events).toHaveLength(1);
    done();
  });
});
