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
const ids = [];

beforeAll(async (done) => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp`);
  db.end();
  done();
});

beforeEach(async (done) => {
  this.calendar = await new Calendar();
  // eslint-disable-next-line
  for (const dummy of dummies) {
    // eslint-disable-next-line
    const id = await this.calendar.create(dummy);
    ids.push(id);
  }
  done();
});

afterEach(async (done) => {
  this.calendar.db.end();
  done();
});

describe('get()', () => {
  test('get event by ID', async (done) => {
    expect.assertions(3);
    const event = await this.calendar.get(userId, ids[0]);
    expect(event.id).toBe(ids[0]);
    expect(Date.parse(new Date(event.from_ts))).toBe(dummies[0].start);
    expect(Date.parse(new Date(event.to_ts))).toBe(dummies[0].end);
    done();
  });

  test('error if wrong user ID', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.get(23423, ids[0]))
      .rejects.toEqual(Error(`Could not find event with ID "${ids[0]}"`));
    done();
  });

  test('error if invalid user Id', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.get('fish', ids[0]))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });

  test('error if invalid event Id', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.get(1, 'fish'))
      .rejects.toEqual(Error('invalid Calendar ID'));
    done();
  });
});
