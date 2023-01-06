<template>
  <div class="my-consult">
    <div class="container d_f j_c_sb">
      <div class="left">
        <!-- 咨询列表 -->
        <div class="title">{{customer_type === 0 ? '已发送' : '已接收'}}</div>
        <div v-if="consultList.length > 0">
          <div class="item d_f a_l_c" @click="changeIndex(index,v.id)" v-for="(v,index) in consultList" :key="v.id" :style="activeIndex == index ? 'background: #eee;': ''">
            <div class="head-img">
              <img :src="v.head_img" alt="">
            </div>
            <div class="m_l_2" style="width: 80%;">
              <p class="d_f j_c_sb">
                <span>{{v.nickname}}</span>
                <Poptip trigger="hover" placement="bottom-start" v-show="activeIndex === index" v-model="poptip">
                  <span class="f_w">···</span>
                  <div slot="title" class="text_a_c">删除咨询？</div>
                  <div slot="content">
                    <Button @click.stop="deleteConsult(v)" type="error" long>删除</Button>
                  </div>
                </Poptip>
              </p>
              <p>{{v.mechanism_name || ''}}</p>
              <p class="time d_f j_c_sb">
                <span>{{v.create_time}}</span>
                <span style="color: #e4393c;" v-if="v.read === 0">未读</span>
                <span v-if="v.read === 1">已读</span>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="item">
          <p class="empty">暂无数据</p>
        </div>
      </div>
      <div class="right">
        <!-- 咨询详情 -->
        <div v-if="JSON.stringify(consultDetails) !== '{}'" class="container">
          <div class="head-img">
            <img :src="consultDetails.head_img" alt="">
          </div>
          <div class="info">
            <p>{{consultDetails.nickname}}</p>
            <Tag v-if="consultDetails.mechanism_name" color="blue">{{consultDetails.mechanism_name}}</Tag>
          </div>
          <div class="other-data">
            <div class="item">
              <p>所在城市：</p>
              <p>{{consultDetails.city}}</p>
            </div>
            <div class="item">
              <p>装修风格：</p>
              <p>{{consultDetails.style}}</p>
            </div>
            <div class="item">
              <p>房屋面积：</p>
              <p>{{consultDetails.area}} m²</p>
            </div>
            <div class="item">
              <p>房屋现状：</p>
              <p>{{consultDetails.situation}}</p>
            </div>
            <div class="item">
              <p>装修预算：</p>
              <p>{{consultDetails.budget}} 万元</p>
            </div>
            <div class="item">
              <p>计划入住时间：</p>
              <p>{{consultDetails.planned_time}}</p>
            </div>
            <div class="item">
              <p>手机号：</p>
              <p>{{consultDetails.phone_number}}</p>
            </div>
            <div class="item">
              <p>微信号：</p>
              <p>{{consultDetails.wx_number}}</p>
            </div>
            <div class="item">
              <p>QQ号：</p>
              <p>{{consultDetails.qq_number}}</p>
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
      activeIndex: -1,
      consultList: [],
      consultDetails: {},
      customer_type: this.$store.state.userInfo && Number(this.$store.state.userInfo.customer_type),
      poptip: false
    }
  },
  created() {
    this.getMyConsult();
  },
  methods: {
    // 获取我的咨询列表
    async getMyConsult() {
      let res = await this.$http.get('/client/my_consult');
      this.consultList = res.data.data;
    },
    // 切换咨询
    async changeIndex(i, id) {
      this.activeIndex = i;
      this.consultDetails = this.consultList[i];
      if (this.customer_type === 1 && this.consultDetails.read === 0) {
        let res = await this.$http.post('/client/edit_consult_read', { id });
        if (res.data.status === 2) this.getMyConsult();
      }
    },
    // 删除咨询
    deleteConsult(v) {
      this.$Modal.confirm({
        title: '删除咨询',
        content: '<h3>删除该咨询将不可恢复，确定要删除吗？</h3>',
        onOk: async () => {
          let res = await this.$http.post('/client/delete_consult', { id: v.id });
          if (res.data.status === 0) {
            this.getMyConsult();
            this.consultDetails = {};
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.my-consult {
  height: calc(100vh - 86px);
  .empty {
    text-align: center;
    font-size: 16px;
    padding-top: 50px;
  }
  .container {
    height: calc(100% - 20px);
    .left {
      box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
      background: #fff;
      overflow-y: auto;
      .title {
        width: 320px;
        position: fixed;
        padding: 10px;
        text-align: center;
        font-size: 16px;
        background: #fff;
        color: $theme_color;
      }
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
        &:first-of-type {
          margin-top: 40px;
        }
        &:hover {
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
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.5em;
        background-color: #d9d9d9;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 0.25em;
        background-color: #b9b9b9;
      }
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