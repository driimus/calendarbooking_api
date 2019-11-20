const Router = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  includeUnparsed: true,
  uploadDir: '.',
});
const User = require('../modules/User');

const router = new Router({
  prefix: '/api/v0.1/users',
});

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async (ctx) => {
  try {
    // extract the data from the request
    const newUser = {
      username:
        ctx.request.body === undefined ? undefined : ctx.request.body.user,
      password:
        ctx.request.body === undefined ? undefined : ctx.request.body.pass,
    };
    // call the functions in the module
    const user = await new User();
    await user.register(newUser);
    // redirect to the home page
    ctx.response.status = 201;
    ctx.body = { message: `User registered ${newUser.user}` };
  } catch (err) {
    ctx.status = 400;
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
    const newUser = {
      username:
        ctx.request.body === undefined ? undefined : ctx.request.body.user,
      password:
        ctx.request.body === undefined ? undefined : ctx.request.body.pass,
    };
    const user = await new User();
    await user.login(newUser.username, newUser.password);
    ctx.response.status = 201;
    ctx.body = { message: `User Logged ${newUser.username}` };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: err.message };
  }
});

module.exports = router;
