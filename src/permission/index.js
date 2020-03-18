import router from '@/router'
import store from '@/store'
router.beforeEach(function (to, from, next) {
// 需要判断你的请求地址，和你的token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({
      path: '/login', // 要跳转的地址
      query: {
        // fullpath 和 path  的区别是 fullPath 会带 ?后面的参数 是一个完整的路径
        redirectUrl: to.fullPath // 告诉登录页 我没有完成 访问 你登录之后 一定要帮我完成
      }
    })
  } else {
    // 直接放行
    next()
  }
})
