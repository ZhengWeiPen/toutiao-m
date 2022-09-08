import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant组件
import { Button } from 'vant'
import 'vant/lib/button/style'
// 导入全局样式
import './styles/index.less'

// 注册Vant组件
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
