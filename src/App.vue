<template>
  <div id="app">
    <!-- <Spin v-show="$store.state.loading" fix>
      <div class="spin-bg">
        <img src="@/assets/images/loading.gif">
      </div>
    </Spin> -->
    <!-- <transition name="fade"> -->
    <keep-alive>
    <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: []
    };
  },
  created() {
    this.tabList = this.$router.options.routes.find((v) => v.name == "HomePage").children;
    // if (this.$router.path !== "/home") this.$router.replace("home");
  },
  watch: {
    $route(now, old) {
      this.$store.state.activedTab = this.tabList.findIndex(v =>  v.path == now.path);
    }
  }
};
</script>

<style lang="scss">
html,body{
  &::-webkit-scrollbar {
        width: 0.5em;
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: #a1a1a1;
      }
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.ivu-spin-fix {
  background: rgba(0, 0, 0, 0.6) !important;
}
.spin-bg {
  img {
    width: 300px;
  }
}

.fade-enter-active,
.fade-leave-avtive,
.fade-enter,
.fade-leave-to {
  transition: all 0.1s;
}
.fade-enter-to,
.fade-enter-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
