<template>
  <div class="basicInformation">
    <Form ref="formInline" label-position="left" :model="formInline" :rules="ruleInline" :label-width="80">
      <Form-item label="账号" prop="account_number">
        <p>ikun1231241</p>
      </Form-item>
      <Form-item label="性别" prop="sex">
        <p>男</p>
      </Form-item>
      <Form-item label="昵称" prop="nickname">
        <Input v-model="formInline.nickname"></Input>
      </Form-item>
      <Form-item label="简介" prop="introduce">
        <Input v-model="formInline.introduce"></Input>
      </Form-item>
      <Form-item>
        <div class="submit">
          <Button type="primary" @click="handleSubmit('formInline')" long>保存</Button>
        </div>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import { filtion } from "verification-sensitive";
const reg = new RegExp(/\s/);
export default {
  name: 'BasicInformation',
  data() {
    return {
      formInline: {
        account_number: '',
        sex: '',
        nickname: '',
        introduce: ''
      },
      ruleInline: {
        nickname: [
          {
            validator: this.vNickanme,
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
    }
  },
  methods: {
    vNickanme(rule, value, callback) {
      if (filtion(value)) {
        callback(new Error("昵称包含敏感词"));
      } else if (value.length > 8 || value.length < 1) {
        callback(new Error("昵称长度为1-8位"));
      } else if (reg.test(value)) {
        callback(new Error("昵称不能包含空格"));
      } else {
        callback();
      }
    },
    vIntroduce(rule, value, callback) {
      if (filtion(value)) {
        callback(new Error("个人简介包含敏感词"));
      } else if (value.length > 100) {
        callback(new Error("昵称最大长度为100位"));
      } else {
        callback();
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) this.$emit("formInline", this.formInline);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
</style>