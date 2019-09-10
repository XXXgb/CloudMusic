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
// 使用轮播插件swiper
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})