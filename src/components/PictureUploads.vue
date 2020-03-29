<template>
  <div class="picture-upload">
    <choose-pic
      :centerDialogVisible="centerDialogVisible"
      v-on:hideDialog="centerDialogVisible = false"
      @imgFile="imgFile"
    ></choose-pic>
    <div class="picture-upload-btn">
      <span>{{value}}</span>
      <div @click="select">{{ valueBtn }}</div>
      <span>{{ tip }}</span>
    </div>
    <img :src="src ? src : defaultPic" alt="" class />
  </div>
</template>
<script>
import ChoosePic from "@/components/ChoosePic";
import defaultPic from "@/assets/default-picture.png";
export default {
  name: "PictureUploads",
  components: {
    ChoosePic
  },
  props: {
    src: {
      type: String,
      default: require("@/assets/default-picture.png")
    },
    itemPic: {
      type: [Object, Number],
      default: function() {}
    },
    value: {
      type: String,
      default: "图片："
    },
    valueBtn: {
      type: String,
      default: "选取图片"
    },

    tip: {
      type: String,
      default: "图片建议尺寸582*486px"
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      defaultPic: defaultPic
    };
  },
  methods: {
    select() {
      this.centerDialogVisible = true;
    },
    imgFile(val) {
      this.$emit("select_picture", val, this.itemPic);
    }
  }
};
</script>
<style lang="less" scoped>
.picture-upload {
  .picture-upload-btn {
    display: flex;
    padding-top: 20px;
    align-items: center;
    div {
      width: 80px;
      height: 26px;
      border-radius: 6px;
      text-align: center;
      line-height: 26px;
      border: 1px solid rgba(229, 229, 229, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      cursor: pointer;
      margin-right: 10px;
      margin-left: 2px;
    }
    span {
      &:nth-child(1) {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      &:nth-child(3) {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  img {
    max-width: 200px;
    max-height: 132px;
    margin-top: 14px;
  }
}
</style>
