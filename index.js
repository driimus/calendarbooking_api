const Koa = require('koa');

const router = require('./routes/router.js');

const app = new Koa();

app.use(router.routes());

// Cache all the custom models.
const models = {
  User: require('./modules/User'),
  Calendar: require('./modules/Calendar'),
  Activity: require('./modules/Activity'),
  Comment: require('./modules/Comment'),
  Tag: require('./modules/Tag')
};

const Connection = require('./db');

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  // Initialize a new pool.
  const pool = new Connection();
  // Update the database schema.
  Promise.all(Object.values(models).map((model) => pool.query(model.schema)));
  // Drain the pool of connections.
  await pool.end();
  console.log(`Server running on port ${port}.`);
});
