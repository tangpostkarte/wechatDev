// index.js
var welcome = require('../../utils/welcome.js')

Page({
  data: {
    name: '初始名字',
    age: 0
  },
  demo: function (e) {
    this.setData({
      name: e.target.dataset.name,
      age: e.target.dataset.age
    })
  },
  onLoad: function () {
    console.log(welcome.message)
  }
})
