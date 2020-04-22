<template>
	<div class="play-bottom-playfield-maxbox">
		<div class="play-bottom-playfield-box">
			<span id="span1" class="play-bottom-playfield-span1 spancolor">00:00</span>
			<div class="play-bottom-playfield-outerbox">
				<div class="play-bottom-playfield-innerbox">
					<div class="play-bottom-playfield-jindutiao" id="jindutiao">
						<div class="play-bottom-playfield-yibofang" id="yibofang" ref="yibofang"></div>
						<div class="play-bottom-playfield-qiubox" id="qiubox" ref="qiubox" @mousedown.stop.prevent="changebar"  @touchstart.stop.prevent="changebarbar">
							<div class="play-bottom-playfield-qiu"></div>
						</div>
					</div>
				</div>
			</div>
			<span id="span2" class="play-bottom-playfield-span2 spancolor">00:00</span>
		</div>
		<div class="play-bottom-playfield-control">
			<div><img src="../../../assets/images/comments.png" @click.stop.prevent="goComments()"></div>
			<div><img src="../../../assets/images/up.png" ref="up" @click.stop.prevent="goUp()"></div>
			<div><img src="../../../assets/images/play.png" @click.stop.prevent="play" ref="play" v-if="this.$store.state.playFlag"><img src="../../../assets/images/pause.png" @click.stop.prevent="stop" ref="stop" v-if="!this.$store.state.playFlag">
			</div>
			<div><img src="../../../assets/images/next.png" @click.stop.prevent="goNext()"></div>
			<div><img src="../../../assets/images/coollect.png" @click="coollect"></div>
		</div>
	</div>
</template>

<script>
import {panduan, latelyplay} from '../../../common/common.js'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import {addCollect} from '../../../api/user.js'
export default{
	name: 'playbottomplayfield',
	data(){
		return {
			topvalue: 0,
			totaltime: 0,
			duration: '',
			currentTime: '',
			playurl: '',
			detail: [],
			flag: false,
			playalllist: [],
		}
	},
	methods:{
		//开始播放时，进度条和小球开始移动
		move(){
			var that = this;
			//用来保存每次需要移动的距离
			var c = 0;
			let audio = document.getElementById('audio');
			let yibofang = document.getElementById('yibofang');
			let qiubox = document.getElementById('qiubox');
			let span1 = document.getElementById('span1');
			let span2 = document.getElementById('span2');
			//总时间
			let zong = audio.duration;
			//已播放的时间
			let yi = audio.currentTime;
			//播放速度
			let speed = (200/zong).toFixed(2);
			let w;
			let f;
			//页面显示的总时间
			let time;
			//页面显示的已播放时间
			let timed;
			let min1;
			let sec1;
			let min2;
			let sec2;
			//console.log(zong);
			//console.log(yi);
			//console.log(speed);

			let a = setInterval(function(){
				c += speed;
				zong = audio.duration;
				yi = audio.currentTime;
				this.duration = zong;
				this.currentTime = yi;
				w = (yi/zong).toFixed(3);
				//计算小球和进度条移动的位移
				f = w*200;
				if(yi == zong){
					console.log('播放完毕')
					//clearInterval(a);
					//当播放结束时，进入下一首
					//1.把是否播放结束的标志改为false，表示播放结束，表示可以进入下一首
					//clearInterval(a);
					//此处将audio.currentTime设为0是为了使音乐进入下一首时，不发起多次ajax请求
					audio.currentTime = 0;
					that.cc();
				}else{
					yibofang.style.width = f + 'px';
					qiubox.style.left = f + 'px';
					that.$store.commit('getPlayProgress',w)
					//格式化总时间
					if(zong > -1 && zong != 'undefined'){
						time = '';
						timed = '';
						min1 = (Math.floor(zong/60) % 60).toFixed(0);
						sec1 = (zong % 60).toFixed(0);
						min2 = (Math.floor(yi/60) % 60).toFixed(0);
						sec2 = (yi % 60).toFixed(0);
						if(min1<10){
							min1 = "0" + min1;
						}
						if(sec1<10){
							sec1 = "0" + sec1;
						}
						if(min2<10){
							min2 = "0" + min2;
						}
						if(sec2<10){
							sec2 = "0" + sec2;
						}
						timed = min2 + ":" + sec2;
						time = min1 + ":" + sec1;
						span2.innerHTML = time;
						span1.innerHTML = timed;

					}else{
						// console.log("no")
					}
				}
			},150)

		},
		cc(){
			this.$store.commit('setendflag',false)
		},
		//PC端进度条的拖拉
		changebar(e){
			let that = this;
			let audio = document.getElementById('audio');
			let qiubox = document.getElementById('qiubox');
			let yibofang = document.getElementById('yibofang');
			//获取小球距离body的左边距
			//获取当鼠标按下时小球距离父元素的左边距
			let qiuboxbLeft = 0;
			qiuboxbLeft = qiubox.offsetLeft;
			//clientX获取鼠标当前位置，计算后得到qiubox父元素距离body的左边距
			let qiuboxuLeft = 0;
			qiuboxuLeft = e.clientX - qiuboxbLeft;
			//用来保存小球需要移动的距离
			let moveleft = 0;
			//音乐的总时间
			let time = audio.duration;
			console.log('qiuboxbLeft:' + qiuboxbLeft);
			console.log('clientX:' + e.clientX)
			document.onmousemove = function(e){
				//计算进度条已移动的距离，公式：终点位置距离body的距离 - qiubox父元素距离body的左边距
				moveleft = e.clientX - qiuboxuLeft;
				if(moveleft > 200){
					yibofang.style.width = '200px';
					qiubox.style.left = '200px';
				}else if(moveleft <= 0){
					yibofang.style.width = '0px';
					qiubox.style.left = '0px';
				}else{
					yibofang.style.width = moveleft +'px';
					qiubox.style.left = moveleft + 'px';
					
				}
				//计算音乐应该跳转到哪个时间点开始播放
				let percent = (moveleft / 200).toFixed(2);
				audio.currentTime = (time * percent).toFixed(2);
				//当播放完毕后，重新拖拉，重新执行时间和小球的计算函数
				that.move();
				
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				
			}
		},
		//移动端进度条的拖拉
		changebarbar(e){
			let that = this;
			let audio = document.getElementById('audio');
			let qiubox = document.getElementById('qiubox');
			let yibofang = document.getElementById('yibofang');
			//获取小球距离body的左边距
			//获取当鼠标按下时小球距离父元素的左边距
			let qiuboxbLeft = 0;
			qiuboxbLeft = qiubox.offsetLeft;
			//clientX获取鼠标当前位置，计算后得到qiubox父元素距离body的左边距
			let qiuboxuLeft = 0;
			qiuboxuLeft = event.changedTouches[0].clientX - qiuboxbLeft;
			//用来保存小球需要移动的距离
			let moveleft = 0;
			//音乐的总时间
			let time = audio.duration;
			console.log('qiuboxbLeft:' + qiuboxbLeft);
			console.log('clientX:' + e.clientX)
			document.ontouchmove = function(e){
				//console.log('qiuboxuLeft:' + event.changedTouches[0].clientX)
				//计算进度条已移动的距离，公式：终点位置距离body的距离 - qiubox父元素距离body的左边距
				moveleft = event.changedTouches[0].clientX - qiuboxuLeft;
				if(moveleft >= 200){
					yibofang.style.width = '200px';
					qiubox.style.left = '200px';
				}else if(moveleft <= 0){
					yibofang.style.width = '0px';
					qiubox.style.left = '0px';
				}else{
					yibofang.style.width = moveleft +'px';
					qiubox.style.left = moveleft + 'px';
				}
				//计算音乐应该跳转到哪个时间点开始播放
				let percent = (moveleft / 200).toFixed(2);
				audio.currentTime = (time * percent).toFixed(2);
				//当播放完毕后，重新拖拉，重新执行时间和小球的计算函数
				that.move();
			}
			document.ontouchend = function(e){
				document.ontouchmove = null;
			}
		},
		stopmusic(){
			let audio = document.getElementById('audio');
			audio.play();
		},
		//音乐播放的方法
		play(){
			//playFlag为false时，音乐正在播放，为ture时，音乐暂停
			console.log('点击了播放按钮')
			let audio = document.getElementById('audio');
			audio.play();
		},
		//音乐暂停的方法
		stop(){
			console.log('点击了暂停按钮')
			let audio = document.getElementById('audio');
			audio.pause();
		},
		//音乐收藏
		coollect(){
			let songName = this.$store.state.musicdetail.name;
			let singerName = this.$store.state.musicdetail.ar[0].name;
			let songId = this.$store.state.musicdetail.id;
			let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
			let addTime = new Date().getTime();
			console.log(_id)
			//如果已有收藏时，在原收藏后追加
			addCollect({_id,songId,songName,singerName,singerName,addTime})
			.then( res => {
				if(res.data.err === 0){
					this.$Message.success('收藏成功')
				}else if(res.data.err === 1){
					this.$Message.success('已取消收藏')
				}
			})
			
		},
		//上一首
		goUp(){
			let p = panduan(this.$store.state.musicdetail.id);
			let index = p.selIndex;
			let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
			this.getmusic(playalllist[index-1].id,index-1)
			this.$store.commit('setendflag',true)
		},
		//下一首
		goNext(){
			let p = panduan(this.$store.state.musicdetail.id);
			let index = p.selIndex;
			let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
			this.getmusic(playalllist[index+1].id,index+1)
			this.$store.commit('setendflag',true)
		},
		//获取音乐地址的方法
		getmusic(idx,index){
			console.log(idx)
			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				console.log(res)
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.playmusic(this.playurl,index,idx);
			})
		},
		//播放音乐的方法
	    playmusic(url,index,idx){
	      let that = this;
	      this.playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
	      if(url==null){
	      	this.$Message.warning('该音乐暂无版权，无法播放！')
	      	//当音乐播放结束后切换下一首音乐为无版权音乐时，将继续点击下一首音乐，直到有版权为止
	      	this.getmusic(playalllist[index+1].id,index+1)
	      }else{
		      this.flag = true;
		      document.querySelector('audio').src = url;
		      let singername;
		      //歌单列表和歌手列表获取的数据不同，所以这里做一个判断，当前为歌单时，执行ture，为歌手时，执行false
		      if(this.playalllist[index].artists){
		      	singername = this.playalllist[index].artists[0].name;
		      }else{
		      	singername = this.playalllist[index].ar[0].name;
		      }
		      this.getdetail(idx);
		      //当进入播放页后，把播放的音乐添加进最近播放列表中
		      // 如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
		      // 否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
		      latelyplay(this.playalllist[index].name,
		      				singername,
		      					this.playalllist[index].id)
		      //获取当前正在播放音乐的索引
		      let p = panduan(idx);
		      console.log(p)
		      //this.$store.state.playlistindex==index，让正在播放的音乐高亮
		      this.$store.commit('setplaylistindex',idx);
		      
	      }

	      
		},
		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id){
			//let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			musicdetail(id).then(res=>{
				//此时detail中存放的有背景图和歌名
				this.detail = res.data.songs[0];
				//获取到音乐详情后，保存到store的musicdetail中
				console.log(res.data.songs[0])
				this.abc(this.detail);

			})
		},
		abc(detail){
			this.$store.commit('bcd',detail)
		},
		//跳转到评论页面
		goComments(){
			let musicDetail = { "songId": this.$store.state.musicdetail.id,
								"songName": this.$store.state.musicdetail.name,
								"singerName": this.$store.state.musicdetail.ar[0].name}
			window.sessionStorage.setItem('musicDetail', JSON.stringify(musicDetail));
			this.$router.push('/comments');
		}

		
		
	},
	mounted:function(){
		this.move();
	},
	
	
}
</script>

<style>
.play-bottom-playfield-maxbox{
	width:100%;
	height:100px;
	position: absolute;
	top: 540px;
	left: 0;
	z-index: 9999;
}
.play-bottom-playfield-box{
	width:100%;
	height:40px;
	display: flex;
	justify-content: center;
}
.play-bottom-playfield-outerbox{
	display: inline-block;
	width:200px;
	height: 20px;
	margin: 0 15px;
}

.play-bottom-playfield-innerbox{
	width: 100%;
	height:100%;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
.play-bottom-playfield-jindutiao{
	width: 100%;
	height:3px;
	background-color: #2e3030;
	position: relative;
}
.play-bottom-playfield-yibofang{
	width:0px;
	height:100%;
	background-color: #d44439;;
}
.play-bottom-playfield-qiubox{
	width:13px;
	height:13px;
	border-radius: 50%;
	border: 1px solid #f1f1f1;
	background-color: #f1f1f1;
	position: absolute;
	left: 0;
	top: -6px;
	display: flex;
	justify-content: center;
}
.play-bottom-playfield-qiu{
	width:40%;
	height:40%;
	background-color: #d44439;;
	border-radius: 50%;
	margin: auto 0;
}
.play-bottom-playfield-control{
	width: 100%;
	height: 70px;
	display: flex;
	justify-content: center;
	align-content: center;
}
.play-bottom-playfield-control div{
	width:50px;
	height: 50px;
	display: flex;
	justify-content: center;
	margin: auto 0;
	margin-left: 10px;
}
.play-bottom-playfield-control div:nth-child(1){
	margin-left: 0;
}
.play-bottom-playfield-control div:nth-child(3){
	margin: 0 0;
	margin-left: 10px;
}
.play-bottom-playfield-control div:nth-child(3) img{
	width:100%;
	height:100%;
}
.play-bottom-playfield-control div img{
	width:50%;
	height:50%;
}
.spancolor{
	color:#f1f1f1;
	font-size: 11px;
	display: inline-block;
	height:20px;
	line-height:20px;
}
</style>
