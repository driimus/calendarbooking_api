const Router = require('koa-router');
// const bp = require('koa-bodyparser')

const router = Router({
  prefix: '/api/v0.1',
});

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello world.' };
});

module.exports = router;
