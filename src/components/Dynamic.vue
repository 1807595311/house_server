<template>
  <div class="dynamic">
    <div class="box d_f">
      <div class="item" @click="toDetail(dynamic.id)">
        <div class="item-img">
          <img :src="dynamic.cover" alt="">
        </div>
        <div class="item-title">
          <p>{{dynamic.title}}</p>
          <div class="icon">
            <div class="icon-box">
              <slot name="del"></slot>
              <slot name="edit"></slot>
              <slot name="up"></slot>
              <slot name="down"></slot>
            </div>
            <!-- <div class="icon-box">
              <Icon size="18" color="#C6C6C6" type="chatbox"></Icon>
              <div class="count">12</div>
            </div>
            <div class="icon-box">
              <Icon size="20" color="#C6C6C6" type="ios-star"></Icon>
              <div class="count">12</div>
            </div>
            <div class="icon-box">
              <Icon size="20" color="#C6C6C6" type="thumbsup"></Icon>
              <div class="count">12</div>
            </div> -->
            <div class="icon-box">
              <Icon size="20" color="#C6C6C6" type="eye"></Icon>
              <div class="count">{{dynamic.views}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientDynamic",
  props: ["dynamic"],

  data() {
    return {};
  },

  mounted() {},

  methods: {
    toDetail(id) {
      this.$router.push({ path: "/dynamic_details", query: { id } });
    }
  },
};
</script>

<style lang="scss" scoped>
.dynamic {
  &:hover {
    cursor: pointer;
    .box{
      transform: translateY(-10px);
    }
  }
  .box {
    transition: all .32s;
    flex-wrap: wrap;
    width: 300px;
    .item {
      width: 300px;
      margin-bottom: 16px;
      background: #fff;
      box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
      &:nth-child(4n) {
        margin-right: 0;
      }
      &-img {
        img {
          width: 300px;
          height: 200px;
          object-fit: cover;
        }
      }
      &-title {
        height: 90px;
        width: 100%;
        font-size: 16px;
        position: relative;
        padding: 10px;
        .icon {
          width: 100%;
          position: absolute;
          bottom: 8px;
          right: 10px;
          display: flex;
          justify-content: flex-end;
          span{
            font-size: 14px;
            margin-right: 5px;
            &:hover{
              color: #0058A3;
            }
          }
          &-box {
            display: flex;
            color: #c6c6c6;
            align-items: center;
            margin-right: 20px;
            .count {
              font-size: 14px;
              margin-left: 5px;
            }
            &:last-of-type {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>