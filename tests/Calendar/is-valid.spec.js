const Connection = require('../../db');
const Calendar = require('../../modules/Calendar');

const dummy = {
  userId: 1,
  activityId: 1,
  start: Date.now(),
  location: 'Priory St, Coventry, UK',
};

beforeAll(async (done) => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp`);
  db.end();
  done();
});

beforeEach(async (done) => {
  this.calendar = await new Calendar();
  done();
});

afterEach(async (done) => {
  this.calendar.db.end();
  done();
});

describe('isValid()', () => {
  test('error if invalid user id', async (done) => {
    expect.assertions(1);
    // Calendar object with invalid user ID.
    const event = { ...dummy };
    event.userId = 'fish';
    await expect(this.calendar.isValid(event))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });

  test('error if invalid activity id', async (done) => {
    expect.assertions(1);
    // Calendar object with invalid activity ID.
    const event = { ...dummy };
    event.activityId = 'fish';
    await expect(this.calendar.isValid(event))
      .rejects.toEqual(Error('invalid Activity ID'));
    done();
  });

  test('error if invalid duration', async (done) => {
    expect.assertions(1);
    const event = {
      // Ends before it starts.
      end: dummy.start - 6 * 60 * 1000,
      ...dummy,
    };
    await expect(this.calendar.isValid(event))
      .rejects.toEqual(Error('Event must be at least 5 minutes long'));
    done();
  });

  test('add valid calendar', async (done) => {
    expect.assertions(1);
    // Complete calendar object.
    const event = {
      end: dummy.start + 6 * 60 * 1000,
      ...dummy,
    };
    await expect(this.calendar.isValid(event)).resolves.toEqual(true);
    done();
  });
});
