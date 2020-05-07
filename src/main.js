// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/**************ueditor******************* */
// import '../static/ueditor/ueditor.config.js'
// import '../static/ueditor/ueditor.all.min.js'
// import '../static/ueditor/lang/zh-cn/zh-cn.js'
// import '../static/ueditor/ueditor.parse.min.js'
/********************************* */

import Axios from 'axios'
import { getToken } from '@/utils/auth'
import qs from 'qs';
Vue.prototype.$qs = qs;


Vue.prototype.$axios = Axios

Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  document.body.scrollTop=0
});

router.beforeEach((to, from, next) => {
  if(store.getters.getMenus.length<=0&&getToken()){
     store.dispatch('common/getMenus')
  }
  if(Object.is(to.name,'Login')) {
    next();
    return
  }
  
  if(getToken()) {
    next();
  }else {
    router.push({name:'Login'})
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
