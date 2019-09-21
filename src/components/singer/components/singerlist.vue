<template>
	<div class="list-box2">
		<div class="list-father">
			<div class="list-loading" v-if="!loadingFlag"> 
				<img src="../../../assets/images/loading.gif"/>
				<span>加载中…</span>
			</div>
			<div class="list-songname"  v-if="loadingFlag">
				<ul>
					<li>
						<i>
							<img src="../../../assets/images/playall.png">
						</i>
						<span>播放全部</span>
						<span>(共</span>
						<span v-text="songlistdetail.length"></span>
						<span>首)</span>
					</li>
					<li v-for="(items,index) in songlistdetail" @click="getmusic(items.id,index)">
						<p>{{index+1}}</p>
						<div>
							<h3>{{items.name}}</h3>
							<p>{{items.ar[0].name}}</p>
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
	name: 'singerlist',
	data(){
		return {
			songlistdetail: [],
			id: '',
			note:{
				backgroundImage: ''
				
			},
			playurl: '',
			detail: [],
			loadingFlag: false
		}
	},
	methods:{
		// 3.list.vue接收recommendsonglist.vue发送过来的数据
		
		//获取音乐地址的方法
		getmusic(idx,index){
			//获取到的歌曲url不是我们想要的格式，我们只想获取里面的id
			console.log(idx)
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
				this.playmusic(this.playurl,index);
				// this.playmusic(this.playurl);
				// this.sendsongid();
				// this.getdetail(id);
			})
		},
		//播放音乐的方法
	    playmusic(url,index){
	      
	      if(url==null){
	      	alert('该音乐暂无版权，无法播放！')
	      }else{
	      this.flag = true;
	      document.querySelector('audio').src = url;
	      	//当进入播放页后，把播放的音乐添加进最近播放列表中
	      let recentplaylist = JSON.parse(window.localStorage.getItem('recentplaylist'));
	      let songname = this.songlistdetail[index].name;
	      let singername= this.songlistdetail[index].ar[0].name;
	      let id = this.songlistdetail[index].id;
	      let arr = [{'songname': songname , 'singername': singername , 'id': id}];
	      let arr1 = {'songname': songname , 'singername': singername , 'id': id}
	      console.log(recentplaylist);

	      // 如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
	      if(recentplaylist){
	      	let recentplaylistFlag = recentplaylist.findIndex((item,inex) => item.id == id);
	      	//判断最近播放列表里是否已经有相同的音乐，如果有，把它删除，再追加到数组头部，如果没有，直接追加到数组头部
	      	if(recentplaylistFlag == '-1'){
	      		//如果recentplaylistFlag等于-1，则说明数组中未找到相同的音乐，所以直接在头部追加
	      		recentplaylist.unshift(arr1);
	      		window.localStorage.setItem('recentplaylist',JSON.stringify(recentplaylist));
	      	}else{
	      		// 如果recentplaylistFlag不等于-1，则说明数组中找到相同的音乐
	      		//删除
	      		recentplaylist.splice(recentplaylistFlag,1);
	      		//在头部追加
	      		recentplaylist.unshift(arr1);
	      		window.localStorage.setItem('recentplaylist',JSON.stringify(recentplaylist));
	      	}
	      }else{
	      	window.localStorage.setItem('recentplaylist',JSON.stringify(arr));
	      }
	      this.$router.push({
	        path: '/play'
	      })
	  	  }
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
		},
		//获取歌单详情列表方法
		//把歌单名和背景图保存到store中，方便进入list.vue页面时优先渲染
		getsingerdetail(){
			this.$store.commit('getsonglistid',this.$store.state.priorityRenderSinger.id)
			console.log(this.$store.state.songlistid);
			// 1.获取歌单
			let url = 'http://120.79.162.149:3000/artists?id=' + this.$store.state.songlistid;
			this.$http.get(url).then(res => {
				// console.log(res)
				this.songlistdetail = [];
				this.songlistdetail = res.body.hotSongs;
				this.loadingFlag = !this.loadingFlag;
				console.log(this.songlistdetail);
			})
		},
	},	
	mounted:function(){
    	this.getsingerdetail();
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
	top: -25px;
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
	align-items:center;
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
	width:80%;
	height:50px;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
.list-songname ul li div:nth-child(2) h3{
	width:100%;
	margin: 0;
	padding: 0;
	color: #2e3030;
	text-overflow:ellipsis;
	overflow:hidden;
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
.list-loading{
	display:flex;
	flex-flow: column wrap;
	align-items:center;
	padding-top:40px;
}
.list-loading img{
	width:50px;
	height:50px;
	margin-bottom:10px;
}
</style>
