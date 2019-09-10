<template>
	<div class="groundglass">
		<div class="groundglass-box"  :style="{backgroundImage: 'url(' + $store.state.musicdetail.al.picUrl + ')' }">
		</div>
	</div>
</template>

<script>

export default{
	name: 'groundglass',
	
}
</script>

<style>
.groundglass{
	width:100%;
	height: 667px;
	position: relative;
	z-index: 1000;
	background-color: #f1f1f1;
}
.groundglass-box{
	width:100%;
	height: 100%;
	filter: blur(80px);
	overflow: hidden;
	z-index: -100;
}
/*.groundglass-header{
	width: 100%;
	height:44px;
	background-color: red;
}*/
</style>
