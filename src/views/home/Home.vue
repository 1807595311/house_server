<template>
  <div class="box">
    <div class="box1">
      <Upload :fileList="fileList" ref="uploadImg" name="avater" />
    </div>

    <el-button class="btn" size="small" type="primary" @click="register">register</el-button>
    <el-button class="btn" size="small" type="primary" @click="post">post</el-button>
    <el-button class="btn" size="small" type="primary" @click="upload">upload</el-button>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import axios from "axios";
export default {
  components: { Upload },
  data() {
    return {
      fileList: [],
    };
  },
  created() {},
  methods: {
    async post() {
      let res = await this.$http.post("/test", { id: 22 });
      // let res = await axios({
      //   url: 'http://127.0.0.1:8000/getget',
      //   params: {id:21}
      // })
      console.log("get==>", res);
    },
    async upload() {
      // 使用的是multer中间件，所以需要传递formdata格式的数据
      const formData = new FormData();
      // 找到需要传递的文件
      const file = this.$refs.uploadImg.$refs.upload.uploadFiles;
      // 设置请求头
      const headerConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      // 遍历 添加文件信息
      // 注意：添加的字段名，需要与后端一样 "file"
      file.forEach((item) => {
        formData.append("file", item.raw);
      });
      let ress = await this.$http.upload_img("/upload", formData);
      console.log('上传文件==>', ress);
    },
    async register() {
      // 使用的是multer中间件，所以需要传递formdata格式的数据
      const formData = new FormData();
      // 找到需要传递的文件
      const file = this.$refs.uploadImg.$refs.upload.uploadFiles;
      // 设置请求头
      const headerConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      // 遍历 添加文件信息
      // 注意：添加的字段名，需要与后端一样 "file"
      file.forEach((item) => {
        console.log(111,item.raw);
        formData.append("file", item.raw);
      });
      console.log(12313,formData);
      formData.append("userInfo", JSON.stringify({
        account_number: "user1234",
        password: "qwertyuiop",
        nickname: '普通管理员',
        sex: 2,
        introduce: "",
        customer_type: 2
      }) );
      // const options = {
      //   method: 'POST',
      //   headerConfig,
      //   data: formData,
      //   url: 'http://127.0.0.1:8000/upload'
      // }
      // let ress = await axios(options);
      let ress = await this.$http.upload_img("/register", formData);
      console.log(1231231, ress);
    },
  },
};
</script>

<style lang="scss" scoped>
.box1 {
  margin: 50px 400px;
}
</style>
