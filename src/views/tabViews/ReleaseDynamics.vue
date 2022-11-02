<template>
  <div class="releaseDynamics">
    <div class="form">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题" prop="title">
          <Input size="large" v-model="formValidate.title" placeholder="标题(2-12字)"></Input>
        </Form-item>
        <Form-item label="标签">
          <Checkbox v-for="(v,i) in tagList" :key="i" v-model="v.check">{{v.title}}</Checkbox>
        </Form-item>
        <Form-item label="封面" prop="cover">
          <UploadHeadImg @getFormdata="v=>formValidate.cover = v"></UploadHeadImg>
        </Form-item>
      </Form>
    </div>
    <div class="markdown">
      <mavon-editor ref="md" @fullScreen="fullScreen" @imgAdd="imgAdd" @imgDel="imgDel" @change="changeData" v-model="content" :toolbars="toolbars" />
    </div>
    <div class="commit-box">
      <!-- <Button type="primary" long @click="testResDy">testResDy</Button> -->
      <Button type="primary" :disabled="content == '' ? true: false" long @click="releaseDynamics">发布动态</Button>
    </div>
  </div>
</template>

<script>
import UploadHeadImg from "@/components/UploadHeadImg.vue";
export default {
  name: "ClientReleaseDynamics",
  components: {
    UploadHeadImg,
  },
  data() {
    return {
      formValidate: {
        title: "",
        cover: null,
      },
      ruleValidate: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      },
      content: "",
      toolbars: {
        bold: true, // 粗体
        italic: false, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: true, // 有序列表
        ul: false, // 无序列表
        link: false, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        ishljs: true, // 代码块高亮
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true // 预览
      },
      showContent: "",
      tagList: [
        {
          title: '卧室',
          check: false
        },
        {
          title: '客厅',
          check: false
        },
        {
          title: '书房',
          check: false
        },
        {
          title: '厨房',
          check: false
        },
        {
          title: '餐厅',
          check: false
        },
        {
          title: '玄关',
          check: false
        },
        {
          title: '阳台',
          check: false
        },
        {
          title: '儿童房',
          check: false
        },
        {
          title: '卫生间',
          check: false
        },
      ]
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getFormdata(v) {
      this.formValidate.cover = v;
    },
    changeData(value, render) {
      // value中是文本值,render是渲染出的html文本
      this.showContent = render;
    },
    async testResDy() {
      let res = await this.$http.post("/testResDy", { data: this.showContent });
      console.log(res);
    },
    // 提交发布
    releaseDynamics(){
      this.$refs['formValidate'].validate(async (valid) => {
        if (valid) {
          if(this.showContent == '') return this.$Message.error("请先编辑动态内容");
          if(!this.formValidate.cover) return this.$Message.error("请上传封面");
            let tags = this.tagList.map(v=> v.check === true ? v.title: null).filter(v=>v).join(',');
            let data = { title: this.formValidate.title, contentHTML: this.showContent, contentMD: this.$refs.md.d_value, tags};
            const formData = new FormData();
            formData.append('file',this.formValidate.cover);
            formData.append('info',JSON.stringify(data));
            let res = await this.$http.post("/client/release_dynamics", formData);
            if(res.data.status === 0) {
              setTimeout(() => {
                this.$router.go(0);
              }, 200);
            }
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd(pos, $file) {
      var _this = this;
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$http.upload('/upload',formdata).then((response) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          if (response.status === 200) {
            var url = response.data.data[0].url;
            _this.$refs.md.$img2Url(pos, url);
          }
        });
    },
    imgDel(pos) {},
    // md全屏
    fullScreen(status){
      // console.log(status);
    }
  },
};
</script>

<style lang="scss" scoped>
.releaseDynamics {
  background: #fff;
  position: relative;
  .form {
    width: 60%;
    padding: 20px;
    // margin: auto;
  }
  .markdown {
    position: relative;
    z-index: 1;
    height: 550px;
    .v-note-wrapper.markdown-body.shadow {
      // height: 550px;
      height: 100%;
    }
  }
  .commit-box{
    margin: auto;
    width: 30%;
    padding: 20px 0 40px;
  }
}
</style>