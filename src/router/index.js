import Vue from 'vue'
import Router from 'vue-router'
import musichome from '@/components/musichome/musichome.vue'
import gosearch from '@/components/gosearch/gosearch.vue'
import paihang from '@/components/paihang/paihang.vue'
import songlist from '@/components/songlist/songlist.vue'
import play from '@/components/play/play.vue'
import user from '@/components/user/user.vue'
import singermusiclist from '@/components/singermusiclist/singermusiclist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'musichome',
      component: musichome
    },
    {
      path: '/gosearch',
      name: 'gosearch',
      component: gosearch
    },
    {
      path: '/paihang',
      name: 'paihang',
      component: paihang
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: songlist
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/singermusiclist',
      name: 'singermusiclist',
      component: singermusiclist
    }
  ]
})


