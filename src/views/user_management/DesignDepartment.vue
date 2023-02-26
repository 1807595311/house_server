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
      <el-table border :data="tableData" height="calc(100vh - 240px)" :header-cell-style="{ background: '#eff3f6', 'text-align': 'center' }" stripe style="width: 100%">
        <el-table-column label="序号" type="index" :index="hIndex" align="center" width="50" />
        <!-- <el-table-column prop="id" label="ID" align="center" width="50" /> -->
        <el-table-column prop="account_number" label="账号" align="center" width="150" />
        <el-table-column prop="nickname" label="昵称" :show-overflow-tooltip="true" align="center" width="120" />
        <el-table-column prop="mechanism_name" label="机构名称" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="city" label="所在城市" :show-overflow-tooltip="true" align="center" width="100" />
        <el-table-column prop="establish_time" label="成立时间" align="center" width="100" />
        <el-table-column prop="fans" sortable label="粉丝数" align="center" width="100" />
        <el-table-column prop="follows" sortable label="关注数" align="center" width="100" />
        <el-table-column prop="dynamic_count" sortable label="动态数" align="center" width="100" />
        <!-- <el-table-column prop="introduce" label="简介" :show-overflow-tooltip="true" align="center" /> -->
        <el-table-column prop="create_time" label="创建时间" sortable width="160" align="center" />
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <div>
              <el-button class="operation-btn" size="mini" @click="detail(scope.row)" type="primary">详 情</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.state == 1" type="success">启 用</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row,true)" :disabled="scope.row.state == 0" type="danger">禁 用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.currentPage" :page-sizes="[20, 30, 40]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 详情dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <!-- 弹出框内容 -->
      <div class="dialog-container">
        <div class="head_img">
          <img :src="detailInfo.head_img" alt="">
        </div>
        <p>
          <span>账号：</span>
          <span>{{detailInfo.account_number}}</span>
        </p>
        <p>
          <span>机构名称：</span>
          <span>{{detailInfo.mechanism_name}}</span>
        </p>
        <p>
          <span>所在城市：</span>
          <span>{{detailInfo.city}}</span>
        </p>
        <p>
          <span>成立时间：</span>
          <span>{{detailInfo.establish_time}}</span>
        </p>
        <div class="introduce">
          <p>个人简介：</p>
          <p class="content">{{detailInfo.introduce}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 禁用原因输入弹出框 -->
    <el-dialog title="禁用用户" width="30%" :visible.sync="changeStateVisible">
      <el-form>
        <el-form-item prop="reason" label="禁用原因" label-width="80">
          <el-select v-model="disable_reason" placeholder="请选择禁用原因">
            <el-option v-for="(v,i) in reasonPtions" :key="i" :label="v" :value="v">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeStateVisible = false">取 消</el-button>
        <el-button type="primary" @click="offShelf">确 定</el-button>
      </div>
    </el-dialog>
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
      tableData: [],
      dialogVisible: false,
      detailInfo: {},
      changeStateVisible: false, // 禁用原因弹窗
      disable_reason: '头像违规',
      postData: {},
      reasonPtions: ['头像违规','发布违规动态']
    };
  },

  created() {
    this.getHomePageData();
  },

  computed: {
    hIndex() {
      // 当前页数 - 1 * 每页数据条数 + 1
      return (this.pageForm.currentPage - 1) * this.pageForm.pageSize + 1
    }
  },

  methods: {
    // 获取首页数据
    async getHomePageData() {
      try {
        let data = { ...this.formInline, ...this.pageForm };
        let res = await this.$http.get("/manage/getDesignDepartmentList", data);
        // console.log(res.data);
        this.total = res.data.count;
        this.tableData = res.data.data;
      } catch (err) { }
    },
    // 填写禁用原因弹窗
    offShelf() {
      this.postData = { ...this.postData, disable_reason: this.disable_reason };
      this.changeStatePOST(this.postData);
    },
    //修改状态
    async changeState(userInfo,flag) {
      this.postData = {
        account_number: userInfo.account_number,
        state: userInfo.state,
      };
      if(flag !== true) {
        this.changeStatePOST()
      }else {
        this.changeStateVisible = true;
      }
    },
    // 修改状态post请求
    async changeStatePOST() {
      let res = await this.$http.post("/manage/changeUserState", this.postData);
      if (res.data.status === 0) this.changeStateVisible = false;
      this.getHomePageData();
    },
    // 用户详情
    detail(v){
      this.dialogVisible = true;
      this.detailInfo = v;
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
.dialog-container{
  margin: auto;
  .head_img{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
  }
  p{
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 20px 5px 5px;
    border-bottom: 1px solid #f1f1f1;
  }
  .introduce{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #f1f1f1;
    p{
      border: none;
    }
    .content{
      text-align: center;
      width: 70%;
      padding: 10px;
      background: #f5f5f5;
    }
  }
}
</style>
