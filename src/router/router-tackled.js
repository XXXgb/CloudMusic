
import router from "./index";
import store from '../store/index.js'

router.beforeEach((to, from, next) => {
  //判断是否需要验证
  if(to.meta.requireAuth) {
    //通过sessionStorage判断是否已登录
    if(sessionStorage.getItem('token') == null) {
      next({path: '/login'})
    } else {
      next();
    }
  } else {
    next()
  }

  if(from.name == 'play'){
    let flag = true;
    store.commit('sq',flag);
  }

  //隐藏播放栏
  if(to.name == 'login' || to.name == 'register'  || to.name == 'userInfo' || to.name == 'comments' || to.name == 'play'){
    let flag = false;
    store.commit('sq',flag);
  }
  //隐藏播放栏
  if(from.name == 'login' || from.name == 'register' ){
    let flag = false;
    store.commit('sq',flag);
  }

  //隐藏播放栏
  if(from.name == 'userInfo'){
    let flag = false;
    store.commit('sq',flag);
  }
});

