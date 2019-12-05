const Connection = require('../../db')
const Tag = require('../../modules/Tag');

const dummy = {
  taggedUserId:1,
  taggedByUserId:1,
  calendarItemId:1,
};

beforeAll (async done => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp `)
  db.end();
  done();
})

beforeEach(async (done) => {
  this.tag = await new Tag();
  done();
});

afterEach(async (done) => {
  this.tag.db.end();
  done();
});

describe('create()', () => {
  test('add valid tag', async (done) => {
    expect.assertions(1);
    const id = await this.tag.create(dummy);
    expect(id).toEqual(1);
    done();
  });
});
