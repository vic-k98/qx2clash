const Koa = require('koa');
const Router = require('./src/router/index');
const KoaBoy = require('koa-body');
const KoaCors = require('koa-cors');

// config
const PORT = 3000;

// init
const app = new Koa();

app.use(KoaCors());
app.use(KoaBoy({ multipart: true }));

// 路由配置
app.use(Router.routes());

// 404 500
app.use(async (ctx, next) => {
  try {
    await next();
    ctx.body = 'Page not found';
  } catch (err) {
    ctx.body = 'Internal Server Error';
  }
});

// 路由配置
app.use(Router.routes());

app.listen(PORT, () => {
  console.log('Server running at http://127.0.0.1:' + PORT + '...');
});