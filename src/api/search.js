import axios from 'axios'
import {host} from './host.js'

export function hotsearch(){
	const url = host + '/search/hot'
	return axios.get(url)
}

export function singerurl(keywords){
	const url = host + `/search/suggest?keywords=${keywords}`
	return axios.get(url)
}

export function songlisturl(keywords,offset){
	const url = host + `/search?keywords=${keywords}` + `&offset=${offset}`
	return axios.get(url)
}