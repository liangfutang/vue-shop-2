import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 配置全局样式
import './assets/css/global.css'
// 导入图标样式
import './assets/fonts/iconfont.css'

import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:7777'
axios.defaults.timeout = 5000
// 拦截请求，为所有请求添加token参数
axios.interceptors.request.use(config => {
  // 如果是登录页则不设置
  if (config.url === '/api/private/v1/login') {
    return config
  }
  // 其他请求都要添加token字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
