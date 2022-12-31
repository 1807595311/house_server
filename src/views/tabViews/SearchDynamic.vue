<template>
  <div class="dynamicList">
    <HeadBG title="搜索"></HeadBG>
    <div class="search">
      <Input v-model="searchValue" size="large" placeholder="搜索相关动态(内容/作者/标题/标签)">
      <Button @click="searchByKeword(searchValue)" slot="append" icon="ios-search"></Button>
      </Input>
    </div>
    <div class="tabs-container">
      <Tabs type="line" v-model="activeStyle">
        <Tab-pane v-for="v in styleList" :key="v.id" :label="v.name" :name="String(v.id)">
          <div class="content box dynamic-box d_f">
            <Dynamic v-for="v in dynamicList" :dynamic="v" :key="v.id"></Dynamic>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
    <div class="scroll">已加载全部</div>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Dynamic from "@/components/Dynamic.vue";
export default {
  name: "ClientSearchDynamic",
  components: {
    HeadBG,
    Dynamic
  },
  data() {
    return {
      dynamicList: [],
      keyword: "",
      searchValue: '',
      styleList: [],
      activeStyle: '0',
      dynamicDataList: []
    };
  },
  created() {
    this.getStyleList();
    this.keyword = this.$route.query.keyword;
    this.searchValue = this.keyword;
    this.searchByKeword(this.keyword);
  },
  watch: {
    activeStyle: {
      handler(v){
        let id = Number(v);
        this.dynamicList = this.dynamicDataList.filter(v=> v.style === id);
        if(id === 0) this.dynamicList = this.dynamicDataList;
      },
      immediate: true
    }
  },
  methods: {
    async searchByKeword(keyword) {
      try {
        let res = await this.$http.get("/client/search_dynamic", { keyword });
        let data = res.data.data;
        this.dynamicDataList = data;
        this.dynamicList = data.filter(v=> v.style == Number(this.activeStyle));
        if(Number(this.activeStyle) === 0) this.dynamicList = this.dynamicDataList;
      } catch (err) { }
    },
    // 获取装修风格列表
    async getStyleList() {
      try {
        let res = await this.$http.get('/client/find_style_list');
        this.styleList = res.data.data;
        this.styleList.unshift({id: '0', name: '全部'})
      } catch (err) { }
    },
    toUserHome() {
      this.$router.push(
        {
          path: '/user_home',
          query: {
            account_number: this.dynamicDetail.account_number,
          }
        }
      )
    },
  },
};
</script>

<style lang="scss">
.dynamicList {
  .tabs-container {
    width: 1300px;
    margin: auto;
    padding: 16px 0;
    .dynamicList,.box{
      padding-top: 0;
    }
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
    width: 1280px;
    padding-top: 20px;
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