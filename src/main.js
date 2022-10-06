import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/http'
import tip from '@/utils/tip'
import confirm from '@/utils/confirm'
import cookie from 'vue-cookie'
import VueRouter from 'vue-router';
import  * as  echarts from 'echarts'
import VueAnimateNumber from 'vue-animate-number'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAnimateNumber)
Vue.prototype.$http = http;
Vue.prototype.$cookie = cookie;
Vue.prototype.$tip = tip;
Vue.prototype.$confirms = confirm;
Vue.prototype.$echarts = echarts;

// 解决路由连续跳转当前路径报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  let route_white_list = ['/register','/notfound'];
  let token = cookie.get(process.env.VUE_APP_TOKEN_NAME)
  if (to.meta.title) document.title = to.meta.title;

  if(route_white_list.indexOf(to.path) != -1) next();
  else if(!token) return next('/register');
  else if(token) return next();
  else return next('/notfound');
})

Vue.config.productionTip = false


const _that = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default _that