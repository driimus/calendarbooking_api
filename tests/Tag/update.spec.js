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

describe('update()', () => {
  test('Accept a tag', async (done) => {
    expect.assertions(1);
    const id =await this.tag.create(dummy);
    const tag = await this.tag.update({id: id, status: 'accepted'})
    expect(tag.status).toEqual('accepted');
    done();
  });
  
  test('Reject a tag', async (done) => {
    expect.assertions(1);
    const id =await this.tag.create(dummy);
    const tag = await this.tag.update({id: id, status: 'rejected'})
    expect(tag.status).toEqual('rejected');
    done();
  });
});
