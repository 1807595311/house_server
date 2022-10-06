<template>
  <div class="homePage">
    <el-container>
      <el-header>
        <div class="logo">好宜居</div>
        <div class="user">
          <div class="block"><el-avatar :size="40" :src="userInfo.head_img"></el-avatar></div>
          <div class="username">{{userInfo.nickname}}</div>
          <div class="logout" @click="logout">退出登录</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-menu :unique-opened="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#393D49" text-color="#fff" active-text-color="#409EFF">
            <!-- 没有二级菜单的路由 -->
            <el-menu-item v-if="item.children?false:true" @click="showView(item.path)" v-for="(item,index) in routes" :key="index" :index="index.toString()">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <!-- 有二级菜单的路由 -->
            <el-submenu v-if="item.children?true:false" v-for="(item,index) in routes" :key="index" :index="index.toString()">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(v,i) in item.children" @click="showView(v.path)" :key="index+'-'+i" :index="index.toString()+'-'+i">{{v.meta.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 路由切换页面位置 -->
        <el-main>
          <!-- 路由缓存 在这里只缓存没有子路由的，如需缓存有子路由的在SubView.vue中添加 -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menu_while_list from "@/utils/menu_while_list";
export default {
  name: "ManageHomePage",

  data() {
    return {
      routes: [],
      userInfo: {},
      VUE_APP_TITLE: process.env.VUE_APP_TITLE
    };
  },
  created() {
    // 从cookie获取用户信息
    this.userInfo = JSON.parse( this.$cookie.get('userInfo') );
    // 加载路由，配置动态路由
    let homePage = this.$router.options.routes.find(v=> v.name == 'HomePage')
    let routes = homePage.children;
    this.routes = routes.filter((v) => menu_while_list.indexOf(v.path) == -1);
    this.$router.push({path: '/statistics'})
  },
  methods: {
    // 动态路由跳转
    showView(path) {
      this.$router.push({path});
    },
    // 退出登录
    logout(){
      this.$confirms('退出登录').then((res)=>{
        this.$cookie.delete('token');
        this.$cookie.delete('userInfo');
        this.$tip('退出成功');
        this.$router.push({path:'/register'});
      }).catch(err=>{})
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: fontLogo;
  src: url(../../utils/GongFanYueXinTiCu-2.ttf);
}
.el-header,
.el-footer {
  background-color: #0058a3;
  color: #333;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 200px;
    color: #ffffff;
    font-size: 22px;
    font-family: fontLogo;
  }
  .user{
    display: flex;
    align-items: center;
    color: #ffffff;
    .username{
      padding:0 15px;
    }
    .logout{
      padding-right: 20px;
      &:hover{
        color: #479ff8;
        cursor: pointer;
      }
    }
  }
}

.el-aside {
  background-color: #393d49;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: calc(100vh - 60px);
}

.el-main {
  background-color: #f5f5f5;
  padding: 20px;
  height: calc(100vh - 60px);
  // overflow-y: scroll;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>