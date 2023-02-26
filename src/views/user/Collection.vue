<template>
  <div class="dynamicList">
    <HeadBG title="我的收藏" :count="count"></HeadBG>
    <div class="d_f sort-box">
      <span class="label">排序方式：</span>
      <Select v-model="sort" style="width:160px;" placeholder="排序方式" class="m_r_40">
        <Option value="desc">收藏时间正序</Option>
        <Option value="asc">收藏时间倒序</Option>
      </Select>
    </div>
    <div class="content box dynamic-box d_f">
      <Dynamic v-for="v in dynamicList" :dynamic="v" :key="v.id"></Dynamic>
    </div>
    <LoadingMore :count="count" :listLength="dynamicList.length" @nextPage="currentPage+=1"></LoadingMore>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Dynamic from "@/components/Dynamic.vue";
import LoadingMore from "@/components/LoadingMore.vue";
export default {
  name: "ClientDynamicList",
  components: {
    HeadBG,
    Dynamic,
    LoadingMore
  },
  data() {
    return {
      dynamicList: [],
      currentPage: 1,
      sort: 'desc',
      count: 0
    };
  },
  created() {
    this.getrMyCollection();
  },
  watch: {
    sort() {
      this.dynamicList = []
      this.getrMyCollection()
    },
    currentPage() {
      this.getrMyCollection();
    },
  },
  methods: {
    async getrMyCollection() {
      try {
        let res = await this.$http.post("/client/my_collection", { currentPage: this.currentPage, sort: this.sort });
        res.data.data.forEach((v) => this.dynamicList.push(v));
        this.count = res.data.count;
      } catch (err) { }
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamicList {
  .sort-box {
    width: 1320px;
    padding: 20px;
    margin: auto;
  }
  .box {
    padding-top: 20px;
    width: 1280px;
    margin: auto;
    background: #fff;
    flex-wrap: wrap;
    justify-content: space-between;
    .design {
      margin-right: 30px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .dynamic:last-child:nth-child(4n - 1) {
    margin-right: calc(24% + 4% / 3);
  }

  .dynamic:last-child:nth-child(4n - 2) {
    margin-right: calc(48% + 8% / 3);
  }
  .scroll {
    margin: auto;
    padding: 40px 0;
    font-size: 20px;
    text-align: center;
  }
}
</style>