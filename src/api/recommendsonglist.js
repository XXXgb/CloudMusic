import {host} from './host.js'
import {axiosRequest} from './index.js'

export function recommendsonglist(){
	const url = host + '/personalized'
	return axiosRequest(url)
}