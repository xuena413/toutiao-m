import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home'

Vue.use(VueRouter)
const Layout = () => import('@/views/layout')
const home = () => import('@/views/home')
const question = () => import('@/views/question')
const video = () => import('@/views/video')
const user = () => import('@/views/user')

// 其他一级路由
const chat = () => import('@/views/user/chat')
const login = () => import('@/views/login')
const profile = () => import('@/views/user/profile')
const search = () => import('@/views/search')
const searchresult = () => import('@/views/search/result')
const article = () => import('@/views/article')
// 用按需加载的方式配置路由
const routes = [{
  path: '/',
  name: 'Home',
  // component: Home
  component: Layout,
  children: [{
    path: '',
    component: home
  },
  {
    path: '/question',
    component: question
  },
  {
    path: '/video',
    component: video
  }, {
    path: '/user',
    component: user
  }]
}, {
  path: '/user/chat',
  component: chat
}, {
  path: '/login',
  component: login
}, {
  path: '/user/profile',
  component: profile
}, {
  path: '/search',
  component: search
}, {
  path: '/search/result',
  component: searchresult
},
{
  path: '/article',
  component: article
}
]

const router = new VueRouter({
  routes
})

export default router
