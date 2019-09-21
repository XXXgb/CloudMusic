<template>
	<div class="navbar-box">
		<router-link to="/">
			<div>推荐</div>
		</router-link>
		<router-link to="/paihang">
			<div>排行</div>
		</router-link>
		<router-link to="/user">
			<div>歌手</div>
		</router-link>
	</div>
	
</template>

<script>
export default{
	name: 'navbar',
}
</script>
<style>
.navbar-box{
	width:100%;
	height: 30px;
	background-color: #d44439;
	overflow: hidden;
	z-index: 9999;
	line-height:30px;
}
.navbar-box div{
	width:10%;
	color: #fff;
	float: left;
	margin:0 11%;
	text-align: center;
	color: #e4e4e4;

}
.navbar-box :active{
	border-bottom: 2px solid #e4e4e4;
}
</style>
