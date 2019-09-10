<template>
	<div class="nav">
		 <div class="nav-music">音乐馆</div>
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
	padding-left: 2%;color: #fff;
	font-size: 14px
	
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
}
</style>
