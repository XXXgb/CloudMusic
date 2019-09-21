<template>
	<v-touch v-on:swiperight="swiperight">
		<div class="user-box">
			<usertopnav></usertopnav>
		</div>
	</v-touch>
</template>

<script>
import usertopnav from './components/user-top-nav.vue'



export default{
	name: 'user',
	data(){
		return {

		}
	},
	components:{
		usertopnav
	},
	methods:{
		swiperight(){
			history.go(-1);
		}
	}
}
</script>

<style>
.user-box{
	width:100%;
	height:500px;
	
}
</style>
