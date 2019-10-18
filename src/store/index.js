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
		playFlag: false,
		playalllist:[],
		//判断playlist中哪个id音乐需要高亮的标志
		playlistid: 0,
		EndFlag: true,
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
		},
		//点击播放全部后，保存所有音乐
		setplayalllist(state,list){
			state.playalllist = list;
		},
		//保存playlist当前正在播放的是第几首音乐的index
		setplaylistindex(state,id){
			state.playlistid = id;
		},
		//是否播放结束进入下一首的标志
		setendflag(state,f){
			state.EndFlag = f;
		}
	}
})

//3.导出对象
export default store