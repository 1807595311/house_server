<template>
  <!-- 父级路由跳转，解决三层路由嵌套页面不显示问题 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>