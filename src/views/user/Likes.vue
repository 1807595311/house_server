<template>
  <div class="dynamicList">
    <HeadBG title="我的点赞"></HeadBG>
    <div class="content box dynamic-box d_f">
      <Dynamic v-for="v in dynamicList" :dynamic="v" :key="v.id"></Dynamic>
    </div>
    <div class="scroll">{{scrollTitle}}</div>
  </div>
</template>

<script>
import HeadBG from "@/components/HeadBG.vue";
import Dynamic from "@/components/Dynamic.vue";
export default {
  name: "ClientDynamicList",
  components: {
    HeadBG,
    Dynamic,
  },
  data() {
    return {
      dynamicList: [],
      info: {
        pageSize: 20,
        currentPage: 1,
      },
      scrollstate: true,
      scrollTitle: '正在加载中...',
      timer: null
    };
  },

  created() {
    this.getMyLikes();
  },

  mounted() {
    window.addEventListener("scroll", this.getbottom);
  },
  destroyed() {
    window.removeEventListener("scroll", this.getbottom);
  },
  watch: {
    "info.currentPage"() {
      this.getMyLikes();
    },
  },
  methods: {
    async getMyLikes() {
      try {
        let res = await this.$http.post("/client/my_likes", this.info);
        res.data.data.forEach((v) => this.dynamicList.push(v));
        let listLength = res.data.data.length;
        if(listLength < this.info.pageSize || listLength <= 0) {
          console.log(1231);
          this.scrollTitle = '已加载全部';
          this.scrollstate = false;
        }else{
          this.scrollTitle = '正在加载中...';
          this.scrollstate = true;
        }
        let deWeightThree = () => {
          let map = new Map();
          for (let item of this.dynamicList) {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          }
          return [...map.values()];
        };
        let newArr3 = deWeightThree();
        this.dynamicList = newArr3;
      } catch (err) {}
    },
    getbottom() {
      // 返回滚动条垂直滚动距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 返回该元素的像素高度，高度包含内边距（padding），不包含外边距（margin）、边框（border）
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      let numHeight = scrollTop + clientHeight;

      if (this.scrollstate == true) {
        this.scrollstate = false;
        this.timer = setTimeout( ()=> {
          if (scrollHeight > clientHeight && numHeight > scrollHeight - 100) {
            this.info.currentPage += 1;
          }
          this.scrollstate = true; //工作结束开启节流阀方便下一个工作
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamicList {
  .box {
    width: 1280px;
    margin: auto;
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
  .scroll{
    margin: auto;
    padding: 40px 0;
    font-size: 20px;
    text-align: center;
  }
}
</style>