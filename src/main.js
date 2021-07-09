import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 配置全局样式
import './assets/css/global.css'
// 导入图标样式
import './assets/fonts/iconfont.css'

import axios from 'axios'
import { Message } from 'element-ui'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:7777'
axios.defaults.timeout = 5000

// 拦截请求request，为所有请求添加token参数
axios.interceptors.request.use(config => {
  // 如果是登录页则不设置
  if (config.url === '/api/private/v1/login') {
    return config
  }
  // 其他请求都要添加token字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 拦截返回response，对非200的返回显示提示消息
axios.interceptors.response.use(response => {
  return response
},
error => {
  if (error.response.status) {
    var messageStr = error.response.data && error.response.data.meta && error.response.data.meta.msg ? error.response.data.meta.msg : error.name
    switch (error.response.status) {
      case 400:
        Message({
          message: messageStr,
          type: 'error'
        })
        break
      default:
        Message({
          message: '请求服务端异常',
          type: 'error'
        })
    }
  }
  return Promise.reject(error.response)
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
