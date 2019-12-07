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
  await this.calendar.db.query(`CREATE TABLE IF NOT EXISTS taggedUsers(
    id SERIAL PRIMARY KEY,
    taggedUserId INT,
    taggedByUserId INT,
    calendarItemId INT)`);
  await this.calendar.db.query('INSERT INTO taggedUsers VALUES(DEFAULT,1,1,1)');
  done();
});

afterEach(async (done) => {
  this.calendar.db.end();
  done();
});

describe('create()', () => {
  test('get All Activities for a user', async (done) => {
    expect.assertions(1);
    // Complete calendar object.
    const event = {
      end: dummy.start + 6 * 60 * 1000,
      ...dummy,
    };
    await this.calendar.create(event);
    const results = await this.calendar.getAllByUserTagged(1);
    expect(results.length).toEqual(1);
    done();
  });
});
