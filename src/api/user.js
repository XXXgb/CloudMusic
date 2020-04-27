import axios from 'axios'
import {host2} from './host.js'
import qs from 'qs'
//登陆接口调用
export function loginAPI(user,password){
	const url = host2 + '/user/login';
	const data = {user,password};
	//qs.stringify()将对象 序列化成URL的形式，以&进行拼接
	return axios.post(url,qs.stringify(data))
}

//注册接口调用
export function registerAPI(data){
	const url = host2 + '/user/reg';
	return axios.post(url,qs.stringify(data))
}

//获取本地推荐歌单
export function getIndexDetail(data){
	const url = host2 + '/capture/getIndexDetail?_id=5e7c1cb80681d739b01bb509'
	return axios.get(url)
}

//获取本地轮播歌曲
export function getSlideshow(data){
	const url = host2 + '/capture/getSlideshow?_id=5e7c1cb80681d739b01bb509'
	return axios.get(url)
}

//添加收藏歌曲
export function addCollect({_id,songId,songName,singerName,addTime}){
	const url = host2 + `/music/collect?_id=${_id}&songId=${songId}&songName=${songName}&singerName=${singerName}&addTime=${addTime}`
	return axios.get(url)
}

//查询收藏歌曲列表
export function findCollect(data){
	const url = host2 + `/music/find/collect?_id=${data}`
	return axios.get(url)
}

//查询个人歌曲评论
export function getMyComments({_id,songId}){
	const url = host2 + `/music/findComments?_id=${_id}&songId=${songId}`
	return axios.get(url)
}

//添加个人评论
export function addMyComments(data){
	const url = host2 + '/music/addComments'
	return axios.post(url,qs.stringify(data))
}

//删除个人评论
export function removeMyComments({_id,songId, commentsTime}){
	const url = host2 + `/music/removeComments?_id=${_id}&songId=${songId}&commentsTime=${commentsTime}`
	return axios.get(url)
}

//添加个人最近播放
export function addSelfLatelyPlay(data){
	const url = host2 + '/music/addSelfLatelyPlay'
	return axios.post(url,qs.stringify(data))
}

//查询最近播放音乐列表
export function getLatelyPlay(data){
	const url = host2 + `/music/getSelfLatelyPlay?_id=${data}`
	return axios.get(url)
}

//修改登陆密码
export function changePassword(data){
	const url = host2 + '/user/changePassword'
	return axios.post(url,qs.stringify(data))
}

//查询个人信息
export function getUserInfo(data){
  const url = host2 + `/user/getSelfInfo?_id=${data}`
  return axios.get(url)
}

//修改个人信息
export function changeSelfInfo(data){
  const url = host2 + '/user/changeSelfInfo'
  return axios.post(url,qs.stringify(data))
}

//上传头像后，保存头像服务器地址的URL到数据库
export function postSaveHeadImgUrl(data){
  const url = host2 + '/user/saveHeadImgUrl'
  return axios.post(url,qs.stringify(data))
}
