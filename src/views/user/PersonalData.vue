<template>
  <div class="personaldata">
    <!-- 侧边栏 -->
    <div class="box d_f">
      <div class="box-left">
        <Menu @on-select="changeMeun" :active-name="activeName">
          <Menu-item v-for="v in menuList" :key="v.name" :name="v.name">{{ v.title }}</Menu-item>
        </Menu>
      </div>
      <div class="box-right">
        <!-- 头像 -->
        <div class="head-img">
          <div class="left">
            <img src="@/assets/a.png" alt="">
          </div>
          <div class="right">
            <p class="nickname">
              <span>鸡你太美</span>
              <Tag color="blue">普通用户</Tag>
            </p>
            <p class="fans-follow">
              <span>关注:12</span>
              <span>粉丝:23</span>
            </p>
          </div>
        </div>
        <!-- 资料 -->
        <div class="personal">
          <div class="title">{{ this.activeTitle }}</div>
          <div class="msg-box">
            <BasicInformation v-show="activeKey === 1"></BasicInformation>
            <OtherInfoDes v-show="activeKey === 2 && $store.state.userInfo.customer_type === '1'"></OtherInfoDes>
            <OtherInfoOrd v-show="activeKey === 2 && $store.state.userInfo.customer_type === '0'"></OtherInfoOrd>
            <AccountSetting v-show="activeKey === 3"></AccountSetting>
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
const menuList = [
  {
    name: 1,
    title: '个人资料'
  },
  {
    name: 2,
    title: '其他信息'
  },
  {
    name: 3,
    title: '账号设置'
  }
];

export default {
  name: 'PersonalData',
  components: {
    BasicInformation,
    OtherInfoDes,
    OtherInfoOrd,
    AccountSetting
  },
  data() {
    return {
      menuList,
      activeName: 1,
      activeTitle: menuList[0].title,
      activeKey: 1
    }
  },
  methods: {
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
  .ivu-form-item-content{
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
      overflow-y: auto;
      /*********头像start*********/
      .head-img {
        height: 200px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 5%);
        .left {
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