// pages/list/list.js
// 引入购物车动画模块
const shopcartAnimate = require('../../utils/shopcartAnimate.js')
const app = getApp()
const fetch = app.fetch
const categoryPosition = [] // 右列表各分类高度数组
Page({
  data: {
    foodList: [],
    promotion: {},
    activeIndex: 0,
    tapIndex: 0,
    cartPrice: 0, // 购物车中商品的总价格
    cartNumber: 0, // 购物车中商品的总数量
    cartList: {},  // 保存购物车数据
    showCart: false,
  },
  disableNextScroll: false,
  shopcartAnimate: null,
  onLoad: function () {
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('/food/list').then(data => {
      wx.hideLoading()
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0]
      }, () => {
        var query = wx.createSelectorQuery()
        var top = 0
        var height = 0
        query.select('.food').boundingClientRect(rect => {
          top = rect.top
          height = rect.height
        })
        query.selectAll('.food-category').boundingClientRect(res => {
          res.forEach(rect => {
            categoryPosition.push(rect.top - top - height / 3)
          })
        })
        query.exec()
      })
    }, () => {
      this.onLoad()
    })
    this.shopcartAnimate = shopcartAnimate('.operate-shopcart-icon', this)
  },

  tapCategory: function (e) {
    this.disableNextScroll = true
    var index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      tapIndex: index
    })
  },
  onFoodScroll: function (e) {
    if (this.disableNextScroll) {
      this.disableNextScroll = false
      return
    }
    var scrollTop = e.detail.scrollTop
    var activeIndex = 0
    categoryPosition.forEach((item, i) => {
      if (scrollTop >= item) {
        activeIndex = i
      }
    })
    if (activeIndex !== this.data.activeIndex) {
      this.setData({ activeIndex })
    }
  },
  // 加入购物车
  addToCart: function (e) {
    const index = e.currentTarget.dataset.index
    const category_index = e.currentTarget.dataset.category_index
    const food = this.data.foodList[category_index].food[index]
    const cartList = this.data.cartList
    if (cartList[index]) {
      ++cartList[index].number
    } else {
      cartList[index] = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1
      }
    }
    this.setData({
      cartList,
      cartPrice: this.data.cartPrice + cartList[index].price,
      cartNumber: this.data.cartNumber + 1
    })
    this.shopcartAnimate.start(e)
  },
  showCartList: function () {
    if (this.data.cartNumber > 0) {
      this.setData({
        showCart: !this.data.showCart
      })
    }
  },
  cartNumberAdd: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    ++cartList[id].number
    this.setData({
      cartList: cartList,
      cartNumber: ++this.data.cartNumber,
      cartPrice: this.data.cartPrice + cartList[id].price
    })
  },
  cartNumberDec: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    if (cartList[id]) {
      var price = cartList[id].price
      if (cartList[id].number > 1) {
        --cartList[id].number
      } else {
        delete cartList[id]
      }
      this.setData({
        cartList: cartList,
        cartNumber: --this.data.cartNumber,
        cartPrice: this.data.cartPrice - price
      })
      if (this.data.cartNumber <= 0) {
        this.setData({
          showCart: false
        })
      }
    }
  },
  // 清空购物车
  cartClear: function() {
    this.setData({
      cartList: {},
      cartNumber: 0,
      cartPrice: 0,
      showCart: false
    })
  },
  // 实现跳转到订单确认页
  order: function() {
    if (this.data.cartNumber === 0) {
      return
    }
    wx.showLoading({
      title: '正在生成订单'
    })
    fetch('/food/order', {
      order: this.data.cartList
    }, 'POST').then(data => {
      wx.navigateTo({
        url: '/pages/order/checkout/checkout?order_id=' + data.order_id
      })
    }, () => {
      this.order()
    })
  }
     
})