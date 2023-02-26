<template>
  <div class="dynamicList">
    <HeadBG title="我的关注" :count="count"></HeadBG>
    <div class="d_f sort-box">
      <span class="label">排序方式：</span>
      <Select v-model="sort" style="width:160px;" placeholder="排序方式" class="m_r_40">
        <Option value="desc">关注时间正序</Option>
        <Option value="asc">关注时间倒序</Option>
      </Select>
    </div>
    <div class="box">
        <FollowCom v-for="v in userList" :userObj="v" :key="v.id"></FollowCom>
      </div>
      <LoadingMore :count="count" :listLength="userList.length" @nextPage="currentPage+=1"></LoadingMore>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import FollowCom from "@/components/FollowCom.vue";
import LoadingMore from "@/components/LoadingMore.vue";
export default {
  name: "ClientSearchDynamic",
  components: {
    HeadBG,
    FollowCom,
    LoadingMore
  },
  data() {
    return {
      userList: [],
      currentPage: 1,
      sort: 'desc',
      count: 0
    };
  },
  created() {
    this.myFollow();
  },
  watch: {
    sort() {
      this.userList = []
      this.myFollow()
    },
    currentPage() {
      this.myFollow();
    },
  },
  methods: {
    async myFollow() {
      try {
        let res = await this.$http.post("/client/my_follow",{ currentPage: this.currentPage,sort: this.sort });
        res.data.data.forEach((v) => this.userList.push(v));
        this.count = res.data.count;
      } catch (err) {}
    }
  },
};
</script>

<style lang="scss" scoped>
.dynamicList {
  .sort-box {
    width: 1250px;
    padding: 20px;
    margin: auto;
  }
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