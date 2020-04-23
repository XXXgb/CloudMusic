
import router from "./index";


router.beforeEach((to, from, next) => {
  //判断是否需要验证
  // console.log(to.meta.requireAuth);
  // console.log(to);
  // console.log(sessionStorage.getItem('token'));
  if(to.meta.requireAuth) {
    //通过sessionStorage判断是否已登录
    if(sessionStorage.getItem('token') == null) {
      console.log(1111);
      next({path: '/login'})
    } else {
      console.log(222);
      next();
    }
  } else {
    next()
  }
});

