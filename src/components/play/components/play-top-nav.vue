<template>
	<div class="playheader">
		<div class="play-fanhui" @click="back">
			<img src="../../../assets/images/xia.png">
		</div>
		<div>
			<span>{{$store.state.musicdetail.name}}</span>
			<span>{{$store.state.musicdetail.ar[0].name}}</span>
		</div>
	</div>
</template>

<script>

export default{
	name: 'play-header',
	data(){
		return {
			topvalue: 0,
		}
	},
	methods:{
		back(){
			history.go(-1);
		}
	},
}
</script>

<style>
.playheader{
	position: fixed;
	top: 0;
	width: 100%;
	height: 50px;
	background: rgba(212, 68, 57, 0) none repeat scroll 0% 0%;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	z-index: 9999;
	color: #f1f1f1;
}
.play-fanhui{
	width: 25px;
	height: 25px;
	margin-left: 15px;

}
.play-fanhui img{
	width: 100%;
	height: 100%;

}
.playheader div:nth-child(2){
	width:70%;
	color: #f2f3f4;
	margin-right: 44px;
	margin-top: 10px;
}
.playheader div:nth-child(2) span{
	display: block;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.playheader div:nth-child(2) span:nth-child(1){
	font-size: 18px;
	font-weight: 700;
}
.playheader div:nth-child(2) span:nth-child(2){
	font-size: 12px;
	font-weight: 400;
	vertical-align:baseline;
}
</style>
