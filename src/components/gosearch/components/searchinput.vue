<template>
	<div class="search-box">
		<div class="imgstyle fanhui" @click="back">
			<img src="../../../assets/images/fanhui.png">
		</div>
		<div class="searchmusic">
			<input type="text" placeholder="搜索音乐、歌词、歌单" id="searchmusic" @input="inputfun">
		</div>
		<div class="imgstyle cha" @click="removecontent">
			<img src="../../../assets/images/cha.png">
		</div>
		
	</div>
</template>

<script>
import bus from './bus.js'
export default{
	name: 'searchinput',
	data(){
		return {
			result:''
		}
	},
	methods:{
		removecontent(){
			let content = document.querySelector('.searchmusic input');
			content.value = '';
		},
		jiaodian(){
			var searchmusic = document.querySelector('#searchmusic');
			searchmusic.focus();
		},
		inputfun(){
			this.$http.get('http://musicapi.leanapp.cn/search?keywords=周杰伦').then(function(result){
				// console.log(result)
				this.result = result;
			})
		},
		//回退到上一页
		back(){
			history.go(-1);
		}
		
		

	},
	mounted:function(){
		this.jiaodian();
	}
	
}
</script>

<style>
.imgstyle{
	width:25px;
	height:25px;
	margin-left: 2%;
	float: left;
}
.fanhui{
	position: absolute;
	left: 1%;
	top: 25%;
}
.cha{
	position: absolute;
	right: 2%;
	top: 25%;
}
.imgstyle img{
	width:100%;
	height: 100%;

}
.searchmusic{
	float: left;
	width:76%;
	height: 80%;
	padding-left: 2%;
	position: absolute;
	left: 10%;
	top: 10%;
}
.searchmusic input{
	width:100%;
	height: 80%;
  	background-color: #d44439;
	border: none;
	border-bottom: 1px solid #f2f3f4;
	margin: 0 auto;
	padding-left: 2%;
	color: #fff;
	font-size: 14	px;
}
.search-box{
	width:100%;
	height: 45px;
	background-color: #d44439;
	clear: both;
	position: relative;
}

</style>
