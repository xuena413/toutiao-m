/**
 *1.专门处理小函数和常用的过滤器函数
 *2.在main.js里面进行函数挂载
 */
export default {
  // 导出一个默认对象
  install (Vue) {
    //   该方法会在Vue.use时调用
    // 执行此行代码时 Vue.prototype.$notify 应该已经挂载完成
    Vue.prototype.$xnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
    // 给Vue的原型属性赋值一个函数 自定义一个函数名  传入一个形参
    Vue.prototype.$sleep = sleep // 给原型属性赋值 所有的组件都有了这个属性
  }
}

// time=500 如果你传入了用time 用你的，如果说你没传time用500
function sleep (time = 500) {
// 返回 一个promise
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
