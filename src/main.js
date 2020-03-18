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

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
