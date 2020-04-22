<template>
	<div class="comments-top-nav">
		<div class="comments-fanhui" @click="back">
			<img src="../../../assets/images/back.png">
		</div>
		<div>
			<span>评论(123)</span>
		</div>
	</div>
</template>

<script>

export default{
	name: 'topnav',
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
.comments-top-nav{
	position: fixed;
	top: 0;
	width: 100%;
	height: 44px;
	display: flex;
	flex-flow: row wrap;
	align-items:center;
	background-color: #f2f3f4;
	z-index: 9999;
}
.comments-fanhui{
	width: 25px;
	height: 25px;
	margin-left: 10px;
}
.comments-fanhui img{
	width: 100%;
	height: 100%;
}
.comments-top-nav div:nth-child(2){
	margin-left: 5px;
	color: #000;
}
</style>
