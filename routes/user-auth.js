const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});
const User = require('../modules/User');

const router = new Router();

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async (ctx) => {
  try {
    // extract the data from the request
    const { body } = ctx.request;
    // console.log(body)
    // call the functions in the module
    const user = await new User();
    await user.register(body.user, body.pass);
    // redirect to the home page
    ctx.body = { message: `User registered ${body.user}` };
  } catch (err) {
    ctx.body = { message: err.message };
  }
});

/**
 * The script to process user login.
 *
 * @name Register Script
 * @route {POST} /login
 */

router.post('/login', koaBody, async (ctx) => {
  try {
    const { body } = ctx.request;
    const user = await new User();
    await user.login(body.user, body.pass);
    ctx.body = { message: `User Logged ${body.user}` };
  } catch (err) {
    ctx.body = { message: err.message };
  }
});

module.exports = router;
