import axios from 'axios'

export function axiosRequest(url){
	let token = JSON.parse(window.sessionStorage.getItem('token'));
	if(token){
		return axios.get(url)
	}else{
		console.log('api被拦截了')
	}
}