<template>
	<div class="navbar-box">
		<router-link to="/musichome">
			<div :class="{addunderline : '/'===$route.path}">推荐</div>
		</router-link>
		<router-link to="/paihang">
			<div :class="{addunderline : '/paihang'===$route.path}">排行</div>
		</router-link>
		<router-link to="/comments">
			<div :class="{addunderline : '/singer'===$route.path}">歌手</div>
		</router-link>
	</div>
	
</template>

<script>
export default{
	name: 'navbar',
}
</script>
<style>
a{
	text-decoration: none;
}
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
	height:100%;
	color: #fff;
	float: left;
	margin:0 11%;
	text-align: center;
	color: #e4e4e4;

}
.navbar-box :active{
	border-bottom: 2px solid #e4e4e4;
}
/*点击时，添加下划线*/
.addunderline{
	font-size: 18px;
}
</style>
