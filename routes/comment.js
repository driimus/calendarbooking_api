const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
});
const Comments = require('../modules/Comment');

const router = Router({
  prefix: '/comment',
});

/**
 * The secure comment creation endpoint.
 *
 * @name Create a new comment
 * @route {POST} /api/v1.0/comment/create
 * @authentication This route requires basic authentication.
 */
router.post('/create', koaBody, async (ctx) => {
  const comment = await new Comments();
  try {
    const body = ctx.request.body || {};
    const newComment = {
      userId: body.userId,
      activityId: body.activityId,
      allText: body.allText,
    };

    const id = await comment.create(newComment);
    ctx.status = 200;
    ctx.body = { msg: 'New Comment created', id };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure comment retrieval endpoint.
 *
 * @name GET Retrieve a Comment by its identifier
 * @route {GET} /api/v1.0/comment/getById/:id
 * @authentication This route requires basic authentication.
 */
router.get('/getById/:id([0-9]{1,})', async (ctx) => {
  const Comment = await new Comments();
  try {
    const comment = await Comment.getById(ctx.params.id);
    ctx.status = 200;
    ctx.body = comment;
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

/**
 * The secure comment retrieveal endpoint.
 *
 * @name GET Retrieve all comment for an activity
 * @route {GET} /api/v1.0/comment/getAllByActivityId/:id
 * @authentication This route requires basic authentication.
 */
router.get('/getAllByActivityId/:id([0-9]{1,})', async (ctx) => {
  const Comment = await new Comments();
  try {
    const comment = await Comment.getAllByActivityId(ctx.params.id);
    ctx.status = 200;
    ctx.body = comment;
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

router.put('/:id([0-9]{1,})', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  const Comment = await new Comments ();
  try {
    const commentObj = {
      id: ctx.params.id,
      userId: ctx.request.body.userId,
      activityId: ctx.request.body.activityId,
      allText: ctx.request.body.allText,
    };
    await Comment.update(commentObj);
    ctx.status = 200;
    ctx.body = {msg: 'Successfully updated Comment' };
  } catch (err) {
    ctx.throw(400, err.message);
  }
});

module.exports = router;
