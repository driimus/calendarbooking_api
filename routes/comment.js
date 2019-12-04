const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
});
const Comments = require('../modules/Comment');

const router = Router({
  prefix: '/comment',
});

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

module.exports = router;
