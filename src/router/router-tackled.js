
import router from "./index";


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
});

