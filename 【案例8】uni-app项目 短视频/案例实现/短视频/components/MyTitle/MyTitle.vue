<template>
  <view class="my-title">
    <!-- logo -->
    <navigator class="logo">
      <image class="logo-img" src="../../static/logo.png" />
    </navigator>
    <!-- 搜索框 -->
    <view class="search-icon">
      <image src="../../static/search.jpg" />
    </view>
    <!-- 用户头像 -->
    <view class="user-icon">
      <image src="../../static/user.jpg" />
    </view>
    <!-- 下载APP按钮 -->
    <view class="down-app">
      下载APP
    </view>
  </view>
</template>

<script>
  export default {
    name: "MyTitle",
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
.my-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10rpx;
  background-color: #fff;
  height: 70rpx;
  .logo {
    flex: 7;
    .logo-img {
      width: 180rpx;
      height: 60rpx;
    }
  }
  .search-icon {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 60rpx;
      height: 44rpx;
    }
  }
  .user-icon {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 54rpx;
      height: 60rpx;
    }
  }
  .down-app {
    flex: 3;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #87CEEB;
    color: #fff;
    border-radius: 10rpx;
    padding: 10rpx;
  }
}

</style>
