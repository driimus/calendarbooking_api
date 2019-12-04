const Connection = require('../../db');
const Calendar = require('../../modules/Calendar');

const dummy = {
  userId: 1,
  activityId: 1,
  start: Date.now(),
  end: Date.now() + 5 * 60 * 1000,
  location: '',
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
  test('error if invalid calendar ID', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.remove('fish', 1))
      .rejects.toEqual(Error('invalid Calendar ID'));
    done();
  });

  test('error if inexistent calendar', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.remove(1, 1))
      .rejects.toEqual(Error('Could not delete event with id 1'));
    done();
  });

  test('error if not author of event', async (done) => {
    expect.assertions(1);
    const id = await this.calendar.create(dummy);
    await expect(this.calendar.remove(id, dummy.userId + 1))
      .rejects.toEqual(Error('Could not delete event with id 1'));
    done();
  });

  test('remove valid calendar', async (done) => {
    expect.assertions(1);
    const id = await this.calendar.create(dummy);
    const deleted = await this.calendar.remove(id, dummy.userId);
    expect(deleted).toBe(true);
    done();
  });
});
