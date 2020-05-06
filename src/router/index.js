import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/views/details/detail'
import Block from '@/views/details/block'
import Home from '@/views/details/home'
import MemberCompany from '@/views/details/memberCompany'
import Material from '@/views/details/material'
import AddDetail from '@/views/details/detail/components/addDetail'
import AlterDetail from '@/views/details/detail/components/alterDetail'
import OfficialMic from '@/views/details/block/components/OfficialMic'
import OfficialWeb from '@/views/details/block/components/OfficialWeb'
import MaterialPic from '@/views/details/material/components/MaterialPic'
import MaterialVid from '@/views/details/material/components/MaterialVid'

Vue.use(Router)

let router= new Router({
  linkActiveClass: 'navitemActive',
  routes: [
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
    
    // {
    //   path: '/',
    //   redirect: 'block/officialMic',
    //   name: 'Block',
    //   component: Block,
    //   meta:{
    //     requireAuth:true,
    //   },
    //   children: [{
    //     path: 'block/officialMic',
    //     name: 'OfficialMic',
    //     component: OfficialMic,
    //     meta:{
    //       requireAuth:true,
    //     },
    //   }, {
    //     path: 'block/officialWeb',
    //     name: 'OfficialWeb',
    //     component: OfficialWeb
    //   }]
    // },
    // {
    //   path: '/login',
    //   component: () => import('@/views/login'),
    //   name: 'Login',
    // },
    //  {
    //   path: '/detail',
    //   name: 'Detail',
    //   component: Detail,
    //   meta:{
    //     type:'官网',
    //   },
    // },
    // {
    //   path: '/weiDetail',
    //   name: 'WeiDetail',
    //   component: Detail,
    //   meta:{
    //     type:'官微',
    //   },
    // },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home,
    // },
    // {
    //   path: '/memberCompany',
    //   name: 'MemberCompany',
    //   component: MemberCompany,
    // },
    // {
    //   path: '/material/materialPic',
    //   name: 'Material',
    //   component: Material,
    //   meta:{
    //     requireAuth:true,
    //   },
    //   children: [{
    //     path: '/material/materialPic',
    //     name: 'MaterialPic',
    //     component: MaterialPic,
    //     meta:{
    //       requireAuth:true,
    //     },
    //   }, {
    //     path:'/material/materialVid',
    //     name:'MaterialVid',
    //     component:MaterialVid,
    //   }]
    // },
    // {
    //   path:'/material',
    //   name:'material',
    //   component:Material,
    // },
    // {
    //   path:'/material/materialPic',
    //   name:'MaterialPic',
    //   component:MaterialPic,
    // },
    // {
    //   path:'/material/materialVid',
    //   name:'MaterialVid',
    //   component:MaterialVid,
    // },
    {
      path: '/memberCompany/add',
      name: 'AddMember',
      component: () => import('@/views/details/memberCompany/components/AddMember'),
    },
    {
      path: '/memberCompany/alter',
      name: 'AlterMember',
      component: () => import('@/views/details/memberCompany/components/AlterMember'),
    },
    {
      path: '/detail/add',
      name: 'AddDetail',
      component: AddDetail,
    },
    {
      path: '/detail/alter',
      name: 'AlterDetail',
      component: AlterDetail,
    },
    {
      path: '/userStastics/memberInfo',
      name: 'MemberInfo',
      component: () => import('@/views/userStastics/memberInfo'),
    },
    {
      path: '/userStastics/importMember',
      name: 'ImportMember',
      component: () => import('@/views/userStastics/memberInfo/components/ImportMember'),
    },
    {
      path: '/userStastics/checkMember',
      name: 'CheckMember',
      component: () => import('@/views/userStastics/memberInfo/components/CheckMember'),
    },
    {
      path: '/userStastics/visitorInfo',
      name: 'VisitorInfo',
      component: () => import('@/views/userStastics/visitorInfo'),
    },
    {
      path: '/education/onlineExam',
      name: 'Education',
      component: () => import('@/views/education'),
    },
    {
      path: '/education/onlineExam/add',
      name: 'AddEducation',
      component: () => import('@/views/education/components/AddEducation'),
    },
    {
      path: '/education/onlineExam/alter',
      name: 'AlterEducation',
      component: () => import('@/views/education/components/AlterEducation'),
    },
    // {
    //   path: '/',
    //   component: Layout,
    //   redirect: '/dashboard',
    //   children: [
    //     {
    //       path: 'dashboard',
    //       component: () => import('@/views/detail/components/DetailTable'),
    //       name: 'DetailTable',
    //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //     }
    //   ]
    // },
    // {
    //   path: '/detail',
    //   name: 'DetailTable',
    //   components: DetailTable
    // }
    // children: [
    //   {
    //     path: 'detail1',
    //     name: 'DetailTable',
    //     component: DetailTable
    //   },
    //   {
    //     path: 'index/detail',
    //     name: 'DetailTable',
    //     component: DetailTable
    //   },
    // ]

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



