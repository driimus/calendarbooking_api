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
 * The secure activity deletion endpoint.
 *
 * @name Delete activity with ID
 * @route {GET} /api/v0.1/activity/:id/delete
 * @authentication This route requires basic authentication.
 */
router.get('/:id([0-9]{1,})/delete', async (ctx) => {
  try {
    const Activity = await new Activities();
    await Activity.remove(ctx.params.id);
    ctx.status = 200;
    ctx.body = { msg: 'Successfully deleted activity' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

module.exports = router;
