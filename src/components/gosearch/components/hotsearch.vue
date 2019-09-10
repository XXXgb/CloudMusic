<template>
	<div class="hotsearch-wai">
		<div class="hotsearch-nei">
			<span>热门搜索</span>
			<ul>
				<li v-for="(item,index) in songName" v-bind:key="item.id">{{item.first}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import bus from './bus.js'
export default{
	name:'hotsearch',
	data(){
		return {
			hotlist: {},
			songName: []
		}
	},
	methods:{
		gethotsearch(){
			this.$http.get('http://120.79.162.149:3000/search/hot').then(res => {
				// res = eval(res);
				// console.log(res)
				// console.log(res.bodyText)
				//将res中的json数据转换为json对象，方便对数据的操作
				var sss = JSON.parse(res.bodyText);
				//转换完，获取10首热门歌曲
				this.hotlist = sss.result.hots;
				console.log(this.hotlist)
				//将十首热门歌曲存到hotsch中
				this.songName = [];
				for(let i=0;i<this.hotlist.length;i++){
					this.songName[i] = this.hotlist[i];
					console.log(this.songName[i]);
				}
				

			})
		}
	},
	created:function(){
		this.gethotsearch();
	},
	mounted:function(){
		
	}
}
</script>

<style>
.hotsearch-wai{
	width:100%;
	height: 600px;
	padding-top: 7.5%;
}
.hotsearch-nei{
	width:85%;
	min-height: 82.5%;
	margin-left: 7.5%;
}
.hotsearch-nei span{
	font-size: 14px;
	color: #757575;
}
.hotsearch-nei ul{
	padding: 0;
}
.hotsearch-nei ul li{
	list-style: none;
	border: 1px solid #ccc;
	border-radius: 5px;
	float: left;
	margin-right: 5px;
	margin-bottom: 10px;
	padding: 3px;
}
</style>
