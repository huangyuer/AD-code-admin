<template>
  <div class="add-container">
    <right-title :title="name"></right-title>
    <div class="add-col_1">
      <div class="add-input-name">
        <span>名称：</span>
        <input-tool :value="title" @input="input_title"></input-tool>
      </div>
      <div class="add-select-block">
        <span>分类：</span>
        <el-select
          v-model="menuVal"
          placeholder="请选择"
          @change="select_block"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option v-for="item in typeData" :key="item._id" :label="item.name" :value="item"></el-option>
        </el-select>
      </div>
    </div>
    <div class="add-col_2">
      <picture-upload
        :src="imgUrl"
        :value="'封面：'"
        :valueBtn="'选取图片'"
        :tip="'建议图片尺寸150*90px'"
        @select_picture="imgFile"
      ></picture-upload>
      <picture-upload
        style="margin-left:55px"
        :isImg="false"
        :src="videoUrl"
        :value="'视频：'"
        :valueBtn="'选取视频'"
        @select_video="videoFile"
      ></picture-upload>
    </div>
    <div class="add-input-intro content">
      <span>
        <span :class="{active :activeTab}" @click="selectLink(true)">链接</span>
        <span>|</span>
        <span :class="{active :!activeTab}" @click="selectLink(false)">内容</span>
      </span>
      <input-tool :value="httpUrl" @input="input_content" v-if="activeTab"></input-tool>
      <el-input
        v-if="!activeTab"
        style="width:856px;margin-top:12px"
        type="textarea"
        :autosize="{ minRows: 23}"
        placeholder="请输入视频简介…"
        v-model="content"
      ></el-input>
    </div>

    <el-button type="primary" class="commit-btn" @click="submit">提交</el-button>
  </div>
</template>
<script>
import InputTool from "@/components/InputTool";
import SelectTool from "@/components/SelectTool";
import QuillEditor from "@/components/QuillEditor";
import RightTitle from "@/components/RightTitle";
import PictureUpload from "@/components/PictureUpload";
import FileUpload from "@/components/FileUpload";
import ChoosePic from "@/components/ChoosePic";

export default {
  name: "AddVideo",
  props: {
    type: {
      default: "添加"
    }
  },
  components: {
    InputTool,
    SelectTool,
    PictureUpload,
    FileUpload,
    QuillEditor,
    RightTitle,
    ChoosePic
  },
  data() {
    return {
      typeData: ["我的故事", "医学大咖", "家园活动"],
      activeTab: false,
      httpUrl: "",
      name: "",
      imgUrl: "",
      videoUrl: "",
      // active: true,
      title: "",
      menuVal: "",
      typeVal: "",
      tagVal: "",
      menuType: [],
      menuTag: [],
      fileId: "",
      videoId: "",
      intro: "",
      content: "",
      contentHtml: ""
    };
  },
  created() {
    this.init();
    this.name = "视频管理-" + this.type + "详情";
    this.getMenuSelect();
  },
  methods: {
    getMenuSelect() {
      this.$store
        .dispatch("details/getMenuSelect", "科普视频")
        .then(data => {
          this.typeData = data.selects[0].tags;
        })
        .catch(e => {});
    },
    init() {},
    selectLink(val) {
      this.activeTab = val;
    },
    input_content(val) {
      this.httpUrl = val;
    },
    imgFile(val) {
      this.imgUrl = val.httpUrl;
      this.fileId = val._id;
      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.fileId = res.fileId;
      // });
    },
    videoFile(val) {
      this.httpUrl = val.httpUrl;
      this.videoUrl = val.httpUrl;
      this.videoId = val._id;
      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.videoId = res.fileId;
      // });
    },
    select_type(val) {
      this.typeVal = val;
      let params = {
        menu: this.menuVal,
        type: this.typeVal
      };
      this.menuTag = [];
      this.$store.dispatch("common/getMenuTags", params).then(res => {
        this.menuTag = res;
        this.tagVal = "";
      });
    },
    select_block(val) {
      this.menuVal = val;
      this.menuType = [];
      this.$store.dispatch("common/getMenuTypes", { menu: val }).then(res => {
        this.menuType = res;
        this.menuTag = [];
        this.typeVal = "";
        this.tagVal = "";
      });
    },
    select_tag(val) {},
    input_title(val) {
      this.title = val;
    },
    input_intro(val) {
      this.intro = val;
    },

    submit() {
      let params = {
        title: this.title,
        tag: this.menuVal,
        introduction: this.content,
        coverImg: this.fileId,
        video: this.videoId
      };
      let params1 = {};
      if (this.httpUrl) {
        params1 = {
          fileName: this.title,
          httpUrl: this.httpUrl
        };
      }
      if (this.type == "修改") {
        this.$emit("alterBtn", params, params1);
        return;
      }
      console.log("-----22111", params);

      if (this.httpUrl) {
        let params1 = {
          fileName: this.title,
          httpUrl: this.httpUrl
        };
        this.$store.dispatch("common/createHttpFile", params1).then(res => {
          params.video = res.fileId;
          this.$store
            .dispatch("video/addVideo", params)
            .then(data => {
              this.$alert(data, {
                confirmButtonText: "确定",
                center: true
              }).then(() => {
                this.$router.push({
                  path: "/video"
                });
              });
            })
            .catch(e => {
              // this.$alert(e, {
              //   confirmButtonText: "确定",
              //   center: true
              // });
              reject(e);
            });
        });
      } else {
        this.$store
          .dispatch("video/addVideo", params)
          .then(data => {
            this.$alert(data, {
              confirmButtonText: "确定",
              center: true
            }).then(() => {
              this.$router.push({
                path: "/video"
              });
            });
          })
          .catch(e => {
            // this.$alert(e, {
            //   confirmButtonText: "确定",
            //   center: true
            // });
            reject(e);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.add-container {
  .add-col_1 {
    display: flex;
    // padding-top: 30px;
    .add-input-name,
    .add-select-block {
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        word-break: keep-all;
        padding-right: 10px;
      }
    }
    .add-input-name {
      position: relative;
      margin-right: 55px;
      &::after {
        content: "*";
        color: #fc4b4b;
        font-size: 18px;
        position: absolute;
        right: -18px;
        top: 13px;
      }
      .input-container {
        width: 360px;
        height: 40px;
      }
    }
    .add-select-block {
      position: relative;
      &::after {
        content: "*";
        color: #fc4b4b;
        font-size: 18px;
        position: absolute;
        right: -18px;
        top: 13px;
      }
    }
  }
  .add-col_2 {
    display: flex;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-select-category {
      padding-top: 20px;
      padding-right: 30px;
    }
  }
  .add-input-intro {
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
  // .commit-btn {
  //   background: #4373f9;
  //   width: 100px;
  //   height: 36px;
  //   border-radius: 4px;
  //   font-size: 16px;
  //   font-weight: 500;
  //   padding: 0;
  //   border-color: transparent;
  //   margin-top: 30px;
  //   margin-bottom: 30px;
  // }
  .quill-editor-container {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    span {
      margin-bottom: 14px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      word-break: keep-all;
      padding-right: 10px;
    }
  }

  .el-select {
    width: 180px;
    height: 40px;
  }
  .add-select-group > .el-select {
    width: 400px;
  }
  .add-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-upload {
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .select-file {
    padding-top: 12px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      &:nth-child(2) {
        color: #4373f9;
        padding-left: 12px;
        cursor: pointer;
      }
    }
  }
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
      // width: 200px;
      height: 130px;
      margin-top: 14px;
    }
  }
}

//下拉框
.select-active {
  .selected {
    color: #009966;
  }
}
@{aaa} .el-tag {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  background: transparent;
  border: none;
}

@{aaa} .el-select__tags > span {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@{aaa} .el-select .el-input {
  width: 100%;
  height: 100%;
  input {
    height: 100%;
    border-radius: 4px;
    width: 100%;
    border: 1px solid rgba(229, 229, 229, 1) !important;
    &::-webkit-input-placeholder {
      font-weight: 400;
      color: #666666;
      line-height: 21px;
    }
  }
  .el-icon-arrow-up {
    position: relative;
    &::before {
      content: "";
      background-image: url("../../../assets/select-down.png");
      position: absolute;
      width: 12px;
      height: 9px;
      top: 15px;
      right: 4px;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: rotateZ(180deg);
    }
  }
  .el-icon-circle-close {
    position: relative;
    background-color: #c0c4cc;
    right: 0px;
    top: 10px;
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 18px;
    width: 18px;
    line-height: 18px;
    vertical-align: middle;
    transform: scale(0.8);
    color: #909399;
    &:hover {
      color: white;
    }
    &::before {
      content: "\E6DB";
      transform: translate(0, 0.5px);
      //  position: absolute;
      // top: 15px;
      // right: 40px;
    }
  }
}
</style>
