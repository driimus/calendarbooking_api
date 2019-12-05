const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});

const { uploadPicture } = require('../modules/Utils');

const router = Router({
  prefix: '/api/v1.0',
});

router.use(require('./activity').routes());
router.use(require('./calendar').routes());
router.use(require('./comment').routes());
router.use(require('./user-auth').routes());
router.use(require('./tag').routes());

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello world.' };
});

/**
 * The secure multiple image upload endpoint.
 *
 * @name Upload Image file(s)
 * @route {POST} /api/v0.1/upload
 * @authentication This route requires cookie-based authentication.
 */
router.post('/upload', koaBody, async (ctx) => {
  // TO-DO: Implement user authentication
  try {
    // console.log(ctx.request, ctx.request.body, ctx.request.files)
    const { images } = ctx.request.files;
    let uploads = images.map((img) => uploadPicture(img));
    uploads = await Promise.all(uploads);
    ctx.status = 200;
    ctx.body = { uploads };
  } catch (err) {
    ctx.throw(415, err.message);
  }
});

module.exports = router;
