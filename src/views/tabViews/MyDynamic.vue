<template>
  <div class="clientMyDynamic">
    <Row :gutter="32">
      <Col span="12" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
      <Tabs type="card">
        <Tab-pane label="已发布">
          <div class="container">
            <Dynamic v-for="v in published" :dynamic="v" :key="v.id">
                <template slot="del"><span @click.stop="deleteDynamic(v)">删除</span></template>
                <template slot="edit"><span @click.stop="editDynamic(v.id)">编辑</span></template>
            </Dynamic>
          </div>
          <div class="empty">
            已加载全部
          </div>
        </Tab-pane>
        <Tab-pane label="已删除">
          <div class="container">
            <Dynamic v-for="v in offshelf" :dynamic="v" :key="v.id">
                <template slot="up"><span @click.stop="deleteDynamic(v)">重新发布</span></template>
            </Dynamic>
          </div>
          <div class="empty">
            已加载全部
          </div>
        </Tab-pane>
      </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
import Dynamic from "@/components/Dynamic.vue";
export default {
  name: "ClientMyDynamic",
  components: {
    Dynamic,
  },
  data() {
    return {
      published: [],
      offshelf: [],
    };
  },

  created() {
    this.getMyDynamic();
  },

  methods: {
    // 获取我的动态
    async getMyDynamic() {
      try {
        let res = await this.$http.post("/client/my_dynamic");
        this.published = res.data.data.published;
        this.offshelf = res.data.data.offshelf;
      } catch (err) {}
    },
    async deleteDynamic(info){
        try{
          let data = {
            id: info.id,
            is_delete: info.is_delete
          }
          await this.$http.post('/manage/changeDynamicState', data);
          this.getMyDynamic();
        }catch(err){}
    },
    editDynamic(id){
      this.$router.push({name: 'DynamicEdit',params:{id}});
    }
  },
};
</script>

<style lang="scss" scoped>
.clientMyDynamic{
    height: calc(100vh - 80px);
    overflow: hidden;
}
::v-deep .ivu-tabs-bar {
  margin-bottom: 0px !important;
}
.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
  background: #fff;
  padding: 5px;
  padding-top: 20px;
  overflow-y: auto;
  height: calc(100vh - 120px);
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
.ivu-col-span-12 {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
}
.empty {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 310px;
  .dynamic {
    margin: auto;
  }
}
</style>