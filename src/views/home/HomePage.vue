<template>
  <div class="home-page">
    <div class="navigation">
      <div class="navigation_box d_f j_c_sa">
        <div class="logo">好宜居</div>
        <div class="tab d_f j_c_sa a_l_c">
          <p :class="{active:activedTab===index}" v-for="(v,index) in tabList" @click="changeActived(index,v.path)" :key="index">
            {{v.meta.title}}
          </p>
        </div>
        <div class="search d_f a_l_c">
          <Input v-model="searchValue" size="large" placeholder="搜索相关作品">
          <Button slot="append" icon="ios-search"></Button>
          </Input>
        </div>
        <Tooltip v-if="!userInfo.account_number" content="未登录" placement="bottom">
          <div @click="toLogin" class="user hover d_f a_l_c j_c_c">
            <img src="@/assets/icons/user.png" />
          </div>
        </Tooltip>
        <Tooltip v-show="userInfo.account_number" placement="bottom">
          <div class="user d_f a_l_c j_c_c">
            <div class="head_img_box d_f a_l_c j_c_c">
              <img class="head_img" :src="userInfo.head_img" />
            </div>
            <div class="nickname">{{userInfo.nickname}}</div>
          </div>
          <div class="tooltip_content" slot="content">
            <p>个人资料</p>
            <p>点赞列表</p>
            <p>我的评论</p>
            <p v-if="userInfo.customer_type == 0">我的咨询</p>
            <p>我的收藏</p>
            <p @click="logout">退出登录</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <div class="webView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientHomePage",

  data() {
    return {
      activedTab: 0,
      isLogin: true,
      userInfo: {
        account_number: null,
        customer_type: null,
        head_img: "",
        nickname: "",
      },
      searchValue: "",
      tabList: [],
    };
  },
  created() {
    // console.log( this.$cookie.get("access_userInfo"));
    if (this.$cookie.get("access_userInfo")) {
      this.userInfo = JSON.parse(this.$cookie.get("access_userInfo"));
    }
  },
  mounted() {
    // 获取子路由
    this.tabList = this.$router.options.routes.find(
      (v) => v.name == "HomePage"
    ).children;
  },

  methods: {
    changeActived(i, path) {
      this.activedTab = i;
      this.$router.push(path);
    },
    toLogin() {
      this.$router.push("/login");
    },
    // 退出登录
    logout() {
      this.$Modal.confirm({
        title: "退出登录",
        content: "您确定要退出登录吗",
        onOk: () => {
          this.$cookie.delete("access_userInfo");
          this.$cookie.delete("access_token");
          this.$router.push({ path: "/login" });
        },
        onCancel: () => {},
      });
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: fontLogo;
  src: url(../../utils/GongFanYueXinTiCu-2.ttf);
}
.home-page {
  width: 100%;
  // height: 100%;
  background: #f7f7f7;
  .navigation {
    margin-bottom: 20px;
    background: #fff;
    // height: 70px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 5%);
    &_box {
      margin: auto;
      width: 80%;
      .logo {
        background: $theme_color;
        padding: 10px;
        color: #fff;
        font-size: $logo_size;
        font-family: fontLogo;
        font-weight: bold;
      }
      .tab {
        font-size: 16px;
        width: 400px;
        p {
          transition: all 0.2s;
        }
        p.active {
          color: $theme_color;
          font-size: 18px;
          font-weight: bold;
        }
        p:hover {
          cursor: pointer;
        }
      }
      .search {
        width: 350px;
        .ivu-input-group-append {
          background: $theme_color !important;
        }
        .ivu-icon.ivu-icon-ios-search {
          color: #fff !important;
        }
      }
      .user {
        // padding-top: 5px;
        padding: 4px;
        border-radius: 50%;
        // height: 64px;
        overflow: hidden;
        transition: all 0.5s;
        &.hover {
          width: 50px;
        }
        img {
          width: 100%;
        }
        .head_img_box {
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #e3e3e3;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          .head_img {
            overflow: hidden;
            border-radius: 50%;
            padding: 1px;
            width: 100%;
            height: 100%;
          }
        }
        &.hover:hover {
          cursor: pointer;
          background: #ccc;
        }
        .nickname {
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .tooltip_content {
        p {
          padding: 8px 30px;
          &:hover {
            color: #aaa;
            cursor: pointer;
          }
        }
      }
    }
  }
  .webView {
    width: 1250px;
    margin: auto;
  }
}
</style>
