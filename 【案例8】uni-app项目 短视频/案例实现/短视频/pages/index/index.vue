<template>
  <view>
    <MyTitle></MyTitle>
    <view class="nav_wrap">
      <scroll-view class="nav" scroll-x>
        <view @click="activeNav($event,index)" :class="['nav_item',index===currentIndexNav?'active':'']"
          :data-index="index" v-for="(item,index) in navList" :key="item.id">
          {{item.text}}
        </view>
      </scroll-view>
    </view>
    <view class="slides">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="(item,index) in  swiperList" :key="index">
          <image :src="item.imgSrc" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="video-wrap">
      <!-- 视频列表中的每一项 -->
      <view class="video-item" @click="goVideosDetail(item.id)" v-for="(item,index) in videosList" :key="item.id">
        <!-- 图片容器 -->
        <view class="video-img">
          <image :src="item.imgSrc" mode="widthFix"></image>
          <!-- 播放量 -->
          <view class="video-info">
            <!-- 播放量 -->
            <view class="play-count-wrap">
              <!-- 图标 -->
              <text class="fa fa-play-circle-o"></text>
              <!-- 数值 -->
              <text class="play-count">{{ item.playCount }}</text>
            </view>
            <!-- 评论量 -->
            <view class="comment-count-row">
              <!-- 图标 -->
              <text class="fa fa-commenting-o"></text>
              <!-- 数值 -->
              <text class="comment-count">{{ item.commentCount }}</text>
            </view>
          </view>
        </view>
        <!-- 标题 -->
        <view class="video-title">
          {{ item.desc }}
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import config from '../../common/config.js'
  export default {
    data() {
      return {
        navList: [],
        currentIndexNav: 0,
        swiperList: [],
        videosList: [],
      }
    },
    onLoad() {
      this.getNavList()
      this.getSwiperList()
      this.getVideosList()
    },
    methods: {
      getNavList() {
        uni.request({
          url: config.url + '/navList',
          success: res => {
            this.navList = res.data.data.navList
            console.log(this.navList) // 输出到控制台
          }
        })
      },
      activeNav(e) {
        this.currentIndexNav = e.target.dataset.index
      },
      getSwiperList() {
        uni.request({
          url: config.url + '/swiperList',
          success: res => {
            this.swiperList = res.data.data.swiperList
          }
        })
      },
      getVideosList() {
        uni.request({
          url: config.url + '/videosList',
          success: res => {
            this.videosList = res.data.data.videosList
          }
        })
      },
      goVideosDetail(id) {
        uni.navigateTo({
          url: '/pages/detail/detail?id=' + id
        })
      },

    }
  }
</script>

<style lang="scss">
  .nav {
    white-space: nowrap;
    padding: 5rpx 0;

    .nav_item {
      padding: 20rpx 45rpx;
      font-size: 30rpx;
      display: inline-block;
    }

    .active {
      border-bottom: 5rpx solid #87CEEB;
    }
  }

  /* #ifdef H5 */
  .nav ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    display: none;
  }

  /* #endif */

  .slides {
    margin: 10rpx 0;

    swiper {
      height: 220rpx;
    }

    image {
      width: 100%;
      height: 100%;
    }
  }

  .video-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5rpx;
  }

  .video-item {
    width: 48%;
    margin-bottom: 20rpx;
  }

  .video-img {
    position: relative;

    image {
      width: 100%;
      border-radius: 15rpx;
    }

    .video-info {
      position: absolute;
      bottom: 8rpx;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      background: rgba(0, 0, 0, 0.3);
    }

    .video-info text {
      margin-right: 5rpx;
      font-size: 24rpx;
      color: #efefef;
    }
  }

  .video-title {
    font-size: 28rpx;
    /* 将对象作为弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 显示的行数 */
    -webkit-line-clamp: 2;
    /* 从上到下垂直排列子元素 */
    -webkit-box-orient: vertical;
  }
</style>
