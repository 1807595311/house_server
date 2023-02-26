<template>
  <div class="design">
    <div class="container" @click="toUserHome">
      <div class="headimg">
        <img v-if="userObj.state == 1" :src="userObj.headimg">
        <img v-else src="@/assets/icons/user.png">
      </div>
      <p class="destag" v-if="userObj.customer_type == 1">
        <Tag color="blue">设计机构</Tag>
      </p>
      <p class="nickname" v-if="userObj.state == 1">{{userObj.nickname}}</p>
      <p class="nickname p_b_20" v-else>用户已注销</p>
      <div class="introduce" v-if="userObj.state == 1">
        {{userObj.introduce}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userObj: {
      type: Object
    }
  },
  methods: {
    toUserHome() {
      this.$router.push(
        {
          path: '/user_home',
          query: {
            account_number: this.userObj.f_account_number,
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.design {
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
  width: 180px;
  &:hover{
    cursor: pointer;
  }
  .container {
    width: 180px;
    background: url(@/assets/images/bg.png) no-repeat;
    background-size: 100% 80%;
    overflow: hidden;
    .headimg {
      background: #fff;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 50px auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 50%;
        width: 96px;
        height: 96px;
      }
    }
    .destag{
      text-align: center;
      margin-top: 10px;
    }
    .nickname {
      text-align: center;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }
    .establish_time {
      text-align: center;
      margin: 10px 0;
    }
    .address {
      margin: 10px auto 10px;
      span {
        background: #f5f5f5;
        color: #666;
        padding: 4px 14px;
      }
    }
    .introduce {
      margin: 10px auto;
      width: 80%;
      font-size: 14px;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>