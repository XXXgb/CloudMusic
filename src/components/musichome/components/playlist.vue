<template>
	<div class="playlist-box" v-show="toggleFlag">
		<div class="playlist-cover" @click.stop.prevent="toggleplaylist"></div>
		<div class="playlist-modal">
			<div class="playlist-modal-order">
				<div>
					<span>123</span>
					<span>顺序播放(共{{playalllistLength}}首)</span>
					<span>213</span>
				</div>
			</div>
			<div class="playlist-modal-list nowrapper" ref="abc">
				<ul class="content">
					<li v-for="(item,index) in playalllist" @click.stop.prevent="getmusic(item.id,index)" :id="index" :ref="index" :class="{'active':item.id == $store.state.playlistid}">
						<span class="playlist-songname">{{item.name}}</span>
						<span class="playlist-remove"><img src="../../../../static/delete.png" @click.stop.prevent="remove(item.id)"></span>
					</li>
				</ul>
			</div>
			<div class="playlist-modal-close"></div>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {musicplayurl} from '../../../api/playmusicdetail.js'
import {musicdetail} from '../../../api/playmusicdetail.js'
import {latelyplay,panduan} from '../../../common/common.js'
export default{
	name: 'playlist',
	data(){
		return {
			toggleFlag: false,
			Flag:true,
			playalllist: [],
			playalllistLength: 0,
			playurl: '',
			flag: false,
			detail: []
		}
	},
	methods:{
		//初始化better-scroll
		initBscroll(){
			let activeindex = document.querySelector('.active').id;
			let that = this;
			//计算初始化playlist时，距离顶部的距离，实现当前播放音乐处于第顶部的效果
			let height = -(activeindex * 40);
			this.$nextTick(()=>{
				const playlistScroll = new BScroll('.nowrapper',{
					startY:200,
					stopPropagation:true,
					preventDefault:true,
					click:true,
					mouseWheel: true,  //允许pc端鼠标滚轮滚动列表
				})
				playlistScroll.scrollTo(0,height)
			})
			console.log('初始化了')
		},
		//显示隐藏playlist组件
		toggleplaylist(){
			this.toggleFlag = !this.toggleFlag;
			//当遮罩层显示时，禁用滚动条，当遮罩层消失的时候，启用滚动条
			if(this.toggleFlag){
				//禁用
				document.body.parentNode.style.overflow = "hidden";
			}else{
				//启用
				document.body.parentNode.style.overflow = "auto";
			}
			
		},
		//读取localstorage中的playalllist列表
		getplayalllist(){
			this.playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
			this.playalllistLength = this.playalllist.length;
			console.log(this.playalllist)
		},
		//获取音乐地址的方法
		getmusic(idx,index){
			console.log(idx)

			this.playurl = '';
			//使用vue-resource调用音乐播放地址的API，获取我们想要的播放地址
			musicplayurl(idx).then(res => {
				console.log(res)
				// console.log(res.data.data[0].url)
				//获取可以播放的url地址
				this.playurl = res.data.data[0].url;
				this.playmusic(this.playurl,index,idx);
			})
		},
		//播放音乐的方法
	    playmusic(url,index,idx){
	      let that = this;
	      if(url==null){
	      	alert('该音乐暂无版权，无法播放！')
	      	//当音乐播放结束后切换下一首音乐为无版权音乐时，将继续点击下一首音乐，直到有版权为止
			let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
	      	this.getmusic(playalllist[index+1].id,index+1)
	      }else{
		      this.flag = true;
		      document.querySelector('audio').src = url;
		      	//当进入播放页后，把播放的音乐添加进最近播放列表中
		      let recentplaylist = JSON.parse(window.localStorage.getItem('recentplaylist'));
		      let songname = this.playalllist[index].name;
		      let singername;
		      //歌单列表和歌手列表获取的数据不同，所以这里做一个判断，当前为歌单时，执行ture，为歌手时，执行false
		      if(this.playalllist[index].artists){
		      	singername = this.playalllist[index].artists[0].name;
		      }else{
		      	singername = this.playalllist[index].ar[0].name;
		      }
		      
		      let id = this.playalllist[index].id;
		      let arr = [{'songname': songname , 'singername': singername , 'id': id}];
		      let arr1 = {'songname': songname , 'singername': singername , 'id': id}
		      console.log(recentplaylist);
		      this.getdetail(idx);
		      // 如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
		      // 否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
		      latelyplay(recentplaylist,id,arr,arr1)

		      //获取当前正在播放音乐的索引
		      let p = panduan(idx);
		      console.log(p)
		      //this.$store.state.playlistindex==index，让正在播放的音乐高亮
		      this.$store.commit('setplaylistindex',id);
		      
	      }

	      
		},
		//获取所播放音乐的详情(背景图片和歌名)的方法
		getdetail(id){
			//let url = 'http://120.79.162.149:3000/song/detail?ids=' + id
			musicdetail(id).then(res=>{
				//此时detail中存放的有背景图和歌名
				this.detail = res.data.songs[0];
				//获取到音乐详情后，保存到store的musicdetail中
				console.log(res.data.songs[0])
				this.abc(this.detail);

			})
		},
		abc(detail){
			this.$store.commit('bcd',detail)
		},
		remove(id,event){
			let timer = null;
			let that = this;
			if(timer){
				clearTimeout(timer);
				deleteMusic();
			}else{
				setTimeout(function(){
					deleteMusic();
				},100)
			}
			function deleteMusic(){
				let list = JSON.parse(window.localStorage.getItem('playalllist'));
				//如果不用for循环，则会出现点击删除一首音乐而删除两首音乐的问题
				for(let i=0;i<list.length;i++){
					if(list[i].id === id){
						list.splice(i,1);
						window.localStorage.setItem('playalllist',JSON.stringify(list));
						console.log('删除了'+i)
						that.getplayalllist();
						break;
					}
				}
			}
			
			
		},
		//音乐播放结束进入下一首的方法
		goNextMusic(){
			let p = panduan(this.$store.state.musicdetail.id);
			let index = p.selIndex;
			console.log(p)
			//模拟点击切换下一首操作
			let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
			this.getmusic(playalllist[index+1].id,index+1)
			console.log(playalllist[index+1]);
			this.$store.commit('setendflag',true)
		}

	},
	mounted:function(){
		this.getplayalllist();
	},
	watch:{
		computedEndFlag(newVal,oldVal){
			if(newVal == false){
				let that = this;
				let timer = null;
				if(timer){
					clearTimeout(timer);
					that.goNextMusic();
				}else{
					timer = setTimeout(function(){
						that.goNextMusic();
					},100)
				}
			}
			
		},
		toggleFlag(newVal,oldVal){
			if(newVal){
				this.initBscroll();
			}
		}
	},
	computed:{
		//监听computedEndFlag的值是否为false，如果为false，则触发watch中的监听，执行播放下一首音乐的操作
		computedEndFlag(){
			return this.$store.state.EndFlag
		}
	}

}
</script>
<style>
.playlist-box{
	z-index:9999;
	width:100%;
	height:100%;
	position: absolute;
	left: 0;
	top: 0;
}
.playlist-cover{
	width:100%;
	height:100%;
	z-index: 5000;
	background: rgba(0,0,0,0.4);
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0.6;
}
.playlist-modal{
	width: 100%;
	height: 340px;
	position: fixed;
	bottom: -2px;
	background-color: #f2f3f4;
	z-index: 9999;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	overflow: hidden;
}
.playlist-modal-order{
	width:80%;
	height:25px;
	padding: 15px 10% 10px 10%;
}
.playlist-modal-order div{
}
.playlist-modal-order div span:nth-child(3){
	float: right;
}
.playlist-modal-list{
	width:100%;
	height:240px;
	overflow: hidden;
}
.playlist-modal-close{
	width:100%;
	height:50px;
}
.playlist-modal-list ul{
	padding: 0;
	margin:0;
}
.playlist-modal-list ul li{
	width: 100%;
	height:40px;
	padding: 0;
	list-style: none;
	padding-left: 30px;
	display: flex;
	align-items: center;
}
.playlist-modal-list ul li .playlist-songname{
	display: inline-block;
	width:70%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.active{
	color:red;
}
.playlist-modal-list ul li .playlist-remove{
	display: inline-block;
	width:20px;
	height:20px;
	margin-left: 10%;
}
.playlist-modal-list ul li .playlist-remove img{
	width:100%;
	height:100%;
}
</style>
