<template>
	<div class="lunbo">
		<swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
	    <swiper-slide v-for="(item,index) in banners" v-bind:key="item.id" class="img-box">
	    	<img v-bind:src="item.picUrl" @click.stop.prevent="getmusic(item.targetId,index)">
	    </swiper-slide>
	    <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
	</div>
	
</template>

<script>
import bus from './bus.js'
import {lunbo} from '../../../api/lunbo.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import { getSlideshow } from '../../../api/user.js'
import {addSelfLatelyPlay} from '../../../api/user.js'
export default{
	name: 'lunbo',
	data(){
		return {
			// newsongurl: [],
			// backgroundUrl: [],
			banners: [],
			detail: [],
			playurl: '',
			a:'我是A',
			swiperOption:{
				pagination: '.swiper-pagination',
				loop:true,
				autoplay:2000
			},
			flag: false,
			songlistdetail: []
		}
	},

  mounted:function(){
    this.getnewsong();
  },

	methods:{
		//轮播图插件的回调函数
		callback(res){

		},


		//获取轮播图音乐图片和音乐url
		getnewsong(){
			getSlideshow().then( data => {
				this.banners = data.data;
			})
		},


		//获取音乐地址的方法
		getmusic(idx,index){
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.getdetail(idx,this.playurl,index);
			})
		},


		//播放音乐的方法
	    playmusic(idx,url,index){
	      if(url==null){
	      	let musicdetail = {"name": "","ar": [{"name": ""}],"al": {"picUrl": ""}}
	      	this.$store.commit('bcd',musicdetail)
	      	alert('该音乐暂无版权，无法播放！')
	      }else{
          this.flag = true;
          document.querySelector('audio').src = url;
          //添加到最近播放列表
          let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
          let songId = this.$store.state.musicdetail.id;
          let songName = this.$store.state.musicdetail.al.name;
          let singerName = this.$store.state.musicdetail.ar[0].name;
          let addTime = new Date().getTime();
          addSelfLatelyPlay({_id,songId,songName,singerName,addTime})
            .then( res => {
            })
          this.$router.push({
            path: '/play'
          })
	      }
		},


		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id,url2,index){
			musicdetail(id).then(res=>{
				this.detail = res.data.songs[0];
				console.log(this.detail)
				this.abc(this.detail,id,url2,index);
			})
		},


		abc(detail,id,url,index){
			let that = this;
			let promise = new Promise(function(resolve,reject){
					resolve(that.$store.commit('bcd',detail))
				})
				promise.then(res => {
					that.playmusic(id,url,index);
				});
			
		},
	},

}
</script>
<style>
.lunbo{
	width: 100%;
	height: 100%;
	padding: 2% 5% 0 5%;
	background-color: #d44439;
	clear: both;
	float: left;
}
.swiper-container{
	width: 100%;
	height: 100%;
	border-radius: 2%!important;
	overflow: hidden;
	float: left;
}
.img-box{
	width:100%;
	height: 100%;
}
.img-box img{
	width: 100%;
	height: 100%;
	border-radius: 2%!important;
}
</style>
