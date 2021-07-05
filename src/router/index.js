import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录组件
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  // 空路由的时候跳转到登录页面
  {
    path: '/',
    redirect: '/login'
  },

  // 登录路由
  {
    path: '/login',
    name: '登录',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
