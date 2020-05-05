<template>
	<div class="list-box3" :style="{marginBottom: $store.state.flag ? '45px' : '0px'}">
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
						<span v-text="songlistdetail.result.tracks.length"></span>
						<span>首)</span>
					</li>
					<li v-for="(items,index2) in songlistdetail.result.tracks" v-bind:key="items.id" @click="getmusic(items.id,index2)">
						<p>{{index2+1}}</p>
						<div>
							<h3>{{items.name}}</h3>
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
import {songlistdetail} from '../../../api/songlist.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import {latelyplay,panduan,playall} from '../../../common/common.js'
import {addSelfLatelyPlay} from '../../../api/user.js'
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
			loadingFlag: false,
			aa: this.$store.state.flag
		}
	},

  created:function(){
  },

  mounted:function(){
    this.getsonglistdetail();
  },

	methods:{


		//获取音乐地址的方法
		getmusic(idx,index){
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.playmusic(this.playurl,index,idx);
			})
		},


		//播放音乐的方法
	    playmusic(url,index,idx){
	      if(url==null){
	      	this.$Message.warning('该音乐暂无版权，无法播放！')
	      }else{
          this.flag = true;
          document.querySelector('audio').src = url;
          this.getdetail(idx);
          //添加到最近播放列表
          let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
          let songId = this.songlistdetail.result.tracks[index].id;
          let songName = this.songlistdetail.result.tracks[index].name;
          let singerName = this.songlistdetail.result.tracks[index].artists[0].name;
          let addTime = new Date().getTime();
          addSelfLatelyPlay({_id,songId,songName,singerName,addTime})
          .then( res => {
          })
          //实现点击播放音乐后，playlist中改变当前播放音乐的颜色
          this.changecolor(idx,index)
          this.$router.push({
            path: '/play'
          })
	      }
		},


		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id){
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
		getsonglistdetail(){
			this.$store.commit('getsonglistid',this.$store.state.priorityRender.id)
			// 1.获取歌单
			songlistdetail(this.$store.state.songlistid).then(res => {
				this.songlistdetail = [];
				this.songlistdetail = res.data;
				this.loadingFlag = !this.loadingFlag;
			})
		},


		// 播放全部功能
		// 当点击时播放全部按钮时，将所有音乐缓存到localstorage中
		clickplayall(){
			//封装了一个保存播放全部列表的方法，传入两个参数，分别为音乐的的总数和音乐列表
			playall(this.songlistdetail.result.tracks.length,this.songlistdetail.result.tracks);
		},


		//实现点击播放音乐后，playlist中改变当前播放音乐的颜色
		changecolor(id,index){
			let that = this;
			//1.调用clickplayall方法
			let promise = new Promise(function(resolve,reject){
				that.clickplayall();
				return resolve()
			})
			//2.获取当前播放的音乐是第几首
			//3.改变playlist第几首的颜色
			promise.then(function(){
				that.$store.commit('setplaylistindex',id)
			})
		}
	},

  watch:{
    "this.$store.state.flag"(){
      this.aa = this.$store.state.flag;
    }
  }
}
</script>

<style>
.list-box3{

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
	width:50px;
	height:100%;
	text-align: center;
	line-height: 60px;
}
.list-songname ul li div:nth-child(2){
	width:80%;
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
