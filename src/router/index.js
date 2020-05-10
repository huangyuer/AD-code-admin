import Vue from 'vue'
import Router from 'vue-router'
import Material from '@/views/details/material'
import MaterialPic from '@/views/details/material/components/MaterialPic'
import MaterialVid from '@/views/details/material/components/MaterialVid'

Vue.use(Router)

let router= new Router({
  linkActiveClass: 'navitemActive',
  routes: [
    {
      path: '/',
      redirect:'/article',
      component: () => import('@/views/articleManagement'),
      name: 'Article',
    },
    {
      path: '/demo',
      component: () => import('@/components/demo'),
      name: 'Demo',
    },
        {
      path: '/login',
      component: () => import('@/views/login'),
      name: 'Login',
    }, 
    {
      path: '/exportLog',
      component: () => import('@/views/exportManagement/ExportLog.vue'),
      name: 'ExportLog',
    },
    {
      path: '/batchExport',
      component: () => import('@/views/exportManagement/BatchExport.vue'),
      name: 'BatchExport',
    },
    {
      path: '/userManagement',
      component: () => import('@/views/userManagement/UserManagement.vue'),
      name: 'UserManagement',
    },
    {
      path: '/userAction',
      component: () => import('@/views/userManagement/UserAction.vue'),
      name: 'UserAction',
    },
    {
      path: '/pointsShop/add',
      component: () => import('@/views/pointsManagement/components/addGoods.vue'),
      name: 'AddGoods',
    },
    {
      path: '/pointsShop/alter',
      component: () => import('@/views/pointsManagement/components/alterGoods.vue'),
      name: 'AlterGoods',
    },
    {
      path: '/pointsShop',
      component: () => import('@/views/pointsManagement/PointsShop.vue'),
      name: 'PointsShop',
    },
    {
      path: '/pointsExchange',
      component: () => import('@/views/pointsManagement/PointsExchange.vue'),
      name: 'PointsExchange',
    },
    {
      path: '/pointsEarn',
      component: () => import('@/views/pointsManagement/PointsEarn.vue'),
      name: 'PointsEarn',
    },
    {
      path: '/hospitalMap',
      component: () => import('@/views/hospitalMap'),
      name: 'HospitalMap',
    },
    {
      path: '/article',
      component: () => import('@/views/articleManagement'),
      name: 'Article',
    },
    {
      path: '/article/add',
      component: () => import('@/views/articleManagement/components/addArticle.vue'),
      name: 'AddArticle',
    },
    {
      path: '/article/alter',
      component: () => import('@/views/articleManagement/components/alterArticle.vue'),
      name: 'AlterArticle',
    },
    {
      path: '/video',
      component: () => import('@/views/videoManagement'),
      name: 'Video',
    },
    {
      path: '/videoLive',
      component: () => import('@/views/videoLive'),
      name: 'VideoLive',
    },
    {
      path: '/video/alter',
      component: () => import('@/views/videoManagement/components/alterVideo.vue'),
      name: 'AlterVideo',
    },
    {
      path: '/Video/add',
      component: () => import('@/views/videoManagement/components/addVideo.vue'),
      name: 'AddVideo',
    },
    {
      path: '/message',
      component: () => import('@/views/messageManagement'),
      name: 'Message',
    },
    {
      path: '/message/check',
      component: () => import('@/views/messageManagement/components/messageCheck.vue'),
      name: 'MessageCheck',
    },
    {
      path: '/material/materialPic',
      name: 'Material',
      component: Material,
      meta:{
        requireAuth:true,
      },
      children: [{
        path: '/material/materialPic',
        name: 'MaterialPic',
        component: MaterialPic,
        meta:{
          requireAuth:true,
        },
      }, {
        path:'/material/materialVid',
        name:'MaterialVid',
        component:MaterialVid,
      }]
    },

  ],
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {x:0,y:0}
    }
  },

})
export default router



