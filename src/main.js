import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.less'
import '@/permission'

import 'vant/lib/index.less' // 引入less这里改成less因为我们想修改某些变量
import plugin from '@/utils/plugin' // 引入插件

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(plugin) // 注册插件 在Vant后面放置，是因为要plugin中用vant的内置函数
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
