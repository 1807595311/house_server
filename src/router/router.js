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
    // 首页
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
          path: "/my_consult",
          name: "MyConsult",
          // component: () => import("@/views/tabViews/MoreDynamic.vue"),
          meta: {
            title: "我的咨询"
          },
        },
        {
          path: "/my_dynamic",
          name: "MyDynamic",
          component: () => import("@/views/tabViews/MyDynamic.vue"),
          meta: {
            title: "我的动态"
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
    },
    {
      path: "/follow",
      name: "Follow",
      meta: {
        title: "我的关注",
      },
      component: () => import("@/views/user/Follow.vue"),
    },
    {
      path: "/likes",
      name: "Likes",
      meta: {
        title: "我的点赞",
      },
      component: () => import("@/views/user/Likes.vue"),
    },
    {
      path: "/collection",
      name: "Collection",
      meta: {
        title: "我的收藏",
      },
      component: () => import("@/views/user/Collection.vue"),
    },
    {
      path: "/search_dynamic",
      name: "SearchDynamic",
      meta: {
        title: "更多动态",
      },
      component: () => import("@/views/tabViews/SearchDynamic.vue"),
    },
    {
      path: "/search_designer",
      name: "SearchDesigner",
      meta: {
        title: "更多机构",
      },
      component: () => import("@/views/tabViews/SearchDesigner.vue"),
    },
    {
      path: "/dynamic_details",
      name: "DynamicDetails",
      meta: {
        title: "动态详情",
      },
      component: () => import("@/views/DynamicDetails.vue"),
    },
    {
      path: "/dynamic_edit",
      name: "DynamicEdit",
      meta: {
        title: "编辑动态",
      },
      component: () => import("@/views/tabViews/ReleaseDynamics.vue"),
    },
  ];
  