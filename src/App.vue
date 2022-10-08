<template>
  <div id="app">
    <!-- <Spin v-show="$store.state.loading" fix>
      <div class="spin-bg">
        <img src="@/assets/images/loading.gif">
      </div>
    </Spin> -->
    <router-view />
  </div>
</template>

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
.ivu-spin-fix{
  background: rgba(0, 0, 0, .6) !important;
}
.spin-bg{
  img{
    width: 300px;
  }
}
</style>
