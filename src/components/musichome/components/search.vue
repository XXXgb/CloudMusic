<template>
	<div class="nav">
		 <router-link to="/user">
			 <div class="search-user">
			 	<img src="../../../assets/images/gang.png">
			 </div>
		 </router-link>
		 <div class="nav-music">Cloud Music</div>
		 <router-link to="/gosearch">
			 <div class="searchdiv">
			 	<input type="text" placeholder="搜索" id="search" @click="gosearch()">
			 </div>
		 </router-link>
	</div>
</template>

<script>
export default{
	name: 'search',
	data(){
		return {
			v: document.querySelector('#search'),
		}
	},
	methods:{
		gosearch(){

		}
	},

}
</script>

<style>
.nav{
	width:100%;
	height:70px;
	background-color: #d44439;
	float: left;
}
.nav input{
	border-radius: 5px;
	width:98%;
	height: 100%;
	background-color:#F65555;
	border: none;
	margin: 0 auto;
	padding-left: 2%;
	color: #e4e4e4;;
	font-size: 14px;
	
}
.searchdiv{
	width:95%;
	height: 30px;
	margin: 5px auto;
	background-color: #d44439;
}
.nav-music{
	font-size: 16px;
	color:#fff;
	text-align: center;
	padding: 5px 0;
}
.search-user{
	width: 25px;
	height: 25px;
	position: absolute;
	top: 5px;
	left: 10px;
}
.search-user img{
	width: 100%;
	height: 100%;
}
</style>
