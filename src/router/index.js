import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录组件
import Login from '../components/Login.vue'
// 登录后显示的主页面
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
// 挂载权限组件
import Rights from '../components/power/Rights.vue'
// 角色组件
import Roles from '../components/power/Roles.vue'
// 商品分类
import Cat from '../components/goods/category/Cat.vue'
// 商品列表
import List from '../components/goods/List.vue'
// 商品参数
import Params from '../components/goods/Params.vue'

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
  },

  // 登录成功后跳转到的主页面
  {
    path: '/home',
    name: '主页面',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: '主页欢迎页', component: Welcome },
      { path: '/users', name: '用户列表页', component: Users },
      { path: '/rights', name: '权限管理', component: Rights },
      { path: '/roles', name: '角色管理', component: Roles },
      { path: '/cats', name: '商品分类', component: Cat },
      { path: '/goods', name: '商品列表', component: List },
      { path: '/params', name: '商品参数', component: Params }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫，对跳转做的一个token跳转限制
// 路由跳转规则
router.beforeEach((to, from, next) => {
  // 如果是要去登录，那么直接放行
  if (to.path === '/login') return next()
  // 如果不是去登录，那么需要获取token，如果没有token，那么需要跳转去登录
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // 符合上述条件的则正常的去跳转
  next()
})

export default router
