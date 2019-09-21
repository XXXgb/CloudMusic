import axios from 'axios'
import {host} from './host.js'

export function recommendsonglist(){
	const url = host + '/personalized'
	return axios.get(url)
}