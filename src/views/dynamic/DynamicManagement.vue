<template>
  <div class="dynamicManagement">
    <div class="header">
      <div class="header-left">
        <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
          <el-form-item label="发布账号:">
            <el-input v-model="formInline.account_number"></el-input>
          </el-form-item>
          <el-form-item label="动态标题:">
            <el-input v-model="formInline.title"></el-input>
          </el-form-item>
          <el-form-item label="动态状态:">
            <el-select v-model="formInline.is_delete">
              <el-option label="所有" :value="2"></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" height="calc(100vh - 240px)" :header-cell-style="{ background: '#eff3f6', 'text-align': 'center' }" stripe style="width: 100%">
        <!-- <el-table-column label="序号" type="index" align="center" width="50" /> -->
        <el-table-column prop="id" label="ID" align="center" width="50" />
        <el-table-column prop="account_number" label="账号" align="center" width="150" />
        <el-table-column prop="title" label="标题" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="tags" label="标签" align="center" width="180" show-overflow-tooltip />
        <el-table-column prop="views" label="浏览次数" align="center" width="100"  />
        <el-table-column prop="create_time" label="创建时间" width="180" align="center" />
        <el-table-column label="操作" align="center" width="">
          <template slot-scope="scope">
            <div>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" type="primary">查看</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.is_delete == 1" type="success">上架</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.is_delete == 0" type="danger">下架</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.currentPage" :page-sizes="[20,30,40]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageDynamicManagement",

  data() {
    return {
      formInline: {
        title: "",
        is_delete: 2,
        account_number: "",
      },
      pageForm: {
        currentPage: 1,
        pageSize: 20,
      },
      total: 0,
      tableData: [],
    };
  },

  created() {
    this.getHomePageData();
  },

  methods: {
    // 获取首页数据
    async getHomePageData() {
      try {
        let data = { ...this.formInline, ...this.pageForm };
        let res = await this.$http.get("/manage/getDynamicList", data);
        this.total = res.data.count;
        this.tableData = res.data.data;
      } catch (err) {}
    },
    //修改状态
    async changeState(info) {
      let data = {
        id: info.id,
        is_delete: info.is_delete,
      };
      try {
        let res = await this.$http.post("/manage/changeDynamicState", data);
        this.getHomePageData();
      } catch (err) {}
    },
    // 条件搜索
    search() {
      this.getHomePageData();
    },
    // 分页查询
    handleSizeChange(val) {
      this.pageForm.pageSize = Number(val);
      this.getHomePageData();
    },
    handleCurrentChange(val) {
      this.pageForm.currentPage = Number(val);
      this.getHomePageData();
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamicManagement {
  height: 100%;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  .header {
    display: flex;
    .el-form.demo-form-inline.el-form--inline {
      display: flex;
      flex-wrap: nowrap;
    }
  }
  .content {
    .operation-btn {
      width: 60px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }
}
</style>