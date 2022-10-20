<template>
  <div>
    <div class="designer">
      <div class="designer-box">
        <div class="designer-item" :style="'border-bottom: 3px solid '+ bottomBorderColor">
          <img src="@/assets/a.png" alt="">
          <div class="maskbox d_f a_l_c j_c_c">
            <span>王设计师</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientDesigner",

  data() {
    return {
        bottomBorderColor: '#'
    };
  },

  mounted() {
    this.randomColor()
  },

  methods: {
    randomColor(){
        let colorStr = ['0','a','1','7','b','2','8','c','3','9','d','4','e','5','f','6'];
        for(let j = 0; j < 6; j++){
            let random = parseInt(Math.random() * 16)
            this.bottomBorderColor += colorStr[random];
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.designer {
  background: #fff;
  padding-bottom: 30px;
  &-item {
    position: relative;
    width: 130px;
    height: 133px;
    border-bottom: 3px solid #abf542;
    &:hover {
      cursor: pointer;
      .maskbox {
        background: rgba(0, 0, 0, 0.5) !important;
        z-index: 1;
        span {
          transition: all 0.2s;
          font-size: 14px;
        }
      }
    }
    .maskbox {
      transition: all 0.5s;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 0;
      z-index: -1;
    }
    img {
      width: 130px;
      height: 130px;
    }
  }
}
</style>