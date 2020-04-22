<template>
	<div class="comments">
		<topnav></topnav>
		<hotcomments></hotcomments>
	</div>
</template>

<script>
import topnav from './components/top-nav.vue' 
import hotcomments from './components/hot-comments.vue'

export default{
	name: 'comments',
	data(){
		return {

		}
	},
	components:{
		topnav,
		hotcomments
	},
	methods:{

	}
}
</script>

<style>
.comments{
	position:relative;
	z-index: 9999!important;
}
</style>
