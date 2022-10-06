<template>
  <div class="manageUser">
    <div class="header">
      <div class="header-left">
        <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户账号：">
            <el-input v-model="formInline.account_number"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称：">
            <el-input v-model="formInline.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select v-model="formInline.userState">
              <el-option label="所有" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
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
      <el-table :data="tableData" height="70vh" :header-cell-style="{background:'#eff3f6','text-align':'center'}" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" align="center" />
        <el-table-column prop="account_number" label="账号" align="center" width="180" />
        <el-table-column prop="nickname" label="昵称" align="center" width="180" />
        <el-table-column prop="sex" label="性别" align="center" width="120" />
        <el-table-column prop="customer_type" label="用户类型" align="center" width="120" />
        <el-table-column prop="introduce" label="简介" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="create_time" label="创建时间" width="200" align="center" />
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <div>
              <el-button class="operation-btn" size="mini" :disabled="scope.row.state===1" type="success">启用</el-button>
              <el-button class="operation-btn" size="mini" type="warning">编辑</el-button>
              <el-button class="operation-btn" size="mini" :disabled="scope.row.state===0" type="danger">禁用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.currentPage" :page-sizes="[20, 30, 40]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: "ManageUser",

  data() {
    return {
      formInline: {
        nickname: "",
        userState: 0,
        account_number: ''
      },
      pageForm:{
        currentPage: 2,
        pageSize: 20
      },
      tableData: [
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
        {
          id: 1,
          account_number: "王小虎",
          sex: 0,
          nickname: "超级管理员",
          customer_type: 0,
          introduce:
            "简介简洁啥都莫得啊大噶i厚爱哦嘎破规矩啊端口v那首i给1啊大家购票韩国IP",
          create_time: "2022-09-11 22:13:08",
          state: 1,
        },
      ],
    };
  },

  mounted() {},

  methods: {
    search() {},
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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
  overflow: hidden;
  .header {
    display: flex;
  }
  .content {
    .operation-btn {
      width: 60px;
    }
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }
}
</style>