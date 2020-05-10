<template>
  <div class="picture-upload">
    <choose-pic
      :centerDialogVisible="centerDialogVisible"
      v-on:hideDialog="centerDialogVisible = false"
      @imgFile="imgFile"
      :ismultiple="ismultiple"
      @imgFileList="imgFileList"
    ></choose-pic>
    <choose-vid
      :centerDialogVisible="centerDialogVisible1"
      v-on:hideDialog="centerDialogVisible1 = false"
      @videoFileList="videoFile"
    ></choose-vid>
    <div class="picture-upload-btn">
      <span>{{value}}</span>
      <div @click="select">{{ valueBtn }}</div>
      <span>{{ tip }}</span>
    </div>
    <div v-if="src&&isImg&&ismultiple">
      <img v-for="item in src" :key="item.key" :src="item " alt style="margin-right:8px" />
    </div>

    <img v-if="src&&isImg&&!ismultiple" :src="src " alt />
    <video
      v-if="src&&!isImg&&src.indexOf('iframe')<=-1"
      style="object-fit: cover; margin-top: 14px;"
      preload="metadata"
      :src="src"
      :class="{upvideo:true,
              activeborder:true
              }"
      width="200"
      height="132"
    ></video>
    <div
      style="width: 200px;
    height: 132px;object-fit: cover; margin-top: 14px;"
      v-if="src&&!isImg&&src.indexOf('iframe')>-1"
      v-html="src"
    ></div>
  </div>
</template>
<script>
import ChoosePic from "@/components/ChoosePic";
import ChooseVid from "@/components/ChooseVid";
import defaultPic from "@/assets/default-picture.png";
export default {
  name: "PictureUploads",
  components: {
    ChoosePic,
    ChooseVid
  },
  props: {
    ismultiple: {
      type: Boolean,
      default: false
    },
    isImg: {
      type: Boolean,
      default: true
    },
    src: {
      default: ""
      // default: require("@/assets/default-picture.png")
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
      default: ""
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible1: false,
      defaultPic: defaultPic
    };
  },
  methods: {
    select() {
      if (this.isImg) this.centerDialogVisible = true;
      else this.centerDialogVisible1 = true;
    },
    imgFile(val) {
      this.$emit("select_picture", val, this.itemPic);
    },
    imgFileList(val) {
      this.$emit("select_picture", val);
    },
    videoFile(val) {
      this.$emit("select_video", val, this.itemPic);
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
    // max-width: 200px;
    // max-width: 200px;
    width: 150px;
    height: 90px;
    object-fit: cover;
    overflow: hidden;
    margin-top: 14px;
  }
}
</style>
