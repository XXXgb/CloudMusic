<template>
	<div class="login-margin-box">
		<loginback></loginback>
		<registerComment></registerComment>
	</div>
</template>

<script>
import registerComment from './components/register-Comment.vue'
import loginback from './components/register-top-nav.vue'


export default{
	name: 'login',
	data(){
		return {

		}
	},
	components:{
		registerComment,
		loginback
	},
	methods:{

	}
}
</script>

<style>
.login-margin-box{
	width:100%;
	height:100%;
}
</style>
