<template>
	<div style="position: absolute;top: 44px;width: 100%;background-color: #f2f3f4;">
		<div>
			<span style="margin-left: 10px;font-weight: 600;font-size: 14px;margin-left: 10px;font-weight: 600;letter-spacing: 1px;">我的评论</span>
			<div class="hot-comments-box" v-for="(item,index) in myComments.result">
				<div style="width: 40px;height: 40px;margin: 10px;">
					<img src="../../../assets/images/109951162913202465.jpg">
				</div>
				<div class="hot-comments-box-content" style="position: relative;">
					<div style="display: flex;justify-content: space-between;margin: 10px 0 0 0 ;">
						<span style="color:  rgb(110, 95, 95);font-size: 14px;">{{myComments.nickName}}</span>
						<span @click="removeMyComments(item.songId,item.commentsTime)" style="color:  rgb(131, 105, 105);font-size: 14px;margin-right: 10px;">删除</span>
					</div>
					<div style="font-size: 10px;color: rgb(183, 150, 150);">{{ item.commentsTime | timeFormat}}</div>
					<div class="hot-comments-border" style="font-size: 16px;letter-spacing: 1px;color: #342525;margin-top: 5px;">{{item.commentsContent}}</div>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 5px;background-color: #e8e8e8;"></div>
		<div>
			<span style="margin-left: 10px;font-weight: 600;font-size: 14px;margin-left: 10px;font-weight: 600;letter-spacing: 1px;">精彩评论</span>
			<div class="hot-comments-box" v-for="(item,index) in hotComments">
				<div style="width: 40px;height: 40px;margin: 10px;">
					<img :src="item.user.avatarUrl">
				</div>
				<div class="hot-comments-box-content" style="position: relative;">
					<div style="display: flex;justify-content: space-between;margin: 10px 0 0 0 ;">
						<span style="color:  rgb(110, 95, 95);font-size: 14px;">{{item.user.nickname}}</span>
						<span style="color:  rgb(131, 105, 105);font-size: 14px;margin-right: 10px;">赞数{{item.likedCount}}</span>
					</div>
					<div style="font-size: 10px;color: rgb(183, 150, 150);">{{item.time | timeFormat}}</div>
					<div class="hot-comments-border" style="font-size: 14px;letter-spacing: 1px;color: #342525;margin: 5px 10px 10px 0;line-height: 18px;">{{item.content}}</div>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 5px;background-color: #e8e8e8;"></div>
		<div>
			<span style="margin-left: 10px;font-weight: 600;font-size: 14px;margin-left: 10px;font-weight: 600;letter-spacing: 1px;">最新评论({{total}})</span>
			<div class="hot-comments-box" v-for="(item,index) in newComments">
				<div style="width: 40px;height: 40px;margin: 10px;">
					<img :src="item.user.avatarUrl">
				</div>
				<div class="hot-comments-box-content" style="position: relative;">
					<div style="display: flex;justify-content: space-between;margin: 10px 0 0 0 ;">
						<span style="color:  rgb(110, 95, 95);font-size: 14px;">{{item.user.nickname}}</span>
						<span style="color:  rgb(131, 105, 105);font-size: 14px;margin-right: 10px;">赞数{{item.likedCount}}</span>
					</div>
					<div style="font-size: 10px;color: rgb(183, 150, 150);">{{item.time | timeFormat}}</div>
					<div class="hot-comments-border" style="font-size: 14px;letter-spacing: 1px;color: #342525;margin: 5px 10px 10px 0;line-height: 18px;">{{item.content}}</div>
				</div>
			</div>
		</div>
		<div style="position: sticky;bottom:0px;background-color: #f2f3f4;opacity: 1;height: 40px;display:flex;align-items:center;border-top:1px solid rgb(223, 205, 205);padding:0 10px;justify-content:space-between;">
			<textarea style="height:20px;width:65%;line-height: 20px;resize:none;border-radius:5px;background-color: #f2f3f4;border: none;font-size:12px;" placeholder="这一次也许就是你上热评了" v-model="commentValue" maxlength="200"></textarea>
			<span style="color:#ccc;font-size:14px;" @click="addMyComments()">发送</span>
		</div>
	</div>
</template>

<script>
import {commentsDetail} from '../../../api/comments.js'
import {getMyComments,addMyComments,removeMyComments} from '../../../api/user.js'
export default{
	name: 'hotComments',
	data(){
		return {
			hotComments:[],
			newComments:[],
			total: '',
			offset: 0,
			loaded: false,
			commentValue: '',
			myComments: ''
		}
	},
	filters:{
		//格式化时间戳
		timeFormat:function(time){
			function formatDate(flag,data) { 
				let year=data.getFullYear();  //取得4位数的年份
				let month=data.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
				let date=data.getDate();      //返回日期月份中的天数（1到31）
				let hour=data.getHours();     //返回日期中的小时数（0到23）
				let minute=data.getMinutes(); //返回日期中的分钟数（0到59）
				//let second=data.getSeconds(); //返回日期中的秒数（0到59）
				if(hour >= 0 && hour <= 9){
					hour = '0' + hour;
				}
				if(minute >= 0 && minute <= 9){
					minute = '0' + minute;
				}
				//if(second >= 0 && second <= 9){
				//	second = '0' + second;
				//}
				if(flag == 0){
					return hour+":"+minute; 
				}else if(flag ==1){
					return year+"年"+month+"月"+date+"日"+" "+hour+":"+minute; 
				}
			}
			//计算时间戳的差值
			let now = new Date().getTime(); //当前的时间戳
			let differenceValue = parseInt((now - time) / 1000);  //当前时间戳减去评论时间的时间戳除以1000再取整，得出评论距离今天的时长
			if(differenceValue < 3600){
				return parseInt(differenceValue/60) + '分钟前'
			}else if(differenceValue > 3600 && differenceValue < 86400){
				return formatDate(0,new Date(time));
			}else if(differenceValue > 86400){
				return formatDate(1,new Date(time));
			}
			
		}
	},
	mounted:function(){
		//每次刷新或进入页面，将最新评论的条数统一为20条
		this.offset = 0;
		this.getComments();
		//添加页码滚动监听，实现页面触底加载更多
		window.addEventListener('scroll',this.more)
		this.getMyComments();
	},
	methods:{
		//查询个人评论
		getMyComments(){
			let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
			let songId = JSON.parse(window.sessionStorage.getItem('musicDetail')).songId;
			getMyComments({_id,songId}).then( res => {
				console.log(res)
				this.myComments = res.data;
			})
		},
		//添加个人评论
		addMyComments(){
			let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
			let songId = JSON.parse(window.sessionStorage.getItem('musicDetail')).songId;
			let songName = JSON.parse(window.sessionStorage.getItem('musicDetail')).songName;
			let singerName = JSON.parse(window.sessionStorage.getItem('musicDetail')).singerName;
			let commentsTime = new Date().getTime();
			let commentsContent = this.commentValue.trim();
			if(commentsContent){
				addMyComments({_id,songId,songName,singerName,commentsTime,commentsContent})
				.then( res => {
					if(res.data.err === 0){
						this.commentValue = '';
						this.getMyComments();
					}
				})
			}else{
				alert('请输入评论内容！')
			}
			
		},
		//删除个人评论
		removeMyComments(songId,commentsTime){
			console.log('111')
			let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
			removeMyComments({_id,songId,commentsTime}).then( res => {
				console.log(res)
				this.getMyComments();
			})
		},
		abc(){
			console.log('asdfadsfdsf')
		},
		//获取精彩评论和最新评论
		getComments(){
			//document.body.parentNode.style.overflow = "hidden";
			let songId = JSON.parse(window.sessionStorage.getItem('musicDetail')).songId;
			//获取歌曲评论
			commentsDetail(songId,this.offset).then( res => {
				console.log(res)
				this.total = res.data.total;
				if(res.data.hotComments){
					this.hotComments = res.data.hotComments;
				}
				this.newComments.push(...res.data.comments);
			//	document.body.parentNode.style.overflow = "auto";
				this.loaded = false;
				console.log('修改了loaded：'+this.loaded)
			}).catch( err => {

			})
		},
		more(){
			if(this.loaded){
				console.log('loaded:'+this.loaded)
				return
			}else{
				console.log('loaded:'+this.loaded)
				let that = this;
				let scrollTop = document.documentElement.scrollTop;  //文档高度
				let offsetHeight = document.documentElement.offsetHeight;  //可视化窗口高度
				let scrollHeight = document.documentElement.scrollHeight;  //滚动条滚动高度
				//限流
				this.loaded = true;
				if(scrollHeight<=scrollTop+offsetHeight+20){
					//触底加载多20条评论
					console.log('大于了111')
					this.offset += 20;  //每次触底加载下一页
					console.log('offset:'+this.offset)
					this.getComments();
				}else{
					this.loaded = false;
				}
			}
			
		}
	},
}
</script>

<style>
.hot-comments-box{
	width: 100%;
	min-height: 80px;
	display: flex;
	box-sizing: border-box;
}
.hot-comments-box img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.hot-comments-box-content{
	width: calc(100% - 60px);
}

input{
	outline: none;
}
</style>
