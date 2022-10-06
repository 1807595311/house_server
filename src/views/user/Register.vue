<template>
  <div class="register">
    <div class="box">
      <div class="box-left">
        <div class="logo">
          {{VUE_APP_TITLE}}
        </div>
        <div class="content">
          <h1>Hei!</h1>
          <h1>后台管理系统</h1>
        </div>
      </div>
      <div class="box-right">
        <el-form v-show="isLogin" label-position="left" :model="ruleForm1" status-icon :rules="rules2" ref="ruleForm1" label-width="100px" class="demo-ruleForm2">
          <h1>登录</h1>
          <el-form-item prop="account_number">
            <el-input type="text" placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm1.account_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password v-model="ruleForm1.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('ruleForm1')">登录</el-button>
            <el-link :underline="false" @click="()=>isLogin=false">没有账号？去注册</el-link>
          </el-form-item>
        </el-form>
        <el-form v-show="!isLogin" class="demo-ruleForm2" label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
          <h1>注册</h1>
          <!-- <el-form-item prop="account_number">
                <Upload :fileList="fileList" :limit="limit" :showPreview="false" ref="uploadImg" name="avater" />
              </el-form-item> -->
          <el-form-item prop="account_number">
            <el-input type="text" placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm2.account_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password v-model="ruleForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="check_password">
            <el-input type="password" placeholder="请再次输入密码" prefix-icon="el-icon-lock" show-password v-model="ruleForm2.check_password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm2('ruleForm2')">注册</el-button>
            <el-link :underline="false" @click="()=>isLogin=true">已有账号？去登陆</el-link>
            <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import axios from "axios";
export default {
  name: "ManageRegister",
  components: {
    Upload,
  },
  data() {
    // 登录验证
    var validatePass = (rule, value, callback) => {
      let regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regex.test(value)) {
        callback(new Error("账号格式由字母数字长度8-16位组合"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regex.test(value)) {
        callback(new Error("密码格式由字母数字长度8-16位组合"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (this.ruleForm2.password != value) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    // 注册验证
    return {
      activeName: "first",
      radio: "1",
      fileList: [],
      limit: 1,
      isLogin: true,
      // 登录
      ruleForm1: {
        account_number: "",
        password: "",
      },
      rules1: {
        account_number: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
      },
      // 注册
      ruleForm2: {
        account_number: "",
        password: "",
        check_password: "",
        sex: 1,
      },
      rules2: {
        account_number: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        check_password: [{ validator: validatePass3, trigger: "blur" }],
      },
      VUE_APP_TITLE: process.env.VUE_APP_TITLE
    };
  },
  methods: {
    // 登录
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    // 注册
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async register() {
      let data = { ...this.ruleForm2, customer_type: 2 };
      try{
        let res = await this.$http.post("/manage/register", data);
        if(res.data.status == 0) {
          this.isLogin = true;
          this.resetForm('ruleForm2');
        }
      }catch(err){}
    },
    async login() {
      try{
        let res = await this.$http.post("/manage/login", this.ruleForm1);
        let data = res.data;
        // 将token存放在cookie
        if (data.status === 0) {
          let token = data.data.token;
          let userInfo = JSON.stringify( data.data.user_info );
          let currentTime = new Date().getTime();
          currentTime += 24 * 60 * 60 * 1000;
          let expires = new Date(currentTime).toUTCString(); // 有效时间
          // 将token存入cookie
          document.cookie = `token=${token};expires=${expires}`;
          document.cookie = `userInfo=${userInfo};expires=${expires}`;
          this.$router.push({path: '/'})
        }
      }catch(err){}
    },
    // async register() {
    //   // 使用的是multer中间件，所以需要传递formdata格式的数据
    //   const formData = new FormData();
    //   // 找到需要传递的文件
    //   const file = this.$refs.uploadImg.$refs.upload.uploadFiles;
    //   const headerConfig = {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   };
    //   // 遍历 添加文件信息
    //   // 注意：添加的字段名，需要与后端一样 "file"
    //   file.forEach((item) => {
    //     formData.append("file", item.raw);
    //   });
    //   formData.append("userInfo", JSON.stringify({...this.ruleForm2,customer_type: 2}));
    //   let ress = await this.$http.upload_img("/manage/register", formData);
    //   console.log(1231231, ress);
    // }
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: fontLogo;
  src: url(../../utils/GongFanYueXinTiCu-2.ttf);
}
$boxShadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
body {
  // background: #2D3A4B;
}
.register {
  text-align: center;
  height: 100vh;
  .box {
    box-shadow: $boxShadow;
    height: 500px;
    width: 800px;
    max-width: 1000px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    // padding: 20px;
    display: flex;

    &-left {
      width: 400px;
      position: relative;
      background: #0058a3;
      padding: 20px;
      box-sizing: border-box;
      .logo {
        position: absolute;
        color: #ffffff;
        font-size: 22px;
        font-family: fontLogo;
      }
      .content {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        h1:first-of-type {
          color: #ffdb00;
          padding-bottom: 20px;
        }
        h1:last-of-type {
          color: #ffffff;
        }
      }
    }

    &-right {
      width: 400px;
      position: relative;
      h1 {
        padding-bottom: 20px;
      }
      form {
        width: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
      }
    }
    .el-button--primary {
      color: #fff;
      background-color: #0058a3;
      width: 360px;
      border-color: none !important;
      &:hover {
        background-color: #0b65b4;
      }
    }
    .el-tabs__content {
      padding: 20px 0;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-form {
      padding: 0 30px;
    }
    .el-select {
      width: 100% !important;
    }
  }
}
</style>