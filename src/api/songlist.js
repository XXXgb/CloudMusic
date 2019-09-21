import axios from 'axios'
import {host} from './host.js'
//获取歌单音乐列表
export function songlistdetail(id){
	const url = host + `/playlist/detail?id=${id}`
	return axios.get(url)
}
//获取歌手音乐列表
export function singerlistdetail(id){
	const url = host + `/artists?id=${id}`
	return axios.get(url)
}

//获取歌单排行榜
export function singerlistpaihang(id){
	const url = host + `/top/list?idx=${id}`
	return axios.get(url)
}