<template>
  <div class="container">
    <div class="tabs-group">
      <ul>
        <li v-for="(item,i) in tabsList" :key="i" :class="item.id===groupId?'is-active':''">
          <div class="tabs-label" ref="label" @click="tabClick(item.id,i)">{{item.name}}</div>
          <span v-if="item.id===0" class="tabs-operation">
            <i class="el-icon-plus"></i>
          </span>
          <span v-else class="tabs-operation">
            <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete"></i>
          </span>
        </li>
        <!-- 下划线 -->
        <div class="tabs-active-bar" v-if="tabsList.length"></div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsList: [
        { name: "默认分组", id: 0 },
        { name: "手机", id: 1 },
        { name: "电脑", id: 2 },
        { name: "衣服", id: 3 },
        { name: "零食", id: 4 },
      ], //tabs的数组
      groupId: 0
    };
  },
  methods: {
    tabClick(id, i) {
      this.groupId = id;
      let doc = document.getElementsByClassName("tabs-active-bar")[0];
      let left = this.$refs.label[i].offsetLeft + "px"; //返回当前元素的相对水平偏移位置的偏移容器
      let width = this.$refs.label[i].clientWidth - 8 + "px"; //	在页面上返回内容的可视宽度（不包括边框，边距或滚动条）
      doc.style.width = `${width}`;
      doc.style.transform = `translateX(${left})`;
      doc.style.transition = ".3s";
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-group {
  padding: 50px;
  ul {
    height: 35px;
    line-height: 35px;
    list-style: none;
    display: flex;
    position: relative;
    padding-left: 0;
    li {
      padding: 0 10px;
      &.is-active {
        color: #409eff;
      }
      &:hover {
        color: #409eff;
        .tabs-operation {
          color: #409eff;
        }
      }
      .tabs-label {
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
      .tabs-operation {
        color:#fff;
        i {
          cursor: pointer;
        }
      }
    }
    li:first-child {
      padding-left: 0;
    }
    .tabs-active-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 56px;
      height: 2px;
      margin-left: 4px;
      transform: translateX(0px);
      box-sizing: border-box;
      background-color: #409eff;
      z-index: 1;
    }
  }
}
</style>
