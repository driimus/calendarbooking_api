const Koa = require('koa');

const router = require('./routes/router.js');

const app = new Koa();

app.use(router.routes());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}.`));
