import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/phoneReset.css"
import * as utils from './utils/tools'
import * as api from './utils/apis'
import { Icon, Popover, Button, Popup, DatetimePicker, Toast, Dialog, NoticeBar, Search, CheckboxGroup, Checkbox, Picker } from 'vant'

Vue.config.productionTip = false
Vue.prototype.$utils = utils;
Vue.prototype.$apis = api
Vue.use(Icon).use(Button).use(NoticeBar).use(Search).use(CheckboxGroup).use(Checkbox)
Vue.use(Toast).use(Dialog)
Vue.use(Popover).use(Popup).use(DatetimePicker).use(Picker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
