const Koa = require('koa');
const koaStatic = require('koa-static');

const router = require('./routes/router.js');

const app = new Koa();

// Serve public assets.
app.use(koaStatic('assets'));

app.use(router.routes());

const Connection = require('./db');

// Cache all the custom models.
const User = require('./modules/User');
const Calendar = require('./modules/Calendar');
const Activity = require('./modules/Activity');
const Comment = require('./modules/Comment');
const Tag = require('./modules/Tag');

const models = [User, Calendar, Activity, Comment, Tag];

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  // Initialize a new pool.
  const pool = new Connection();
  // Update the database schema.
  Promise.all(models.map((model) => pool.query(model.schema)));
  // Drain the pool of connections.
  await pool.end();
});
