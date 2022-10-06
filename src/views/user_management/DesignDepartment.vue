<template>
  <div class="manageUser">
    <div class="header">
      <div class="header-left">
        <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户账号:">
            <el-input v-model="formInline.account_number"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:">
            <el-input v-model="formInline.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户状态:">
            <el-select v-model="formInline.state">
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
      <el-table :data="tableData" height="calc(100vh - 240px)" :header-cell-style="{background:'#eff3f6','text-align':'center'}" stripe style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50" />
        <el-table-column prop="account_number" label="账号" align="center" width="150" />
        <el-table-column prop="nickname" label="昵称" align="center" width="160" />
        <el-table-column prop="mechanism_name" label="机构名称" align="center" width="150" />
        <el-table-column prop="city" label="所在城市" align="center" width="150" />
        <el-table-column prop="establish_time" label="成立时间" align="center" width="120" />
        <el-table-column prop="introduce" label="简介" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="create_time" label="创建时间" width="150" align="center" />
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <div>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.state==1" type="success">启用</el-button>
              <!-- <el-button class="operation-btn" size="mini" type="warning">编辑</el-button> -->
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.state==0" type="danger">禁用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.currentPage" :page-sizes="[20, 30, 40]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageOrdinaryUsers",

  data() {
    return {
      formInline: {
        nickname: "",
        state: 2,
        account_number: "",
      },
      pageForm: {
        currentPage: 1,
        pageSize: 20,
      },
      total: 0,
      tableData: [
      ],
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
        let res = await this.$http.get(
          "/manage/getDesignDepartmentList",
          data
        );
        // console.log(res.data);
        this.total = res.data.count;
        this.tableData = res.data.data;
      } catch (err) {
        this.$tip({ status: -1, msg: "接口异常" });
      }
    },
    //修改状态
    async changeState(userInfo){
      let data = {
        account_number: userInfo.account_number,
        state: userInfo.state
      }
      try{
        let res = await this.$http.post('/manage/changeUserState',data);
        this.$tip(res.data);
        this.getHomePageData();
      }catch(err){
         this.$tip({ status: -1, msg: `接口异常:${err}` });
      }

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
.manageUser {
  height: 100%;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  // overflow: hidden;
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