<template>
	<div class="search-box">
		<div class="searchinput-box">
			<div class="imgstyle fanhui" @click="back">
        <Icon type="md-arrow-back" size="25" color="#f2f2f3"/>
			</div>
			<div class="searchmusic">
        <Input v-model="keywords" id="searchmusic" @on-change="getSearchSuggest" clearable ref="searchmusic" placeholder="搜索音乐、歌词、歌单" @on-clear="removecontent" />
        <Dropdown trigger="custom" :visible="visible" @on-click="selectSuggest" style="width:100%;">
          <DropdownMenu slot="list">
            <Divider orientation="left" v-if="suggestSinger">歌手</Divider>
            <DropdownItem v-for="(item,index) in suggestSinger" :key="item.id" :name="item.name">{{item.name}}</DropdownItem>
            <Divider orientation="left" v-if="suggestSongs">单曲</Divider>
            <DropdownItem v-for="(item,index) in suggestSongs" :key="item.id" :name="item.name">{{item.name}}  -{{item.artists[0].name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="imgstyle searchbox" @click="getsearch">
        <Icon type="ios-search" size="25" color="#f2f2f3" />
      </div>
		</div>
		<div class="hotsearch-wai" v-if="!keywords">
			<div class="hotsearch-nei">
				<span>热门搜索</span>
				<ul>
					<li v-for="(item,index) in hotlist" v-bind:key="item.id" @click="getkeywords(item.first)">{{item.first}}</li>
				</ul>
			</div>
		</div>
		<div class="search-result-box" v-if="resultVal">
      <Scroll :on-reach-bottom="handleReachBottom" :height="clientHeight">
			<div class="search-singger-songlist-box">
				<p>最佳匹配</p>
				<div class="search-singer" @click="getsinger()" v-if="singer">
					<img :src="singerpicUrl">
					<span>歌手：{{singer}}</span>
				</div>
				<div class="search-singer"  @click="getsonglist()" v-if="songlistName">
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
      </Scroll>
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
import {latelyplay,panduan,playall} from '../../../common/common.js'
import {addSelfLatelyPlay} from '../../../api/user.js'
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
			detail:[],
      clientHeight: '',
      visible: false,
      suggestSongs: '',
      suggestSinger: '',
      resultVal: false
		}
	},

  mounted:function(){
    this.gethotsearch();
    if(this.$store.state.flag){
      this.clientHeight = document.documentElement.clientHeight - 115;
    }else{
      this.clientHeight = document.documentElement.clientHeight - 50;
    }

  },


	methods:{

	  //清空搜索结果
		removecontent(){
			this.songlist = '';
			this.visible = false;
			this.suggestSongs = '';
			this.suggestSongs = '';
		},

    //选择搜索建议的回调
    selectSuggest(data){
		  this.keywords = data;
		  this.visible = false;
		  this.suggestSongs = '';
		  this.suggestSinger = '';
		  this.getsearch();
    },


		//回退到上一页
		back(){
			//删除监听
			window.removeEventListener('scroll',this.scroll)
			history.go(-1);
		},


		//获取热搜的方法
		gethotsearch(){
			hotsearch().then(res => {
				this.hotlist = res.data.result.hots;
			})
		},


		//搜索音乐的方法
		getsearch(){
			this.offset = 0;
			singerurl(this.keywords).then(res=>{
				try{
					this.singer = res.data.result.artists[0].name
					this.singerid = res.data.result.artists[0].id
					this.singerpicUrl = res.data.result.artists[0].picUrl;
				}
				catch(err){
					this.singer = false;
				}
				try{
					this.songlistName = res.data.result.playlists[0].name;
					this.songlistid = res.data.result.playlists[0].id;
					this.songlistpicUrl = res.data.result.playlists[0].coverImgUrl;
				}
				catch(err){
					this.songlistName = false;
				}
			})
			songlisturl(this.keywords,this.offset).then(res=>{
				this.songlist = [];
				this.songlist = res.data.result.songs;
			})
      this.resultVal = true;
			this.visible = false;
		},

    //获取搜索建议
    getSearchSuggest(){
      if(this.keywords == '' || this.keywords == null || this.keywords == undefined){
        console.log(this.keywords)
        this.visible = false;
        this.suggestSongs = '';
        this.suggestSinger = '';
        this.resultVal = false;
      }else{
        let that = this;
        clearTimeout(aaa);
        let aaa = setTimeout(function () {
          that.visible = true;
          try {
            singerurl(that.keywords).then(res=>{
              if(res.data.code != 400){
                if(res.data.result.songs){
                  that.suggestSongs = res.data.result.songs;
                }
                if(res.data.result.artists){
                  that.suggestSinger = res.data.result.artists;
                }
              }
            })
          }
          catch (e) {

          }
        },250)
      }


      
    },


		//触底加载多30首歌曲
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.offset = this.offset + 30;
          songlisturl(this.keywords,this.offset).then(res=>{
            this.songlist.push(...res.data.result.songs);
            resolve();
          })
          resolve();
        }, 1000);
      });
    },


		//获取音乐播放的url
		getmusic(idx,index){
			this.playurl = '';
			musicplayurl(idx).then(res => {
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.getdetail(idx);
				this.playmusic(this.playurl,index,idx);
			})
		},

    //得到播放url后，执行播放
		playmusic(url,index,idx){
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
	      this.getdetail(idx);
	     //添加至最近播放列表
        let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
        let addTime = new Date().getTime();
        addSelfLatelyPlay({_id,songId:id,songName:songname,singerName:singername,addTime})
        .then( res => {
        })
	      //实现点击播放音乐后，playlist中改变当前播放音乐的颜色
		    this.changecolor(index)
        //跳转至播放页面
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


    //在vuex存放歌单详情(背景图片和歌名)
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
			this.$router.push({
					path: '/songlist'
			})	
		},


		//点击热搜时，把热搜的歌名填写到搜索框中
		getkeywords(songname){
			this.keywords = songname;
			this.getsearch();
		},


		// 播放全部功能
		// 当点击时播放全部按钮时，将所有音乐缓存到localstorage中
		clickplayall(){
			//封装了一个保存播放全部列表的方法，传入两个参数，分别为音乐的的总数和音乐列表
			playall(this.songlist.length,this.songlist);
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
			//3.改变playlist第几首的颜色
			promise.then(function(){
				that.$store.commit('setplaylistindex',index)
			})
		}
	},



	
}
</script>

<style scoped>
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
.searchbox{
  position: absolute;
  right: 1%;
  top: 25%;
}
.imgstyle img{
	width:100%;
	height: 100%;

}
.searchmusic{
	float: left;
	width:80%;
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
  border-radius: 0px;
	margin: 0 auto;
	padding-left: 2%;
	color: #fff;
	font-size: 14px;
}
.search-box{
	width:100%;
	height: 100%;
	clear: both;
	
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
	position: absolute;
	top: 45px;
	left: 0;
	padding: 0;
	background-color: #f2f3f4;
}
.search-singger-songlist-box{
	width:100%;
	min-height:0px;
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
.ivu-dropdown-item{
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
