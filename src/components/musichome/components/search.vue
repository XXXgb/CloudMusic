<template>
	<div class="nav">
		 <!--<router-link to="/user">-->
			 <div class="search-user">
			 	<img src="../../../assets/images/gang.png" @click="openUser">
			 </div>
		 <!--</router-link>-->
		 <div class="nav-music">Cloud Music</div>
		 <router-link to="/gosearch">
			 <div class="searchdiv">
			 	<input type="text" placeholder="搜索" id="search">
			 </div>
		 </router-link>
		 <Drawer placement="left" :closable="false" v-model="drawerValue">
	        <Row style="height: 100%;">
	        	<Col span="24" style="height: 150px;display:flex;justify-content: center;align-items: center;flex-direction:column;border-bottom: 1px solid #e8e8e8;background-color: #f7f3f3;">
	        		<div style="width:70px; height: 70px;">
	        			<img src="../../../assets/images/109951162913202465.jpg" style="width:100%;height:100%;border-radius: 50%;overflow: hidden;" />
	        		</div>
	        		<span style="margin-top: 10px;font-size:16px;">许贵斌</span>
	        	</Col>
	        	<Col span="24" style="height: 100px;display: flex;justify-content: center;align-items: center;border-bottom: 1px solid #e8e8e8;">
	        		<div class="user-info-nav" @click="goCollectPage()">
        				<Icon type="md-cube" size="40" style="color:#76528c;"/>
        				<span style="color:#76528c;">我的收藏</span>
	        		</div>
	        		<div class="user-info-nav" @click="goLatelyPlayPage()">
        				<Icon type="md-musical-notes" size="40" style="color:#bb6d74;"/>
        				<span style="color:#bb6d74;">最近播放</span>
	        		</div>
	        	</Col>
	        	<Col span="24" class="user-info-tab" @click.native=" $router.push({ path: '/userInfo'}) ">
	        		<Icon type="logo-pinterest" size="30" style="margin-left:10px;color:#a97ac6;"/>
	        		<span style="color: #a97ac6;margin-left: 10px;font-size:16px;">个人信息</span>
	        	</Col>
	        	<Col span="24" class="user-info-tab" @click.native=" changePasswordModalValue = true ">
	        		<Icon type="logo-pinterest" size="30" style="margin-left:10px;color:#a1462f;"/>
	        		<span style="color: #a1462f;margin-left: 10px;font-size:16px;">密码修改</span>
	        	</Col>
	        	<Col span="24" class="user-info-tab" @click.native=" shareWebModalValue = true ">
	        		<Icon type="md-share" size="30" style="margin-left:10px;color:#ff3e3e;"/>
	        		<span style="color: #ff3e3e;margin-left: 10px;font-size:16px;">分享网站</span>
	        	</Col>
	        	<Col span="24" class="user-info-tab" @click.native="logOut()">
	        		<Icon type="logo-pinterest" size="30" style="margin-left:10px;color:#04dd0a;"/>
	        		<span style="color: #04dd0a;margin-left: 10px;font-size:16px;">退出登录</span>
	        	</Col>
	        </Row>
	    </Drawer>
	    <Modal
        v-model="shareWebModalValue"
        :closable="false"
        footer-hide>
        	<vue-qr :text="config.webUrl" :size="200"></vue-qr>
    	</Modal>
    	<Modal
        v-model="changePasswordModalValue"
        :closable="false"
        footer-hide>
        	<div style="width:100%;height:100%;display:flex;align-items:center;flex-direction:column;">
        		<Input v-model="originalPassword" type="password" password placeholder="输入当前密码" style="width: 200px;margin: 10px 0;" />
        		<Input v-model="newPassword" type="password" password placeholder="输入新密码" style="width: 200px;margin: 10px 0;" />
        		<Input v-model="confirmNewPassword" type="password" password placeholder="确认新密码" style="width: 200px;margin: 10px 0;" />
        		<div style="">
        			<Button style="margin:30px 5px 0px 5px;" @click.native=" changePasswordModalValue = false ">退出</Button>
        			<Button type="primary" style="margin:30px 5px 0px 5px;" @click.native="changePassword()">修改</Button>
        		</div>
        	</div>
    	</Modal>
	</div>
</template>

<script>
import VueQr from 'vue-qr';
import {changePassword} from '../../../api/user.js'
import {passwordCheckout,passwordLengthFormatCheckout} from '../../../common/common.js'
export default{
	name: 'search',
	components: { VueQr },
	data(){
		return {
			v: document.querySelector('#search'),
			drawerValue: false,
			shareWebModalValue:false,
			config:{
				webUrl: 'http://192.168.102.41:8080'
			},
			changePasswordModalValue:false,
			originalPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		}
	},
	methods:{
		openUser(){
			this.drawerValue = true;
		},
		goCollectPage(){
			this.$router.push({
				name: 'user',
				query: {
					name: 'myCollect'
				}
			})
		},
		goLatelyPlayPage(){
			this.$router.push({
				name: 'user',
				query: {
					name: 'latelyPlay'
				}
			})
		},
		//修改密码
		changePassword(){
			let that = this;
			let data = {password:this.newPassword,repetitionPassword:this.confirmNewPassword};
			let _id = JSON.parse(window.sessionStorage.getItem('token'))._id;
			let param = {_id,password:this.originalPassword,newPassword:this.confirmNewPassword};
			let passwordObj = {password:this.newPassword};
			passwordCheckout(data).then( res => {
				if(res.err === 0){
					return passwordLengthFormatCheckout(passwordObj)
				}else{
					that.$Message.error(res.msg);
				}
			})
			.then( res => {
				if(res.err === 0){
					return changePassword(param);
				}else{
					that.$Message.error(res.msg);
				}
			})
			.then( res => {
				if(res.data.err === 0){
					that.$Message.success(res.data.msg);
				}else{
					that.$Message.error(res.data.msg);
				}
				
			})
			.catch( err => {
				
			})
			this.originalPassword = '';
			this.newPassword = '';
			this.confirmNewPassword = '';
		},
		//退出登陆
		logOut(){
			//删除sessionStorage中的token
			window.sessionStorage.removeItem('token');
			this.$router.push({
				name: 'login'
			})
		}
	},

}
</script>

<style scoped>
.nav{
	width:100%;
	height:70px;
	background-color: #d44439;
	float: left;
}
.nav input{
	border-radius: 5px;
	width:98%;
	height: 100%;
	background-color:#F65555;
	border: none;
	margin: 0 auto;
	padding-left: 2%;
	color: #e4e4e4;;
	font-size: 14px;
	
}
.searchdiv{
	width:95%;
	height: 30px;
	margin: 5px auto;
	background-color: #d44439;
}
.nav-music{
	font-size: 16px;
	color:#fff;
	text-align: center;
	padding: 5px 0;
}
.search-user{
	width: 25px;
	height: 25px;
	position: absolute;
	top: 5px;
	left: 10px;
}
.search-user img{
	width: 100%;
	height: 100%;
}

.user-info-nav{
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.user-info-tab{
	height: 60px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e8e8e8;
}

</style>
