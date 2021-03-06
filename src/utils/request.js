import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '../router'
import { getToken,removeToken } from '@/utils/auth'

// create an axios instance
const self=this
const service = axios.create({
  baseURL: "http://ad.kurite.com/api/v1/", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log("sss1122222",error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code===1) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (!getToken() ) {
        // to re-login
        Message({
          type: "error",
          message: res.msg|| 'Error',
          duration: 1000
        })
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // })
        .then(() => {
          store.dispatch('user/resetToken').then(() => {
            // location.reload()
            router.push({name:'Login'})
          })
        })
      }
      Message({
        type: "error",
        message: res.msg|| 'Error',
        duration: 1000
      });
      return Promise.reject(res.msg)
    } else {
      return res
    }
  },
  error => {
    console.log('errsssss3' ,error.response.status) // for debug
    if(error.response.status==401){
      store.dispatch('user/resetToken').then(() => {
        router.push({name:'Login'})
      })
    }
    // Message({
    //   message: error.message,
    //   type: 'error',   
    //   duration: 5 * 1000
    // })
    Message({
      type: "error",
      message: error.msg|| '连接超时',
      duration: 1000
    });
    return Promise.reject('连接超时')
  }
)

export default service
