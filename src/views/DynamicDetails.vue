<template>
  <div class="clientDynamicDetails">
    <!-- 评论弹出组件 -->
    <Drawer @close="toggle" align="right" :closeable="true">
      <div class="drawerBox" v-if="open">
        <!-- 发布评论 -->
        <div class="commentReply">
          <div class="selfHeadimg">
            <img :src="$store.state.userInfo.head_img" alt="">
            <Input v-model="commentContent" type="textarea" :autosize="{minRows: 4,maxRows: 7}" placeholder="请输入评论内容（限50字）..."></Input>
          </div>
          <div class="replyBtn">
            <Button type="primary" @click="sendComment">评论</Button>
          </div>
        </div>
        <!-- 评论和回复组件 -->
        <Comment @refreshComment="getComment" v-for="v in commentList" :key="v.id" :comment="v"></Comment>
        <div class="empty">
          已加载全部
        </div>
      </div>
    </Drawer>
    <div class="header">
      <img :src="dynamicDetail.cover" alt="">
      <div class="maskbox"></div>
      <div class="title">
        <p>{{dynamicDetail.title}}</p>
        <p class="time">{{dynamicDetail.create_time}}</p>
        <!-- 设计风格 -->
        <div>
          <Tag color="blue">设计风格：{{dynamicStyle.name}}</Tag>
        </div>
        <!-- 标签 -->
        <div class="tags">
          <span v-for="(v,i) in tags" :key="i">{{v}}</span>
        </div>
        <!-- 关注 收藏 点赞 评论 -->
        <div class="btnBox" v-if="$store.state.userInfo">
          <Button v-if="!isSelf" @click="follow" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_follow? '#0058A3' : ''" :type="dynamicDetail.is_follow? 'checkmark-round' : 'plus-round' "></Icon>
            {{dynamicDetail.is_follow? '取消关注':'关注' }}
          </Button>
          <Button @click="collection" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_collection? '#0058A3' : ''" type="star"></Icon>
            {{dynamicDetail.is_collection? '取消收藏':'收藏' }}【{{dynamicDetail.collection_count}}】
          </Button>
          <Button @click="like" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_like? '#0058A3' : ''" type="thumbsup"></Icon>
            {{dynamicDetail.is_like? '取消点赞':'点赞' }}【{{dynamicDetail.fabulous_count}}】
          </Button>
          <Button @click="openDrawer" type="ghost">
            <Icon size="14" color="" type="chatbox-working"></Icon>
            评论【{{commentList.length}}】
            <!-- 评论【{{dynamicDetail.comment_count}}】 -->
          </Button>
        </div>
      </div>
    </div>
    <!-- 动态内容 -->
    <div class="box d_f j_c_sb">
      <div class="box_left">
        <div class="markdown-body" v-html="dynamicDetail.content"></div>
        <mavon-editor v-show="false" ref="md" />
      </div>
      <!-- 发布者资料 -->
      <Affix v-if="dynamicDetail.state == 1">
        <div class="box_right">
          <div class="content">
            <img class="headimg" @click="toUserHome" :src="dynamicDetail.head_img" alt="">
            <p>{{dynamicDetail.nickname}}
            </p>
            <div class="d_f j_c_c" style="padding: 5px 0;">
              <Tag color="blue">{{dynamicDetail.customer_type == 0 ? '普通用户' : '设计机构'}}</Tag>
            </div>
            <p>
              <span style="margin-right: 10px;">关注：{{dynamicDetail.follow_to_count}}</span>
              <span>粉丝：{{dynamicDetail.follows_count}}</span>
            </p>
            <!-- <p>地址</p> -->
            <div class="introduce">{{dynamicDetail.introduce}}</div>
            <div class="d_f j_c_c" style="padding: 10px 0 20px;" v-if="dynamicDetail.customer_type == 1 && 
              account_number && 
              dynamicDetail.account_number != account_number &&
              $store.state.userInfo.customer_type == 0">
              <Button @click="()=>consultDialog = true" type="info">
                <Icon size="14" color="" type="chatbox-working"></Icon>
                咨询
              </Button>
            </div>
          </div>
          <!-- 其他动态 -->
          <div class="other_list">
            <div class="item d_f" @click="toDetail(v.id)" v-for="v in dynamicDetail.otherDynamicList" :key="v.id">
              <div class="left">
                <img :src="v.cover" alt="">
              </div>
              <div class="right">
                <p class="title">{{v.title}}</p>
                <div class="icon-box">
                  <Icon size="20" color="#C6C6C6" type="eye"></Icon>
                  <div class="count">{{v.views}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Affix>
      <Affix v-else>
        <div class="box_right">
          <div class="content">
            <img src="@/assets/icons/user.png" alt="">
            <p class="cancellation">用户已注销</p>
          </div>
        </div>
      </Affix>
    </div>
    <!-- 咨询弹窗 -->
    <Modal v-model="consultDialog" title="咨询" width="600" :styles="{top: '10vh'}">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
        <Form-item label="所在城市" prop="city">
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
        <Button style="margin-top: 10px;" @click="()=>consultDialog=false" size="large" long>取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Drawer from "vue-simple-drawer";
import Comment from "@/components/Comment.vue";
import { replace, filtion } from "verification-sensitive";
import Address from "@/components/Address.vue";
const reg = /^\d+(\.\d+)?$/;
function TEST_NUM(rule, value, callback) {
  if (!reg.test(value)) callback(new Error("只能为数字"));
  else callback();
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
  name: "ClientDynamicDetails",
  components: {
    Drawer,
    Comment,
    Address
  },
  data() {
    return {
      dynamicDetail: {},
      userData: {},
      otherDynamicList: [],
      flag: true,
      open: false,
      account_number: this.$store.state.userInfo ? this.$store.state.userInfo.account_number : '',
      dynamicId: null,
      tags: [],
      commentList: [],
      commentContent: '',
      styleList: [], // 装修风格列表
      dynamicStyle: {},
      consultDialog: false, // 咨询弹窗
      formInline: {
        style_id: 1,
        area: null,
        city: '',
        situation: '毛坯房',
        budget: '', // 预算
        planned_time: '', // 预计入住时间
        phone_number: "", // 手机号
        wx_number: "", // 微信号
        qq_number: "", // QQ号
      },
      house_status: ['毛坯房', '精装修', '老房重装'],
      ruleInline: {
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
      date_options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  computed: {
    // 判断是否本人
    isSelf() {
      if (this.account_number == this.dynamicDetail.account_number) return true;
      else return false;
    }
  },

  created() {
    this.dynamicId = Number(this.$route.query.id);
    this.open = this.$route.query.open ? this.$route.query.open : false;
    this.getDynamicDetail(this.dynamicId);
    this.getComment();
    this.getContact();
  },

  methods: {
    // 获取动态详情
    async getDynamicDetail(id) {
      try {
        let res = await this.$http.post("/client/dynamic_detail", { id });
        let data = res.data.data;
        this.dynamicDetail = data.dynamicDetail;
        this.tags = data.dynamicDetail.tags.split(',');
        this.otherDynamicList = data.dynamicDetail.otherDynamicList;
        this.getStyleList();
      } catch (err) { }
    },
    toDetail(id) {
      this.getDynamicDetail(id);
      window.scrollTo(0, 0);
    },
    change() {
      this.flag = !this.flag;
    },
    // 点赞
    async like() {
      try {
        let data = { dynamic_id: this.dynamicDetail.id }
        await this.$http.post('/client/dynamic_likes', data);
        this.getDynamicDetail(this.dynamicId);
      } catch (err) { }
    },
    // 收藏
    async collection() {
      try {
        let data = { dynamic_id: this.dynamicDetail.id }
        await this.$http.post('/client/dynamic_collection', data);
        this.getDynamicDetail(this.dynamicId);
      } catch (err) { }
    },
    // 关注
    async follow() {
      try {
        let data = { f_account_number: this.dynamicDetail.account_number };
        await this.$http.post('/client/user_follow', data);
        this.getDynamicDetail(this.dynamicId);
      } catch (err) { }
    },
    // 获取评论
    async getComment() {
      try {
        let res = await this.$http.get('/client/find_dynamic_comment', { id: this.dynamicId });
        this.commentList = res.data.data;
      } catch (err) { }
    },
    // 评论
    async sendComment() {
      if (this.commentContent == '') return this.$Message.error('请输入内容后再发送...');
      if (filtion(this.commentContent)) return this.$Message.error('评论存在敏感词...');
      try {
        let data = {
          account_number: this.account_number,
          dynamic_id: this.dynamicId,
          content: this.commentContent
        }
        let res = await this.$http.post('/client/dynamic_comment', data);
        if (res.data.status === 0) {
          this.commentContent = '';
          this.getComment();
        }
      } catch (err) { }
    },
    // 获取装修风格列表
    async getStyleList() {
      try {
        let res = await this.$http.get('/client/find_style_list');
        this.styleList = res.data.data;
        this.dynamicStyle = await this.styleList.find(v => v.id === this.dynamicDetail.style);
      } catch (err) { }
    },
    // 查询用户联系方式
    async getContact() {
      if(!this.account_number) return;
      let res = await this.$http.get('/client/find_contact');
      let data = res.data.data;
      this.formInline.wx_number = data.wx_number;
      this.formInline.qq_number = data.qq_number;
      this.formInline.phone_number = data.phone_number;
    },
    // 提交咨询
    handleSubmit(name) {
      this.$refs[name].validate( async (valid) => {
        if (valid) {
          let data = { ...this.formInline, to_account_number: this.dynamicDetail.account_number };
          let res = await this.$http.post('/client/send_consult', data);
          if(res.data.status === 0) this.consultDialog = false;
        }
      });
    },
    toUserHome() {
      this.$router.push(
        {
          path: '/user_home',
          query: {
            account_number: this.dynamicDetail.account_number,
          }
        }
      )
    },
    openDrawer() {
      this.open = !this.open;
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "mavon-editor/dist/css/index.css";
::v-deep .vue-simple-drawer {
  min-width: 550px !important;
  color: black !important;
  background-color: white !important;
}
::v-deep .mask {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.drawerBox::-webkit-scrollbar {
  width: 0.5em;
  background-color: #d9d9d9;
}

.drawerBox::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background-color: #b9b9b9;
}
.drawerBox {
  height: 100%;
  overflow-y: auto;
  padding-right: 20px;
  .empty {
    text-align: center;
    font-size: 14px;
    color: #aaa;
    padding: 40px 0;
  }
  .commentReply {
    margin: 20px 0;
    .selfHeadimg {
      display: flex;
      img {
        border: 1px solid #ddd;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        margin-right: 10px;
      }
    }
    .replyBtn {
      padding: 10px 0;
      display: flex;
      justify-content: end;
    }
  }
}
/////////////评论样式结束///////////////
.clientDynamicDetails {
  // font-size: 1rem;
  .header {
    height: 360px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
    }
    .title,
    .maskbox {
      position: absolute;
    }
    .maskbox {
      width: 100%;
      height: 100%;
      z-index: 2;
      background: black;
      top: 0;
      opacity: 0.6;
    }
    .title {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      z-index: 3;
      text-align: center;
      .btnBox {
        margin-top: 20px;
        button {
          color: #fff;
          margin-right: 20px;
        }
      }
      p {
        font-size: 32px;
        &.time {
          font-size: 25px;
        }
      }
      .tags {
        margin: 10px;
        width: 100%;
        span {
          padding: 6px 12px;
          background: hsla(0, 0%, 100%, 0.2);
          color: #fff;
          font-size: 14px;
          margin-right: 10px;
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
  .box {
    width: 1280px;
    margin: 40px auto 0;
    &_left {
      width: 880px;
    }
    &_right {
      width: 340px;
      background: url(@/assets/images/bg.png) no-repeat;
      overflow: hidden;
      .content {
        margin-top: 50px;
        .headimg:hover {
          cursor: pointer;
        }
        p {
          text-align: center;
        }
        p:first-of-type {
          margin-top: 20px;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        p:last-of-type {
          font-size: 14px;
        }
        img {
          display: block;
          margin: auto;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          &:hover {
            cursor: pointer;
          }
        }
        .introduce {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #333;
          font-weight: 400;
          line-height: 24px;
        }
      }
      .other_list {
        margin-bottom: 10px;
        .item {
          border: 1px solid #eee;
          padding: 10px;
          background: white;
          &:hover {
            cursor: pointer;
          }
          .title {
            padding: 0 20px 0;
            font-size: 14px;
          }
        }
        .left {
          img {
            width: 100px;
            height: 100px;
          }
        }
        .right {
          width: 100%;
          position: relative;
        }
        .icon-box {
          width: 100%;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          .count {
            color: #c6c6c6;
            font-size: 14px;
            margin-left: 5px;
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.cancellation {
  padding: 25px 0 40px;
}
</style>