<template>
	<div class="songlist-box">
		<div class="recommend">
			<span>推荐歌单</span>
		</div>
		<div class="list-box">
			<ul>
				
					<li v-for="item in result" v-bind:key="item.id" @click="getsonglistdetail(item.id)">
						
						<div class="songlist-img">
							<img v-bind:src="item.picUrl">
						</div>
						<!-- 此处对播放量做一个过滤器，把超过一万播放量的歌单，过滤掉后4位，用万字替代，比较简洁美观 -->
						<p class="bfl" v-if="item.playCount>10000">{{item.playCount | count}}万</p>
						<p class="bfl" v-if="item.playCount<10000">{{item.playCount}}</p>
						<div class="songlist-name">
							<p>{{item.name}}</p>
						</div>

					</li>
				
			</ul>
		</div>
	</div>
	
</template>

<script>
import bus from './bus.js'
export default{
	name: 'lunbo',
	data(){
		return {
			rsl_result: {},
			result: {},
			songlistdetail: []
		}
	},
	filters:{
		count:function(data){
			data = data.toString();
			data = data.substring(0,data.length-4);
			return data;
		}
	},
	methods: {
		//获取推荐歌单
		getrecommendsonglist(){
			this.$http.get('http://120.79.162.149:3000/personalized').then(res => {
				//处理数据
				this.rsl_result = {};
				this.rsl_result = res.body;
				this.result = this.rsl_result.result;
				if(this.rsl_result.code==200){
					// console.log(res);
					// console.log(this.result[0].playCount)
				}

			})
		},
		//获取歌单详情列表方法
		getsonglistdetail(id){
			this.$store.commit('getsonglistid',id)
			// 1.获取歌单
			let url = 'http://120.79.162.149:3000/playlist/detail?id=' + this.$store.state.songlistid;
			this.$http.get(url).then(res => {
				// console.log(res)
				this.songlistdetail = [];
				this.songlistdetail = res.body;
				
				this.$store.commit('getsonglistdetail',this.songlistdetail);
				console.log(this.songlistdetail);
				this.$router.push({
					path: '/songlist'
				})
				// this.sendsonglistid();
			})
			
		},
		// sendsonglistid(){
			
		// 	// 2.获取到歌单后通过bus发送到list.vue中
		// 	this.$nextTick(function () {
		// 		bus.$emit("sendsonglistdetail",this.songlistdetail);

		// 	})

		// },
			// 3.list.vue接收recommendsonglist.vue发送过来的数据
			// 4.list.vue将数据渲染到页面中
	},
	created:function(){
		this.getrecommendsonglist();
	}
}
</script>
<style>
.songlist-box{
	float: left;
	width:100%;
	height: 100%;
	padding: 0;
}
.recommend{
	width: 100%;
	padding-left: 2%;
	padding-top:4%;
	color: #2e3030;
	font-size: 14px;
	font-weight: bolder;

}
.list-box{
	width: 100%;
	margin-top: 10px;
}
.list-box ul{
	padding: 0;
	margin: 0;
	border: 0;
	overflow: hidden;
	
}
.list-box ul li{
	width:31.33%;
	height: 190px;
	list-style: none;
	float: left;
	padding: 0 1%;
	margin: 0;
	position: relative;
}
.songlist-img{
	
	margin: 0;
}
.songlist-img img{
	width: 100%;
	border-radius: 3px;
}
.songlist-name{
	font-size:11px;
	margin: 0;
	padding:0;

}
.bfl{
	padding: 0;
	margin: 0;
	position: absolute;
	top: 5px;
	right: 8px;
	font-size:10px;
	color: #f1f1f1;
}
</style>
