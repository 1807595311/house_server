<template>
  <div class="dynamicList">
    <HeadBG title="我的关注"></HeadBG>
    <div class="box">
        <FollowCom v-for="v in userList" :userObj="v" :key="v.id"></FollowCom>
      </div>
    <div class="scroll">已加载全部</div>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import FollowCom from "@/components/FollowCom.vue";
export default {
  name: "ClientSearchDynamic",
  components: {
    HeadBG,
    FollowCom
  },
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.searchByKeword();
  },
  methods: {
    async searchByKeword() {
      try {
        let res = await this.$http.post("/client/my_follow");
        return this.userList = res.data.data;
      } catch (err) {}
    }
  },
};
</script>

<style lang="scss" scoped>
.dynamicList {
  .search {
    position: absolute;
    top: 150px;
    left: calc(50% - 250px);
    width: 500px;
    .ivu-input-group-append {
      background: $theme_color !important;
      border: 1px solid $theme_color !important;
    }
    .ivu-icon.ivu-icon-ios-search {
      color: #fff !important;
    }
  }
  .box {
    width: 1200px;
    padding-top: 20px;
    margin: auto;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    column-gap: 24px;
    row-gap: 20px;
  }
  .scroll {
    margin: auto;
    padding: 40px 0;
    font-size: 20px;
    text-align: center;
  }
}
</style>