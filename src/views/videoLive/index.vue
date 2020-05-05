<template>
  <div class="video-live">
    <right-title :title="'视频直播'"></right-title>
    <picture-upload
      :imgUrl="imgUrl"
      :value="'封面：'"
      :valueBtn="'选取图片'"
      :tip="'建议图片尺寸343*140px'"
      @imgFile="imgFile"
    ></picture-upload>
    <div class="input-link">
      <span>链接：</span>
      <input-tool :value="link" @input="input_link"></input-tool>
    </div>
    <el-button type="primary" class="commit-btn" @click="submit">提交</el-button>
  </div>
</template>

<script>
import RightTitle from "@/components/RightTitle";
import PictureUpload from "@/components/PictureUpload";
import InputTool from "@/components/InputTool";
export default {
  name: "VideoLive",
  components: {
    InputTool,
    PictureUpload,
    RightTitle
  },
  data() {
    return {
      fileId: "",
      imgUrl: "",
      link: "",
      id: ""
    };
  },
  created() {
    this.$store.dispatch("video/getLive").then(res => {
      this.imgUrl = res.live.coverImg && res.live.coverImg[0].httpUrl;
      this.fileId = res.live.coverImg && res.live.coverImg[0]._id;
      this.link = res.live.liveAdd;
      this.id = res.live._id;
      // this.fileId = res.fileId;
    });
  },
  methods: {
    imgFile(val) {
      this.$store.dispatch("common/uploadFile", val).then(res => {
        this.fileId = res.fileId;
      });
    },
    input_link(val) {
      this.link = val;
    },
    submit() {
      let params = {
        id: this.id,
        liveAdd: this.link,
        coverImg: this.fileId
      };
      console.log("------11",this)
      this.$store.dispatch("video/upLive", params).then(res => {
        this.$alert(res, {
          confirmButtonText: "确定",
          center: true
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.input-link {
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  span {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    word-break: keep-all;
    padding-right: 10px;
  }
  .input-container {
    margin-top: 14px;
    width: 848px;
    height: 40px;
  }
  &.content {
    cursor: pointer;
    .active {
      color: #009966;
    }
    span {
      padding: 0;
    }
  }
}
</style>
