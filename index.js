const Koa = require('koa');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');

const router = require('./routes');

const app = new Koa();

app.use(cors());
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

const models = [User, Activity, Calendar, Comment, Tag];

const port = process.env.PORT || 3002;
app.listen(port, async () => {
  // Initialize a new pool.
  const pool = new Connection();
  await pool.query(`ALTER ROLE ${pool.options.user} SET search_path = public`);
  // Update the database schema.
  for (model of models) await pool.query(model.schema); // eslint-disable-line
  // Drain the pool of connections.
  await pool.end();
});
