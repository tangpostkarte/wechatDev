<template>
	<view>
		<view class="top">
			<input type="text" placeholder="请输入待办事项" v-model="value">
			<view class="createButton" @click="handleClick">添加</view>
		</view>
		<view class="bottom">
			<view class="title">待办事项</view>
			<view v-for="(item, index) in showList" :key="item.id">
				<view v-if="item.status === 'todo'" class="doing">
					<checkbox v-on:click="doingHandle(item.id, index)" />
					{{ item.value }}
				</view>
			</view>
			<view class="title">已办事项</view>
			<view v-for="(item, index) in showList" :key="item.id">
				<view v-if="item.status === 'finished'" class="done">
					<checkbox v-on:click="doneHandle(item.id, index)" checked="true" />
					<view class="conent">
						{{ item.value }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showList: [],
				value: '',
				status: ''
			}
		},
		methods: {
			handleClick() {
				this.showList.push({
					value: this.value,
					status: 'todo', // 表示待办事项
					id: new Date().getTime()
				})
				console.log(this.showList)
				this.value = ''
			},
			doingHandle(id, index) {
				const item = this.showList.find((item) => item.id === id)
				item.status = 'finished'
			},
			doneHandle(id, index) {
				const item = this.showList.find((item) => item.id === id)
				item.status = 'todo'
			}
		}
	}
</script>

<style>
	/* 顶部区域 */
	.top {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 0 15rpx 0;
		border-bottom: 1px dashed lightgray;
	}

	.top input {
		width: 500rpx;
		margin-left: 20rpx;
	}

	.top .createButton {
		width: 100rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1rpx solid gray;
		border-radius: 50rpx;
		margin-right: 20rpx;
	}
/* 底部区域 */
	.bottom {
		margin: 30rpx;
	}

	.bottom .title {
		margin-top: 30rpx;
		font-weight: bold;
	}

	.bottom .done,
	.bottom .doing {
		width: 100%;
		height: 70rpx;
		background-color: #EDEDED;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.conent {
		text-decoration: line-through;
	}

	checkbox {
		margin: 0 15rpx 0 15rpx;
	}
</style>
