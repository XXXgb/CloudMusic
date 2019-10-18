//最近播放音乐列表中，如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
//否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
export function latelyplay(recentplaylist,id,arr,arr1){
	if(recentplaylist){
	  let recentplaylistFlag = recentplaylist.findIndex((item,inex) => item.id == id);
	  //判断最近播放列表里是否已经有相同的音乐，如果有，把它删除，再追加到数组头部，如果没有，直接追加到数组头部
	  if(recentplaylistFlag == '-1'){
	  	//如果recentplaylistFlag等于-1，则说明数组中未找到相同的音乐，所以直接在头部追加
	  	recentplaylist.unshift(arr1);
	  	window.localStorage.setItem('recentplaylist',JSON.stringify(recentplaylist));
	  }else{
	  	// 如果recentplaylistFlag不等于-1，则说明数组中找到相同的音乐
	 	//删除
	  	recentplaylist.splice(recentplaylistFlag,1);
	  	//在头部追加
	  	recentplaylist.unshift(arr1);
	  	window.localStorage.setItem('recentplaylist',JSON.stringify(recentplaylist));
	  }
	 }else{
	 	window.localStorage.setItem('recentplaylist',JSON.stringify(arr));
	 }
}


//判断当前播放音乐处于playalllist的哪个位置，将该位置的音乐变为红色并突出
export function panduan(id){
	let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
	let selIndex = playalllist.findIndex((item,index) => item.id == id);
	let selId = playalllist[selIndex].id
	if(selIndex > -1){
		return {selId,selIndex};
	}else{
		return null;
	}
}

export function playall(length,list){
	//获取歌曲共有多少首
	let songListLength = length;
  	let arr = [];
  	let playalllist = JSON.parse(window.localStorage.getItem('playalllist'));
	//遍历歌单，将歌曲存储到songlist中
	for(let i = 0;i<songListLength;i++){
		arr[i] = list[i];
	}
	window.localStorage.setItem('playalllist',JSON.stringify(arr));
}