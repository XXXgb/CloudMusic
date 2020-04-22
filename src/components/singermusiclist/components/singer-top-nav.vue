<template>
	<div class="singer-top-nav">
		<div class="singer-fanhui" @click="back">
			<img src="../../../assets/images/fanhui.png">
		</div>
		<div class="user-singer">
			<span>歌手</span>
		</div>
	</div>
</template>

<script>

export default{
	name: 'singertopnav',
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

<style scoped>
.singer-top-nav{
	position: fixed;
	top: 0;
	width: 100%;
	height: 44px;
	background: rgba(212, 68, 57, 0) none repeat scroll 0% 0%;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	z-index: 9999;
}
.singer-fanhui{
	width: 25px;
	height: 25px;
	margin-left: 10px;
}
.singer-fanhui img{
	width: 100%;
	height: 100%;
}
.singer-top-nav div:nth-child(2){
	margin-left: 5px;
	color: #f2f3f4;
}
</style>
