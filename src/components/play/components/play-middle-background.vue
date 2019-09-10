<template>
	<div class="play-middle-box">
		<div class="play-middle-background-outerbox">
			<div class="play-middle-background-innerbox">
				<img :src="$store.state.musicdetail.al.picUrl">
			</div>
		</div>
	</div>
</template>

<script>

export default{
	name: 'playmiddlebackground',
	data(){
		return {
			topvalue: 0,
		}
	},
	methods:{
		
	},
	mounted:function(){
		
	}
}
</script>

<style>
.play-middle-box{
	width: 100%;
	height: 420px;
	position: absolute;
	top: 75px;
	left: 0;
	display: flex;
	flex-flow: row wrap;
	align-content: center;
	z-index: 9999;
}
.play-middle-background-outerbox{
	width:300px;
	height:300px;
	border-radius: 50%;
	margin: 0 auto;
	display: flex;
	flex-flow: row wrap;
	align-content: center;
	background-color: rgba(0,0,0,0.2);
}
.play-middle-background-innerbox{
	width:270px;
	height:270px;
	border-radius: 50%;
	margin: 0 auto;
	overflow: hidden;
	border: none;
}
.play-middle-background-innerbox img{
	width: 100%;
	height:100%;
	animation: rotate 25s linear infinite;

}
</style>
