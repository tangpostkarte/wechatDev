// index.js
var timer = require('../../utils/timer.js')

var audioCtx = wx.createInnerAudioContext()
var rec = wx.getRecorderManager()

var tempFilePath = null
var onStopCallBack = null

rec.onStop(res => {
  tempFilePath = res.tempFilePath
  console.log('录音成功：' + tempFilePath)
  onStopCallBack && onStopCallBack(tempFilePath)
})

Page({
  data: {
    time: '00:00:00',	  // 录音时长
    state: 0,           // 录音状态，0表示停止，1表示开始，2表示暂停
  },
  rec: function () {
    switch (this.data.state) {
      case 0:
        rec.start()
        timer.onTimeUpdate(time => {
          this.setData({ time })
        })
        timer.start()
        this.setData({ time: '00:00:00', state: 1 })
        break
      case 1:
        rec.pause()
        timer.pause()
        this.setData({ state: 2 })
        break
      case 2:
        rec.resume()
        timer.start()
        this.setData({ state: 1 })
        break
    }
  },
  stop: function () {
    rec.stop()
    timer.reset()
    this.setData({ state: 0 })
  },
  play: function () {
    if (this.data.state > 0) {
      // 第1种情况，录音尚未完成
      onStopCallBack = tempFilePath => {
        onStopCallBack = null
        audioCtx.src = tempFilePath
        audioCtx.play()
        this.setData({ time: '播放录音' })
      }
      this.stop()
    } else if (tempFilePath) {
      // 第2种情况，录音已完成
      audioCtx.src = tempFilePath
      audioCtx.play()
      this.setData({ time: '播放录音' })
    } else {
      // 第3种情况，尚未录音
      this.setData({ time: '暂无录音' })
    }
  }
})
