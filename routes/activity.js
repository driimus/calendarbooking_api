const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});

const Activities = require('../modules/Activity');

const router = Router({
  prefix: '/activity',
});

/**
 * The secure activity creation endpoint.
 *
 * @name Create a new calendar activity
 * @route {POST} /api/v0.1/activity/
 * @authentication This route requires basic authentication.
 */
router.post('/', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Activity = await new Activities();
  try {
    const {
      title,
      description,
      url,
      location,
    } = ctx.request.body;
    // console.log(activity, typeof activity);
    const id = await Activity.create({
      title,
      description,
      url,
      location,
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully created activity', id };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure activity creation endpoint.
 *
 * @name Create a new calendar activity
 * @route {PUT} /api/v0.1/activity/:id
 * @authentication This route requires basic authentication.
 */
router.put('/:id([0-9]{1,})', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Activity = await new Activities();
  try {
    const {
      title,
      description,
      url,
      location,
    } = ctx.request.body;
    // console.log(activity, typeof activity);
    await Activity.update(ctx.params.id, {
      title,
      description,
      url,
      location,
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully updated activity' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

module.exports = router;
