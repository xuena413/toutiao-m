/**
 *1.专门处理小函数和常用的过滤器函数
 *2.在main.js里面进行函数挂载
 */
import dayjs from 'dayjs' // 引入dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间的插件
import 'dayjs/locale/zh-cn' // dayjs 不会自动引入语言包 默认只支持英文语言包
dayjs.extend(relativeTime) // 相当于 dayjs扩展 相对时间的方法 这个方法写完之后 dayjs 就有了form方法
export default {
  // 导出一个默认对象
  install (Vue) {
    //   该方法会在Vue.use时调用
    // 执行此行代码时 Vue.prototype.$notify 应该已经挂载完成
    Vue.prototype.$xnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
    // 给Vue的原型属性赋值一个函数 自定义一个函数名  传入一个形参
    Vue.prototype.$sleep = sleep // 给原型属性赋值 所有的组件都有了这个属性
    // ---------------------------------过滤器分为全局过滤器和局部过滤器  此处用的全局过滤器----------------------------------------
    /* 全局过滤器
     Vue.filter('relTime', function (value) {
     //必须有return
     return
     }) */
    // 此处的relTime函数代替 下面的时间间隔函数
    Vue.filter('relTime', relTime) // 定义一个全局过滤器，一旦注册任意位置都可以使用
  }
}

// time=500 如果你传入了用time 用你的，如果说你没传time用500
function sleep (time = 500) {
// 返回 一个promise
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}

/**
 * 此函数用来对day.js进行本地的语言包转化
 */
function relTime (date) {
  return dayjs().locale('zh-cn').from(date) // 当前时间距离传入时间有多远
}
