<template>
  <div>
    <UploadHeadImg @getFormdata="getFormdata"></UploadHeadImg>
    <div class="box markdown-body" v-html="showContent"></div>
    <!-- <mavon-editor ref="md" @change="changeData" v-model="content" :toolbars="toolbars" /> -->
  </div>
</template>

<script>
import UploadHeadImg from "@/components/UploadHeadImg.vue";
import 'mavon-editor/dist/css/index.css'
export default {
  name: "ClientHome",
  components: {
    UploadHeadImg,
  },
  data() {
    return {
      content: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      showContent: ''
    };
  },
  mounted() {},

  methods: {
    getFormdata(v) {
      // console.log(v);
      // const formData = new FormData();
      // formData.append('file',v);
      // this.$http.register('/upload',formData);
    },
    changeData(value, render) {
    	// value中是文本值,render是渲染出的html文本
      this.showContent = render;
      console.log(render);
    },
  },
};
</script>

<style lang="scss">
@import "mavon-editor/dist/css/index.css";
.box{
  width: 50%;
}
</style>