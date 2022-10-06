export const routes = [
    {
      path: "/",
      name: "Home",
      meta: {
        title: "首页",
      },
      component: () => import("@/views/home/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      meta: {
        title: "登录",
      },
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/register_ord",
      name: "RegisterOrd",
      meta: {
        title: "用户注册",
      },
      component: () => import("@/views/RegisterOrd.vue"),
    },
    {
      path: "/register_des",
      name: "RegisterDes",
      meta: {
        title: "设计机构注册",
      },
      component: () => import("@/views/RegisterDes.vue"),
    }
  ];
  