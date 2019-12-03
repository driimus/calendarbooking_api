const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});

const Activities = require('../modules/Calendar');

const router = Router({
  prefix: '/calendar',
});

/**
 * The secure calendar creation endpoint.
 *
 * @name Create a new calendar calendar
 * @route {POST} /api/v0.1/calendar/
 * @authentication This route requires basic authentication.
 */
router.post('/', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Calendar = await new Activities();
  try {
    const {
      userId,
      activityId,
      start,
      end,
      location,
    } = ctx.request.body;
    console.log(ctx.request.body);
    const id = await Calendar.create({
      userId,
      activityId,
      start,
      end,
      location,
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully created calendar', id };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

module.exports = router;
