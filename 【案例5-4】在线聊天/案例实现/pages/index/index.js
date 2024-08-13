// index.js
Page({
  data: {
    content: '',
    list: [],
    lastId: ''
  },
  message: '',
  ws: null,
  onLoad: function () {
    const ws = wx.connectSocket({
      url: 'ws://127.0.0.1:3000',
      success: resConnect => {
        console.log(resConnect)
      },
      fail: resConnectError => {
        console.log(resConnectError)
      }
    })
    ws.onMessage(msg => {
      // console.log(msg)
      const data = JSON.parse(msg.data)
      const list = this.data.list
      const lastId = list.length
      list.push({
        id: lastId,
        content: data.content,
        role: 'server'
      })
      this.setData({
        list,
        lastId
      })
    })
    ws.onClose(res => {
      console.log(res)
    })
    this.ws = ws
  },
  // 关闭WebSocket连接
  onUnload: function () {
    this.ws.close()
  },

  input: function (e) {
    this.message = e.detail.value
  },
  // 点击“发送”按钮时将message中的内容发送到服务器
  send: function () {
    // 判断发送内容是否为空
    if (!this.message) {
      wx.showToast({
        title: '消息不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.ws.send({
      data: this.message
    })
    const list = this.data.list
    const lastId = list.length
    list.push({
      id: lastId,
      content: this.message,
      role: 'me'
    })
    this.setData({
      list,
      lastId,
      content: ''
    })
    this.message = ''
  }
})