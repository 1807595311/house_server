<template>
  <div class="house_info">
    <Button type="primary" @click="isShow = true">添加房屋</Button>
    <div class="alert" v-show="showHouseList">
      <Alert type="warning">您还没有添加房屋信息。</Alert>
    </div>
    <!-- 房屋列表 -->
    <HouseInfoBox v-show="!showHouseList" :houseList="houseList" @edit="editHouseForm"></HouseInfoBox>
    <!-- 添加房屋弹窗 -->
    <Modal v-model="isShow" title="添加房屋信息" @on-ok="addHouse">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
        <Form-item label="房屋标题" prop="title">
          <Input size="large" type="text" v-model="formInline.title" placeholder="房屋标题(如：xx街道xx小区)">
          </Input>
        </Form-item>
        <Form-item label="房屋面积" prop="area">
          <Input size="large" type="text" v-model.number="formInline.area" placeholder="房屋面积，单位m²"></Input>
        </Form-item>
        <Form-item label="所在城市" prop="city">
          <Address v-model="editCity" @getAddress="v=>formInline.city=v"></Address>
        </Form-item>
        <Form-item label="装修预算" prop="budget">
          <Input size="large" type="text" v-model.number="formInline.budget" placeholder="装修预算，单位万元"></Input>
        </Form-item>
        <Form-item label="装修风格">
          <Select v-model="formInline.style" style="width:200px">
            <Option v-for="item in styleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="房屋现状">
          <Select v-model="formInline.situation" style="width:200px">
            <Option v-for="(item,i) in houseStatus" :value="item" :key="i">{{ item }}</Option>
          </Select>
        </Form-item>
        <Form-item label="预计入住时间" prop="planned_time">
          <Date-picker type="date" :value="formInline.planned_time" format="yyyy-MM-dd" :options="dateOptions" @on-change="v=>formInline.planned_time=v" placeholder="选择日期" style="width: 200px">
          </Date-picker>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="addHouse('formInline')">保存</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import { replace, filtion } from "verification-sensitive";
import Address from "@/components/Address.vue";
import address from "@/utils/address.json";
import HouseInfoBox from "@/components/information/HouseInfoBox.vue";
const reg = /^\d+(\.\d+)?$/; // 检测是否为数字
function TEST_NUM(rule, value, callback) {
  if (!reg.test(value)) callback(new Error("只能为数字"));
  else callback();
}
function TEST_TITLE(rule, value, callback) {
  if (value.length > 20 || value.length < 2) {
    callback(new Error("标题2-20字之间"));
  } else if (filtion(value)) {
    callback(new Error("标题存在敏感词"));
  } else {
    callback();
  }
}
export default {
  name: 'HouseInfo',
  components: {
    Address,
    HouseInfoBox
  },
  data() {
    return {
      isShow: false, // 添加房屋弹窗
      formInline: {
        title: '',
        style: 1,
        city: "", // 机构所在城市
        area: '',
        budget: '',
        situation: '毛坯房',
        planned_time: '' // 预计入住时间
      },
      editCity: [],
      houseStatus: ['毛坯房', '精装修', '老房重装'],
      styleList: [], //装修风格列表
      houseList: [], // 房屋列表
      dateOptions: { // 时间选择器限制不允许选择今日之前
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      ruleInline: {
        title: [
          {
            required: true,
            validator: TEST_TITLE,
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: '城市不能为空',
            trigger: "change",
          },
        ],
        area: [
          {
            required: true,
            validator: TEST_NUM,
            trigger: "blur",
          },
        ],
        budget: [
          {
            required: true,
            validator: TEST_NUM,
            trigger: "blur",
          },
        ],
        planned_time: [
          {
            required: true,
            message: '预计入住时间不能为空',
            trigger: "change",
          },
        ]
      }
    };
  },
  created() {
    this.getStyleList();
    this.getHoustList();
  },
  watch: {
    isShow(v){
        console.log(v);
        if(!this.formInline.id || v == false){
          this.resetForm();
        }
    }
  },
  computed: {
    showHouseList() {
      return this.houseList.length <= 0;
    }
  },
  methods: {
    // 获取装修风格列表
    async getStyleList() {
      try {
        let res = await this.$http.get('/client/find_style_list');
        this.styleList = res.data.data;
      } catch (err) { }
    },
    // 获取房屋列表
    async getHoustList() {
      let res = await this.$http.get('/client/find_house_info');
      this.houseList = res.data.data;
    },
    // 添加或修改房屋
    addHouse(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/client/insert_house_info', this.formInline);
          if (res.data.status === 0) {
            this.getHoustList();
            this.isShow = false;
            this.resetForm();
          }
        }
      });
    },
    // 修改
    editHouseForm(v) {
      if (v.id) {
        this.editCity = this.findCity(v.city);
        v.style = this.styleList.find(item => item.name == v.style).id;
        this.formInline = v;
        this.isShow = true;
      }
    },
    resetForm() {
        this.editCity = []
      this.formInline = {
        title: '',
        style: 1,
        city: "", // 机构所在城市
        area: '',
        city: '',
        budget: '',
        situation: '毛坯房',
        planned_time: '' // 预计入住时间
      }
    },
    // 通过城市查找省份和城市，并组成数组
    findCity(city) {
      let p = null;
      let d = null
      for (let i = 0; i < address.length; i++) {
        let c = address[i].children.filter(v => v.label == city);
        if (c.length > 0) {
          p = address[i].label;
          d = c[0].label;
          break;
        }
      }
      return [p, d];
    }
  },
}
</script>

<style lang="scss">
.house_info {
  padding: 20px 0 0px;
  .alert {
    padding: 10px 0;
    .ivu-alert-message {
      font-size: 14px !important;
    }
    text-align: center;
  }
}
</style>