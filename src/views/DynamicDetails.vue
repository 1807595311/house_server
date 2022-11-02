<template>
  <div class="clientDynamicDetails">
    <Drawer @close="toggle" align="right" :closeable="true">
      <div v-if="open">content here</div>
    </Drawer>
    <div class="header">
      <img :src="dynamicDetail.cover" alt="">
      <div class="maskbox"></div>
      <div class="title">
        <p>{{dynamicDetail.title}}</p>
        <p class="time">{{dynamicDetail.create_time}}</p>
        <!-- 标签 -->
        <div class="tags">
          <span v-for="(v,i) in tags" :key="i">{{v}}</span>
        </div>
        <!-- 关注 收藏 点赞 评论 -->
        <div class="btnBox" v-if="$store.state.userInfo">
          <Button v-if="!isSelf" @click="collection" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_collection? '#0058A3' : ''" :type="dynamicDetail.is_collection? 'checkmark-round' : 'plus-round' "></Icon>
            {{dynamicDetail.is_collection? '取消关注':'关注' }}
          </Button>
          <Button @click="collection" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_collection? '#0058A3' : ''" type="star"></Icon>
            {{dynamicDetail.is_collection? '取消收藏':'收藏' }}
          </Button>
          <Button @click="like" type="ghost">
            <Icon size="16" :color="dynamicDetail.is_like? '#0058A3' : ''" type="thumbsup"></Icon>
            {{dynamicDetail.is_like? '取消点赞':'点赞' }}
          </Button>
          <Button @click="openDrawer" type="ghost">
            <Icon size="14" color="" type="chatbox-working"></Icon>
            评论
          </Button>
        </div>
      </div>
    </div>
    <div class="box d_f j_c_sb">
      <div class="box_left">
        <div class="markdown-body" v-html="dynamicDetail.content"></div>
        <mavon-editor v-show="false" ref="md" />
      </div>
      <Affix>
        <div class="box_right">

          <div class="content">
            <img :src="dynamicDetail.head_img" alt="">
            <p>{{dynamicDetail.nickname}}</p>
            <!-- <p>地址</p> -->
            <div class="introduce">{{dynamicDetail.introduce}}</div>
            <div class="d_f j_c_c" v-if="dynamicDetail.customer_type == 1 && account_number && dynamicDetail.account_number != account_number && $store.state.userInfo.customer_type == 0">
              <Button @click="openDrawer" type="info">
                <Icon size="14" color="" type="chatbox-working"></Icon>
                咨询
              </Button>
            </div>
          </div>
          <div class="other_list">
            <div class="item d_f j_c_sb" @click="toDetail(v.id)" v-for="v in otherDynamicList" :key="v.id">
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
    </div>
  </div>
</template>

<script>
import Drawer from "vue-simple-drawer";
export default {
  name: "ClientDynamicDetails",
  components: {
    Drawer,
  },
  data() {
    return {
      dynamicDetail: {},
      userData: {},
      otherDynamicList: [],
      flag: true,
      open: false,
      account_number: this.$store.state.userInfo? this.$store.state.userInfo.account_number : '',
      detaId: null,
      tags: []
    };
  },
  computed:{
    // 判断是否本人
    isSelf(){
      if(this.account_number == this.dynamicDetail.account_number) return true;
      else return false;
    }
  },

  created() {
    this.detaId = this.$route.query.id
    this.getDynamicDetail(this.detaId);
  },
  mounted() {},

  methods: {
    async getDynamicDetail(id) {
      try {
        let res = await this.$http.post("/client/dynamic_detail", { id});
        let data = res.data.data;
        this.dynamicDetail = data.dynamicDetail;
        this.tags = data.dynamicDetail.tags.split(',');
        this.otherDynamicList = data.dynamicDetail.otherDynamicList;
      } catch (err) {}
    },
    toDetail(id) {
      this.getDynamicDetail(id);
      window.scrollTo(0, 0);
    },
    change() {
      this.flag = !this.flag;
    },
    // 点赞
    async like(){
      try{
        let data = { dynamic_id: this.dynamicDetail.id }
        let res = await this.$http.post('/client/dynamic_likes',data);
        this.getDynamicDetail(this.detaId);
      }catch(err){}
    },
    // 收藏
    async collection(){
      try{
        let data = { dynamic_id: this.dynamicDetail.id }
        let res = await this.$http.post('/client/dynamic_collection',data);
        this.getDynamicDetail(this.detaId);
      }catch(err){}
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
  color: black !important;
  background-color: white !important;
}
::v-deep .mask {
  background-color: rgba(0, 0, 0, .7) !important;
}
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
      .tags{
        margin: 10px;
        width: 100%;
        span{
          padding: 6px 12px;
          background: hsla(0,0%,100%,.2);
          color: #fff;
          font-size: 14px;
          margin-right: 10px;
          &:last-of-type{
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
        height: 250px;
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
        .item {
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
</style>