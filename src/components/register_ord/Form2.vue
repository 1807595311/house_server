<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <Form-item prop="phone_number">
        <Input size="large" type="text" v-model="formInline.phone_number" placeholder="请输入11位手机号(必填)">
        <Icon style="width: 20px;" type="ios-pricetag-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="wx_number">
        <Input size="large" type="text" v-model="formInline.wx_number" placeholder="请输入微信号(非必填)">
        <Icon style="width: 20px;" type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="qq_number">
        <Input size="large" type="text" v-model="formInline.qq_number" placeholder="请输入QQ号(非必填)">
        <Icon style="width: 20px;" type="ios-unlocked-outline" slot="prepend"></Icon>
        </Input>
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
export default {
  name: "ClientForm2",

  data() {
    return {
        formInline: {
        phone_number: "", // 手机号
        wx_number: "", // 微信号
        qq_number: "", // QQ号
      },
       ruleInline: {
        phone_number: [
          {
            validator: this.vPhone_number,
            trigger: "blur",
          },
        ],
        qq_number: [
          {
            validator: this.vQQ_number,
            trigger: "blur",
          },
        ],
        wx_number: [
          {
            validator: this.vWx_number,
            trigger: "blur",
          },
        ],
       }
    };
  },
  methods: {
    vPhone_number(rule, value, callback){
        var myreg = /^[1][3,5,7,8][0-9]{9}$/;
        if(!myreg.test(value)){
            callback(new Error("手机号格式错误"));
        }else{
            callback();
        }
    },
    vWx_number(rule, value, callback){
        var myreg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
        if(value===''){
            return callback();
        } else if(!myreg.test(value)){
            callback(new Error("微信号格式错误"));
        }else{
            callback();
        }
    },
    vQQ_number(rule, value, callback){
        var myreg = /^[1-9][0-9]{4,10}$/gim;
        if(value===''){
            return callback();
        } else if(!myreg.test(value)){
            callback(new Error("QQ号格式错误"));
        } else {
            callback();
        }
    },
    handleSubmit(name){
        this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('form2', this.formInline);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>