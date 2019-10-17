<template>
	<div class="list-box3">
		<div class="list-father">
			<div class="list-loading" v-if="!loadingFlag"> 
				<img src="../../../assets/images/loading.gif"/>
				<span>加载中…</span>
			</div>
			<div class="list-songname"  v-if="loadingFlag">
				<ul>
					<li>
						<i>
							<img src="../../../assets/images/playall.png" @click="clickplayall">
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
import {singerlistdetail} from '../../../api/songlist.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import {latelyplay,panduan,playall} from '../../../common/common.js'
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
			//console.log(idx)
			//let url;
			//url = 'http://120.79.162.149:3000/music/url?id=' + idx;
			// console.log(url);
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				//console.log(res)
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				
				this.playmusic(this.playurl,index,idx);
				// this.playmusic(this.playurl);
				// this.sendsongid();
				// this.getdetail(id);
			})
		},
		//播放音乐的方法
	    playmusic(url,index,idx){
	      
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
	      this.getdetail(idx);
	      //当点击playlist的播放后，执行panduan方法，获取当前播放音乐在playalllist列表中的位置(下标),获取到下标后，保存到selIndex中
	      let selIndex = panduan(id);
	      console.log(selIndex)

	      // 如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
	      // 否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
	      latelyplay(recentplaylist,id,arr,arr1)


	      //实现点击播放音乐后，playlist中改变当前播放音乐的颜色
		  this.changecolor(index)

	      this.$router.push({
	        path: '/play'
	      })
	  	  }
		},
		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id){
			//let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			musicdetail(id).then(res=>{
				//此时detail中存放的有背景图和歌名
				this.detail = res.data.songs[0];
				//获取到音乐详情后，保存到store的musicdetail中
				this.abc(this.detail);
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
			//let url = 'http://120.79.162.149:3000/artists?id=' + this.$store.state.songlistid;
			singerlistdetail(this.$store.state.songlistid).then(res => {
				this.songlistdetail = [];
				this.songlistdetail = res.data.hotSongs;
				this.loadingFlag = !this.loadingFlag;
			})
		},
		// 当点击时播放全部按钮时，将所有音乐缓存到localstorage中
		clickplayall(){
			//封装了一个保存播放全部列表的方法，传入两个参数，分别为音乐的的总数和音乐列表
			playall(this.songlistdetail.length,this.songlistdetail);
			console.log(this.songlistdetail)
		},
		//实现点击播放音乐后，playlist中改变当前播放音乐的颜色
		changecolor(index){
			let that = this;
			//1.调用clickplayall方法
			let promise = new Promise(function(resolve,reject){
				that.clickplayall();
				return resolve()
			})
			
			//2.获取当前播放的音乐是第几首
			console.log(index)
			//3.改变playlist第几首的颜色
			promise.then(function(){
				console.log('chenggongle'+index);
				that.$store.commit('setplaylistindex',index)
			})
			
		}
	},	
	mounted:function(){
    	this.getsingerdetail();
  	},
}
</script>

<style>
.list-box3{
	margin: 0;
}
.list-box3 .list-father{
	position: relative;
	top:-25px;
}
.list-songname{
	width: 100%;
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
