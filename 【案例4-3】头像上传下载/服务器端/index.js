const express = require('express')
const formidable = require('formidable')
const path = require('path')

var app = express()
app.use(express.static('./htdocs'))

app.post('/upload', function (req, res) {
  var form = formidable({
    keepExtensions: true,
    uploadDir: path.resolve(__dirname, './htdocs/upfile')
  });
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log('上传失败：' + err)
    } else {
      console.log('上传成功：' + JSON.stringify(files))
    }
    var fileUrl = 'http://127.0.0.1:3000/upfile/';
    for (var i in files) {
      fileUrl += files[i].newFilename;
      break;
    }
    res.json({ success: true, file: fileUrl });
  });
})

app.listen(3000, () => {
  console.log('服务器启动成功 http://127.0.0.1:3000');
})
