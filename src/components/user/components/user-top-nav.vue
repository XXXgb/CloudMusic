<template>
	<div class="user-play-box">
		<div class="user-top-nav">
			<div class="user-fanhui" @click="back">
				<img src="../../../assets/images/fanhui.png">
			</div>
			<div>
				<span @click="mycoollect">我的收藏</span>
				<span @click="recentplay">最近播放</span>
			</div>
		</div>
		<div class="user-playall-box">
			<div class="user-playall"><img src="../../../assets/images/playall.png"></div>
			<div class="user-songall"><span>播放全部</span><span>(共{{mycoollectLength}}首)</span></div>
		</div>
		<div class="user-songlist">
			<ul>
				<li v-for="(item,index) in songlist" @click="getmusic(item.id)">
					<p>{{index+1}}</p>
					<div>
						<h3>{{item.songname}}</h3>
						<p>{{item.singername}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default{
  	name: 'usertopnav',
    data(){
    	return {
    		songlist: [],
    		mycoollectLength: 0
    	}
    },
    methods:{
    	back(){
    		history.go(-1);
    	},
    	mycoollect(){
    		//计算我的收藏共有多少首
    		this.mycoollectLength = (JSON.parse(window.localStorage.getItem('mycoollect'))).length;
    		//把收藏的音乐取出来
    		this.songlist = JSON.parse(window.localStorage.getItem('mycoollect'));
    	},
    	recentplay(){
    		//计算最近播放列表共有多少首歌
    		this.mycoollectLength = (JSON.parse(window.localStorage.getItem('recentplaylist'))).length;
    		this.songlist = JSON.parse(window.localStorage.getItem('recentplaylist'));
    	},
    	//获取音乐url
    	getmusic(idx){
    		console.log(idx)
    	}
    },
    created:function(){
    	this.mycoollect();
    	
    }
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
	flex-flow: column wrap;
	justify-content: center;
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
.user-top-nav div:nth-child(2) span:nth-child(1){
	margin-left: 12%;
}
.user-top-nav div:nth-child(2) span:nth-child(2){
	margin-right: 12%;
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
	width:15%;
	text-align: center;
}
.user-songlist ul li div:nth-child(2){
	width:85%;
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
