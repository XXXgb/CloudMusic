<template>
	<div class="play-bottom-playfield-maxbox">
		<div class="play-bottom-playfield-box">
			<span id="span1" class="play-bottom-playfield-span1 spancolor">00:00</span>
			<div class="play-bottom-playfield-outerbox">
				<div class="play-bottom-playfield-innerbox">
					<div class="play-bottom-playfield-jindutiao" id="jindutiao">
						<div class="play-bottom-playfield-yibofang" id="yibofang"></div>
						<div class="play-bottom-playfield-qiubox" id="qiubox">
							<div class="play-bottom-playfield-qiu"></div>
						</div>
					</div>
				</div>
			</div>
			<span id="span2" class="play-bottom-playfield-span2 spancolor">00:00</span>
		</div>
		<div class="play-bottom-playfield-control">
			<div><img src="../../../assets/images/next.png"></div>
			<div><img src="../../../assets/images/up.png"></div>
			<div><img src="../../../assets/images/pause.png" @click="change()" id="abc"></div>
			<div><img src="../../../assets/images/next.png"></div>
			<div><img src="../../../assets/images/coollect.png"></div>
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
		//获取当前播放音乐的总时长
		// duration(){
		// 	var myVid = document.getElementById("audio");
		// 	console.log("duration  ",myVid);
		// 	if(myVid != null){
		// 	    var duration;
		// 	    // myVid.load();
		// 	    //做一个闭包，把函数返回值保存到musictime中
		// 	    let musictime = (myVid.oncanplay = function () {  
		// 	    console.log("myVid.duration",myVid.duration);
		// 	    	// this.totaltime = myVid.duration;
		// 			// console.log(this.totaltime)
		// 			return myVid.duration
					
		// 	    })()

		// 	    console.log(musictime)
		// 	    //
		// 	    setTimeout(function(){
		// 	    	console.log(myVid.currentTime)
		// 	    },3000)
		// 	    // this.totaltime = musictime;
		// 	    // if(Number.isNaN(NaN)){
		// 	    // 	console.log(musictime)
		// 	    // 	console.log(true)
		// 	    // }else{
		// 	    // 	console.log(musictime)
		// 	    // 	console.log(false)
		// 	    // }
		// 	    this.move(musictime);
		// 	}

			
		// },
		//开始播放时，进度条和小球开始移动
		move(){
			// console.log(time)
			//进度条总长度200px
			//速度=总长度/总时长
			// this.totaltime = this.totaltime;
			// let speed = (200/this.totaltime).toFixed(2);
			// console.log(speed);
			// let yibofang = document.getElementById('yibofang');
			// let qiubox = document.getElementById('qiubox');
			// let left = 0;
			
			// setInterval(function(){
			// 	left +=speed;
			// 	yibofang.style.width = left + 'px';
			// 	qiubox.style.left = left + 'px';	
			// },1000)
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
				//计算小球和进度条移动的位移
				f = w*200;
				// console.log(zong);
				// console.log(yi);
				// console.log(w);
				if(c>=zong){
					clearInterval(a);
				}else{
					yibofang.style.width = f + 'px';
					qiubox.style.left = f + 'px';
					//格式化总时间
					if(zong > -1 && zong != 'undefined'){
						time = '';
						timed = '';
						min1 = Math.floor(zong/60) % 60;
						sec1 = zong % 60;
						min2 = Math.floor(yi/60) % 60;
						sec2 = yi % 60;
						if(min1<10){
							time += "0";
						}
						time += min1 + ":";
						if(sec1<10){
							time += "0";
						}
						if(min2<10){
							timed += "0";
						}
						timed += min2 + ":";
						if(sec2<10){
							timed += "0";
						}
						time += sec1.toFixed(0);
						timed += sec2.toFixed(0);
						span2.innerHTML = time;
						span1.innerHTML = timed;
					}else{
						// console.log("no")
					}

				}

			},1000)

		},
		
		
	},
	mounted:function(){
		this.move();
	}
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
	margin: 0 10px;
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
