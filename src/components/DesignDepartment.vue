<template>
  <div class="designDepartment">
    <div class="container">
      <div class="headimg" @click="toUserHome">
        <img :src="design.headimg">
      </div>
      <div class="nickname">
        <p class="tips">{{design.mechanism_name}}</p>
        <p style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 100%;">
          {{design.nickname}} {{design.mechanism_name ? `| ${design.mechanism_name}` : '' }}
        </p>
      </div>
      <p class="establish_time"><span v-if="design.establish_time">成立时间: {{design.establish_time}}</span></p>
      <div class="address d_f j_c_c">
        <span v-if="design.city">{{design.city}}</span>
      </div>
      <div class="introduce">
        <div class="text">
          {{design.introduce}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  naem: 'DesignDepartment',
  props: {
    design: {
      type: Object
    }
  },
  methods: {
    toUserHome() {
      this.$router.push(
        {
          path: '/user_home',
          query: {
            account_number: this.design.account_number,
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.designDepartment {
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
  width: 280px;
  .container {
    width: 280px;
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
      &:hover {
        cursor: pointer;
      }
      img {
        border-radius: 50%;
        width: 96px;
        height: 96px;
      }
    }
    .nickname {
      text-align: center;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      // overflow: hidden;
      position: relative;
      &:hover {
        .tips {
          opacity: 1;
        }
      }
      // 公司名弹出提示
      .tips {
        transition: all 0.3s;
        opacity: 0;
        font-size: 12px;
        font-weight: 100;
        padding: 10px;
        transform: translate(-50%);
        left: 50%;
        top: -40px;
        position: absolute;
        background: #585e6b;
        color: #fff;
        border-radius: 5px;
      }
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
      margin: auto;
      width: 80%;
      font-size: 14px;
      text-align: center;
      padding: 20px;
      .text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>