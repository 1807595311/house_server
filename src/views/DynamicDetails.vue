<template>
  <div class="clientDynamicDetails">
    <!-- 评论弹出组件 -->
    <Drawer @close="toggle" align="right" :closeable="true">
      <div class="drawerBox" v-if="open">
        <!-- 发布评论 -->
        <div class="commentReply">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <Form-item prop="commentContent">
              <div class="selfHeadimg">
                <img :src="userInfo.head_img" alt="">
                <Input v-model="formValidate.commentContent" type="textarea" :autosize="{minRows: 4,maxRows: 7}" placeholder="请输入评论内容（限50字）..."></Input>
              </div>
            </Form-item>
          </Form>
          <div class="replyBtn">
            <Button type="primary" @click="sendComment">评论</Button>
          </div>
        </div>
        <!-- 评论和回复组件 -->
        <Comment @refreshComment="getComment" v-for="v in commentList" :author="dynamicDetail.account_number" :key="v.id" :comment="v"></Comment>
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
          <Tag color="blue">所在城市：{{dynamicDetail.city}}</Tag>
        </div>
        <!-- 标签 -->
        <div class="tags">
          <span v-for="(v,i) in tags" :key="i">{{v}}</span>
        </div>
        <!-- 关注 收藏 点赞 评论 -->
        <div class="btnBox" v-if="userInfo">
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
        <Back-top></Back-top>
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
              <Tag color="blue" v-if="dynamicDetail.customer_type == 1">设计机构</Tag>
            </div>
            <p>
              <span class="m_r_10">关注：{{dynamicDetail.follow_to_count}}</span>
              <span>粉丝：{{dynamicDetail.follows_count}}</span>
            </p>
            <!-- <p>地址</p> -->
            <div class="introduce">{{dynamicDetail.introduce}}</div>
            <div class="d_f j_c_c" style="padding: 10px 0 20px;">
              <Button @click="()=>consultDialog = true"  v-if="showConsultBtn" class="m_r_10" type="info">
                <Icon size="14" type="chatbox-working"></Icon>
                咨询
              </Button>
              <Button v-if="!isSelf && !showFollowBtn" type="info" @click="follow">
                <Icon size="16" :type="dynamicDetail.is_follow? 'checkmark-round' : 'plus-round' "></Icon>
                {{dynamicDetail.is_follow? '取消关注':'关注' }}
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
    <Consult :consultDialog="consultDialog" @sendConsult="sendConsult"></Consult>
  </div>
</template>

<script>
import Drawer from "vue-simple-drawer";
import Comment from "@/components/Comment.vue";
import { replace, filtion } from "verification-sensitive";
import Address from "@/components/Address.vue";
import Consult from "@/components/Consult.vue";
export default {
  name: "ClientDynamicDetails",
  components: {
    Drawer,
    Comment,
    Address,
    Consult
  },
  data() {
    return {
      dynamicDetail: {},
      userData: {},
      otherDynamicList: [],
      flag: true,
      open: false,
      userInfo: this.$store.state.userInfo ? this.$store.state.userInfo : null,
      account_number: this.$store.state.userInfo ? this.$store.state.userInfo.account_number : '',
      dynamicId: null,
      tags: [],
      commentList: [],
      commentContent: '',
      styleList: [], // 装修风格列表
      dynamicStyle: {},
      consultDialog: false, // 咨询弹窗
      ruleValidate: {
        commentContent: [{required: true,validator: this.vCommentContent,trigger: "blur"}]
      },
      formValidate: {
        commentContent: ''
      }
    };
  },
  watch: {
    formValidate:{
      deep: true,
      immediate: true,
      handler(newVal){
        this.commentContent = newVal.commentContent;
      }
    }
  },
  computed: {
    // 判断是否本人
    isSelf() {
      return this.account_number == this.dynamicDetail.account_number;
    },
    // 判断是否为同一用户类型
    showFollowBtn(){
      if(!this.userInfo) return true
      return this.dynamicDetail.customer_type ==  this.userInfo.customer_type;
    },
    showConsultBtn(){
      if(!this.userInfo) return false
      return this.dynamicDetail.customer_type == 1 && 
             this.account_number && 
             this.dynamicDetail.account_number != this.account_number &&
             this.userInfo.customer_type == 0
    }
  },

  created() {
    this.dynamicId = Number(this.$route.query.id);
    this.open = this.$route.query.open ? this.$route.query.open : false;
    this.getDynamicDetail(this.dynamicId);
    this.getComment();
  },

  methods: {
    vCommentContent(rule, value, callback) {
      if (value.length > 50 || value.length <= 0) {
        callback(new Error("评论1-50字之间"));
      }else if(filtion(value)){
        callback(new Error("评论内容存在敏感词"));
      } else {
        callback();
      }
    },
    // 获取动态详情
    async getDynamicDetail(id) {
      try {
        let res = await this.$http.post("/client/dynamic_detail", { id });
        let data = res.data.data;
        this.dynamicDetail = data.dynamicDetail;
        this.tags = data.dynamicDetail.tags.split(',');
        this.otherDynamicList = data.dynamicDetail.otherDynamicList;
        // 动态风格列表
        let styleRes = await this.$http.get('/client/find_style_list');
        this.styleList = styleRes.data.data;
        // 查找对应风格
        this.dynamicStyle = this.styleList.find(v=> v.id == this.dynamicDetail.style);
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
      let data = { dynamic_id: this.dynamicDetail.id }
      await this.$http.post('/client/dynamic_likes', data);
      this.getDynamicDetail(this.dynamicId);
    },
    // 收藏
    async collection() {
      let data = { dynamic_id: this.dynamicDetail.id }
      await this.$http.post('/client/dynamic_collection', data);
      this.getDynamicDetail(this.dynamicId);
    },
    // 关注
    async follow() {
      let data = { f_account_number: this.dynamicDetail.account_number };
      await this.$http.post('/client/user_follow', data);
      this.getDynamicDetail(this.dynamicId);
    },
    // 获取评论
    async getComment() {
      let res = await this.$http.get('/client/find_dynamic_comment', { id: this.dynamicId });
      this.commentList = res.data.data;
    },
    // 评论
    async sendComment() {
      this.$refs['formValidate'].validate(async (valid) => {
        if (valid) {
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
              this.formValidate.commentContent = '';
              this.getComment();
            }
          } catch (err) { }
        }
      });
    },
    // 关闭咨询s弹窗
    close(){
      this.consultDialog = false;
    },
    // 发送咨询
    async sendConsult(v){
      let data = { ...v, to_account_number: this.dynamicDetail.account_number };
      let res = await this.$http.post('/client/send_consult', data);
      if (res.data.status === 0) this.consultDialog = false;
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
  }
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
    padding: 15px 0;
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