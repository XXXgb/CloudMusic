import {axiosRequest} from './index.js'
import {host} from './host.js'

export function musicplayurl(id){
	const url = host + `/music/url?id=${id}`
	return axiosRequest(url)
}

export function musicdetail(id){
	const url = host + `/song/detail?ids=${id}`
	return axiosRequest(url)
}
