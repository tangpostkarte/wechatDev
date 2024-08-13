var sd = require('silly-datetime');
var http = require('http')
var WebSocketServer = require('websocket').server

const httpServer = http.createServer((request, response) => {
  console.log('[' + new Date + '] Received request for ' + request.url)
  response.writeHead(404)
  response.end()
})

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: true
})

wsServer.on('connect', (connection) => {
  connection.on('message', (message) => {
    console.log('>>message ', message);
    if (message.type === 'utf8') {
      var data = {'content': '自动回复', 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
      // 服务器返回的信息
      connection.sendUTF( JSON.stringify(data) )
    }
  });
  // 连接的关闭监听
  connection.on('close', (reasonCode, description) => {
    console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.')
  })
  // 接收控制台的输入
  process.stdin.on('data', function(data){
    data = data.toString().trim()
    var data = {'content': data, 'date': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
    connection.sendUTF( JSON.stringify(data) )
  })
})

httpServer.listen(3000, () => {
  console.log('服务器启动成功，地址： ws://127.0.0.1:3000')
})
