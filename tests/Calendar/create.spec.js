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

describe('create()', () => {
  test('error if missing IDs', async (done) => {
    expect.assertions(1);
    const event = { ...dummy };
    event.userId = 'fish';
    await expect(this.calendar.isValid(event))
      .rejects.toEqual(Error('invalid User ID'));
    done();
  });

  test('add valid calendar event', async (done) => {
    expect.assertions(1);
    // Complete calendar object.
    const event = {
      end: dummy.start + 6 * 60 * 1000,
      ...dummy,
    };
    const id = await this.calendar.create(event);
    expect(id).toEqual(1);
    done();
  });
});
