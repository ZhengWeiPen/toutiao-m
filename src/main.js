import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入Vant组件
import { Dialog, Cell, Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem } from 'vant'
import 'vant/lib/button/style'

// 导入全局样式
import './styles/index.less'

// 动态设置rem基准值
import 'amfe-flexible'

// 注册Vant组件
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
