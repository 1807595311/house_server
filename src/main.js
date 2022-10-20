import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "@/utils/http";
import cookie from "vue-cookie";
import VueRouter from "vue-router";
import iView from "iview";
import tip from "@/utils/tip";
import "iview/dist/styles/iview.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(iView);
Vue.use(mavonEditor);
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$cookie = cookie;
Vue.prototype.$tip = tip;

// 解决路由连续跳转当前路径报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  let access_userInfo = cookie.get("access_userInfo");
  if(access_userInfo){
    store.state.userInfo = JSON.parse(access_userInfo);
  }else{
    store.state.userInfo = null;
  }
  const VerifyToken = ["/released_dynamics"];
  if (to.meta.title) document.title = to.meta.title;
  if (VerifyToken.indexOf(to.path) > -1) {
    if (access_userInfo) {
      let account_number = JSON.parse(access_userInfo).account_number;
      if (account_number) next();
      else next("/login");
    } else next("/login");
  }
  next();
});
router.afterEach(() => {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0; // firefox
  document.documentElement.scrollTop = 0; // safari
});

const _that = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
export default _that;
