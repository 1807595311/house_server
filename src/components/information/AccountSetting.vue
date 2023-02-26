<template>
  <div class="AccountSetting">
    <div class="item">
      <p>修改密码</p>
      <Button type="text" @click="()=>isShow=true">立即修改</Button>
    </div>
    <div class="item">
      <p>账号注销</p>
      <Button type="text" @click="()=>isShow2=true">立即注销</Button>
    </div>
    <Modal v-model="isShow" title="修改密码" :mask-closable="false">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="p_password">
          <Input size="large" type="text" v-model="formInline.p_password" placeholder="请输入原密码">
          <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input size="large" type="password" v-model="formInline.password" placeholder="请输入新密码">
          <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="check_password">
          <Input size="large" type="password" v-model="formInline.check_password" placeholder="请再次输入密码">
          <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <div class="submit">
            <Button type="primary" @click="handleSubmit('formInline')" long>确定修改</Button>
            <Button style="margin-top: 10px;" @click="()=>isShow=false" long>取消</Button>
          </div>
        </Form-item>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="isShow2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>用户注销</span>
      </p>
      <div style="text-align:center;font-size:16px;">
        <p>注销用户后将不可再登陆。</p>
        <p>是否继续注销？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="cancellation">注销</Button>
        <p></p>
        <Button style="margin-top: 10px;" @click="()=>isShow2=false" long>取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      isShow: false,
      isShow2: false,
      formInline: {
        p_password: '',
        password: '',
        check_password: ''
      },
      ruleInline: {
        p_password: [
          {
            validator: this.vPassword,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: this.vPassword,
            trigger: "blur",
          },
        ],
        check_password: [
          {
            validator: this.vcheck_password,
            trigger: "blur",
          },
        ]
      },
    }
  },
  methods: {
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
    delteCookies() {
      this.$cookie.delete("access_userInfo");
      this.$cookie.delete("access_token");
      this.$router.push({ path: "/login" });
    },
    // 修改密码
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/client/edit_password', this.formInline);
          if (res.data.status === 0) return this.delteCookies();
        }
      });
    },
    // 注销用户
    async cancellation(){
      let res = await this.$http.post('/client/cancellation_user');
      if (res.data.status === 0) return this.delteCookies();
    }
  }
}
</script>

<style lang="scss" scoped>
.AccountSetting {
  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
}
</style>