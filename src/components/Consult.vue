<template>
  <div class="consult">
    <!-- 咨询弹窗 -->
    <Modal v-model="consultDialog" title="咨询" width="600" :mask-closable="false" :closable="false">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
        <!-- <Form-item label="所在城市" prop="city">
          <Address @getAddress="v=>formInline.city=v"></Address>
        </Form-item>
        <Form-item label="房屋面积" prop="area">
          <Input size="large" type="text" v-model="formInline.area" placeholder="房屋面积，单位m²"></Input>
        </Form-item>
        <Form-item label="装修预算" prop="budget">
          <Input size="large" type="text" v-model="formInline.budget" placeholder="装修预算，单位万元"></Input>
        </Form-item>
        <Form-item label="装修风格">
          <Select v-model="formInline.style_id" style="width:200px">
            <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="房屋现状">
          <Select v-model="formInline.situation" style="width:200px">
            <Option v-for="(item,i) in house_status" :value="item" :key="i">{{ item }}</Option>
          </Select>
        </Form-item>
        <Form-item label="预计入住时间" prop="planned_time">
          <Date-picker type="date" :options="date_options" @on-change="v=>formInline.planned_time=v" placeholder="选择日期" style="width: 200px">
          </Date-picker>
        </Form-item> -->
        <Form-item label="房屋信息" prop="house_id">
          <Select v-model="formInline.house_id" style="width:200px">
            <Option v-for="item in houseList" :value="item.id" :key="item.id">{{ item.title }}</Option>
          </Select>
          <Tooltip content="点击可跳转至房屋信息" placement="top">
              <span class="m_l_10" style="cursor: pointer;" @click="$router.push('/personal_data')">
                <Icon type="help-circled" :size="16"></Icon>
              </span>
          </Tooltip>
        </Form-item>
        <Form-item label="QQ号" prop="qq_number">
          <Input size="large" type="text" v-model="formInline.qq_number" placeholder="联系方式：QQ号"></Input>
        </Form-item>
        <Form-item label="微信号" prop="wx_number">
          <Input size="large" type="text" v-model="formInline.wx_number" placeholder="联系方式：微信号"></Input>
        </Form-item>
        <Form-item label="手机号" prop="phone_number">
          <Input size="large" type="text" v-model="formInline.phone_number" placeholder="联系方式：手机号"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="handleSubmit('formInline')">提交</Button>
        <p></p>
        <Button style="margin-top: 10px;" @click="$parent.close()" size="large" long>取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Address from "@/components/Address.vue";
function vHouse(rule, value, callback) {
  if (!value) {
    callback(new Error("请选择房屋信息"));
  } else {
    callback();
  }
}
function vPhone_number(rule, value, callback) {
  var myreg = /^[1][3,5,7,8][0-9]{9}$/;
  if (!myreg.test(value)) {
    callback(new Error("手机号格式错误"));
  } else {
    callback();
  }
}
function vWx_number(rule, value, callback) {
  var myreg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
  if (value === '') {
    return callback();
  } else if (!myreg.test(value)) {
    callback(new Error("微信号格式错误"));
  } else {
    callback();
  }
}
function vQQ_number(rule, value, callback) {
  var myreg = /^[1-9][0-9]{4,10}$/gim;
  if (value === '') {
    return callback();
  } else if (!myreg.test(value)) {
    callback(new Error("QQ号格式错误"));
  } else {
    callback();
  }
}
export default {
  name: 'consult',
  props: {
    consultDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Address
  },
  data() {
    return {
      formInline: {
        house_id: '',
        phone_number: "", // 手机号
        wx_number: "", // 微信号
        qq_number: "", // QQ号
      },
      styleList: [], // 装修风格列表
      dynamicStyle: {},
      house_status: ['毛坯房', '精装修', '老房重装'],
      ruleInline: {
        house_id: [
          {
            required: true,
            validator: vHouse,
            trigger: "change",
          },
        ],
        phone_number: [
          {
            required: true,
            validator: vPhone_number,
            trigger: "blur",
          },
        ],
        qq_number: [
          {
            validator: vQQ_number,
            trigger: "blur",
          },
        ],
        wx_number: [
          {
            validator: vWx_number,
            trigger: "blur",
          },
        ],
      },
      houseList: [] // 房屋信息列表
    }
  },
  created() {
    this.getStyleList();
    this.getContact();
    if(this.$store.state.userInfo){
      this.getHoustList();
    }
  },
  methods: {
    // 获取装修风格列表
    async getStyleList() {
      try {
        let res = await this.$http.get('/client/find_style_list');
        this.styleList = res.data.data;
        this.dynamicStyle = await this.styleList.find(v => v.id === this.dynamicDetail.style);
      } catch (err) { }
    },
    // 获取房屋列表
    async getHoustList() {
      let res = await this.$http.get('/client/find_house_info');
      this.houseList = res.data.data;
    },
    // 查询用户联系方式
    async getContact() {
      try {
        if (!this.$store.state.userInfo.account_number) return;
        let res = await this.$http.get('/client/find_contact');
        let data = res.data.data;
        this.formInline.wx_number = data.wx_number;
        this.formInline.qq_number = data.qq_number;
        this.formInline.phone_number = data.phone_number;
      } catch (err) { }
    },
    // 提交咨询
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        console.log(this.formInline);
        if (valid) {
          this.$emit('sendConsult', this.formInline);
        }
      });
    }
  }

}
</script>

<style>
</style>