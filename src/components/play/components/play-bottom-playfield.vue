<template>
	<div class="play-bottom-playfield-maxbox">
		<div class="play-bottom-playfield-box">
			<span id="span1" class="play-bottom-playfield-span1 spancolor">00:00</span>
			<div class="play-bottom-playfield-outerbox">
				<div class="play-bottom-playfield-innerbox">
					<div class="play-bottom-playfield-jindutiao" id="jindutiao">
						<div class="play-bottom-playfield-yibofang" id="yibofang" ref="yibofang"></div>
						<div class="play-bottom-playfield-qiubox" id="qiubox" ref="qiubox" @mousedown.stop.prevent="changebar"  @touchstart.stop.prevent="changebarbar" @touchend.prevent="stopmusic">
							<div class="play-bottom-playfield-qiu"></div>
						</div>
					</div>
				</div>
			</div>
			<span id="span2" class="play-bottom-playfield-span2 spancolor">00:00</span>
		</div>
		<div class="play-bottom-playfield-control">
			<div><img src="../../../assets/images/next.png"></div>
			<div><img src="../../../assets/images/up.png" ref="up"></div>
			<div><img src="../../../assets/images/play.png" @click.stop.prevent="play" ref="play" v-if="this.$store.state.playFlag"><img src="../../../assets/images/pause.png" @click.stop.prevent="stop" ref="stop" v-if="!this.$store.state.playFlag">
			</div>
			<div><img src="../../../assets/images/next.png"></div>
			<div><img src="../../../assets/images/coollect.png" @click="coollect"></div>
		</div>
	</div>
</template>

<script>

export default{
	name: 'playbottomplayfield',
	data(){
		return {
			topvalue: 0,
			totaltime: 0,
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
			console.log(zong);
			console.log(yi);
			console.log(speed);
			let a = setInterval(function(){
				c += speed;
				zong = audio.duration;
				yi = audio.currentTime;
				w = (yi/zong).toFixed(3);
				// 如果播放完毕，将播放暂停的按钮设置为暂停
				if(yi >= zong){
					that.$refs.play.src = '../static/play.png';
					that.playFlag = !that.playFlag;
				}
				//计算小球和进度条移动的位移
				f = w*200;
				if(yi >= zong){
					clearInterval(a);
				}else{
					yibofang.style.width = f + 'px';
					qiubox.style.left = f + 'px';
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
				console.log('qiuboxuLeft:' + event.changedTouches[0].clientX)
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
			}
			document.ontouchend = function(e){
				document.ontouchmove = null;
				that.$refs.play.src = '../../../../static/pause.png'
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
			this.$store.commit('changePlayFlag',false)
		},
		//音乐暂停的方法
		stop(){
			console.log('点击了暂停按钮')
			let audio = document.getElementById('audio');
			audio.pause();
			this.$store.commit('changePlayFlag',true)
		},
		//音乐收藏
		coollect(){
			//每次收藏前，先读取原本收藏的音乐，在数组后追加收藏
			let mycoollect = JSON.parse(window.localStorage.getItem('mycoollect'));
			console.log(mycoollect);
			let songname = this.$store.state.musicdetail.name;
			let singername = this.$store.state.musicdetail.ar[0].name;
			let id = this.$store.state.musicdetail.id;
			let arr = [{'songname': songname , 'singername': singername , 'id': id}];
			let arr1 = {'songname': songname , 'singername': singername , 'id': id};
			//如果已有收藏时，在原收藏后追加
			if(mycoollect){
				//判断当前音乐是否已经收藏了，如果是，则取消收藏，如果未收藏，则收藏
				let mycoollectFlag = mycoollect.findIndex((item,index) => item.id == id)
				if(mycoollectFlag == '-1'){
					console.log(mycoollectFlag)
					mycoollect.unshift(arr1);
					//判断出当前音乐还未收藏过，所以执行收藏操作，在数组尾部添加收藏音乐
					window.localStorage.setItem('mycoollect',JSON.stringify(mycoollect));
					alert('已收藏')
				}else{
					console.log(mycoollectFlag)
					//判断出当前音乐已经收藏过了，所以执行取消收藏操作，将数组中对应的音乐删除
					mycoollect.splice(mycoollectFlag,1);
					//删除完毕后，将新的数组更新
					window.localStorage.setItem('mycoollect',JSON.stringify(mycoollect));
					alert('已取消收藏')
				}
			}else{
			//如果没有收藏的音乐，自己创建一个mycoollect本地存储收藏音乐
				window.localStorage.setItem('mycoollect',JSON.stringify(arr));
			}
			
		},

		
		
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
