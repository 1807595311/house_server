<template>
  <div class="dynamicList">
    <HeadBG title="搜索"></HeadBG>
    <div class="search">
      <Input v-model="searchValue" size="large" @keyup.enter.native="searchByKeword" placeholder="根据标题搜索动态">
        <Button @click="searchByKeword" slot="append" icon="ios-search"></Button>
      </Input>
    </div>
    <div class="tabs-container">
      <div class="d_f">
        <span class="label">所在城市：</span>
        <Address @getAddress="v=>filterCriteria.city=v" placeholder="选择城市筛选" style="width:160px" class="m_r_40"></Address>
        <span class="label">设计风格：</span>
        <Select v-model="filterCriteria.style" clearable style="width:160px;" placeholder="选择设计风格筛选" class="m_r_40">
          <Option v-for="v in styleList" :value="v.id" :key="v.id">{{ v.name }}</Option>
        </Select>
        <span class="label">标签：</span>
        <Select v-model="filterCriteria.tags" clearable style="width:160px;" placeholder="选择标签筛选" class="m_r_40">
          <Option v-for="(item,i) in tagList" :value="item" :key="i">{{ item }}</Option>
        </Select>
        <span class="label">排序方式：</span>
        <Select v-model="filterCriteria.sort" style="width:160px;" placeholder="排序方式">
          <Option value="fabulous_count">点赞数</Option>
          <Option value="collection_count">收藏数</Option>
          <Option value="create_time">发布时间</Option>
        </Select>
        <span class="label">&nbsp;-&nbsp;</span>
        <Select v-model="filterCriteria.order" style="width:160px;" placeholder="排序方式" class="m_r_40">
          <Option value="desc">正序</Option>
          <Option value="asc">倒序</Option>
        </Select>
        <Button type="primary" @click="searchByKeword">筛选</Button>
      </div>
      <div class="content box dynamic-box d_f">
        <Dynamic v-for="v in dynamicDataList" :dynamic="v" :key="v.id"></Dynamic>
      </div>
    </div>
    <div class="more" v-if="count > dynamicDataList.length">
      <Button type="text" @click="more" class="btn">加载更多</Button>
    </div>
    <div class="scroll" v-else>已加载全部</div>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Dynamic from "@/components/Dynamic.vue";
import Address from "@/components/Address.vue";
export default {
  name: "ClientSearchDynamic",
  components: {
    HeadBG,
    Dynamic,
    Address
  },
  data() {
    return {
      dynamicList: [],
      keyword: "",
      searchValue: '',
      styleList: [],
      dynamicDataList: [],
      filterCriteria: {
        city: '',
        tags: '',
        style: '',
        sort: 'fabulous_count',
        order: 'desc'
      },
      tagList: [ "卧室","客厅","书房","厨房","餐厅","玄关","阳台","儿童房", "卫生间"],
      currentPage: 1,
      count: 0
    };
  },
  created() {
    this.getStyleList();
    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : '';
    this.searchValue = this.keyword;
    this.searchByKeword();
  },
  watch: {
    filterCriteria:{
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        for (const key in newVal) {
          if(!newVal[key]) this.filterCriteria[key] = ''
          else return
        }
			},
    }
  },
  methods: {
    // 加载更多
    more(){
      this.currentPage += 1;
      this.searchByKeword(true);
    },
    // 搜索
    async searchByKeword(flag) {
      try {
        if(flag !== true) this.currentPage = 1;
        let res = await this.$http.post("/client/search_dynamic", { ...this.filterCriteria, keyword: this.searchValue, currentPage: this.currentPage });
        let data = res.data.data;
        if(flag === true) data.forEach(v => this.dynamicDataList.push( v ));
        else this.dynamicDataList = data
        this.count = res.data.count;
      } catch (err) { }
    },
    // 获取装修风格列表
    async getStyleList() {
      let res = await this.$http.get('/client/find_style_list');
      this.styleList = res.data.data;
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
    padding-top: 10px !important;
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
    font-size: 15px;
    text-align: center;
  }
  .label{
    color: #2D8CF0;
    line-height: 32px;
    font-size: 14px;
  }
  .more{
    text-align: center;
    padding: 40px 0;
    &:hover{
     cursor: pointer;
    }
    .btn{
      font-size: 15px;
    }
  }
}
</style>