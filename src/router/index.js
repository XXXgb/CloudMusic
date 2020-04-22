import Vue from 'vue'
import Router from 'vue-router'
// import musichome from '@/components/musichome/musichome.vue'
const musichome = () => import('@/components/musichome/musichome.vue')
import gosearch from '@/components/gosearch/gosearch.vue'
// const gosearch = () => import('@/components/gosearch/gosearch.vue')
import paihang from '@/components/paihang/paihang.vue'
// import songlist from '@/components/songlist/songlist.vue'
const songlist = () => import('@/components/songlist/songlist.vue')
// import play from '@/components/play/play.vue'
const play = () => import('@/components/play/play.vue')
import user from '@/components/user/user.vue'
// import singermusiclist from '@/components/singermusiclist/singermusiclist.vue'
const singermusiclist = () => import('@/components/singermusiclist/singermusiclist.vue')
import singer from '@/components/singer/singer.vue'
const selectLAG = () => import('@/components/selectLAG/selectLAG.vue')
const login = () => import('@/components/login/login.vue')
const register = () => import('@/components/register/register.vue')
const comments = () => import('@/components/comments/comments.vue')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/musichome',
      name: 'musichome',
      component: musichome,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/gosearch',
      name: 'gosearch',
      component: gosearch,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/paihang',
      name: 'paihang',
      component: paihang,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: songlist,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/play',
      name: 'play',
      component: play,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/singermusiclist',
      name: 'singermusiclist',
      component: singermusiclist,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      meta: { 
      requireAuth: true
      },
    },
    {
      path: '/',
      name: 'selectLAG',
      component: selectLAG,
      meta: { 
      requireAuth: false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { 
      requireAuth: false
      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { 
      requireAuth: false
      },
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments,
      meta: { 
      requireAuth: true
      },
    },
  ]
})


