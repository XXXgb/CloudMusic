// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入路由插件vue-resource
import VueResource from 'vue-resource'
//引入轮播插件swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入轮播插件css
import 'swiper/dist/css/swiper.css'
//引入vuex插件
import store from './store'
//引入vue-touch
import VueTouch from 'vue-touch'
//引入axios
import axios from 'axios'
//引入iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//引入vue-qr
import VueQr from 'vue-qr';
//路由卫士
import '@/router/router-tackled.js';

// 使用轮播插件swiper
Vue.use(VueAwesomeSwiper, /* { default global options } */)
//使用vue-resource
Vue.use(VueResource)
//使用vue-touch
Vue.use(VueTouch, {name: 'v-touch'})
//使用axios
Vue.use(axios)
Vue.use(ViewUI);
// 在vue原型中定义一个$axios方法
Vue.prototype.$axios = axios

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

/*router.beforeEach((to,from,next)=>{
	//token存在时为已登陆状态，不存在则为未登陆状态
	let token = JSON.parse(window.sessionStorage.getItem('token'));
	//判断当前跳转的路由是否需要在登陆状态下才能访问
	if(to.matched.some(res => res.meta.requireAuth)){
		//判断是否已经登陆
		if(token.token){
			//已登陆，则继续执行
			next()
		}else{
			//未登录，则重定位回登陆注册选择页面
			next('/')
		}
	}else{
		//无需登陆即可访问的页面，即/login和/register和/这三个页面
		next();
	}


});*/

/*router.beforeEach((to, from, next) => {
  //判断是否需要验证
  if(to.meta.requireAuth) {
    //通过sessionStorage判断是否已登录
    if(sessionStorage.getItem('token') == null) {
      console.log(1111);
      console.log(from)
      next({path: '/login'})
    } else {
      console.log(222);
      console.log(from)
      next();
    }
  } else {
    console.log(from)
    next()
  }

});*/

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
})

