<template>
	<div class="songlist-box">
		<div class="recommend">
			<span>推荐歌单</span>
		</div>
		<div class="list-box">
			<ul>
				
					<li v-for="(item,index) in result" v-bind:key="item.id" @click="getsonglistdetail(item.id,index)">
						
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
import {recommendsonglist} from '../../../api/recommendsonglist.js'
export default{
	name: 'lunbo',
	data(){
		return {
			result: {},
			songlistdetail: [],
			priority: []
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
			recommendsonglist().then(res => {
				//处理数据
				console.log(res)
				this.result = res.data.result;
				console.log(this.result)
				
				
			})
		},
		//当点击推荐歌单时，先把排行榜的名字和背景保存到store中，以便优先list.vue头部优先渲染
		//再跳转到list中，由list.vue实现歌单列表的获取
		getsonglistdetail(id,index){
			this.priority = this.result[index];
			this.$store.commit('priority',this.priority);
			console.log(this.$store.state.priorityRender)
			this.$router.push({
					path: '/songlist'
			})	
		},
		
		// priorityRender(id,index){
		// 	this.priority = this.result[index];
		// 	this.$store.commit('priority',this.priority);
		// 	console.log(this.$store.state.priorityRender)
		// }
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
