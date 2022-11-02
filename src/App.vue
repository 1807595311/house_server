<template>
  <div id="app">
    <!-- <Spin v-show="$store.state.loading" fix>
      <div class="spin-bg">
        <img src="@/assets/images/loading.gif">
      </div>
    </Spin> -->
    <!-- <transition name="fade"> -->
      <router-view />
    <!-- </transition> -->

  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {
    if (this.$router.path !== "/home") this.$router.replace("home");
  }
};
</script>

<style lang="scss">
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
  transition: all .1s;
}
.fade-enter-to,.fade-enter-active{
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
