// 工具：拦截器 请求管理工具
import axios from 'axios'

// 大数字问题
import JSONBig from 'json-bigint' // 引入大数字插件
import store from '@/store' // 引入vuex中的store实例对象
import router from '@/router'
//* ----------------------------------------1.url的引入+大数字问题--------------------------------------------------------- */
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

//* ---------------------------------------2.请求拦截器---------------------------------------------------------- */
// token的注入，应该在请求之前，也就是请求拦截器
// 之前pc端是在axios直接注入，但是因为重新new了 instance所以应对 instance注入
// 实例 拦截器 请求 使用  （请求拦截器）
instance.interceptors.request.use(function (config) { // config是axios时间的url+axios默认的参数进行合并
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
//* ------------------------------------3.响应拦截器------------------------------------------------------------- */
// 响应拦截器功能： 因为axios里面给我们默认加了一层data
// data 有两层（axios一层加上接口与里面默认又给加了一层）
// 作用：用响应拦截器处理返回结果的数据  以及将多嵌套的data 结构出来
instance.interceptors.response.use(function (response) {
  // response已经被默认包了一层data
  try {
    return response.data.data
  } catch {
    // 如果失败,说明response.data不存在 两层解不开就返回一层（这一层为axios默认包的）
    return response.data
  }
}, function (error) {
// 如果失败/失效/其他错误 会进入响应拦截器的错误区域
// 只要是401，就是token失效（应将用导航守卫将没有token的拦截在外面）
//* ------------------------------------4.请求失效------------------------------------------------------------- */
  if (error.response && error.response.status === 401) {
    if (store.state.user.refresh_token) {
      // 有续命的药 refresh_token
    } else {
      // 无续命的药 refresh_token  直接死亡进登录
      router.push('/login') // 直接跳到登录无可厚非，但是要做更复杂的场景
      // 登陆成功需要重新跳到该页面
      // 在跳到登录页面的过程中将当前页面的地址传输给登录页面
      // 登录成功后，先判断有没有需要跳转的地址=》如果没跳转到主页/有跳转到该页面
      // 怎样获取地址？ router.currentRoute.fullPath/path/hash (根据使用场景决定)
      router.push({
        path: '/login',
        query: {
          redirectUrl: router.currentRoute.fullPath // 登录页跳转的地址
        }
      })
    }
  }
  //* ------------------------------------------------------------------------------------------------- */
  return Promise.reject(error) // 返回执行链的catch
})

export default instance
