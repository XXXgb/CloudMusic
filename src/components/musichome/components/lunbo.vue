<template>
	<div class="lunbo">
		<swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
	    <!-- slides -->
	   <!--  <swiper-slide v-for="(item,index) in backgroundUrl" v-bind:key="item.id" class="img-box">
	    	<img v-bind:src="item">
	    </swiper-slide> -->
	    <swiper-slide v-for="(item,index) in banners" v-bind:key="item.id" class="img-box">
	    	<img v-bind:src="item.picUrl" @click.stop.prevent="getmusic(item.targetId,index)">
	    </swiper-slide>

	    
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
  		</swiper>
	</div>
	
</template>

<script>
import bus from './bus.js'
import {lunbo} from '../../../api/lunbo.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import {latelyplay} from '../../../common/common.js'
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
	methods:{
		//轮播图插件的回调函数
		callback(res){
			console.log(res)
		},
		//获取轮播图音乐图片和音乐url的方法
		getnewsong(){
			lunbo().then(res => {
				// console.log(res.bodyText)
				// console.log(bodyText.banners)
				this.banners = res.data.banners;
				// console.log(this.banners)
			})
		},
		//获取音乐地址的方法
		getmusic(idx,index){
			//获取到的歌曲url不是我们想要的格式，我们只想获取里面的id
			//let url;
			//url = 'http://120.79.162.149:3000/music/url?id=' + idx;
			// console.log(url);
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				console.log(res)
				this.playurl = res.data.data[0].url;
				this.getdetail(idx,this.playurl,index);
				
				// this.playmusic(this.playurl);
				// this.sendsongid();
				// this.getdetail(id);
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
	      	//当进入播放页后，把播放的音乐添加进最近播放列表中
	      let recentplaylist = JSON.parse(window.localStorage.getItem('recentplaylist'));
	      let songname = this.$store.state.musicdetail.name;
	      let singername= this.$store.state.musicdetail.ar[0].name;
	      let id = idx;
	      let arr = [{'songname': songname , 'singername': singername , 'id': id}];
	      let arr1 = {'songname': songname , 'singername': singername , 'id': id}
	      console.log(recentplaylist);

	      // 如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
	      // 否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
	      latelyplay(recentplaylist,id,arr,arr1)

	      this.$router.push({
	        path: '/play'
	      })
	      }
	      
		},
		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id,url2,index){
			//let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			musicdetail(id).then(res=>{
				// console.log(res.bodyText)
				//this.detail = JSON.parse(res.bodyText);
				//此时detail中存放的有背景图和歌名
				console.log(res)
				this.detail = res.data.songs[0];
				// this.detail
				//获取到音乐详情后，保存到store的musicdetail中
				this.abc(this.detail,id,url2,index);
				//当开始播放音乐时，执行senddetail方法，将lunbo.vue中detail值发送到playfield.vue中，实现兄弟间的传值
				//senddetail()一定要在then回调函数里面调用，否则会出现第一次点击，playfield接收不到数据，第二次点击接收到第一次点击发送的数据	

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
	mounted:function(){
		this.getnewsong();
	}
}
</script>
<style>
.lunbo{
	width: 90%;
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
