<template>
  <div class="video-live">
    <choose-pic
      :centerDialogVisible="centerDialogVisible"
      v-on:hideDialog="centerDialogVisible = false"
      :ismultiple="true"
      @imgFileList="addPic"
    ></choose-pic>
    <right-title :title="name"></right-title>
    <div class="add-col_1">
      <div class="add-input-name">
        <span>名称：</span>
        <input-tool :value="title" @input="input_title"></input-tool>
      </div>
    </div>
    <div style="display:flex">
      <span style="padding-top:20px;word-break: keep-all;">内容：</span>
      <div style="display:flex;flex-wrap: wrap;">
        <div
          style="display:block;padding-left:10px;padding-right: 10px;"
          v-for="(item,index) in images"
          :key="index"
        >
          <picUpload
            :itemPic="index"
            :src="item.url"
            :value="''"
            :valueBtn="'替换图片'"
            :tip="''"
            @select_picture="imgFile"
          ></picUpload>
          <div class="input-link">
            <span>链接：</span>
            <input-tool :value="item.link" :sortIndex="index" @input="input_link"></input-tool>
          </div>
        </div>
        <div
          v-on:click="centerDialogVisible = true"
          style="padding-top:20px;padding-left:10px;cursor:pointer"
        >
          <img src="@/assets/upload-pic.svg" alt />
        </div>
      </div>
    </div>

    <el-button type="primary" class="commit-btn" @click="submit">提交</el-button>

    <div class="dialog-style">
      <el-dialog title="生成链接" :visible.sync="dialogFormVisible">
        <div class="dialog-content">
          <span>复制下方链接到微信模版</span>
          <div>{{linkRes}}</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="tag" @click="copyLink(linkRes)">复制</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ChoosePic from "@/components/ChoosePic";
import RightTitle from "@/components/RightTitle";
import picUpload from "./picUpload";
import InputTool from "./InputTool";
import Clipboard from "clipboard";
export default {
  name: "VideoLive",
  components: {
    InputTool,
    picUpload,
    RightTitle,
    ChoosePic
  },
  props: {
    type: {
      default: "添加"
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      dialogFormVisible: false,
      linkRes: "",

      images: [],
      name: "",
      title: "",
      fileId: "",
      imgUrl: "",
      link: "",
      id: ""
    };
  },
  created() {
    this.name = "模板网页-" + this.type + "详情";
  },
  methods: {
    addPic(val) {
      val.forEach(el => {
        this.images.push({ link: "", file: el._id, url: el.httpUrl });
      });
    },
    imgFile1(val) {
      // this.$emit("select_picture", val, this.itemPic);
    },
    imgFileList(val) {
      // this.$emit("select_picture", val);
    },
    copyLink(data) {
      let clipboard = new Clipboard(".tag", {
        text: function() {
          return data;
        }
      });
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          showClose: true,
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
        this.dialogFormVisible = false;
        setTimeout(() => {
          this.$router.push({
            path: "/templatePage"
          });
        }, 200);
      });
      clipboard.on("error", e => {
        this.$message({ message: "复制失败,", showClose: true, type: "error" });
        clipboard.destroy();
      });
    },
    input_title(val) {
      this.title = val;
    },
    imgFile(val, index) {
      if (!val) {
        this.$set(this.images[index], "url", "");
        this.$set(this.images[index], "file", "");
      }
      if (val && val.httpUrl) {
        this.$set(this.images[index], "file", val._id);
        this.$set(this.images[index], "url", val.httpUrl);
      }
      console.log("-----3333", val, index, this.images);

      // this.images[index]=val;
    },
    input_link(val, index) {
      this.$set(this.images[index], "link", val);
    },
    submit() {
      console.log("-----222", this.images, this.title);
      let params = {
        name: this.title,
        images: this.images
      };
      if (this.type == "修改") {
        this.$emit("alterBtn", params);
      } else {
        this.$store.dispatch("tempHtml/addTempHtml", params).then(data => {
          this.dialogFormVisible = true;

          this.linkRes = data.link;
        });
      }
      // let params = {
      //   id: this.id,
      //   liveAdd: this.link,
      //   coverImg: this.fileId
      // };
      // console.log("------11", this);
      // this.$store.dispatch("video/upLive", params).then(res => {
      //   this.$alert(res, {
      //     confirmButtonText: "确定",
      //     center: true
      //   });
      // });
    }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
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
.input-link {
  display: flex;
  padding-top: 14px;
  flex-direction: row;
  align-items: center;
  span {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    word-break: keep-all;
    padding-right: 10px;
  }
  .input-container {
    width: 250px;
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
.commit-btn {
  margin-left: 57px;
}
.dialog-style {
  @{aaa} .el-dialog {
    width: 500px;
    height: 360px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
  }
  @{aaa} .el-dialog__title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
  }
  @{aaa} .el-dialog__header {
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding: 18px 20px 13px;
  }
  @{aaa} .el-dialog__headerbtn {
    top: 12px;
    right: 12px;
  }
  @{aaa} .el-icon-close:before {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: rgb(200, 200, 200);
    color: #fff;
  }
  @{aaa} .el-dialog__body {
    padding: 0;
  }
  .dialog-content {
    padding: 14px 0 0 35px;
    span {
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      font-size: 16px;
    }
    div {
      margin-top: 16px;
      width: 431px;
      height: 150px;
      background: rgba(240, 240, 240, 1);
      border-radius: 4px;
      border: 1px solid rgba(199, 199, 199, 1);
      color: rgba(0, 153, 102, 1);
      font-size: 18px;
      padding: 12px;
      box-sizing: border-box;
    }
  }
  .dialog-footer {
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button {
      width: 160px;
      height: 36px;
      background: rgba(0, 153, 102, 1);
      border-radius: 4px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      padding: 0px;
    }
  }
}
</style>
