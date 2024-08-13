// index.js
Page({
  data: {
    activeIndex: 0,
    tabs: [
      '正在热映', '搜索', '分类'
    ],
    contents: [{
      title: '英雄儿女',
      article: '该影片讲述了多位英雄人物的故事，其中有浴血奋战的志愿军英模。',
      poster: '/images/1.jpg',
    }, {
      title: '大国工匠',
      article: '这部影片讲述了不同岗位劳动者用自己的灵巧双手，匠心筑梦的故事。',
      poster: '/images/2.jpg',
    }, {
      title: '我和我的祖国',
      article: '该影片取材新中国成立以来经历的无数个历史性经典瞬间，讲述普通人与国家之间息息相关密不可分的动人故事。',
      poster: '/images/3.jpg',
    }],
    inputShowed: false,
    inputVal: '',
    grids: [
      '爱情', '剧情', '喜剧', '家庭', '动画', '文艺', '都市', '动作', '科幻'
    ]
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    })
  },
  hideInput: function () {
    this.setData({
      inputVal: '',
      inputShowed: false
    })
  },
  clearInput() {
    this.setData({
      inputVal: ''
    })
  },
  

})