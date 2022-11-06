<template>
  <div>
    <Modal
      v-model="modal1"
      title="操作图片"
      :loading="loading"
      @on-ok="uploadAvatar"
    >
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
      <!--cropper-->
    </Modal>

    <Upload
      ref="upload"
      :show-upload-list="false"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :before-upload="handeleBeforeUpload"
      type="drag"
      accept="image/*"
      action=""
      class="upload-box"
    >
      <div class="upload-icon" v-show="imgSrc || imgUrl ? false : true">
        <Icon type="ios-camera" size="40"></Icon>
      </div>
      <div class="upload-icon" v-show="imgSrc || imgUrl">
        <img class="upload-img" :src="imgSrc ? imgSrc : imgUrl" alt="" />
      </div>
    </Upload>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  name: "UploadHeadImg",
  components: {
    VueCropper,
  },
  props: ['imgUrl'],
  data() {
    return {
      modal1: false,
      imgSrc: "",
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      fileinfo: "",
      // 防止重复提交
      loading: false,
    };
  },

  mounted() {},

  methods: {
    handeleBeforeUpload(file) {
      this.fileinfo = file;
      let data = window.URL.createObjectURL(new Blob([file]));
      this.option.img = data;
      this.modal1 = true;
      return false; //取消自动上传
    },
    uploadAvatar() {
      let that = this;
      this.$refs.cropper.getCropBlob((data) => {
        that.loading = true;
        that.$refs.upload.clearFiles();
        let formData = new FormData();
        formData.append("file", data);
        let file = formData.get("file");
        // 转为 base64
        let reader = new FileReader();
        reader.onload = function () {
          // base64结果
          that.imgSrc = this.result;
          that.loading = false;
        };
        reader.readAsDataURL(file);
        that.$emit('getFormdata', file);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper {
  width: auto;
  height: 300px;
}
.upload-box {
  display: inline-block;
  ::v-deep .ivu-upload.ivu-upload-drag{
    border: 1px dashed #999 !important;
  }
}
.upload-box,
.upload-icon,
.upload-img {
  width: 120px;
  height: 120px;
}
.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
