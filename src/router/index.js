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
const userInfo = () => import('@/components/userInfo/userInfo.vue')



Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'selectLAG',component: selectLAG,meta: {requireAuth: false,name: 'selectLAG'}},
    {path: '/login',name: 'login',component: login,meta: {requireAuth: false,name: 'login'}},
    {path: '/register',name: 'register',component: register,meta: {requireAuth: false,name: 'register'}},
    {path: '/musichome',name: 'musichome',component: musichome,meta: { requireAuth: true,name: 'musichome'}},
    {path:'/gosearch',name: 'gosearch',component: gosearch,meta: {requireAuth: true,name: 'gosearch'}},
    {path: '/paihang',name: 'paihang',component: paihang,meta: {requireAuth: true,name: 'paihang'}},
    {path: '/songlist',name: 'songlist',component: songlist, meta: {requireAuth: true,name: 'songlist'}},
    {path: '/play',name: 'play',component: play,meta: {requireAuth: true,name: 'play'}},
    {path: '/user',name: 'user',component: user,meta: {requireAuth: true,name: 'user'}},
    {path: '/singermusiclist',name: 'singermusiclist',component: singermusiclist,meta: {requireAuth: true,name: 'singermusiclist'}},
    {path: '/singer',name: 'singer',component: singer,meta: {requireAuth: true,name: 'singer'}},
    {path: '/comments',name: 'comments',component: comments,meta: {requireAuth: true,name: 'comments'}},
    {path: '/userInfo',name: 'userInfo',component: userInfo,meta: {requireAuth: true,name: 'userInfo'}},
  ]
})


