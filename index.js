const path = require('path');
const koa = require('koa');
const logger = require('koa-logger');
const koastatic = require('koa-static');
const chalk = require('chalk');


const app = new koa();
app.use(logger());

// 静态资源文件
app.use(koastatic(path.resolve(__dirname, 'www')));


const port = 3000;

app.listen(port);
console.log(chalk.green(`listening on port ${port}`));
