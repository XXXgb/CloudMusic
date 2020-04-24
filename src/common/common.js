//最近播放音乐列表中，如果一开始就已经有最近播放的列表，则把原有的列表读取出来，再追加新播放的音乐
//否则，新建一个recentplaylist本地存储，再将播放的音乐添加进最近播放列表中
export function latelyplay(songname,singername,id){
	let recentplaylist = JSON.parse(window.localStorage.getItem('recentplaylist'));
	let arr = [{'songname': songname , 'singername': singername , 'id': id}];
	let arr1 = {'songname': songname , 'singername': singername , 'id': id};
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

//校验注册时输入的用户名是否合法
export function userCheckout(data){
	//检查用户名是否有中文字符
	let chinese = /[\u4e00-\u9fa5]/;
	//检查用户名是否有空白字符
	let legalSymbols = /\s/;
	let promise;
	return promise = new Promise(function(resolve,reject){
		if(data.length >= 3 && data.length <= 16){
			if(chinese.test(data) || legalSymbols.test(data))
			{
			    return resolve({err:-1,msg:'账号不合法，请重新输入！'})
			}else{
				return resolve({err:0,msg:'用户名合法！'})
			}
		}else if(data.length === 0){
			return resolve({err:-2,msg:'用户名不能为空，请重新输入！'})
		}else if(data.length < 3){
			return resolve({err:-3,msg:'用户名应过短，请重新输入！'})
		}
	})
}

//校验注册时两次输入的密码是否相同
export function passwordCheckout(data){
	let passwdPromise;
	return passwdPromise = new Promise(function(resolve,reject){
		//先判断是否有输入密码
		if(data.password.length != 0 && data.repetitionPassword.length != 0){
			//再判断密码前后是否相同
			if(data.password == data.repetitionPassword){
    			return resolve({err:0,msg:'用户名和密码验证合法！'})
    		}else{
    			return resolve({err:-3,msg:'两次密码输入不一致，请重新输入！'})
    		}
		}else{
			return resolve({err:-4,msg:'密码不能为空，请重新输入！'})
		}
	})
}

//校验注册时输入的电话号码是否合法
export function phoneCheckout(data){
	let phoneLegal = /0?(13|14|15|18)[0-9]{9}/;
	let phonePromise;
	return phonePromise = new Promise(function(resolve,reject){
		if(data.length!=0){
			if(phoneLegal.test(data)){
				//合法
				return resolve({err:0,msg:'合法！'})
			}else{
				//不合法
				return resolve({err:-5,msg:'手机号码不合法，请重新输入！'})
			}
		}else{
			return resolve({err:-6,msg:'手机号码不能为空，请重新输入！'})
		}
	})
}

//校验密码长度、格式是否合法
export function passwordLengthFormatCheckout(data){
	let passwdPromise;
	//检查用户名是否有中文字符
	let chinese = /[\u4e00-\u9fa5]/;
	//检查用户名是否有空白字符
	let legalSymbols = /\s/;
	return passwdPromise = new Promise(function(resolve,reject){
		//判断长度
		if(data.password.length >= 8){
			//判断格式
			if(chinese.test(data.password) || legalSymbols.test(data.password))
			{
			    return resolve({err:-1,msg:'密码格式不正确，请重新输入！'})
			}else{
				return resolve({err:0,msg:'密码长度格式均正确！'})
			}
		}else{
			return resolve({err:-4,msg:'密码少于8位，请重新输入！'})
		}
	})
}
