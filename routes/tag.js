const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});

const Tag = require('../modules/Tag');

const router = Router({
  prefix: '/tag',
});

/**
 * The secure Tag creation endpoint.
 *
 * @name Create a new Tag
 * @route {POST} /api/v1.0/calendar/
 * @authentication This route requires basic authentication.
 */
router.post('/', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const tag = await new Tag();
  try {
    const {
        taggedUserId,
        taggedByUserId,
        calendarItemId,
    } = ctx.request.body;
    const id = await tag.create({
        taggedUserId,
        taggedByUserId,
        calendarItemId
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully created tag', id };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure tag update endpoint.
 *
 * @name Update a tag status
 * @route {PUT} /api/v1.0/calendar/:id
 * @authentication This route requires basic authentication.
 */
router.put('/:id([0-9]{1,})', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const tag = await new Tag();
  try {
    const tagObj = {
      id : ctx.params.id,
      status : ctx.request.body.status
    }
    const response = await tag.update(tagObj);
    ctx.status = 200;
    ctx.body = {response,  msg: 'Successfully updated Tag' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});


module.exports = router;
