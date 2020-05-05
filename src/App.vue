<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <playfield></playfield> -->
    <div class="playfield" ref="playfield" @click="goplaypage" v-if="$store.state.flag">
      <!-- :style="       {bottom: $store.state.flag ? 0 : '-70px'}                          " -->
      <div class="bg">
        <img v-bind:src="$store.state.musicdetail.al.picUrl">
      </div>
      <div class="songname">
        <span>{{$store.state.musicdetail.name}}</span>
        <span>{{$store.state.musicdetail.ar[0].name}}</span>
      </div>
      <div class="pos">
        <div class="stop" @click.stop.prevent="play" v-if="this.$store.state.playFlag">
          <!--<div class="stop-inner"></div>-->
          <i-circle :percent="$store.state.playProgress" stroke-color="#ff5500" :size="circleSize" :stroke-width="strokeWidth">
            <Icon type="ios-play-outline" size="15" />
          </i-circle>
        </div>
        <div class="play" @click.stop.prevent="stop" v-if="!this.$store.state.playFlag">
          <!--<div class="play-inner"></div>-->
          <i-circle :percent="$store.state.playProgress" stroke-color="#ff5500" :size="circleSize" :stroke-width="strokeWidth">
            <Icon type="ios-pause-outline" size="15" />
          </i-circle>
        </div>
      </div>
      <div class="playlist" @click.stop.prevent="showplaylist()">
        <Icon type="md-list" :size="circleSize"/>
      </div>
    </div>
    <audio autoplay="autoplay" id="audio" ref="audio"></audio>
    <playlist ref="playlist"></playlist>
    <div class="clear"></div>
  </div>
</template>

<script>
import bus from './components/musichome/components/bus.js'
import playlist from './components/musichome/components/playlist.vue'

export default {
  name: 'App',
  data(){
    return {
      b: [],
      detailimg: '',
      detailsongname: '',
      detailsongpeople: '',
      circleSize: 25,
      strokeWidth: 4
    }
  },

  components:{
    playlist
  },

  created:function(){
    this.songid();
    this.getdetail();
  },

  mounted:function(){
    /*********************监听播放状态*********************/
    let audio = document.querySelector('audio');
    let that = this;
    //执行了暂停操作
    audio.addEventListener("pause",function(){
      that.$store.state.playFlag = true;
    })
    //执行了播放操作
    audio.addEventListener("playing",function(){
      that.$store.state.playFlag = false;
    })
  },

  methods:{

    //播放音乐的方法
    playmusic(url){
      this.flag = true;
      document.querySelector('audio').src = url;
      this.$router.push({
        path: '/play'
      })
    },


    //接收lunbo.vue页面传过来的音乐id，实现音乐播放
    songid(){
      bus.$on('getsongid',res=>{
        this.playmusic(res);
      })
    },


    //接收lunbo.vue传过来的数据
    getdetail(){
      bus.$on('getValue',res=>{
        this.b = [];
        this.b = res;
        this.detailimg = this.b.al.picUrl;
        this.detailsongname = this.b.name;
        this.detailsongpeople = this.b.ar[0].name;
      })
    },


    //音乐播放按钮点击播放事件
    play(){
      let audio = document.querySelector('audio');
      audio.play();
    },


    // 音乐暂停按钮点击暂停事件
    stop(){
      let audio = document.querySelector('audio');
      audio.pause();
    },


    //当点击playfield组件是，路由到play.vue页面
    goplaypage(){
      this.$router.push({
        path: '/play'
      })
    },


    //显示播放列表
    showplaylist(){
      this.$refs.playlist.toggleplaylist();
      this.$refs.playlist.getplayalllist();
    },
  },


  
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background-color: #f2f3f4;
  font-family: 'Microsoft YaHei';
}
#app{
  position:relative;
  z-index:999;
  width:100%;
  height: 100vh;
}
.clear{
  clear:both;
}
input,textarea{
  outline: none;
}
.playfield{
  position: fixed;
  -moz-bottom: 0px;
  -webkit-bottom: -2px;
  bottom: -2px;
  width:100%;
  height: 70px;
  background-color: hsla(0,0%,100%,0.85);
  z-index: 5000;
  transition: 0.5s linear;
  display: flex;
  align-items: center;
}
.bg{
  width:50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  margin: 0 0 0 20px;
  float: left;
}
@keyframes rotate{
  from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
.bg img{
  width: 100%;
  height: 100%;
  border: none;
  /*图片旋转动画*/
  animation: rotate 10s linear infinite;
  
}
.songname{
  float: left;
  width: 55%;
  margin-left: 10px;
  font-size: 14px;

}
.songname span{
  display: block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.stop{
    width:25px;
    height:25px;
    /*border:3px solid hsla(0,0%,7%,.6);
    border-radius:50%;*/
    flex-flow: column wrap;
}
/*.stop-inner{
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 13px solid hsla(0,0%,7%,.6);
    border-bottom: 6px solid transparent;
    margin-left:5px;
}*/
.play{
    width:25px;
    height:25px;
    /*border:3px solid hsla(0,0%,7%,.6);
    border-radius:50%;*/
    flex-flow: column wrap;
}
/*.play-inner{
    width: 10px;
    height: 10px;
    background-color:hsla(0,0%,7%,.6);
    margin-left:0px;
}*/
.playlist{
  width:25px;
  height:25px;
  position:absolute;
  right:15px;
}
.playlist img{
  width:100%;
  height:100%;
  opacity:0.6;
}
/*路由页面跳转过渡动画*/
.fade-enter-active, .fade-leave-avtive {
    transition: all 0.5s; 
}
.fade-enter, .fade-leave-to {
    opacity: 0.5; 
}
.ivu-modal-content{
	width:300px;
	height:300px;
	margin:0 auto;
}
.ivu-modal-body{
	width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ivu-drawer-body{
	padding: 0;
}
/*搜索页input框样式*/
.searchmusic .ivu-input{
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
.searchmusic .ivu-input:focus{
  outline:none;
  box-shadow: 0 0 0 2px transparent;
}
.searchmusic .ivu-input-icon{
  color:#f2f2f3;
}
</style>
