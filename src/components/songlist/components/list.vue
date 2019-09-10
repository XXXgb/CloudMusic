<template>
	<div class="list-box2">
		<div class="list-father">
			<div class="list-bg" :style="note">
				<div class="list-songlistname">
				<h2>{{$store.state.songlistdetail.result.name}}</h2>
			</div>
			</div>
		
			<div class="list-songname">
				<ul>
					<li>
						<i>
							<img src="../../../assets/images/playall.png">
						</i>
						<span>播放全部</span>
						<span>(共</span>
						<span v-text="songlistdetail.result.tracks.length"></span>
						<span>首)</span>
					</li>
					
						<!-- <li v-for="(items,index2) in songlistdetail.result.tracks" v-bind:key="items.id" @click="sendid(items.id)"> -->
						<li v-for="(items,index2) in songlistdetail.result.tracks" v-bind:key="items.id" @click="getmusic(items.id)">
							<p>{{index2+1}}</p>
							<div>
								<h3>{{items.album.name}}</h3>
								<p>{{items.artists[0].name}}</p>
							</div>
						</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import bus from './../../musichome/components/bus.js'
export default{
	name: 'listbody',
	data(){
		return {
			songlistdetail: [],
			id: '',
			note:{
				backgroundImage: ''
				
			},
			playurl: '',
			detail: [],
		}
	},
	methods:{
		// 3.list.vue接收recommendsonglist.vue发送过来的数据
		songlistresult(){
			console.log(this.$store.state.songlistdetail)
			this.songlistdetail = this.$store.state.songlistdetail;
			this.note.backgroundImage = 'url(' + this.$store.state.songlistdetail.result.coverImgUrl + ')';
			// bus.$on('sendsonglistdetail',res=>{
   //      		// console.log(res)
   //      		//将res结果放到songlistdetail中
   //      		this.songlistdetail = this.$store.state.songlistdetail;
   //      		//修改背景图
   //      		this.note.backgroundImage = 'url(' + this.$store.state.songlistdetail.result.coverImgUrl + ')';
   //      		// console.log(this.note);

   //    		})
		},
		//把音乐的id发送到lunbo.vue中去
		// sendid(id){
		// 	this.id = id;
		// 	this.$nextTick(function () {
		// 		bus.$emit("musicid",this.id);
		// 	})
		// },
		//获取音乐地址的方法
		getmusic(idx){
			//获取到的歌曲url不是我们想要的格式，我们只想获取里面的id
			let url;
			url = 'http://120.79.162.149:3000/music/url?id=' + idx;
			// console.log(url);
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			this.$http.get(url).then(res => {
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.getdetail(idx);
				this.playmusic(this.playurl);
				// this.playmusic(this.playurl);
				// this.sendsongid();
				// this.getdetail(id);
			})
		},
		//播放音乐的方法
	    playmusic(url){
	      this.flag = true;
	      document.querySelector('audio').src = url;
	      this.$router.push({
	        path: '/play'
	      })
		},
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
			})
		},
		abc(detail){
			this.$store.commit('bcd',detail)
		}
	},
		
	mounted:function(){
    	this.songlistresult();

  	},
}
</script>

<style>
.list-box2{
	margin: 0;
}
.list-father{
	position: relative;
}
.list-bg{
	background-image: url(../.././../assets/images/109951162913202465.jpg);
	background-size: 100% 300px;
	width:100%;
	height: 300px;
	position: relative;
	top: 0;
	margin: 0;
	padding: 0;
}
.list-songlistname{
	color: #fff;
	position: absolute;
	bottom: 25px;
	left: 10px;
}
.list-songlistname h2{
	font-size: 16px;

}
.list-songlistname p{
	font-size: 11px;
}
.list-songname{
	width: 100%;
	position: absolute;
	top: 280px;
	border-radius: 10px;
	background-color: #f2f3f4;
}
.list-songname ul{
	width: 100%;
	padding: 0;
	margin: 0;
}
/*.list-songname ul li:nth-child(1){
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	overflow: hidden;
}*/
.list-songname ul li{
	width: 100%;
	height: 60px;	
	display: flex;
	border-bottom: 1px solid #e4e4e4;
	flex-flow: row wrap;
	align-content: center;
}
.list-songname ul li i{
	width:30px;
	height:30px;
	margin: 0 5px 0 10px;
}
.list-songname ul li i img{
	width: 100%;
	height:100%;
}
.list-songname ul li span{
	line-height: 30px;
}
.list-songname ul li span:nth-child(1){
	margin-left: 30px;
	margin-right: 5px;
}
.list-songname ul li p:nth-child(1){
	width:15%;
	text-align: center;
}
.list-songname ul li div:nth-child(2){
	width:85%;
	height:50px;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
.list-songname ul li div:nth-child(2) h3{
	margin: 0;
	padding: 0;
	color: #2e3030;
	white-space: nowrap;
	font-size: 16px;
	font-weight: 400;
}
.list-songname ul li div:nth-child(2) p{
	margin: 0;
	padding: 0;
	color: #757575;
	font-size: 12px;
	font-weight: 400;
}
a{
	text-decoration: none;
	color:#2e3030;
}
</style>
