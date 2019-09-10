<template>
	<div class="play-box">
		<groundglass></groundglass>
		<playheader></playheader>
		<playmiddlebackground></playmiddlebackground>
		<playbottomplayfield></playbottomplayfield>
	</div>
</template>

<script>
import groundglass from './components/groundglass.vue'
import playheader from './components/play-top-nav.vue'
import playmiddlebackground from './components/play-middle-background.vue'
import playbottomplayfield from './components/play-bottom-playfield.vue'


export default{
	name: 'play',
	data(){
		return {

		}
	},
	components:{
		groundglass,
		playheader,
		playmiddlebackground,
		playbottomplayfield
	},
	methods:{
		//让播放栏升起
		changeflag(){
			let flag = true;
			this.$store.commit('sq',flag);
			console.log(this.$store.state.flag)
		}
	},
	mounted:function(){
		this.changeflag();
	}
	
}
</script>

<style>
.play-box{
	position: relative;
	z-index: 9999!important;
}
</style>


