// index.js
Page({
  data: {
    show: true,
    buttons: [{
        text: '取消'
      },
      {
        text: '确认'
      }
    ]
  },
  tapDialogButton: function (e) {
    console.log(e.detail)
    this.setData({
      show: false
    })
  }
})
