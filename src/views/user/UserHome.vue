<template>
  <div class="UserHome">
    <div class="personCenterBg">
      <div class="headimg">
        <img v-if="userInfo.state==1" :src="userInfo.head_img" alt="">
        <img v-else src="@/assets/icons/user.png" alt="">
      </div>
      <div class="d_f j_c_c" v-if="showFollowsBtn">
        <Button type="ghost" @click="follow">
          <Icon size="16" :color="userInfo.is_follows ? '#0058A3' : ''" :type="userInfo.is_follows ? 'checkmark-round' : 'plus-round' ">
          </Icon>
          {{userInfo.is_follows ? '取消关注':'关注' }}
        </Button>
      </div>
      <div class="d_f j_c_c m_t_10" v-if="showConsultBtn">
        <Button @click="()=>consultDialog = true" style="margin-right: 10px;" type="info">
          <Icon size="14" type="chatbox-working"></Icon>
          咨询
        </Button>
      </div>
      <div v-if="userInfo.state==1">
        <p class="title">{{userInfo.nickname}}</p>
        <div class="d_f j_c_c" style="padding-top: 10px;" v-if="userInfo.mechanism_name">
          <Tag color="blue">{{userInfo.mechanism_name}}</Tag>
        </div>
        <p class="d_f j_c_c" style="padding-top: 10px;color: #fff;font-size: 14px;">
          {{userInfo.city}} {{userInfo.establish_time}}
        </p>
        <p class="followCount">
          <span>{{userInfo.dynamic_count}} 作品</span>
          <strong>|</strong>
          <span>{{userInfo.follows_count}} 粉丝</span>
        </p>
        <p class="introduce">
          {{userInfo.introduce}}
        </p>
      </div>
      <div v-else>
        <p class="title">用户已注销</p>
      </div>
    </div>
    <div class="d_f con j_c_sb">
      <Menu theme="light" :active-name="activeName" @on-select="changeMenu">
        <Menu-item name="dynamicList">
          <Icon type="document-text"></Icon>
          动态
        </Menu-item>
        <Menu-item name="fabulousList" v-if="dataList.fabulousList.length">
          <Icon type="heart"></Icon>
          点赞
        </Menu-item>
      </Menu>
      <div v-if="activeName === 'dynamicList'">
        <div class="container">
          <Dynamic v-for="v in dataList.dynamicList" :dynamic="v" :key="v.id"></Dynamic>
        </div>
      </div>
      <div v-if="activeName === 'fabulousList'">
        <div class="container">
          <Dynamic v-for="v in dataList.fabulousList" :dynamic="v" :key="v.id"></Dynamic>
        </div>
      </div>
    </div>
    <LoadingMore :count="count" :listLength="dataList[activeName].length" @nextPage="nextPage"></LoadingMore>
    <!-- 咨询 -->
    <Consult :consultDialog="consultDialog" @sendConsult="sendConsult"></Consult>
  </div>
</template>

<script>
import Dynamic from "@/components/Dynamic.vue";
import Consult from "@/components/Consult.vue";
import LoadingMore from "@/components/LoadingMore.vue";
export default {
  name: "UserHome",
  components: {
    Dynamic,
    Consult,
    LoadingMore
  },
  data() {
    return {
      account_number: '',
      userInfo: {},
      loginUserInfo: this.$store.state.userInfo ? this.$store.state.userInfo : {},
      consultDialog: false, // 咨询弹窗
      currentPage: 1,
      count: 0,
      activeName: 'dynamicList',
      dataList: {
        dynamicList: [],
        fabulousList: []
      }
    }
  },
  created() {
    this.account_number = this.$route.query.account_number;
    this.getUserInfo();
    this.getFabulous()
  },
  computed: {
    showConsultBtn() {
      return this.userInfo.customer_type === '1'
        && this.account_number != this.loginUserInfo.account_number
        && this.loginUserInfo.customer_type === '0';
    },
    showFollowsBtn() {
      return this.loginUserInfo.account_number && this.account_number != this.loginUserInfo.account_number
      && this.userInfo.customer_type !=  this.loginUserInfo.customer_type
       
    }
  },
  methods: {
    async changeMenu(key) {
      this.activeName = key;
      this.currentPage = 1;
    },
    async nextPage() {
      this.currentPage++;
      if (this.activeName == 'dynamicList') {
        this.getUserInfo()
      } else {
        this.getFabulous()
      }
    },
    // 获取用户资料
    async getUserInfo() {
      let res = await this.$http.post('/client/find_other_userinfo', { account_number: this.account_number, currentPage: this.currentPage });
      let resData = res.data.data;
      this.userInfo = resData.userInfo;
      this.count = res.data.count;
      resData.dynamicList.forEach(v => this.dataList.dynamicList.push(v));
      let map = new Map();
      for (let item of this.dataList.dynamicList) {
        map.set(item.id, item);
      }
      this.dataList.dynamicList = [...map.values()];
    },
    // 获取点赞列表
    async getFabulous() {
      if(this.$store.state.userInfo && this.$store.state.userInfo.account_number){
        let res = await this.$http.post('/client/find_other_user_fabulous', { account_number: this.account_number, currentPage: this.currentPage });
        let resData = res.data.data;
        this.count = res.data.count;
        resData.forEach(v => this.dataList.fabulousList.push(v));
      }
    },
    async follow() {
      let data = { f_account_number: this.userInfo.account_number };
      await this.$http.post('/client/user_follow', data);
      this.getUserInfo();
    },
    // 关闭咨询s弹窗
    close() {
      this.consultDialog = false;
    },
    async sendConsult(v) {
      let data = { ...v, to_account_number: this.account_number };
      let res = await this.$http.post('/client/send_consult', data);
      if (res.data.status === 0) this.consultDialog = false;
    }

  }
}
</script>

<style  lang="scss" scoped>
.UserHome {
  .ivu-btn.ivu-btn-ghost {
    color: #fff;
  }
  .personCenterBg {
    background: #333333;
    width: 100%;
    padding-bottom: 20px;
    background-image: url("@/assets/images/personCenter_bg.png");
    background-repeat: no-repeat;
    background-position: top -275px right 10px;
    overflow: hidden;
    .headimg {
      margin: 40px auto 10px;
      width: 110px;
      height: 110px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .title {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 800;
      text-align: center;
      color: white;
    }
    .followCount {
      color: #fff;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-top: 10px;
      span {
        margin: 0 15px;
      }
    }
    .introduce {
      width: 60%;
      color: #fff;
      font-size: 18px;
      text-align: center;
      margin: 10px auto 0;
    }
  }
  .con {
    width: 1600px;
    margin: auto;
    .ivu-menu.ivu-menu-light.ivu-menu-vertical {
      border-left: 1px solid #dddee1;
    }
  }
  .container {
    width: 1280px;
    margin: 20px auto;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 310px;
  }
  .scroll {
    margin: auto;
    padding: 40px 0;
    font-size: 20px;
    text-align: center;
  }
}
</style>