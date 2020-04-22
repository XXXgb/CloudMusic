<template>
	<div class="login-box">
		<div style="width:100%;height: 100%;background: rgba(0,0,0,.4);display: flex;align-items: center;display: flex;flex-direction: column;justify-content: center;position: relative;">
			<div class="login-input">
				<Input type="text" size="large" prefix="ios-person" placeholder="输入用户名" clearable style="width:240px;" v-model="user">
	        	</Input>
			</div>
			<div class="login-input" style="margin: 10px 0;">
				<Input prefix="md-key" size="large" type="password" placeholder="输入密码" password style="width:240px;" v-model="password">
	        	</Input>
			</div>
			<Button style="background: rgba(125,94,94,0.8);width:180px;color: #fff;letter-spacing:10px;text-indent:5px;" shape="circle" @click="login()">登陆</Button>
			<div style="position: fixed; bottom: 20px;width:240px;border-top: 1px solid #fff;">
				<span style="display: flex;justify-content: center;padding-top: 10px;">
					<router-link to="/register">
						<span style="margin:0 atuo;color:#fff;letter-spacing:2px;">注册账号</span>
					</router-link>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {loginAPI} from '../../../api/user.js'
export default{
  	name: 'loginComment',
    data(){
    	return {
    		user: '',
    		password: ''
    	}
    },
    methods:{
    	//登陆
    	login(){
    		let user = this.user.trim();
    		let password = this.password.trim();
    		if(user.length != '' && password.length != ''){
    			loginAPI(user,password)
				.then((data)=>{
					console.log(data)
					if(data.data.err==0){
						this.$Message.success('登陆成功')
						//登陆成功后，将token保存到localstorage中，以便后续查询操作验证登陆状态
						window.sessionStorage.setItem('token',JSON.stringify(data.data));
						this.$router.push({
							path: '/musichome'
						})
					}else{
						this.$Message.warning(data.data.msg);
					}
				})
    		}else{
    			this.$Message.warning('用户名或密码不能为空！');
    		}
    		
    	}
    },
}
</script>

<style>
.login-box{
	width: 100%;
	height: 100%;
	background: url('../../../assets/images/login-background.jpg');
	background-size: cover;
}
.login-input .ivu-input{
	background: rgba(0,0,0,0.5);
	color: #fff;
}
</style>
