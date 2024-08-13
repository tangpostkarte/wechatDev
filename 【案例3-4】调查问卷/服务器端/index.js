const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// 处理POST请求
app.post('/', (req, res) => {
    fs.writeFile('data/form.json', JSON.stringify(req.body), function (error) {
      if (error) {
        console.log('保存文件失败了')
      }
    });
    res.json(req.body)
})

// 处理GET请求
app.get('/', (req, res) => {
  fs.readFile('data/form.json', function (error, data) {
    if (error) {
      console.log('读取文件失败了')
    } else {
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.end(data.toString());
     }
  });
})

// 监听3000端口
app.listen(3000, () => {
  console.log('服务器启动成功，地址：http://127.0.0.1:3000')
})
