<template>
  <div class="clientLogin">
    <div class="box">
      <div class="box-left">
        <div class="logo">
          好宜居
        </div>
        <div class="content">
          <h1>Hei！</h1>
          <h1><span>注册</span>开启更美好的居家生活</h1>
        </div>
      </div>
      <div class="box-right">
        <h1>注册用户</h1>
        <Steps class="step" :current="currentIndex">
          <Step title="基本信息"></Step>
          <Step title="联系方式"></Step>
          <Step title="上传头像"></Step>
        </Steps>
        <div class="register-form" v-show="currentIndex===0">
          <Form1 @form1="getForm1"></Form1>
        </div>
        <div class="register-form" v-show="currentIndex===1">
          <Form2 @form2="getForm2"></Form2>
        </div>
        <div class="register-form" v-show="currentIndex===2">
          <div class="upload-com">
            <UploadHeadImg @getFormdata="getFormdata"></UploadHeadImg>
          </div>
          <Button @click="register" type="success" long>注册</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form1 from "@/components/register_ord/Form1.vue";
import Form2 from "@/components/register_ord/Form2.vue";
import UploadHeadImg from "@/components/UploadHeadImg.vue";
export default {
  name: "ClientLogin",
  components: {
    Form1,
    Form2,
    UploadHeadImg
  },
  data() {
    return {
      currentIndex: 0,
      formInline: {
        nickname: "", // 昵称
        account_number: "", // 账号
        password: "", // 密码
        check_password: "", // 确认密码
        introduce: "", // 个人简介
        sex: 2, // 性别
        phone_number: "", // 手机号
        wx_number: "", // 微信号
        qq_number: "", // QQ号
        customer_type: 0 // 用户类型0普通用户1设计机构
      },
      formData: null
    };
  },

  methods: {
    // 获取form1子组件传递事件
    getForm1(v) {
      if(v.account_number){
        this.currentIndex = 1;
        this.formInline = {...this.formInline,...v}
      }
    },
    getForm2(v) {
      this.formInline = {...this.formInline,...v}
      this.currentIndex = 2;
    },
    getFormdata(v) {
      this.formData = v;
    },
    async register(){
      if(!this.formData){
        return this.$tip({msg:'请先上传头像',status: -1})
      }else{
        const formData = new FormData();
        formData.append('file',this.formData);
        formData.append('userInfo',JSON.stringify(this.formInline));
        try{
          let res = await this.$http.register('/client/register_ord_user',formData);
          this.$tip(res.data);
          if(res.data.status == -1) this.currentIndex = 0;
          else this.$router.push('/login');
        }catch(err){}
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: fontLogo;
  src: url(../utils/GongFanYueXinTiCu-2.ttf);
}
.box {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  height: 550px;
  min-width: 800px;
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
        font-size: 36px;
      }
      h1:last-of-type {
        font-size: 22px;
      }
      h1:first-of-type {
        color: #ffdb00;
        padding-bottom: 20px;
      }
      h1:last-of-type {
        color: #ffffff;
      }
      h1 > span {
        padding: 0 10px 0 0;
        color: #ffdb00;
        font-size: 28px;
      }
    }
  }
  &-right {
    width: 400px;
    position: relative;
    h1 {
      text-align: center;
      padding: 20px 0;
    }
    .step,
    .register-form {
      margin: 0 auto 20px;
      width: 80%;
    }
    .register-form {
      .sex-box {
        display: flex;
        justify-content: center;
        .ivu-radio-group {
          width: 60%;
          display: flex;
          justify-content: space-around;
        }
      }
    }
    .upload-com{
      margin: 80px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>