import {axiosRequest} from './index.js'
import {host} from './host.js'

export function lunbo(){
	const url = host + '/banner'
	return axiosRequest(url)
}