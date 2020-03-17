// 工具：拦截器 请求管理工具
import axios from 'axios'

// 大数字问题
import JSONBig from 'json-bigint' // 引入大数字插件
import store from '@/store' // 引入vuex中的store实例对象
const instance = axios.create({
// 构造参数 传入一些配置 和defaults一样
  baseURl: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 处理大数字问题
  // 此函数是后台响应回但是还没进入拦截器时执行 数组中可以写很多方法
  transformResponse: [function (data) {
  // data是后端响应回来的字符串
    return data ? JSONBig.parse(data) : {}
  }]

}) // 创建一个新实例相当于new

// token的注入，应该在请求之前，也就是请求拦截器
// 之前pc端是在axios直接注入，但是因为重新new了 instance所以应对 instance注入
// 实例 拦截器 请求 使用  （请求拦截器）
instance.interceptors.request.use(function (config) {
  // 方式1
//   if (store.state.user.token) {
//     // 成功时候需要读取配置信息，给配置信息中注入token
//     config.headers.Authorization = `Bearer ${store.state.user.token}` // 将token统一注入到headers中
//   }
  // 方式2 不用if else
  store.state.user.token && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config
}, function (error) {
  return Promise.reject(error) // 返回错误信息  直接进入到axios的catch中
})

export default instance