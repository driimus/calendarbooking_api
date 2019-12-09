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
 * @route {POST} /api/v1.0/calendar/
 * @authentication This route requires basic authentication.
 */
router.post('/', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Calendar = await new Activities();
  try {
    // Get request body or assign empty object if undefined.
    const { body = {} } = ctx.request;
    const userId = body.userId || 1;
    const id = await Calendar.create({
      userId,
      activityId: body.activityId,
      start: body.start,
      end: body.end,
      location: body.location,
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully created calendar', id };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * Retrieve activities within a date range.
 *
 * @name Get activities within date range
 * @route {POST} /api/v1.0/calendar/?from=&to=
 * @authentication This route requires basic authentication.
 */
router.get('/', async (ctx) => {
  // TO-DO: Implement user authentication
  const userId = 1;
  const Calendar = await new Activities();
  try {
    const events = ctx.params.from && ctx.params.to
      ? await Calendar.getBetween(userId, ctx.params.from, ctx.params.to)
      : await Calendar.getAll(userId);
    ctx.status = 200;
    ctx.body = { msg: 'Successfully retrieved events', events };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * Retrieve calendar event by ID.
 *
 * @name Get calendar event by ID
 * @route {GET} /api/v1.0/calendar/:id
 * @authentication This route requires basic authentication.
 */
router.get('/:id([0-9]{1,})', async (ctx) => {
  // TO-DO: Implement user authentication
  const userId = 1;
  const Calendar = await new Activities();
  try {
    const event = await Calendar.get(userId, ctx.params.id);
    ctx.status = 200;
    ctx.body = { msg: 'Successfully retrieved event', event };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure calendar update endpoint.
 *
 * @name Update a calendar event
 * @route {PUT} /api/v1.0/calendar/:id
 * @authentication This route requires basic authentication.
 */
router.put('/:id([0-9]{1,})', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Calendar = await new Activities();
  try {
    // Get request body or assign empty object if undefined.
    const { body = {} } = ctx.request;
    const userId = body.userId || 1;
    await Calendar.update(ctx.params.id, {
      userId,
      activityId: body.activityId,
      start: body.start,
      end: body.end,
      location: body.location,
    });
    ctx.status = 200;
    ctx.body = { msg: 'Successfully updated event' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure event deletion endpoint.
 *
 * @name Delete calendar event with ID
 * @route {DELETE} /api/v1.0/calendar/:id/delete
 * @authentication This route requires basic authentication.
 */
router.del('/:id([0-9]{1,})', koaBody, async (ctx) => {
  try {
    const Calendar = await new Activities();
    // const { userId } = ctx.request.body;
    const userId = 1;
    await Calendar.remove(ctx.params.id, userId);
    ctx.status = 200;
    ctx.body = { msg: 'Successfully deleted calendar' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});


/**
 * The secure endpoit to retrieve All the Activities a User is tagged
 *
 * @name getAllByUserTagged user ID
 * @route {getAllByUserTaggedId} /api/v1.0/calendar/getAllByUserTaggedId
 * @authentication This route requires basic authentication.
 */

router.get('/getAllByUserTaggedId', koaBody, async (ctx) => {
  try {
    const Calendar = await new Activities();
    const { userId } = ctx.query;
    const response = await Calendar.getAllByUserTagged(userId);
    ctx.status = 200;
    ctx.body = response;
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

module.exports = router;
