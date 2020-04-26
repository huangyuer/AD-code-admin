<template>
  <div class="video-live">
  <right-title :title="'视频直播'"></right-title>
        <picture-upload
        :value="'封面：'"
        :valueBtn="'选取图片'"
        :tip="'建议图片尺寸343*140px'"
        @imgFile="imgFile"
      ></picture-upload>
    <div class="input-link">
      <span>链接：</span>
      <input-tool :value="intro" @input="input_intro"></input-tool>
      
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
      fileId:''
    };
  },
  methods:{
      imgFile(val) {
      this.$store.dispatch("common/uploadFile", val).then(res => {
        this.fileId = res.fileId;
      });
    },
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
