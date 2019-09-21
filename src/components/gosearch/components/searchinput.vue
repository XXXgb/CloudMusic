<template>
	<div class="search-box">
		<div class="searchinput-box">
			<div class="imgstyle fanhui" @click="back">
				<img src="../../../assets/images/fanhui.png">
			</div>
			<div class="searchmusic">
				<input type="text" placeholder="搜索音乐、歌词、歌单" id="searchmusic" ref="searchmusic" v-model="keywords">
			</div>
			<div class="imgstyle cha" @click="removecontent">
				<img src="../../../assets/images/cha.png">
			</div>
		</div>
		<div class="hotsearch-wai">
			<div class="hotsearch-nei">
				<span>热门搜索</span>
				<ul>
					<li v-for="(item,index) in hotlist" v-bind:key="item.id" @click="getkeywords(item.first)">{{item.first}}</li>
				</ul>
			</div>
		</div>
		<div class="search-result-box" v-if="keywords">
			<div class="search-singger-songlist-box">
				<p>最佳匹配</p>
				<div class="search-singer" @click="getsinger()">
					<img :src="singerpicUrl">
					<span>歌手：{{singer}}</span>
				</div>
				<div class="search-singer"  @click="getsonglist()">
					<img :src="songlistpicUrl">
					<span>歌单：{{songlistName}}</span>
				</div>
			</div>
			<ul>
				<li v-for="(item, index) in songlist" @click="getmusic(item.id,index)">
					<div>
						<h3>{{item.name}}</h3>
						<p><i v-for="(items,index2) in item.artists">{{items.name}}<i v-if="index2 <= item.artists.length-2">  /  </i></i></p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import bus from './bus.js'
import {hotsearch} from '../../../api/search.js'
import {singerurl} from '../../../api/search.js'
import {songlisturl} from '../../../api/search.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
export default{
	name: 'searchinput',
	data(){
		return {
			hotlist: {},
			result:'',
			keywords: '',
			singer: '',
			singerid: '',
			singerpicUrl: '',
			songlistName: '',
			songlistid: '',
			songlistpicUrl: '',
			songlist: [],
			offset: 0,
			priority: [],
			playurl: '',
			flag: false,
			detail:[]
		}
	},
	methods:{
		removecontent(){
			this.keywords = '';
		},
		jiaodian(){
			this.$refs.searchmusic.focus();
		},
		//回退到上一页
		back(){
			history.go(-1);
		},
		//获取热搜的方法
		gethotsearch(){
			hotsearch().then(res => {
				console.log(res)
				// res = eval(res);
				// console.log(res)
				// console.log(res.bodyText)
				//将res中的json数据转换为json对象，方便对数据的操作
				//转换完，获取10首热门歌曲
				this.hotlist = res.data.result.hots;
				//console.log(this.hotlist)
				

			})
		},
		//搜索音乐的方法
		getsearch(){
			this.offset = 0;
			//let singerurl = 'http://120.79.162.149:3000/search/suggest?keywords=' + this.keywords;
			//let songlisturl = 'http://120.79.162.149:3000/search?keywords='+ this.keywords +'&offset=' + this.offset;
			singerurl(this.keywords).then(res=>{
				console.log(res)
				this.singer = res.data.result.artists[0].name
				this.singerid = res.data.result.artists[0].id
				this.singerpicUrl = res.data.result.artists[0].picUrl;
				this.songlistName = res.data.result.playlists[0].name;
				this.songlistid = res.data.result.playlists[0].id;
				this.songlistpicUrl = res.data.result.playlists[0].coverImgUrl;
				console.log(this.singerid)
				console.log(this.songlistid)
			})
			songlisturl(this.keywords,this.offset).then(res=>{
				this.songlist = [];
				this.songlist = res.data.result.songs;
				console.log(this.songlist)
			})
		},
		//当滚动条触底时再加载30首歌曲
		scroll(){
			//触底的条件为：scrollHeight==scrollTop+clientHeight
			let scrollTop = document.documentElement.scrollTop;
			let clientHeight = document.documentElement.clientHeight;
			let scrollHeight = document.documentElement.scrollHeight;
			if(scrollHeight==scrollTop+clientHeight){
				//每一次触底，offset加1
				this.offset = this.offset + 30;
				//let songlisturl = 'http://120.79.162.149:3000/search?keywords='+ this.keywords +'&offset=' + this.offset;
				console.log('触底了')
				console.log(this.offset)
				songlisturl(this.keywords,this.offset).then(res=>{
					//let jiegou;
					//jiegou = [];
					//jiegou = res.data.result.songs;
					this.songlist.push(...res.data.result.songs);
					console.log(this.songlist)
					//console.log(jiegou)
				})
			}
		},
		//获取音乐播放的url
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
				this.playurl = res.data.data[0].url;
				this.getdetail(idx);
				this.playmusic(this.playurl,index);
				// this.playmusic(this.playurl);
				// this.sendsongid();
				// this.getdetail(id);
			})
		},
		playmusic(url,index){
	      this.flag = true;
	      document.querySelector('audio').src = url;
	      if(url==null){
	      	alert('该音乐暂无版权，无法播放！')
	      }else{
	      	//当进入播放页后，把播放的音乐添加进最近播放列表中
	      let recentplaylist = JSON.parse(window.localStorage.getItem('recentplaylist'));
	      let songname = this.songlist[index].name;
	      let singername= this.songlist[index].artists[0].name;
	      let id = this.songlist[index].id;
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
			//let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			musicdetail(id).then(res=>{
				// console.log(res.bodyText)
				//this.detail = JSON.parse(res.bodyText);
				//此时detail中存放的有背景图和歌名
				this.detail = res.data.songs[0];
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
		//获取歌手音乐列表
		getsinger(){
			//音乐不同页面歌单的name和picUrl和id格式不同，所以先对歌单的name、picUrl、id进行格式化，再存储到store中
			let name = this.singer;
			let id = this.singerid;
			let picUrl = this.singerpicUrl;
			this.priority = {'name': name , 'id': id , 'picUrl': picUrl};
			this.$store.commit('prioritysinger',this.priority);
			console.log(this.$store.state.priorityRenderSinger)
			this.$router.push({
					path: '/singermusiclist'
			})
		},
		//获取歌单列表
		//当点击推荐歌单时，先把排行榜的名字和背景保存到store中，以便优先list.vue头部优先渲染
		//再跳转到list中，由list.vue实现歌单列表的获取
		getsonglist(){
			let name = this.songlistName;
			let id = this.songlistid;
			let picUrl = this.songlistpicUrl;
			this.priority = {'name': name , 'id': id , 'picUrl': picUrl};
			this.$store.commit('priority',this.priority);
			console.log(this.$store.state.priorityRender)
			this.$router.push({
					path: '/songlist'
			})	
		},
		//点击热搜时，把热搜的歌名填写到搜索框中
		getkeywords(songname){
			this.keywords = songname;
		},
	},
	mounted:function(){
		this.jiaodian();
		this.gethotsearch();
		window.addEventListener('scroll',this.scroll)
	},
	watch: {
		//监听搜索关键字的改变，每改变一次都进行一次搜索请求
		keywords(newVal, oldVal){
			this.getsearch();
		}
	},
	
}
</script>

<style>
.search-box{
	position: relative;
}
.searchinput-box{
	width:100%;
	height:45px;
	position: fixed;
	top:0;
	background-color: #d44439;
	z-index:5000;
}
.imgstyle{
	width:25px;
	height:25px;
	margin-left: 2%;
	float: left;
}
.fanhui{
	position: absolute;
	left: 1%;
	top: 25%;
}
.cha{
	position: absolute;
	right: 2%;
	top: 25%;
}
.imgstyle img{
	width:100%;
	height: 100%;

}
.searchmusic{
	float: left;
	width:76%;
	height: 80%;
	padding-left: 2%;
	position: absolute;
	left: 10%;
	top: 10%;
}
.searchmusic input{
	width:100%;
	height: 80%;
  	background-color: #d44439;
	border: none;
	border-bottom: 1px solid #f2f3f4;
	margin: 0 auto;
	padding-left: 2%;
	color: #fff;
	font-size: 14px;
}
.search-box{
	width:100%;
	height: 45px;
	background-color: #d44439;
	clear: both;
	position: relative;
}

.hotsearch-wai{
	width:100%;
	height: 594px;
	padding-top: 15%;
}
.hotsearch-nei{
	width:85%;
	min-height: 82.5%;
	margin-left: 7.5%;

}
.hotsearch-nei span{
	font-size: 14px;
	color: #757575;
}
.hotsearch-nei ul{
	padding: 0;
}
.hotsearch-nei ul li{
	list-style: none;
	border: 1px solid #ccc;
	border-radius: 5px;
	float: left;
	margin-right: 5px;
	margin-bottom: 10px;
	padding: 3px;
}





.search-result-box{
	width: 100%;
	height:620px;
	position: absolute;
	top: 45px;
	left: 0;
	padding: 0;
	background-color: #f2f3f4;
}
.search-singger-songlist-box{
	width:100%;
	min-height:150px;
}
.search-singger-songlist-box p:nth-child(1){
	color:#d44439;
	font-size:11px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	margin-left:20px;
}
.search-singer{
	width: 100%;
	height:68px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e4e4e4;
}
.search-singer img{
	width:50px;
	height: 50px;
	margin: 0 15px 0 20px;
}
.search-singer span{
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.search-result-box ul{
	margin: 0;
	padding:0;
}
.search-result-box ul li{
	list-style:none;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #e4e4e4;
}
.search-result-box ul li div{
	width:90%;
	height:55px;
	margin-left: 20px;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
.search-result-box ul li h3{
	width:100%;
	margin: 0;
	padding: 0;	
	height:25px;
	line-height:25px;
	color: #2e3030;
	font-size: 16px;
	font-weight: 400;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.search-result-box ul li p{
	width:100%;
	margin: 0;
	height:20px;
	line-height:20px;
	color: #757575;
	font-size: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>
