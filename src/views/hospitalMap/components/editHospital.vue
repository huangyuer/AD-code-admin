<template>
  <div class="add-container">
    <right-title :title="'医院地图-编辑详情'"></right-title>
    <div class="add-col_1">
      <div class="add-input-name">
        <span>名称：</span>
        <input-tool :value="name" @input="input_name"></input-tool>
      </div>
      <div class="add-input-name">
        <span>地址：</span>
        <input-tool :value="address" @input="input_address"></input-tool>
      </div>
    </div>
    <div class="quill-editor-container">
      <span>内容：</span>
      <quill-editor :value="contentHtml" @quillData="quillData"></quill-editor>
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
  name: "EditHospital",
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
        id:'',
        name:'',
        address:'',
        title:'',
      content: "",
      contentHtml: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
        this.id = this.$route.query.id;
         this.$nextTick(() => {
      this.$store.dispatch("hospitalMap/getHospital", { id: this.id }).then(data => {
        let hospital = data.hospital;
        this.name = hospital.name;
        this.address = hospital.address;
        this.content = hospital.content;
        this.contentHtml = hospital.contentHtml;
      });
    });
    },

    quillData(content, contentHtml) {
      console.log("-----quill", content, contentHtml);
      // this.link = "";
      this.content = content;
      this.contentHtml = contentHtml;
    },
    input_name(val) {
      this.name = val;
    },
     input_address(val) {
      this.address = val;
    },


    submit() {
      let params = {
        id: this.id,
        name: this.name,
        address: this.address,
     
        content: this.content,
        contentHtml: this.contentHtml,

      };

      this.$store
        .dispatch("hospitalMap/upHospital", params)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          }).then(() => {
            this.$router.push({
              path: "/hospitalMap"
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
