export const routes = [
    {
      path: "/",
      name: "Home",
      redirect: '/home',
      meta: {
        title: "首页",
      },
      component: () => import("@/views/home/Home.vue"),
    },
    {
      path: "/home_page",
      name: "HomePage",
      meta: {
        title: "首页",
      },
      component: () => import("@/views/home/HomePage.vue"),
      children: [ // 首页tab栏
        {
          path: "/home",
          name: "Home_Page",
          component: () => import("@/views/tabViews/HomePage.vue"),
          meta: {
            title: "首页"
          },
        },
        {
          path: "/more_dynamic",
          name: "MoreDynamic",
          // component: () => import("@/views/tabViews/MoreDynamic.vue"),
          meta: {
            title: "更多动态"
          },
        },
        {
          path: "/more_dynamic",
          name: "MoreDynamic",
          // component: () => import("@/views/tabViews/MoreDynamic.vue"),
          meta: {
            title: "设计机构"
          },
        },
        {
          path: "/released_dynamics",
          name: "ReleaseDynamics",
          component: () => import("@/views/tabViews/ReleaseDynamics.vue"),
          meta: {
            title: "发布动态"
          },
        },
      ],
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
  