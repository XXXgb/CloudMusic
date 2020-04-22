<template>
	<div class="list-top-nav">
		<div class="list-fanhui" @click="back">
			<img src="../../../assets/images/fanhui.png">
		</div>
		<div>
			<span>歌单</span>
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

<style scoped>
.list-top-nav{
	position: fixed;
	top: 0;
	width: 100%;
	height: 44px;
	background: rgba(212, 68, 57, 0) none repeat scroll 0% 0%;
	display: flex;
	flex-flow: row wrap;
	align-items:center;
	z-index: 9999;
}
.list-fanhui{
	width: 25px;
	height: 25px;
	margin-left: 10px;
}
.list-fanhui img{
	width: 100%;
	height: 100%;
}
.list-top-nav div:nth-child(2){
	margin-left: 5px;
	color: #f2f3f4;
}
</style>
