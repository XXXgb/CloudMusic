<template>
	<div class="user-play-box">
		<div class="user-top-nav">
			<div class="user-fanhui" @click="back">
				<img src="../../../assets/images/fanhui.png">
			</div>
      <span v-if="this.$route.query.name == 'myCollect'">我的收藏</span>
      <span v-if="this.$route.query.name == 'latelyPlay'">最近播放</span>
		</div>
		<div class="user-playall-box">
			<div class="user-playall"><img src="../../../assets/images/playall.png"></div>
			<div class="user-songall"><span>播放全部</span><span>(共{{myCollectLength}}首)</span></div>
		</div>
		<div class="user-songlist">
			<ul>
				<li v-for="(item,index) in songlist" @click="getmusic(item.songId)">
					<p>{{index+1}}</p>
					<div>
						<h3>{{item.songName}}</h3>
						<p>{{item.singerName}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { findCollect, getLatelyPlay } from '../../../api/user.js'
export default{
  	name: 'usertopnav',
    data(){
    	return {
    		songlist: [],
    		myCollectLength: 0
    	}
    },

    mounted:function(){
      if(this.$route.query.name == 'myCollect'){
        this.findMyCollect();
      }else if(this.$route.query.name == 'latelyPlay'){
        this.getLatelyPlay();
      }
    },

    methods:{

    	back(){
    		history.go(-1);
    	},

      //查询我的收藏
    	findMyCollect(){
    		let param = JSON.parse(window.sessionStorage.getItem('token'))._id;
    		findCollect(param).then(res => {
    			this.myCollectLength = res.data.length;
    			this.songlist = res.data;
    		}).catch( err => {
    		})
    	},


    	//查询最近播放音乐
    	getLatelyPlay(){
    		let param = JSON.parse(window.sessionStorage.getItem('token'))._id;
    		getLatelyPlay(param).then(res => {
    			this.myCollectLength = res.data.length;
    			this.songlist = res.data;
    		})
    	},


    	//获取音乐url
    	getmusic(idx){
    	}

    },

}
</script>

<style>
.user-play-box{
	width:100%;
	height:100%;
}
.user-top-nav{
	width: 100%;
	height: 44px;
	display: flex;
	align-items: center;
	z-index: 9999;
	background-color:#d44439;

}
.user-fanhui{
	width: 25px;
	height: 25px;
	margin-left: 10px;
}
.user-fanhui img{
	width: 100%;
	height: 100%;
}
.user-top-nav div:nth-child(1){
	margin-left: 5px;
	color: #f2f3f4;
}
.user-top-nav div:nth-child(2){
	width:100%;
	color: #f2f3f4;
	display: flex;
	justify-content: center;
}
.user-top-nav div:nth-child(2) span{
	flex: 1;
}
.user-top-nav  span:nth-child(1){
	margin-left: 10px;
  color: #fff;
}
.user-top-nav  span:nth-child(2){
	margin-right: 10px;
  color: #fff;
}
.user-playall-box{
	width:100%;
	height:40px;
	border-bottom: 1px solid #e4e4e4;
	display: flex;
	align-items: center;
}
.user-playall{
	width: 25px;
	height:25px;
	margin-left: 10px;
	margin-right: 5px;
}
.user-playall img{
	width:100%;
	height:100%;
}
.user-songlist{
	width: 100%;
	border-radius: 10px;
	background-color: #f2f3f4;
}
.user-songlist ul{
	width: 100%;
	padding: 0;
	margin: 0;
}
.user-songlist ul li{
	width: 100%;
	height: 60px;	
	display: flex;
	border-bottom: 1px solid #e4e4e4;
	flex-flow: row wrap;
	align-content: center;
}
.user-songlist ul li p:nth-child(1){
	width:50px;
	text-align: center;
  line-height: 60px;
}
.user-songlist ul li div:nth-child(2){
  width:80%;
	height:50px;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
.user-songlist ul li div:nth-child(2) h3{
	margin: 0;
	padding: 0;
	color: #2e3030;
	white-space: nowrap;
	font-size: 16px;
	font-weight: 400;
}
.user-songlist ul li div:nth-child(2) p{
	margin: 0;
	padding: 0;
	color: #757575;
	font-size: 12px;
	font-weight: 400;
}
</style>
