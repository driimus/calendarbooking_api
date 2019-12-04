const Connection = require('../../db');
const Calendar = require('../../modules/Calendar');

const dummy = {
  userId: 1,
  activityId: 1,
  start: Date.now(),
  end: Date.now() + 5 * 60 * 1000,
  location: '',
};

const newDummy = {
  userId: 1,
  activityId: 1,
  start: dummy.end + 10 * 60 * 1000,
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

describe('update()', () => {
  test('error if not the event\'s author', async (done) => {
    expect.assertions(1);
    const id = await this.calendar.create(dummy);
    // Calendar object with no title.
    const event = {
      end: newDummy.start + 6 * 60 * 1000,
      ...newDummy,
    };
    event.userId = dummy.userId + 1;
    await expect(this.calendar.update(id, event))
      .rejects.toEqual(Error('Could not update event with id 1'));
    done();
  });

  test('error if inexistent event', async (done) => {
    expect.assertions(1);
    await expect(this.calendar.update(1, dummy))
      .rejects.toEqual(Error('Could not update event with id 1'));
    done();
  });

  test('update valid event', async (done) => {
    expect.assertions(1);
    // Complete updated calendar object.
    const event = {
      end: newDummy.start + 6 * 60 * 1000,
      ...newDummy,
    };
    const id = await this.calendar.create(dummy);
    const updated = await this.calendar.update(id, event);
    expect(updated).toBe(true);
    done();
  });
});
