<template>
	<div class="lunbo">
		<swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
	    <!-- slides -->
	   <!--  <swiper-slide v-for="(item,index) in backgroundUrl" v-bind:key="item.id" class="img-box">
	    	<img v-bind:src="item">
	    </swiper-slide> -->
	    <swiper-slide v-for="(item,index) in banners" v-bind:key="item.id" class="img-box">
	    	<img v-bind:src="item.picUrl" @click.stop.prevent="getmusic(item.url)">
	    </swiper-slide>

	    
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
  		</swiper>
	</div>
	
</template>

<script>
import bus from './bus.js'
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
			}
		}
	},
	methods:{
		//获取轮播图音乐图片和音乐url的方法
		getnewsong(){
			this.$http.get('http://120.79.162.149:3000/banner').then(res => {
				// console.log(res.bodyText)
				let bodyText = JSON.parse(res.bodyText);
				// console.log(bodyText.banners)
				this.banners = bodyText.banners;
				// console.log(this.banners)
			})
		},
		//获取音乐地址的方法
		getmusic(url,idx){
			//获取到的歌曲url不是我们想要的格式，我们只想获取里面的id
			//所以我们使用正则表达式过滤出id的数字
			var id;
			// console.log(id)
			if(!url){
				url = 'http://120.79.162.149:3000/music/url?id=' + idx;
				id = idx;
			}else{
				let patter = new RegExp(/\d+/g);
				url = patter.exec(url);
				id = url[0];
				url = 'http://120.79.162.149:3000/music/url?id=' + id;
			}
			
			// console.log(url);
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			this.$http.get(url).then(res => {
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				// this.playmusic(this.playurl);
				this.sendsongid();
				this.getdetail(id);
			})
		},
		// //播放音乐的方法
		// playmusic(url){
		// 	document.querySelector('audio').src = url;
		// },
		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id){
			let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			this.$http.get(url).then(res=>{
				// console.log(res.bodyText)
				this.detail = JSON.parse(res.bodyText);
				//此时detail中存放的有背景图和歌名
				this.detail = this.detail.songs[0];
				// this.detail
				//获取到音乐详情后，保存到store的musicdetail中
				this.abc(this.detail);
				//当开始播放音乐时，执行senddetail方法，将lunbo.vue中detail值发送到playfield.vue中，实现兄弟间的传值
				//senddetail()一定要在then回调函数里面调用，否则会出现第一次点击，playfield接收不到数据，第二次点击接收到第一次点击发送的数据
				this.senddetail();
			})
		},
		senddetail(){	
			this.$nextTick(function () {
				bus.$emit("getValue",this.detail);

			})
		},
		// 把歌曲id传到app.vue主页面，进行音乐播放
		sendsongid(){
			this.$nextTick(function () {
				bus.$emit("getsongid",this.playurl);
			})
		},
		//接收list.vue传过来的音乐id
		getmusicid(id){
			bus.$on('musicid',res => {
				
				//接收到id值后，调用getmusic方法，以获取播放音乐的url地址，再调用sendsongid把url发送到app.vue界面，app.vue调用音乐播放的playmusic方法，最后音乐将会播放
				if(res){
					console.log(res);
					this.getmusic('',res)
				}
				
			})
		},
		abc(detail){
			this.$store.commit('bcd',detail)
		}

	},
	mounted:function(){
		this.getnewsong();
		this.getmusicid();
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
