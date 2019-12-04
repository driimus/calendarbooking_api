const Connection = require('../../db')
const Comment = require('../../modules/Comment');

const dummy = {
  userId:1,
  activityId:1,
  allText: 'I coul talk lots of shit but meh this university just sucks'
};

const dummyInsert = {
    userid:1,
    activityid:1,
    alltext: 'I coul talk lots of shit but meh this university just sucks'
  };
  

beforeAll (async done => {
  const db = new Connection();
  await db.query(`ALTER ROLE ${db.options.user} SET search_path = pg_temp `)
  db.end();
  done();
})

beforeEach(async (done) => {
  this.comment = await new Comment();
  done();
});

afterEach(async (done) => {
  this.comment.db.end();
  done();
});

describe('getById ()', () => {
  test('Retrieve comments for an activity', async (done) => {
    expect.assertions(1);
    await this.comment.create(dummy);
    const comment = await this.comment.getAllByActivityId(1);
    expect(comment.length).toEqual(1)
    done();
  });

  test('Error when getting comment with invalid Id', async (done) => {
    expect.assertions(1);
    await expect(this.comment.getAllByActivityId(5))
    .rejects.toEqual(Error(`No comments available for the activity with id 5`));
    done();
  });
});
