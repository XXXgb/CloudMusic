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

// 使用轮播插件swiper
Vue.use(VueAwesomeSwiper, /* { default global options } */)
//使用vue-resource
Vue.use(VueResource)
//使用vue-touch
Vue.use(VueTouch, {name: 'v-touch'})
//使用axios
Vue.use(axios)
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

router.afterEach((to,from,next) => {

    window.scrollTo(0,0);

})

