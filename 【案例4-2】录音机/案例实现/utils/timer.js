var sec = 0
var timer = null
var pause = false
var callback = null

function formatTime(value) {
  var h = parseInt(value / 60 / 60 % 24)
  h = h < 10 ? '0' + h : h
  var m = parseInt(value / 60 % 60)
  m = m < 10 ? '0' + m : m
  var s = parseInt(value % 60)
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}

function createTimer() {
  return setInterval(() => {
    if (!pause) {
      ++sec
    }
    callback && callback(formatTime(sec))
  }, 1000)
}

module.exports = {
  onTimeUpdate(cb) {
    callback = cb
  },
  start() {
    if (pause) {
      pause = false
    }
    if (!timer) {
      timer = createTimer()
    }
  },
  pause() {
    pause = true
  },
  reset() {
    sec = 0
    pause = false
    clearInterval(timer)
    timer = null
  }
}