<template>
  <div class="register-box">
    <div style="width:100%;height: 100%;background: rgba(0,0,0,.4);display: flex;align-items: center;display: flex;flex-direction: column;justify-content: center;position: relative;">
      <div class="register-input" style="margin-bottom: 10px;">
        <Input type="text" size="large" prefix="ios-person" placeholder="输入用户名" clearable style="width:240px;" v-model="user">
        </Input>
      </div>
      <div class="register-input" style="margin-bottom: 10px;">
        <Input prefix="md-key" maxlength="16" size="large" type="password" placeholder="输入密码" password style="width:240px;" v-model="password">
        </Input>
      </div>
      <div class="register-input" style="margin-bottom: 10px;">
        <Input type="text" size="large" prefix="ios-call" placeholder="输入手机号码" clearable style="width:240px;" v-model="phoneNumber">
        </Input>
      </div>
      <checkoutCodeTemp style="margin-bottom: 10px;width:240px;" @checkoutFun="checkoutFun"></checkoutCodeTemp>
      <Button style="background: rgba(125,94,94,0.8);width:180px;letter-spacing:10px;text-indent:5px;" shape="circle" :class="{ 'input-open-font-color' :  this.checkoutSuccessFlag === false }"  @click="register()" :disabled="checkoutSuccessFlag">注册</Button>
      <div style="position: fixed; bottom: 20px;width:240px;border-top: 1px solid #fff;">
				<span style="display: flex;justify-content: center;padding-top: 10px;">
					<router-link to="/login">
						<span style="margin:0 auto;color:#fff;letter-spacing:2px;">登陆</span>
					</router-link>
				</span>
      </div>
    </div>
  </div>
</template>

<script>
import {userCheckout,passwordLengthFormatCheckout,phoneCheckout} from '../../../common/common.js'
import {registerAPI} from '../../../api/user.js'
import checkoutCodeTemp from './checkoutCode.vue'
import util from '../../../util/util.js'
export default{
  	name: 'registerComment',
  	components:{
  		checkoutCodeTemp
  	},
    data(){
    	return {
    		user: '',
    		password: '',
    		phoneNumber: '',
    		checkoutSuccessFlag: true
    	}
    },
    mounted(){
    },
    methods:{
    	//启用注册按钮
    	checkoutFun(val){
    		this.checkoutSuccessFlag = val;
    	},
    	register(){
    		let user = this.user.trim();
    		let password = {password:this.password.trim()}
    		let phoneNumber = this.phoneNumber.trim();
    		let addTime = util.dateFormater('YYYY-MM-DD',new Date())
    		//校验用户名是否有空白字符或中文字符
    		userCheckout(user)
        .then((res)=>{
          if(res.err === 0){
            //校验密码长度、格式是否合法
            return passwordLengthFormatCheckout(password)
          }else{
            this.$Message.error(res.msg);
          }
        })
        .then((res)=>{
          if(res.err === 0){
            //校验输入的手机号码是否合法
            return phoneCheckout(phoneNumber)
          }else{
            this.$Message.error(res.msg);
          }
        })
        .then((res)=>{
          if(res.err==0){
            //当全部验证完成后，发起注册请求
            return registerAPI({user:user,password:this.password,phoneNumber:phoneNumber,addTime:addTime})
          }else{
            this.$Message.error(res.msg)
          }
        })
        .then((res)=>{
          if(res.data.err === 0){
            this.$Message.success(res.data.msg)
          }else{
            this.$Message.error(res.data.msg)
          }
        })
        .catch((res)=>{

        })
    	},
    }
}
</script>

<style>
.register-box{
	width: 100%;
	height: 100%;
	background: url('../../../assets/images/login-background.jpg');
	background-size: cover;
}
.register-input .ivu-input{
	background: rgba(0,0,0,0.5);
	color: #fff;
}
.input-open-font-color{
	color: #fff;
}
.register-box .ivu-btn.disabled, .ivu-btn.disabled.active, .ivu-btn.disabled:active, .ivu-btn.disabled:focus, .ivu-btn.disabled:hover, .ivu-btn[disabled], .ivu-btn[disabled].active, .ivu-btn[disabled]:active, .ivu-btn[disabled]:focus, .ivu-btn[disabled]:hover, fieldset[disabled] .ivu-btn, fieldset[disabled] .ivu-btn.active, fieldset[disabled] .ivu-btn:active, fieldset[disabled] .ivu-btn:focus, fieldset[disabled] .ivu-btn:hover{
	color:#b08989;
}
</style>
