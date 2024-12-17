import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from './config'
import store from '../store/index.js'

const routes = [
{
  path: '/login',
  name: 'login',
  component: () => import('../views/public/Login.vue')
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/public/Register.vue')
},
{
  path: '/home',
  name: 'home',
  component: () => import('../views/public/Home.vue')
},
{
  path: '/favorites',
  name: 'favorites',
  component: () => import('../views/public/Favorites.vue')
},
{
  path: '/profile',
  name: 'profile',
  component: () => import('../views/public/Profile.vue')
},
{
  path: '/mainbox',
  name: 'mainbox',
  component: () => import('../views/admin/MainBox.vue')
},
{
  path: '/',
  redirect: '/home',
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['login','register', 'home', 'favorites', 'profile']
//路由守卫，没有登陆不能访问
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.name)) {
    next()
  } else {
    //如果授权（已经登陆过）next()
    //如果没有授权（没有登陆过）跳转到登录页面
    if (!localStorage.getItem('token')) {
      next({ name: 'home' })
    } else {
      if (!store.state.isGetterRouter) {
        ConfigRouter()
        next()
      } else {
        next()
      }
    }
  }
})
const ConfigRouter = () => {
   RoutesConfig.forEach(item => {
    router.addRoute('mainbox', item)
   })
   //改变isGetterRouter的状态
   store.commit('changeGetterRouter', true)
}


export default router
