<template>
  <div class="home-page">
    <div class="navigation">
      <div class="navigation_box d_f j_c_sa">
        <div class="logo">好宜居</div>
        <div class="tab d_f j_c_sa a_l_c">
          <p :class="{active:$store.state.activedTab===index}" v-for="(v,index) in tabList" @click="changeActived(v.path)" :key="index">
            {{v.meta.title}}
          </p>
        </div>
        <div class="search d_f a_l_c">
          <Input v-model="searchValue" size="large" @keyup.enter.native="search" placeholder="根据标题搜索动态">
            <Button @click="search" slot="append" icon="ios-search"></Button>
          </Input>
        </div>
        <Tooltip v-if="!userInfo.account_number" content="未登录" placement="bottom">
          <div @click="toLogin" class="user hover d_f a_l_c j_c_c" style="margin-top: 5px;">
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
            <p @click="changeRouter('/personal_data')">个人资料</p>
            <p @click="changeRouter('/follow')">我的关注</p>
            <p @click="changeRouter('/likes')">我的点赞</p>
            <p @click="changeRouter('/collection')">我的收藏</p>
            <p @click="changeRouter('/my_comment')">我的评论</p>
            <!-- <p>我的咨询</p>
            <p>我的动态</p> -->
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
    this.tabList = this.$router.options.routes.find( (v) => v.name == "HomePage").children;
  },

  methods: {
    changeActived(path) {
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
          let currentTime = new Date().getTime();
          currentTime -= 24 * 60 * 60 * 1000 * 10;
          let expires = new Date(currentTime).toUTCString(); // 有效时间
          // 将token存入cookie
          document.cookie = `access_token='';expires=${expires}`;
          document.cookie = `access_userInfo='';expires=${expires}`;
          this.$router.push({ path: "/login" });
        },
        onCancel: () => {},
      });
    },
    // 搜索
    search(){
      if(this.searchValue){
        this.$router.push({
          path: '/search_dynamic',
          query: { 
            keyword: this.searchValue
          } 
        })
      }
    },
    changeRouter(path){
      this.$router.push(path);
    }
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
  background: #F5F6F7;
  .navigation {
    margin-bottom: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    &_box {
      margin: auto;
      width: 1350px;
      .logo {
        background: $theme_color;
        padding: 16px 10px;
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
        input{
          z-index: 1;
        }
        .ivu-input-group-append {
          background: $theme_color !important;
        }
        .ivu-icon.ivu-icon-ios-search {
          color: #fff !important;
        }
      }
      .user {
        padding: 8px;
        border-radius: 50%;
        overflow: hidden;
        transition: all 0.5s;
        &.hover {
          width: 50px;
        }
        img {
          border-radius: 50%;
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
