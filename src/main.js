import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/phoneReset.css"
import * as utils from './utils/tools'
import { Icon, Popover, Button, Popup, DatetimePicker, Toast, Dialog, NoticeBar, Search, CheckboxGroup, Checkbox } from 'vant'

Vue.config.productionTip = false
Vue.prototype.$utils = utils;
Vue.use(Icon).use(Button).use(NoticeBar).use(Search).use(CheckboxGroup).use(Checkbox)
Vue.use(Toast).use(Dialog)
Vue.use(Popover).use(Popup).use(DatetimePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
