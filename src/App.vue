<template>
  <div id="app">
    <router-view></router-view>
    <!-- <playfield></playfield> -->
    <div class="playfield" ref="playfield" @click="goplaypage" :style="{bottom: $store.state.flag ? 0 : '-70px'}">
      <!-- :style="       {bottom: $store.state.flag ? 0 : '-70px'}                          " -->
      <div class="bg">
        <img v-bind:src="detailimg">
      </div>
      <div class="songname">
        <span>{{detailsongname}}</span>
        <span>{{detailsongpeople}}</span>
      </div>
      <div class="pos">
        <div class="stop" @click="play" v-if="flag2"></div>
        <div class="play" @click="stop" v-if="!flag2"></div>
      </div>
    </div>
    <audio autoplay="autoplay" id="audio"></audio>
  </div>
</template>

<script>
import bus from './components/musichome/components/bus.js'
// import playfield from './components/musichome/components/playfield.vue'
export default {
  name: 'App',
  data(){
    return {
      b: [],
      detailimg: '',
      detailsongname: '',
      detailsongpeople: '',
      flag2: false
    }
  },
  components:{
		// playfield
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
      this.flag2 = !this.flag2;
      let audio = document.querySelector('audio');
      audio.play();

    },
    // 音乐暂停按钮点击暂停事件
    stop(){
      this.flag2 = !this.flag2;
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
  },
  created:function(){
    this.songid();
    this.getdetail();
  },
  
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  background-color: #f2f3f4;
}
#app{
}
.playfield{
  position: fixed;
  bottom: -70px;
  width:100%;
  height: 70px;
  background-color: hsla(0,0%,100%,.85);
  z-index: 5000;
  transition: 0.5s linear;
}
.bg{
  width:50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
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
  margin-left: 2%;
  margin-top: 4%;
  font-size: 14px;
}
.songname span{
  display: block;
}
.pos{
}
.stop{
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid red;
    border-bottom: 10px solid transparent;
    position: absolute;
    right: 50px;
    top:25px;
}
.play{
    width: 15px;
    height: 15px;
    border: 1px solid red;
    position: absolute;
    right: 50px;
    top:25px;
}
</style>
