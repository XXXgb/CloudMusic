import axios from 'axios'
import {host} from './host.js'

export function musicplayurl(id){
	const url = host + `/music/url?id=${id}`
	return axios.get(url)
}

export function musicdetail(id){
	const url = host + `/song/detail?ids=${id}`
	return axios.get(url)
}