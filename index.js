const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const koastatic = require('koa-static');
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');

const app = new koa();
app.use(logger());

// 静态资源文件
app.use(koastatic(path.resolve(__dirname, 'www')));

const proxy = function (context, options) {
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    return async function (ctx, next) {
        await koaConnect(createProxyMiddleware(context, options))(ctx, next)
    }
}

const proxyTable = {
    '/': {
        target: 'http://172.16.140.142:8866',
        changeOrigin: true
    }
}

Object.keys(proxyTable).map(context => {
    const options = proxyTable[context]
    // 使用代理
    app.use(proxy(context, options))
})

const port = 3000;

app.listen(port);
console.log(chalk.green(`listening on port ${port}`));
