<template>
	<div class="paihang-box">
		<div class="bangdan" v-for="(item,index) in list" v-bind:key="item.id" @click="getsonglistdetail(item.playlist.id)">
			<div class="bangdan-img">
				<img v-bind:src="item.playlist.coverImgUrl">
			</div>
			<div class="bangdan-songlist">
				<ul>
					<li>1.  {{item.playlist.tracks[0].al.name}} - {{item.playlist.tracks[0].ar[0].name}}</li>
					<li>1.  {{item.playlist.tracks[1].al.name}} - {{item.playlist.tracks[1].ar[0].name}}</li>
					<li>1.  {{item.playlist.tracks[2].al.name}} - {{item.playlist.tracks[2].ar[0].name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import bus from './../../musichome/components/bus.js'
export default{
	name: 'getpaihang',
	data(){
		return {
			list: [],
		}
	},
	methods:{
		//定义一个获取榜单的公共类
		
		//继承Father类中的获取榜单的方法，以此获取网易原创歌曲榜单
		// var ldh = new Father(6);
		// ldh.getAll();
		//获取原创榜单
		getoriginallist(){
			this.$http.get('http://120.79.162.149:3000/top/list?idx=2').then(res => {
				if(res.body.code == 200){
					this.list = [],
					this.list.push(res.body);
					console.log(res.body)
					this.getituneslist();
				}
			})
			
		},
		//获取iTunes榜
		getituneslist(){
			this.$http.get('http://120.79.162.149:3000/top/list?idx=8').then(res => {
				if(res.body.code == 200){
					this.list.push(res.body);
					this.getchinalist();
				}
			})
		},
		//获取内地TOP排行榜
		getchinalist(){
			this.$http.get('http://120.79.162.149:3000/top/list?idx=15').then(res => {
				if(res.body.code == 200){
					this.list.push(res.body);
					this.gethklist();
				}
			})
		},
		//获取话语金曲榜
		gethklist(){
			this.$http.get('http://120.79.162.149:3000/top/list?idx=17').then(res => {
				if(res.body.code == 200){
					this.list.push(res.body);
					this.gethiphoplist();
				}
			})
		},
		//获取uk排行周榜
		gethiphoplist(){
			this.$http.get('http://120.79.162.149:3000/top/list?idx=18').then(res => {
				if(res.body.code == 200){
					this.list.push(res.body);
				}
			})
		},
		// 当点击排行榜时，把歌单id保存到store的state.songlistid中
		// 再执行获取音乐详情的操作，获取歌名和背景图等，接着跳转到songlist页面
		getsonglistdetail(id){
			this.$store.commit('getsonglistid',id)
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
		}
		//获取歌单详情列表方法
		// getsonglistdetail(id){
		// 	this.$store.commit('getsonglistid',id)
		// 	// 1.获取歌单
		// 	let url = 'http://120.79.162.149:3000/playlist/detail?id=' + this.$store.state.songlistid;
		// 	this.$http.get(url).then(res => {
		// 		// console.log(res)
		// 		this.songlistdetail = [];
		// 		this.songlistdetail = res.body;
				
		// 		this.$store.commit('getsonglistdetail',this.songlistdetail);
		// 		console.log(this.songlistdetail);
		// 		this.$router.push({
		// 			path: '/songlist'
		// 		})
		// 		// this.sendsonglistid();
		// 	})
			
		// },
		
	},
	created:function(){
		this.getoriginallist();
	},
}
</script>

<style>
.paihang-box{
	float: left;
	width: 100%;
}
.bangdan{
	width:96%;
	height: 100px;
	padding: 5px 2%;
	border-bottom: 1px solid #e4e4e4;
}
.bangdan-img{
	float: left;
	width:100px;
	height: 100px;
}
.bangdan-img img{
	width: 100%;
	height: 100%;
	border-radius: 3px;
}
.bangdan-songlist{
	float: left;
}
.bangdan-songlist ul{
	padding: 0 0 0 25px;
	font-size: 12px;
	color: #2e3030;
}
.bangdan-songlist ul li{
	list-style: none;
	margin-top: 12px;
}
</style>
