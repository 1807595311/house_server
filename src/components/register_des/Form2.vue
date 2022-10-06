<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <Form-item prop="mechanism_name">
        <Input size="large" type="text" v-model="formInline.mechanism_name" placeholder="请输入机构名称(必填)">
        <Icon style="width: 20px;" type="ios-pricetag-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="city">
        <Address @getAddress="v=>formInline.city=v"></Address>
      </Form-item>
      <Form-item prop="establish_time">
        <Date-picker @on-change="v=>formInline.establish_time=v" type="date" placeholder="请选择成立日期" style="width: 100%"></Date-picker>
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
import Address from "@/components/Address.vue";
const reg = new RegExp(/\s/); // 检测字符串是否包含空格
export default {
  name: "ClientForm2",
  components: {
    Address,
  },
  data() {
    return {
      formInline: {
        mechanism_name: "", // 机构名称
        city: "", // 机构所在城市
        establish_time: "", // 机构成立日期
      },
      ruleInline: {
        mechanism_name: [
          {
            validator: this.vMechanism_name,
            trigger: "blur",
          },
        ],
        city: [
          {
            validator: this.vCity,
            trigger: "change",
          },
        ],
        establish_time: [
          {
            validator: this.vEstablish_time,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    vMechanism_name(rule, value, callback) {
      if (filtion(value)) {
        callback(new Error("机构名称包含敏感词"));
      } else if (value.length > 20 || value.length < 2) {
        callback(new Error("机构名称长度2-20位"));
      } else if (reg.test(value)) {
        callback(new Error("机构名称不能包含空格"));
      } else {
        callback();
      }
    },
    vCity(rule, value, callback) {
      if (!value) callback(new Error("请选择设计机构所在城市"));
      else callback();
    },
    vEstablish_time(rule, value, callback) {
      if (!value) callback(new Error("请选择设计机构成立日期"));
      else callback();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) this.$emit("form2", this.formInline);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>