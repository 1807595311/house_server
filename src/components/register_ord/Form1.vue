<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <Form-item prop="nickname">
        <Input size="large" type="text" v-model="formInline.nickname" placeholder="请输入昵称">
        <Icon style="width: 20px;" type="ios-pricetag-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
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
      <Form-item prop="check_password">
        <Input size="large" type="password" v-model="formInline.check_password" placeholder="请再次输入密码">
        <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item>
        <div class="sex-box">
          <Radio-group v-model="formInline.sex">
            <Radio :label="0">男</Radio>
            <Radio :label="1">女</Radio>
            <Radio :label="2">未知</Radio>
          </Radio-group>
        </div>
      </Form-item>
      <Form-item prop="introduce">
        <Input v-model="formInline.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入..."></Input>
      </Form-item>
      <Form-item>
        <div class="submit">
          <Button type="primary" @click="handleSubmit('formInline')" long>下一步</Button>
        </div>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import { replace, filtion } from "verification-sensitive";
const reg = new RegExp(/\s/); // 检测字符串是否包含空格
export default {
  name: "ClientForm1",

  data() {
    return {
      formInline: {
        nickname: "", // 昵称
        account_number: "", // 账号
        password: "", // 密码
        check_password: "", // 确认密码
        introduce: "", // 个人简介
        sex: 2, // 性别
      },
      ruleInline: {
        nickname: [
          {
            validator: this.vNickanme,
            trigger: "blur",
          },
        ],
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
        check_password: [
          {
            validator: this.vcheck_password,
            trigger: "blur",
          },
        ],
        introduce: [
          {
            validator: this.vIntroduce,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    vNickanme(rule, value, callback) {
      if (filtion(value)) {
        callback(new Error("昵称包含敏感词"));
      } else if (value.length > 8) {
        callback(new Error("昵称最大长度为8位"));
      } else if (reg.test(value)) {
        callback(new Error("昵称不能包含空格"));
      } else {
        callback();
      }
    },
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
    vIntroduce(rule, value, callback) {
      if (filtion(value)) {
        callback(new Error("个人简介包含敏感词"));
      } else if (value.length > 200) {
        callback(new Error("简介最多可输入200字"));
      } else {
        callback();
      }
    },
    // ----------------------------- //
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('form1', this.formInline);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sex-box {
  display: flex;
  justify-content: center;
  .ivu-radio-group {
    width: 60%;
    display: flex;
    justify-content: space-around;
  }
}
</style>