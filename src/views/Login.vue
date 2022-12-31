<template>
  <div class="clientLogin">
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
              <div class="customer_type-box">
                <Radio-group v-model="customer_type">
                  <Radio :label="0">普通用户</Radio>
                  <Radio :label="1">设计机构</Radio>
                </Radio-group>
              </div>
            </Form-item>
            <Form-item>
              <div class="submit">
                <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
              </div>
              <p class="to-register">
                <span @click="changeRoute('/register_ord')">注册普通用户</span>
                <span @click="changeRoute('/register_des')">注册设计机构</span>
                <span @click="changeRoute('/')">暂不注册,先逛逛首页</span>
              </p>
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
      },
      customer_type: 0,
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
    async handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = null;
          if(this.customer_type == 0){
            res = await this.$http.post("/client/login_ord", this.formInline);
          }else if(this.customer_type == 1){
            res = await this.$http.post("/client/login_des", this.formInline);
          }
          let data = res.data;
          if (data.status === 0) {
            let token = data.data.token;
            let userInfo = JSON.stringify(data.data.user_info);
            let currentTime = new Date().getTime();
            currentTime += 24 * 60 * 60 * 1000;
            let expires = new Date(currentTime).toUTCString(); // 有效时间
            // 将token存入cookie
            document.cookie = `access_token=${token};expires=${expires}`;
            document.cookie = `access_userInfo=${userInfo};expires=${expires}`;
            this.$router.push({ path: "/" });
            // this.$refs[name].resetFields();
          }
        }
      });
    },
    changeRoute(path){
      this.$router.push(path)
    }
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: fontLogo;
  src: url(../utils/GongFanYueXinTiCu-2.ttf);
}
.to-register{
  span{
    margin-left: 10px;
  }
  span:hover{
    cursor: pointer;
    color: $theme_color;
  }
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
    background: $theme_color;
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
      .customer_type-box {
        display: flex;
        justify-content: center;
        .ivu-radio-group {
          width: 60%;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>