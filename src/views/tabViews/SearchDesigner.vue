<template>
  <div class="dynamicList">
    <HeadBG title="搜索"></HeadBG>
    <div class="search">
      <Input v-model="searchValue" size="large" @keyup.enter.native="searchByKeword(searchValue)" :placeholder="searchPlaceholder">
      <Select v-model="searchType" slot="prepend" style="width: 80px;">
        <Option value="des">设计机构</Option>
        <Option value="ord">普通用户</Option>
      </Select>
      <Button @click="searchByKeword(searchValue)" slot="append" icon="ios-search"></Button>
      </Input>
    </div>
    <div class="box">
      <DesignDepartment v-for="v in designList" :design="v" :key="v.id"></DesignDepartment>
    </div>
    <div class="scroll">已加载全部</div>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import DesignDepartment from "@/components/DesignDepartment.vue";
export default {
  name: "ClientSearchDynamic",
  components: {
    HeadBG,
    DesignDepartment
  },
  data() {
    return {
      designList: [],
      keyword: "",
      searchValue: '',
      searchType: 'des',
      searchPlaceholder: '搜索机构(昵称/账号/机构名称)'
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.searchValue = this.keyword;
    this.searchByKeword(this.keyword);
  },
  watch: {
    searchType(val) {
      let type = ['des', 'ord'];
      let placeholder = ['搜索机构(昵称/账号/机构名称)', '搜索用户(昵称/账号)']
      let index = type.indexOf(val);
      this.searchPlaceholder = placeholder[index];
    }
  },
  methods: {
    getType() {
      let type = ['des', 'ord'];
      return type.indexOf(this.searchType);
    },
    async searchByKeword(keyword) {
      try {
        let res = await this.$http.get("/client/search_users", { keyword, type: this.getType() });
        return this.designList = res.data.data;
      } catch (err) { }
    }
  },
};
</script>

<style lang="scss">
.dynamicList {
  .search {
    position: absolute;
    top: 150px;
    left: calc(50% - 250px);
    width: 500px;
    .ivu-input-group-append,
    .ivu-input-group-prepend {
      background: $theme_color !important;
      border: 1px solid $theme_color !important;
    }
    .ivu-select-selection,
    .ivu-icon.ivu-icon-arrow-down-b.ivu-select-arrow {
      color: #ddd !important;
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
    grid-template-columns: repeat(auto-fill, 280px);
    column-gap: 26px;
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