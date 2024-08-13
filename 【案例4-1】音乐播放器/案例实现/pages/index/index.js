// index.js

// 格式化时间
function formatTime(time) {
  var minute = Math.floor(time / 60) % 60;
  var second = Math.floor(time) % 60
  return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
}

Page({
  data: {
    item: 0,
    tab: 0,
    // 播放列表数组playlist
    playlist: [{
      id: 1,
      title: '祝你生日快乐',
      singer: '小丽',
      src: 'http://127.0.0.1:3000/1.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 2,
      title: '劳动最光荣',
      singer: '小朋',
      src: 'http://127.0.0.1:3000/2.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 3,
      title: '龙的传人',
      singer: '小华',
      src: 'http://127.0.0.1:3000/3.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 4,
      title: '小星星',
      singer: '小红',
      src: 'http://127.0.0.1:3000/4.mp3',
      coverImgUrl: '/images/cover.jpg'
    }],
    state: 'running',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cover.jpg',
    }
  },
  // 在页面初次渲染时，自动选择播放列表中的第1个曲目
  audioBam: null,
  sliderChangeLock: false,
  onReady: function () {
    this.audioBam = wx.getBackgroundAudioManager()
    // 默认选择第1曲
    this.setMusic(0)
    // 播放失败检测
    this.audioBam.onError(() => {
      console.log('播放失败：' + this.audioBam.src)
    })
    // 播放完成自动换下一曲，监听音频自然播放结束的事件
    this.audioBam.onEnded(() => {
      this.next()
    })
    // 监听音频播放进度更新事件，获取音乐状态信息
    var updateTime = 0 // 上次更新的时间
    this.audioBam.onTimeUpdate(() => {
      var currentTime = parseInt(this.audioBam.currentTime)
      if (!this.sliderChangeLock && currentTime !== updateTime) { // // 将更新频率限制在1秒1次
        updateTime = currentTime
        this.setData({
          'play.duration': formatTime(this.audioBam.duration || 0),
          'play.currentTime': formatTime(currentTime),
          'play.percent': currentTime / this.audioBam.duration * 100
        })
      }
    })
  },
  sliderChange: function (e) {
    var second = e.detail.value * this.audioBam.duration / 100
    this.audioBam.seek(second)
    setTimeout(() => {
      this.sliderChangeLock = false
    }, 1000)
  },
  sliderChanging: function (e) {
    var second = e.detail.value * this.audioBam.duration / 100
    this.sliderChangeLock = true
    this.setData({
      'play.currentTime': formatTime(second),
    })
  },
  // 设置当前播放的曲目
  setMusic: function (index) {
    var music = this.data.playlist[index]
    this.audioBam.src = music.src
    this.audioBam.title = music.title
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0,
      state: 'running' // 新增
    })
  },
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },
  play: function () {
    this.audioBam.play()
    this.setData({
      state: 'running'
    })
    console.log(this.data.state) // running
  },
  pause: function () {
    this.audioBam.pause()
    this.setData({
      state: 'paused'
    })
    console.log(this.data.state) // paused
  },
  // 点击播放下一曲的操作
  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(index)
    console.log(this.data.state)
    // if (this.data.state === 'running') {
      // this.play()
    // }
  },
  // 点击播放列表中的某一项时进行该曲目的播放
  change: function (e) {
    this.setMusic(e.currentTarget.dataset.index)
    // this.play()
  }
})

