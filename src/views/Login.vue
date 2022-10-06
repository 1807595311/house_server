<template>
  <div class="clientLogin">
    <!-- <Upload :before-upload="handleUpload" accept="image/jpeg,image/jpg,image/png" action="#">
      <Button icon="ios-cloud-upload-outline">上传升级文件</Button>
    </Upload> -->
    <div class="box">
      <div class="box-left">
        <div class="logo">
          好宜居
        </div>
        <div class="content">
          <h1>Hei！</h1>
          <h1>为大众创造更美好的居家生活</h1>
        </div>
      </div>
      <div class="box-right">
        <div v-if="true" class="login">
          <h1>登录</h1>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <Form-item prop="account_number">
              <Input size="large" type="text" v-model="formInline.account_number" placeholder="请输入账号">
              <Icon style="width: 20px;" type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </Form-item>
            <Form-item prop="password">
              <Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码">
              <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
              </Input>
            </Form-item>
            <Form-item>
              <div class="submit">
                <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
              </div>
            </Form-item>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientLogin",
  data() { 
    return {
      formInline: {
        account_number: "",
        password: "",
        check_password: ""
      },
      ruleInline: {
        account_number: [
          {
            validator: this.vAccount_number,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: this.vPassword,
            trigger: "blur",
          },
        ],
        check_password: [{
            validator: this.vcheck_password,
            trigger: "blur",
        }]
      },
    };
  },

  mounted() {
    // this.$tip()
    // this.$Message.destroy()
  },

  methods: {
    vAccount_number(rule, value, callback) {
      let regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regex.test(value)) {
        callback(new Error("账号格式由字母数字长度8-16位组合"));
      } else {
        callback();
      }
    },
    vPassword(rule, value, callback) {
      let regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regex.test(value)) {
        callback(new Error("密码格式由字母数字长度8-16位组合"));
      } else {
        callback();
      }
    },
    vcheck_password(rule, value, callback) {
      if (this.formInline.password != value) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    },
    handleUpload(file) {
      var formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"), "formData");
      return false;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("提交成功!");
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
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
    }
  }

  &-right {
    width: 400px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .submit {
      display: flex;
      justify-content: center;
    }
    .login {
      flex: 1;
      padding: 20px;
      h1 {
        font-size: 28px;
        text-align: center;
        padding-bottom: 20px;
      }
    }
  }
}
</style>