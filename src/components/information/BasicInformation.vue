<template>
  <div class="basicInformation">
    <Form ref="formInline" label-position="left" :model="formInline" :rules="ruleInline" :label-width="80">
      <Form-item label="账号" prop="account_number">
        <p>{{userInfo.account_number}}</p>
      </Form-item>
      <Form-item label="性别" prop="sex">
        <p>{{userInfo.sex === 1 ? '男' : userInfo.sex === 0 ? '女' : '未知'}}</p>
      </Form-item>
      <Form-item label="昵称" prop="nickname">
        <Input v-model="formInline.nickname"></Input>
      </Form-item>
      <Form-item label="简介" prop="introduce">
        <Input v-model="formInline.introduce" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
      </Form-item>
      <Form-item>
        <div class="submit">
          <Button :disabled="isChange" type="primary" @click="handleSubmit('formInline')" long>保存</Button>
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
  props: ['userInfo'],
  data() {
    return {
      formInline: {
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
      isChange: true,
    }
  },
  watch:{
    userInfo(v){
      this.formInline = {
        nickname: v.nickname,
        introduce: v.introduce
      }
    },
    formInline: {
      handler(newVal){
        let u = this.userInfo;
        if(u.nickname != newVal.nickname || u.introduce != newVal.introduce){
          this.isChange = false; 
        }
        else this.isChange = true;
		  },
		  deep: true
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
      } else if (value.length > 200) {
        callback(new Error("简介最多可输入200字"));
      } else {
        callback();
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate( async (valid) => {
        let res = await this.$http.post('/client/edit_user_info',this.formInline);
        if(res.data.status === 0){
          this.isChange = true;
          this.$parent.getUserInfo();
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
</style>