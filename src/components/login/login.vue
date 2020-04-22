<template>
	<div class="login-margin-box">
		<loginback></loginback>
		<loginComment></loginComment>
	</div>
</template>

<script>
import loginComment from './components/login-Comment.vue'
import loginback from './components/login-top-nav.vue'


export default{
	name: 'login',
	data(){
		return {

		}
	},
	components:{
		loginComment,
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
