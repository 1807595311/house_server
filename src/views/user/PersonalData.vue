<template>
  <div class="personaldata">
    <!-- 侧边栏 -->
    <div class="box d_f">
      <div class="box-left">
        <Menu @on-select="changeMeun" :active-name="activeName">
          <div v-for="v in menuList" :key="v.name">
            <Menu-item v-if="!(v.name == 2 && $store.state.userInfo.customer_type !== '0') " :name="v.name">
                {{ v.title }}
            </Menu-item>
          </div>
        </Menu>
      </div>
      <div class="box-right">
        <!-- 头像 -->
        <div class="head-img">
          <div class="left">
            <img :src="userInfo.head_img?userInfo.head_img: ''" alt="">
            <UploadHeadImg class="upload" @getFormdata="getFormdata"></UploadHeadImg>
          </div>
          <div class="right">
            <p class="nickname">
              <span>{{userInfo.nickname}}</span>
              <Tag color="blue">{{userInfo.customer_type == 0 ? '普通用户' : '设计机构'}}</Tag>
            </p>
            <p class="fans-follow">
              <span>关注:{{userInfo.follows}}</span>
              <span>粉丝:{{userInfo.fans}}</span>
            </p>
            <p class="create-time">
              注册时间：<span>{{userInfo.create_time}}</span>
            </p>
          </div>
        </div>
        <!-- 资料 -->
        <div class="personal">
          <div class="title">{{ this.activeTitle }}</div>
          <div class="msg-box">
            <BasicInformation :userInfo="userInfo" v-show="activeKey === 1"></BasicInformation>
            <HouseInfo v-show="activeKey === 2 && $store.state.userInfo.customer_type === '0'"></HouseInfo>
            <OtherInfoDes :userInfo="userInfo" v-show="activeKey === 3 && $store.state.userInfo.customer_type === '1'"></OtherInfoDes>
            <OtherInfoOrd :userInfo="userInfo" v-show="activeKey === 3 && $store.state.userInfo.customer_type === '0'"></OtherInfoOrd>
            <AccountSetting v-show="activeKey === 4"></AccountSetting>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInformation from "@/components/information/BasicInformation.vue";
import OtherInfoDes from "@/components/information/OtherInfo_des.vue";
import OtherInfoOrd from "@/components/information/OtherInfo_ord.vue";
import AccountSetting from "@/components/information/AccountSetting.vue";
import HouseInfo from "@/components/information/HouseInfo.vue";
import UploadHeadImg from "@/components/UploadHeadImg.vue";
const menuList = [
  {
    name: 1,
    title: '个人资料'
  },
  {
    name: 2,
    title: '房屋信息'
  },
  {
    name: 3,
    title: '其他信息'
  },
  {
    name: 4,
    title: '账号设置'
  }
];

export default {
  name: 'PersonalData',
  components: {
    BasicInformation,
    OtherInfoDes,
    HouseInfo,
    OtherInfoOrd,
    AccountSetting,
    UploadHeadImg
  },
  data() {
    return {
      menuList,
      activeName: 1,
      activeTitle: menuList[0].title,
      activeKey: 1,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo();
    let active = this.$route.query.active;
    if(active){
      this.activeName = Number(active);
      this.activeKey = Number(active);
    }
    
  },
  methods: {
    async getFormdata(formdata) {
      try {
        const formData = new FormData();
        formData.append('file', formdata);
        let res = await this.$http.upload('/client/upload_headimg', formData);
        if (res.data.status === 0) {
          // 重新设置cookie
          let cookie_userInfo = JSON.parse(this.$cookie.get("access_userInfo"));
          let currentTime = new Date().getTime();
          currentTime += 24 * 60 * 60 * 1000;
          let expires = new Date(currentTime).toUTCString(); // 有效时间
          cookie_userInfo.head_img = res.data.data.head_img;
          document.cookie = `access_userInfo=${JSON.stringify(cookie_userInfo)};expires=${expires}`;
          this.getUserInfo();
        }
      } catch (err) { }

    },
    async getUserInfo() {
      try {
        let res = await this.$http.post('/client/user_info');
        this.userInfo = res.data.data;
        // 重新设置cookie
        let cookie_userInfo = JSON.parse(this.$cookie.get("access_userInfo"));
        cookie_userInfo.head_img = this.userInfo.head_img;
        cookie_userInfo.account_number = this.userInfo.account_number;
        cookie_userInfo.customer_type = this.userInfo.customer_type;
        cookie_userInfo.nickname = this.userInfo.nickname;
        let currentTime = new Date().getTime();
        currentTime += 24 * 60 * 60 * 1000;
        let expires = new Date(currentTime).toUTCString(); // 有效时间
        document.cookie = `access_userInfo=${JSON.stringify(cookie_userInfo)};expires=${expires}`;
      } catch (err) { }
    },
    changeMeun(key) {
      this.activeKey = key;
      this.activeTitle = this.menuList.find(v => v.name === key).title;
    }
  }
}
</script>

<style lang="scss">
.personaldata {
  .ivu-form-item-label {
    font-size: 14px !important;
  }
  .ivu-form-item-content {
    font-size: 14px !important;
  }
  height: 100vh;
  background: #f4f4f4;
  overflow: hidden;
  font-size: 14px;
  .box {
    margin: 20px auto;
    width: 1100px;
    display: flex;
    &-right {
      margin-left: 20px;
      width: 100%;
      // overflow-y: auto;
      /*********头像start*********/
      .head-img {
        height: 200px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 5%);
        .left {
          position: relative;
          .upload {
            opacity: 0;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          img {
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .right {
          margin-left: 30px;
          p {
            font-size: 16px;
            padding: 10px 0;
          }
          .nickname {
            & > span {
              margin-right: 20px;
              font-size: 20px;
            }
          }
          .fans-follow {
            span {
              margin-right: 20px;
            }
          }
          .create-time {
            span {
              color: #777;
            }
          }
        }
      }
      /*********头像end*********/
      .head-img,
      .personal {
        padding: 20px;
        background: #fff;
      }
      /***********其他资料start**********/
      .personal {
        box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 5%);
      }
      /***********其他资料end**********/
      &::-webkit-scrollbar {
        width: 0.5em;
        background-color: #d9d9d9;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: #b9b9b9;
      }
      .title {
        padding: 10px 0 20px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>