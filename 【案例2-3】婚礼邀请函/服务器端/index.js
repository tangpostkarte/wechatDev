var express = require('express');

var app = express();

app.use(express.static('./htdocs'));

app.listen(3000, res => {
  console.log('服务器启动成功，访问地址：http://127.0.0.1:3000/文件名');
});
