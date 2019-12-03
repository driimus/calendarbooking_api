
const Comment = require('../../modules/Comment');

const dummy = {
  userId:1,
  activityId:1,
  allText: 'I coul talk lots of shit but meh this university just sucks'
};

beforeEach(async (done) => {
  this.comment = await new Comment();
  done();
});

afterEach(async (done) => {
  this.comment.db.query('DROP TABLE IF EXISTS comment')
  this.comment.db.end();
  done();
});

describe('create()', () => {
  test('add valid comment', async (done) => {
    expect.assertions(1);
    const id = await this.comment.create(dummy);
    expect(id).toEqual(1);
    done();
  });
});
