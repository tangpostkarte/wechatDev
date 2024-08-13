const fs = require('fs');
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/static', express.static('public'))

app.get('/data/videoDetail', (req, res) => {
  var path = 'data/videoDetail-' + req.query.id + '.json'
  fs.readFile(path, function (error, data) {
    if (error) {
      console.log('读取文件失败了' + path)
    } else {

      //配置请求的域名，*代表任意
      res.setHeader("Access-Control-Allow-Origin", "*");
      // 支持跨域请求类型
      res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      //配置请求头信息，包含字符集等等 

      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.end(data.toString());
    }
  });
})

app.get('/data/:file', (req, res) => {
  var path = 'data/' + req.params.file + '.json'
  fs.readFile(path, function (error, data) {
    if (error) {
      console.log('读取文件失败了' + path)
    } else {
      //配置请求的域名，*代表任意
      res.setHeader("Access-Control-Allow-Origin", "*");
      // 支持跨域请求类型
      res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      //配置请求头信息，包含字符集等等 
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.end(data.toString());
    }
  });
})


app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})


