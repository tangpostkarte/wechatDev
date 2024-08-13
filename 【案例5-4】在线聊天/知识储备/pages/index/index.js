// index.js
Page({
  onLoad: function () {
    const ws1 = wx.connectSocket({ 	 // 创建WebSocket连接
      // 本地服务器地址
      url: 'ws://127.0.0.1:3000',
      success: resConnect => {		// 连接成功
        console.log(resConnect)
      },
      fail: resConnectError => {		// 连接失败
        console.log(resConnectError)
      }
    })
    ws1.onOpen(res => {				// 监听WebSocket连接打开事件
      ws1.send({
        data: JSON.stringify({
          number: '123',
        }),
        success: resSend => {
          console.log(resSend)
        },
        fail: resSendError => {
          console.log(resSendError)
        }
      })
    }),
    ws1.onMessage(data => {			// 监听WebSocket接收到服务器的消息事件
      console.log(data.data)
    })
  },
  
})
