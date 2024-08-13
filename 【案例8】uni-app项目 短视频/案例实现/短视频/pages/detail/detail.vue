<template>
  <view>
    <MyTitle></MyTitle>
    <!-- 视频详情 -->
    <view class="video-info" v-if="videoInfo">
      <!-- 视频 -->
      <video :src="videoInfo.videoSrc" controls class="video"></video>
      <!-- 视频标题 -->
      <view class="video-title">
        <text>{{ videoInfo.videoTitle }}</text>
        <text class="fa fa-angle-down"></text>
      </view>
      <!-- 视频详细信息  -->
      <view class="video-detail">
        <!-- 作者 -->
        <text class="author">{{ videoInfo.author }}</text>
        <!-- 播放量 -->
        <text class="play-count">{{ videoInfo.playCount }}</text>
        <!-- 评论量 -->
        <text class="comment-count">{{ videoInfo.commentCount }}弹幕</text>
        <!-- 时间 -->
        <text class="date">时间：{{ videoInfo.date }}</text>
      </view>
    </view>

    <!-- 推荐视频 -->
    <view class="other-list">
      <view v-for="item in othersList" :key="item.id" class="item_other">
        <!-- 图片容器 -->
        <view class="other-img-wrap">
          <image :src="item.imgSrc" mode="widthFix"></image>
        </view>
        <!-- 视频详情 -->
        <view class="other-info">
          <!-- 标题 -->
          <view class="other-title">{{ item.title }}</view>
          <!-- 播放量 -->
          <view class="other-detail">
            <!-- 播放量 -->
            <text class="play-count"> {{ item.playMsg }}次观看 </text>
            <!-- 评论 -->
            <text class="comment-count">{{ item.commentCount }}条评论</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论列表 -->
    <view class="comment-wrap">
      <view class="comment-title">
        评论 ({{ commentData.commentTotalCount }} )
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="(item, index) in commentData.commentList" :key="index">
          <!-- 左侧用户 -->
          <view class="comment_user">
            <image :src="item.userIconSrc" mode="widthFix" class="comment_user_image" />
          </view>
          <!-- 右侧评论 -->
          <view class="comment-info">
            <view class="comment-detail">
              <text class="author">{{ item.username }}</text>
              <text class="date">{{ item.commentDate }}</text>
            </view>
            <view class="comment-content">
              {{ item.commentInfo }}
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>


<script>
  import config from "../../common/config.js"

  export default {
    data() {
      return {
        // 视频详情
        videoInfo: null,
        othersList: [],
        commentData: [],
      }
    },
    onLoad(options) {
      let videoId = options.id
      this.getCurrentVideo(videoId)
      this.getOthersList()
      this.getCommentList(videoId)
    },
    methods: {
      // 页面加载时获取视频信息
      getCurrentVideo(videoId) {
        uni.request({
          url: config.url + '/videoDetail?id=' + videoId,
          success: res => {
						console.log(res.data.data)
					
            if (res.data.code === 0) {
              this.videoInfo = res.data.data.videoInfo
            }
          }
        })
      },
      getOthersList() {
        uni.request({
          url: config.url + '/othersList',
          success: res => {
            if (res.data.code === 0) {
              this.othersList = res.data.data.othersList
            }
          }
        })
      },
      getCommentList(videoId) {
        uni.request({
          url: config.url + '/commentsList?id=' + videoId,
          success: res => {
            if (res.data.code === 0) {
              this.commentData = res.data.data.commentData;
            }
          }
        })
      },

    }
  }
</script>

<style lang="scss">
  .video-info {
    margin-top: 10rpx;

    .video {
      width: 100%;
    }

    .video-title {
      display: flex;
      justify-content: space-between;
      font-size: 35rpx;
    }

    .video-detail {
      margin-top: 5rpx;
      font-size: 28rpx;

      text {
        margin-left: 15rpx;
      }

      .author {
        color: #000;
      }
    }
  }


  .other-list {
    margin-top: 10rpx;

    .item_other {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .other-img-wrap {
        width: 38%;
        display: flex;
        justify-content: center;
        align-items: center;

        .other-img-wrap image {
          width: 90%;
          border-radius: 15rpx;
        }
      }

      .other-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .other-title {
          font-size: 30rpx;
          color: #e06f93;
        }

        .other-detail {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }

  .other-list {
    margin-top: 10rpx;

    .item_other {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .other-img-wrap {
        width: 38%;
        display: flex;
        justify-content: center;
        align-items: center;

        .other-img-wrap image {
          width: 90%;
          border-radius: 15rpx;
        }
      }

      .other-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .other-title {
          font-size: 30rpx;
          color: #e06f93;
        }

        .other-detail {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
  
  .comment-wrap {
    margin-top: 10rpx;
    .comment-title {
      padding: 10rpx;
      font-size: 28rpx;
    }
    .comment-list {
      .comment-item {
        margin-bottom: 10rpx;
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #666;
      }
      .comment_user {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .comment_user_image {
          width: 60%;
          border-radius: 50%;
        }
      }
      .comment-info {
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .comment-detail {
          display: flex;
          justify-content: space-between;
          .comment-detail .author {
            font-size: 28rpx;
            color: #000;
          }
          .comment-detail .date {
            color: #666;
            font-size: 24rpx;
          }
        }
      }
      .comment-content {
        font-size: 28rpx;
        color: #000;
      }
    }
  }

</style>
