<template>
	<div class="login-top-nav">
		<div class="login-back" @click="back">
			<Icon type="md-arrow-back" size="25"/>
		</div>
		<div>
			<span>账号登陆</span>
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
			history.go(-1)
		}
	},
}
</script>

<style>
.login-top-nav{
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
.login-back{
	width: 25px;
	height: 25px;
	margin-left: 10px;
}
.login-back img{
	width: 100%;
	height: 100%;
}
.login-top-nav div:nth-child(2){
	margin-left: 5px;
	color:#2c2c2c;
}
</style>
