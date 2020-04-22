import {axiosRequest} from './index.js'
import {host} from './host.js'

export function commentsDetail(id,offset){
	const url = host + `/comment/music?id=${id}&offset=${offset}`
	return axiosRequest(url)
}

