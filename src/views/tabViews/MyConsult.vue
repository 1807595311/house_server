<template>
  <div class="my-consult">
    <div class="container d_f j_c_sb">
      <div class="left">
        <!-- 咨询列表 -->
        <div v-if="true">
          <div class="item d_f a_l_c" @click="changeIndex(v)" v-for="v in 10" :key="v" :style="activeIndex == v ? 'background: #eee;': ''">
            <div class="head-img">
              <img src="@/assets/a.png" alt="">
            </div>
            <div style="margin-left: 10px;">
              <p>形成设计</p>
              <p>广西名扬天下设计股份有限公司</p>
              <p class="time">2022-10-23 20:20:20</p>
            </div>
          </div>
        </div>
        <div v-else class="item">
          <p class="empty">暂无数据</p>
        </div>
      </div>
      <div class="right">
        <!-- 咨询详情 -->
        <div v-if="true" class="container">
          <div class="head-img">
            <img src="@/assets/a.png" alt="">
          </div>
          <div class="info">
            <p>昵称</p>
            <Tag color="blue">机构名称</Tag>
          </div>
          <div class="other-data">
            <div class="item">
              <p>所在城市：</p>
              <p>南宁市</p>
            </div>
            <div class="item">
              <p>装修风格：</p>
              <p>北欧风</p>
            </div>
            <div class="item">
              <p>房屋面积：</p>
              <p>25 m²</p>
            </div>
            <div class="item">
              <p>房屋现状：</p>
              <p>毛坯房 精装修 老房重装</p>
            </div>
            <div class="item">
              <p>装修预算：</p>
              <p>15 万元</p>
            </div>
            <div class="item">
              <p>计划入住时间：</p>
              <p>2023年4月</p>
            </div>
            <div class="item">
              <p>手机号：</p>
              <p>1812848284</p>
            </div>
            <div class="item">
              <p>微信号：</p>
              <p>wdkg1e23</p>
            </div>
            <div class="item">
              <p>QQ号：</p>
              <p>23214314</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="empty">暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyConsult',
  data() {
    return {
      formInline: {},
      activeIndex: 1
    }
  },
  methods: {
    changeIndex(i){
      this.activeIndex = i;
    }
  }
}
</script>

<style lang="scss" scoped>
.my-consult {
  height: calc(100vh - 90px);
  .empty {
    text-align: center;
    font-size: 16px;
    padding: 20px 0;
  }
  .container {
    height: calc(100% - 20px);
    .left {
      box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
      background: #fff;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.5em;
        background-color: #d9d9d9;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: #b9b9b9;
      }
      .item {
        font-size: 14px;
        padding: 10px 20px;
        border-bottom: 1px solid #ddd;
        width: 320px;
        &:hover{
          cursor: pointer;
        }
        .head-img {
          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
        p {
          color: #555;
          &.time {
            color: #bbb;
          }
        }
      }
    }
    .right {
      width: calc(1250px - 350px);
      box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
      background: #fff;
      .container {
        width: 100%;
        .head-img {
          margin: 20px auto;
          width: 100px;
          height: 100px;
          img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
          }
        }
        .info {
          text-align: center;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .other-data {
          padding: 30px;
          margin: 0 150px;
          .item {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 12px 0;
            font-size: 16px;
            border-bottom: 1px dashed #e9e9e9;
          }
        }
      }
    }
  }
}
</style>