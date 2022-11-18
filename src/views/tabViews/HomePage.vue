<template>
  <div class="home">
    <Carousel v-model="activeIndex" autoplay :autoplay-speed="4000">
      <Carousel-item v-for="(v,i) in banner_cases" :key="i">
        <div @click="toDetail(v.id)" class="swiper_box d_f j_c_c a_l_c">
          <div class="bg" :style="{background:`url(${v.cover})`}"></div>
          <div class="item">
            <img :src="v.cover" alt="">
            <div class="item-title d_f a_l_c j_c_c">
              <p>{{v.title}}</p>
            </div>
          </div>
          <!-- <div class="item">
            <img src="@/assets/a.png" alt="">
            <div class="item-title d_f a_l_c j_c_c">
              <p>这里是标题</p>
            </div>
          </div> -->
        </div>
      </Carousel-item>
    </Carousel>
    <div class="recommend">
      <div class="d_f j_c_sb">
        <p>推荐机构</p>
        <p @click="toSearch" class="more">
          <span style="margin-right:10px;">更多</span>
          <Icon  style="margin-right:5px;" type="chevron-right"></Icon>
          </p>
      </div>
      <div class="box d_f">
        <Designer class="design" v-for="v in recommend_design" :recommend_design="v" :key="v.id"></Designer>
      </div>
    </div>
    <div class="recommend">
      <div class="d_f j_c_sb">
        <p>推荐动态</p>
        <p @click="toSearch" class="more">
          <span style="margin-right:10px;">更多</span>
          <Icon  style="margin-right:5px;" type="chevron-right"></Icon>
          </p>
      </div>
      <div class="box dynamic-box d_f">
        <Dynamic v-for="v in recommended_cases" :dynamic="v" :key="v.id"></Dynamic>
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
      recommended_cases: [],
      banner_cases: [],
      recommend_design: []
    };
  },

  created() {
    this.getHomeInfo();
  },
  mounted() {},

  methods: {
    // 获取首页数据
    async getHomeInfo() {
      try {
        let res = await this.$http.get("/client/home_info");
        let data = res.data.data;
        this.recommended_cases = data.recommended_cases;
        this.banner_cases = data.banner_cases;
        this.recommend_design = data.recommend_design;
      } catch (err) {}
    },
    toDetail(id) {
      this.$router.push({ path: "/dynamic_details", query: { id } });
    },
    toSearch(){
      this.$router.push({
        path: '/search_dynamic',
        query: { 
          keyword: ''
        } 
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  .ivu-carousel{
    overflow: hidden;
  }
  .swiper_box {
    position: relative;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url(@/assets/a.png);
      background-size: cover;
      filter: blur(50px);
      transform: scale(3);
      overflow: hidden;
    }
    .item {
      height: 500px;
      position: relative;
      font-size: 0;
      // &:hover {
      //   & {
          cursor: pointer;
          .item-title {
            height: 80px;
            p {
              color: #fff;
              font-size: 18px;
            }
          }
        // }
      // }
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
    background: #fff;
    .more:hover{
      cursor: pointer;
    }
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
