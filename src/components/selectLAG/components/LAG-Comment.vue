<template>
	<div class="LAG-box">
		<router-link to="/login">
			<div class="LAG LAG-login">账号登陆</div>
		</router-link>
		<router-link to="/register">
			<div class="LAG LAG-register">用户注册</div>
		</router-link>
	</div>
</template>

<script>

export default{
  	name: 'LAGComment',
    data(){
    	return {
    		
    	}
    },
    methods:{
    	
    },
    created:function(){
    	
    }
}
</script>

<style>
.LAG-box{
	width:100%;
	height: 100%;
	position: relative;
	background-color: #d44439;
}
.LAG{
	width:60%;
	height:40px;
	text-align: center;
	line-height: 40px;
	border-radius: 50px;
	box-sizing: border-box;
}
.LAG-login{
	position: absolute;
	top: 60%;
	left: 50%;
	margin-left: -30%;
	margin-top: 25px;
	background-color: #fff;
	border: 1px solid #fff;
	color: #d44439;
}
.LAG-register{
	position: absolute;
	top: 68%;
	left: 50%;
	margin-left: -30%;
	margin-top: 25px;
	background-color: #d44439;
	border: 1px solid #fff;
	color: #fff;
}
</style>
