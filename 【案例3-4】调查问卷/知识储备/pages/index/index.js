// index.js
Page({
  data: { 
    value: '' 
  },
  onLoad: function () {
    this.setData({ value:'leaf' })
  },
  test: function () {
    console.log(this.data.value)
  }
})
