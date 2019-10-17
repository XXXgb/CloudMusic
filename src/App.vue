<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <playfield></playfield> -->
    <div class="playfield" ref="playfield" @click="goplaypage" :style="{bottom: $store.state.flag ? 0 : '-70px'}">
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
          <div class="stop-inner"></div>
        </div>
        <div class="play" @click.stop.prevent="stop" v-if="!this.$store.state.playFlag">
          <div class="play-inner"></div>
        </div>
      </div>
      <div class="playlist" @click.stop.prevent="showplaylist()">
        <img src="../static/more.png"/>
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

// import playfield from './components/musichome/components/playfield.vue'
export default {
  name: 'App',
  data(){
    return {
      b: [],
      detailimg: '',
      detailsongname: '',
      detailsongpeople: '',
      
    }
  },
  components:{
		// playfield
    playlist
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
        // console.log(res)
        this.detailimg = this.b.al.picUrl;
        this.detailsongname = this.b.name;
        this.detailsongpeople = this.b.ar[0].name;
        // console.log(this.detailimg)
        // console.log(this.detailsongname)
        // console.log(this.detailsongpeople)
      })
    },
    //音乐播放按钮点击播放事件
    play(){
      this.$store.state.playFlag = !this.$store.state.playFlag;
      let audio = document.querySelector('audio');
      audio.play();

    },
    // 音乐暂停按钮点击暂停事件
    stop(){
      this.$store.state.playFlag = !this.$store.state.playFlag;
      let audio = document.querySelector('audio');
      audio.pause();
      //当音乐暂停时，背景图旋转也停止
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
  created:function(){
    this.songid();
    this.getdetail();

  },
  mounted:function(){
  }
  
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background-color: #f2f3f4;
}
#app{
  position:relative;
  z-index:999;
}
.clear{
  clear:both;
}
.playfield{
  position: fixed;
  bottom: -70px;
  width:100%;
  height: 70px;
  background-color: hsla(0,0%,100%,0.85);
  z-index: 5000;
  transition: 0.5s linear;
}
.bg{
  width:50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  margin: 10px 0 0 20px;
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
  margin-left: 2%;
  margin-top: 4%;
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
    border:3px solid hsla(0,0%,7%,.6);
    border-radius:50%;
    position: absolute;
    right: 50px;
    top:17px;
    display:flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items:center;
}
.stop-inner{
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 13px solid hsla(0,0%,7%,.6);
    border-bottom: 6px solid transparent;
    margin-left:5px;
}
.play{
    width:25px;
    height:25px;
    border:3px solid hsla(0,0%,7%,.6);
    border-radius:50%;
    position: absolute;
    right: 50px;
    top:17px;
    display:flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items:center;
}
.play-inner{
    width: 10px;
    height: 10px;
    background-color:hsla(0,0%,7%,.6);
    margin-left:0px;
}
.playlist{
  width:20px;
  height:20px;
  position:absolute;
  top:22px;
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

</style>
