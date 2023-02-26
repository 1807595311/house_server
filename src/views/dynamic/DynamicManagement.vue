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
      <el-table border :data="tableData" height="calc(100vh - 240px)" :header-cell-style="{ background: '#eff3f6', 'text-align': 'center' }" stripe style="width: 100%">
        <el-table-column label="序号" type="index" :index="hIndex" align="center" width="50" />
        <!-- <el-table-column prop="id" label="ID" align="center" width="50" /> -->
        <el-table-column prop="account_number" label="账号" align="center" width="120" show-overflow-tooltip />
        <el-table-column prop="title" label="标题" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="cover" label="封面" align="center" width="100">
          <template slot-scope="scope">
            <div>
              <el-image style="width: 50px; height: 50px" :src="scope.row.cover" :preview-src-list="[scope.row.cover]">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" align="center" width="180" show-overflow-tooltip />
        <el-table-column prop="views" sortable label="浏览数" align="center" width="100" />
        <el-table-column prop="collection_count" sortable label="收藏数" align="center" width="100" />
        <el-table-column prop="fabulous_count" sortable label="点赞数" align="center" width="100" />
        <el-table-column prop="create_time" sortable label="创建时间" width="160" align="center" />
        <el-table-column label="操作" align="center" width="">
          <template slot-scope="scope">
            <div>
              <el-button class="operation-btn" size="mini" @click="showDialog(scope.row)" type="primary">查 看</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row)" :disabled="scope.row.is_delete == 1" type="success">上 架</el-button>
              <el-button class="operation-btn" size="mini" @click="changeState(scope.row,true)" :disabled="scope.row.is_delete == 0" type="danger">下 架</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageForm.currentPage" :page-sizes="[20,30,40]" :page-size="pageForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 动态详情弹出框 -->
    <el-dialog title="动态详情" :visible.sync="dialogVisible" width="55%">
      <!-- <div v-html="dialogContent" class="dialogContent"></div> -->
      <div class="dialogContent">
        <div class="markdown-body" v-html="dialogContent"></div>
        <mavon-editor v-show="false" ref="md" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下架动态原因输入弹出框 -->
    <el-dialog title="下架动态" width="30%" :visible.sync="changeStateVisible">
      <el-form :model="changeStateForm">
        <el-form-item prop="reason" label="下架原因" label-width="80">
          <!-- <el-input type="textarea" maxlength="30" show-word-limit :rows="2" placeholder="请输入下架动态原因" v-model="changeStateForm.delete_reason"></el-input> -->
          <el-select v-model="changeStateForm.delete_reason" placeholder="请选择下架原因">
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
      dialogVisible: false,
      dialogContent: '',
      changeStateVisible: false,
      changeStateForm: {
        delete_reason: '动态内容存在敏感词'
      },
      postData: {},
      reasonPtions: ['内容存在敏感词','内容不符合规范','内容图片违规','封面图片违规','标题存在敏感词']
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
      let data = { ...this.formInline, ...this.pageForm };
      let res = await this.$http.get("/manage/getDynamicList", data);
      this.total = res.data.count;
      this.tableData = res.data.data;
    },
    //修改状态
    async changeState(info, flag) {
      this.postData = {
        id: info.id,
        is_delete: info.is_delete
      }
      if (flag === true) this.changeStateVisible = true;
      else this.changeStatePOST();
    },
    // 修改状态post请求
    async changeStatePOST() {
      let res = await this.$http.post("/manage/changeDynamicState", this.postData);
      if (res.data.status === 0) this.changeStateVisible = false;
      this.getHomePageData();
    },
    // 下架动态
    offShelf() {
      this.postData = { ...this.postData, delete_reason: this.changeStateForm.delete_reason };
      this.changeStatePOST(this.postData);
      this.changeStateForm.delete_reason = "";
    },
    showDialog(info) {
      this.dialogVisible = true;
      this.dialogContent = info.content;
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
@import "mavon-editor/dist/css/index.css";
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
.dialogContent {
  overflow-y: auto;
  height: 55vh;
}
</style>