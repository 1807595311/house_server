<template>
  <div class="home">
    <Carousel v-model="activeIndex">
      <Carousel-item>
        <div class="swiper_box d_f j_c_sb a_l_c">
          <div class="item">
            <img src="@/assets/a.png" alt="">
            <div class="item-title d_f a_l_c j_c_c">
              <p>这里是标题</p>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/a.png" alt="">
            <div class="item-title d_f a_l_c j_c_c">
              <p>这里是标题</p>
            </div>
          </div>
        </div>
      </Carousel-item>
    </Carousel>
    <div class="recommend">
      <p>推荐机构</p>
      <div class="box d_f">
        <Designer class="design" v-for="v in 8" :key="v"></Designer>
      </div>
    </div>
    <div class="recommend">
      <p>推荐案例</p>
      <div class="box dynamic-box d_f">
        <Dynamic v-for="v in 11" :key="v"></Dynamic>
      </div>
    </div>
  </div>
</template>

<script>
import Designer from "@/components/home_page/Designer.vue";
import Dynamic from "@/components/Dynamic.vue";
export default {
  name: "ClientHomePage",
  components: {
    Designer,
    Dynamic,
  },
  data() {
    return {
      activeIndex: 0,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  .swiper_box {
    height: 500px;
    overflow: hidden;
    background: #fff;
    .item {
      height: 500px;
      position: relative;
      font-size: 0;
      &:hover {
        & {
          cursor: pointer;
          .item-title {
            height: 80px;
            p {
              color: #fff;
              font-size: 18px;
            }
          }
        }
      }
      img {
        width: 600px;
        height: 500px;
      }
      &-title {
        transition: all 0.5s;
        bottom: 0;
        width: 100%;
        position: absolute;
        height: 0px;
        background: rgba(0, 0, 0, 0.5);
        p {
          transition: all 0.2s;
        }
      }
    }
  }
  .recommend {
    margin-top: 20px;
    .box {
      background: #fff;
      flex-wrap: wrap;
      justify-content: space-between;
      .design {
        margin-right: 30px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .dynamic:last-child:nth-child(4n - 1) {
      margin-right: calc(24% + 4% / 3);
    }

    .dynamic:last-child:nth-child(4n - 2) {
      margin-right: calc(48% + 8% / 3);
    }

    p {
      padding: 20px 0;
      font-size: 18px;
      font-weight: bold;
      background: #fff;
    }
  }
}
</style>
