import axios from 'axios'
import {host} from './host.js'

export function lunbo(){
	const url = host + '/banner'
	return axios.get(url)
}