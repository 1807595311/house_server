<template>
  <div class="manageStatisticsCard">
    <div class="box">
      <div class="left">
        <slot></slot>
      </div>
      <div class="right">
        <div class="title">{{title}}</div>
        <!-- <div class="num">{{num}}</div> -->
        <div class="num-box">
          <animate-number ref="myNum" mode="manual" :key="num" class="num" :from="1" :to="num"></animate-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageStatisticsCard",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    num: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  watch: {
    num(v) {
      this.$nextTick(() => {
        this.$refs.myNum.start();
      });
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.manageStatisticsCard {
  background: #fff;
  // width: 280px;
  width: 30%;
  height: 120px;
  border-radius: 10px;
  .box {
    padding: 10px;
    display: flex;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
        width: 50%;
      }
    }
    .right {
      width: 40%;
      color: #777;
      .title {
        font-size: 14px;
        padding: 10px;
        text-align: center;
      }
      .num {
        font-weight: bold;
        color: #555;
        line-height: 60px;
        flex: 1;
        font-size: 30px;
      }
      .num-box {
        text-align: center;
      }
    }
  }
}
</style>