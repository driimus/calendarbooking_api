const Connection = require('../../db');
const Comment = require('../../modules/Comment');

const dummy = {
  userId: 1,
  activityId: 1,
  allText: 'I coul talk lots of shit but meh this university just sucks',
};

const dummyUpdate = {
  id: 1,
  userId: 1,
  activityId: 1,
  allText: 'I lots of shit but meh this university just sucks',
};

beforeAll(async (done) => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp `);
  db.end();
  done();
});

beforeEach(async (done) => {
  this.comment = await new Comment();
  done();
});

afterEach(async (done) => {
  this.comment.db.end();
  done();
});

describe('create()', () => {
  test('add valid comment', async (done) => {
    expect.assertions(1);
    await this.comment.create(dummy);
    const id = await this.comment.update(dummyUpdate);
    expect(id).toEqual(1);
    done();
  });
});
