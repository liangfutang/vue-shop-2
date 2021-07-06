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
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
