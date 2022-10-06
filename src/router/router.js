export const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    meta: {
      title: "首页test",
    },
    component: () => import("@/views/home/Home.vue"),
  },
  // 首页导航菜单---开始
  {
    path: "/home",
    name: "HomePage",
    meta: {
      title: "首页",
      icon: "el-icon-user-solid"
    },
    component: () => import("../views/home/HomePage.vue"),
    children: [
      // 用户管理
      {
        path: "/user",
        name: "User",
        component: () => import("../views/SubView.vue"),
        meta: {
          title: "用户管理",
          icon: "el-icon-user-solid"
        },
        // 用户管理二级菜单
        children: [
          {
            path: "/user/ordinary_users",
            name: "OrdinaryUsers",
            component: () => import("../views/user_management/OrdinaryUsers.vue"),
            meta: {
              title: "普通用户"
            }
          },
          {
            path: "/user/user_design_department",
            name: "UserDesignDepartment",
            component: () => import("../views/user_management/DesignDepartment.vue"),
            meta: {
              title: "设计机构"
            }
          },
        ],
      },
      // 统计信息
      {
        path: "/statistics",
        name: "Statistics",
        component: () => import("../views/statistics/Statistics.vue"),
        meta: {
          title: "统计信息",
          icon: "el-icon-user-solid"
        }
      }
    ],
  },
// 首页导航菜单---开始

  {
    path: "/notfound",
    name: "notfound",
    meta: {
      title: "404",
    },
    component: () => import("../views/notfound/Notfound.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "登录",
    },
    component: () => import("../views/user/Register.vue"),
  }
];
