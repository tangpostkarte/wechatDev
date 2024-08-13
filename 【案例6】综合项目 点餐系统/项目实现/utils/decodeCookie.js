module.exports = function (cookie) {
  var obj = {}
  cookie.split(',').forEach((item, index) => {
    item.split('; ').forEach((item, index) => {
      var arr = item.split('=')
      obj[arr[0]] = arr[1] !== undefined ? decodeURIComponent(arr[1]) : true
    })
  })
  return obj
}