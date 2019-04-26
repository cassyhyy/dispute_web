import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'
import searchList from '@/components/page/searchList'
import detail from '@/components/page/detail'
import entering from '@/components/page/entering'
import common from '@/components/page/common'
import about from '@/components/page/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/entering',
      name: 'entering',
      component: entering
    },
    {
      path: '/common',
      name: 'common',
      component: common
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
