<template>
  <div class="clientDynamicDetails">
    <div class="header">
      <img :src="dynamicDetail.cover" alt="">
      <div class="mask"></div>
      <div class="title">
        <p>{{dynamicDetail.title}}</p>
        <p class="time">{{dynamicDetail.update_time}}</p>
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
          </div>
          <div class="other_list">
            <div class="item d_f" @click="toDetail(v.id)" v-for="v in otherDynamicList" :key="v.id">
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
export default {
  name: "ClientDynamicDetails",
  data() {
    return {
      dynamicDetail: {},
      userData: {},
      otherDynamicList: [],
    };
  },

  created() {
    this.getDynamicDetail(this.$route.query.id);
  },

  methods: {
    async getDynamicDetail(id) {
      try {
        let res = await this.$http.get("/client/dynamic_detail", { id });
        let data = res.data.data;
        this.dynamicDetail = data.dynamicDetail;
        this.otherDynamicList = data.dynamicDetail.otherDynamicList;
      } catch (err) {}
    },
    toDetail(id){
      this.$router.push({path: '/dynamic_details', query:{id}});
      this.$router.go(0)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "mavon-editor/dist/css/index.css";
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
    .mask {
      position: absolute;
    }
    .mask {
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
      p {
        font-size: 32px;
        &.time {
          font-size: 25px;
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
          &:hover{
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
          &:hover{
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
        .right{
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