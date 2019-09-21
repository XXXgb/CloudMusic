import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)
//2.创建对象
const store = new Vuex.Store({
	state:{
		musicdetail: {
			"name": "",
			"ar": [{"name": ""}],
			"al": {"picUrl": ""}
		}
		,
		musictime: 0,
		songlistid: 0,
		songlistdetail: [],
		musicid: 0,
		//flag为播放栏是否升起的标志
		flag: false,
		priorityRender: [],
		priorityRenderSinger: [],
		playurl: '',
		playFlag: false
	},
	mutations:{
		//接收lunbo.vue传过来的音乐detail
		bcd(state,detail){
			state.musicdetail = detail;
		},
		//接收recommendsonglist或getpaihang.vue传过来的歌单id
		getsonglistid(state,id){
			state.songlistid = id;
		},
		//接收recommendsonglist传过来的歌单详情
		getsonglistdetail(state,detail){
			state.songlistdetail = detail;
		},
		sq(state,fl){
			state.flag = fl;
		},
		priority(state,detail){
			state.priorityRender = detail;
		},
		prioritysinger(state,detail){
			state.priorityRenderSinger = detail;
		},
		//保存播放音乐的url
		playUrl(state,url){
			state.playurl = url;
		},
		//音乐播放或暂停的标志
		changePlayFlag(state,flag){
			state.playFlag = flag;
		}

	}
})

//3.导出对象
export default store