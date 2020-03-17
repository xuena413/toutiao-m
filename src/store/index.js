/**
 * store专门处理vuex中的模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

/* 导入token的方式一
import { getUser } from '@/utils/auth' */

// import Test, { a, c } from '@/test'
// import * as Obj from '@/test'
// // 普通导入
// console.log(Test)
// console.log(a)
// console.log(c)
// // 一下导入
// console.log(Obj)

// 导入token的方式2
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 放置需要共享的状态
    // user里面存了俩值，一个是{ token:'',refrshtoken:'' }
    user: auth.getUser() // 就是token信息的对象

  },
  mutations: {
  // 修改token
    updateUser (state, payload) {
      state.user = payload.user // 定义载荷中的user数据给state
      // 将最新的数据存入本地缓存
      auth.setUser(payload.user) // vuex与本地存储同步
    },

    // 删除token   此时不同传载荷
    delUser1 (state) {
      state.user = {} // 将
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
