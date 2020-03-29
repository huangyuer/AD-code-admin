<template>
  <div class="add-detail-container">
    <choose-pic
      :centerDialogVisible="centerDialogVisible"
      :typeDig="typeDig"
      v-on:hideDialog="centerDialogVisible = false"
      @imgFile="imgFile"
    ></choose-pic>
    <right-title :title="alterData.platform + '详情-修改详情'"></right-title>
    <div class="add-detail-col_1">
      <div class="add-detail-input-name">
        <span>名称：</span>
        <input-tool :value="alterData.title" @input="input_title"></input-tool>
      </div>
      <div class="add-detail-select-block">
        <span>板块/分类：</span>
        <select-tool
          :options="blockOptions"
          :value="alterData.menu"
          @selectOption="select_block"
        ></select-tool>
      </div>
    </div>
    <div class="add-detail-col_2">
      <div class="add-detail-select-copyright">
        <span>版权保护：</span>
        <select-tool
          :options="copyrightOptions"
          :value="alterData.copyright ? '有' : '无'"
          @selectOption="select_copyright"
        ></select-tool>
      </div>
            <div class="add-detail-select-category">
        <span>类别：</span>
        <select-tool
          :options="categoryOptions"
          :value="alterData.type"
          @selectOption="select_type"
        ></select-tool>
      </div>
      <div class="add-detail-select-group">
        <span>学组：</span>
        <select-tool
          :options="groupOptions"
          :value="alterData.groups"
          @selectOption="select_group"
          :multiple="true"
        ></select-tool>
      </div>

    </div>
    <div class="picture-upload">
      <div class="picture-upload-btn">
        <span>图片：</span>
        <div @click="select_picture">选取图片</div>
        <span>建议图片尺寸200*130px</span>
      </div>
      <img :src="httpUrl" alt="" />
    </div>

    <div class="add-detail-file">
      <span>附件：</span>
      <file-upload
        :value="'添加附件'"
        @fileName="file_name"
        :selectFile="selectFile"
        :accept="'.pdf,.jpg,.png,.docx,.xlsx'"
      ></file-upload>
      <div class="add-detail-upload">
        <span>
          允许附件格式：pdf，jpg，png，docx，xlsx
        </span>
      </div>
    </div>
    <div class="select-file" v-if="selectFile">
      <span>{{ selectFile }}</span>
      <span @click="delFile">删除</span>
    </div>
    <div class="add-detail-input-intro">
      <span>简介：</span>
      <input-tool
        :value="alterData.introduction"
        @input="input_intro"
      ></input-tool>
    </div>
    <div class="quill-editor-container">
      <span>内容：</span>
      <quill-editor @quillData="quillData" :value="quillVaule"></quill-editor>
    </div>

    <el-button type="primary" class="add-detail-commit" @click="submit"
      >提交</el-button
    >
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
  name: "AlterDetail",
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
      quillVaule:'',
      centerDialogVisible: false,
      httpUrl: require("@/assets/default-picture.png"),
      attachFile: {},
      typeDig: "png",
      selectFile: "",
      alterData: {},
      blockOptions: [],
      copyrightOptions: [
        {
          name: "有",
          _id: true
        },
        {
          name: "无",
          _id: false
        }
      ],
      groupOptions: [],
      categoryOptions: [
        {
          name: "文字",
          _id: "文字"
        },
        {
          name: "图片",
          _id: "图片"
        },
        {
          name: "视频",
          _id: "视频"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.alterData = Object.assign({}, this.$route.params.alterData);

      const info = this.$route.params.alterData;
      console.log("info", info);
      if (info.attachment.length > 0) {
        this.selectFile = info.attachment[0].fileName;
          this.$set(this.alterData, "attachment", info.attachment[0]._id);
      }
      if (info.headImg.length > 0) this.httpUrl = info.headImg[0].httpUrl;

      this.$set(this.alterData, "id", info._id);
      this.$set(this.alterData, "title", info.title);
      this.$set(this.alterData, "menu", info.menu);
      this.$set(this.alterData, "copyright", info.copyright);
      this.$set(this.alterData, "groups", info.groups);
      this.$set(this.alterData, "type", info.type);
      this.$set(this.alterData, "introduction", info.introduction);
      this.$set(this.alterData, "content", info.content);
      this.$set(this.alterData, "contentHtml", info.contentHtml);
      this.$set(this.alterData, "platform", info.platform);
      this.getMenuSelect();
      this.getGroups();
      this.getArticle()
    },
    getArticle(){
this.$store
        .dispatch("details/getArticle", this.alterData.id)
        .then(data => {
         this.quillVaule=this.$store.getters.article.contentHtml
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    },
    select_picture() {
      this.centerDialogVisible = true;
    },
    imgFile(val) {
      this.$set(this.alterData, "headImg", val._id);
      this.httpUrl = val.httpUrl;
    },
    file_name(val, f) {
      this.selectFile = val;
      this.attachFile = f.raw;
      console.log("---------huang", this.attachFile);
      // this.$set(this.addGroup, "file", f.raw);
    },
    delFile() {
      this.selectFile = "";
      this.attachFile = {};
      this.$set(this.alterData, "attachment", null);
    },
    quillData(content, contentHtml) {
      this.$set(this.alterData, "content", content);
      this.$set(this.alterData, "contentHtml", contentHtml);
    },
    input_title(val) {
      this.$set(this.alterData, "title", val);
    },
    select_block(val) {
      this.$set(this.alterData, "menu", val);
    },
    select_copyright(val) {
      this.$set(this.alterData, "copyright", val._id);
    },
    select_group(val) {
            let groups=[]
      val.forEach(el => {
        let info={
          group:el.name,
          groupId:el._id
        };
        groups.push(info)
      });
      this.$set(this.alterData, "groups", groups);
    },

    select_type(val) {
      this.$set(this.alterData, "type", val.name);
    },
    input_intro(val) {
      this.$set(this.alterData, "introduction", val);
    },
    updateArticle() {
      this.$store
        .dispatch("details/updateArticle", this.alterData)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    },
    submit() {
      console.log("---s-s-ss", this.attachFile);
      if (this.selectFile && this.attachFile.uid) {
        console.log("-----kkkkk");
        let info = {
          file: this.attachFile,
          group: '附件信息'
        };
        this.$store.dispatch("details/uploadFile", info).then(data => {
          this.$set(this.alterData, "attachment", data.fileId);
          this.updateArticle();
        });
      } else this.updateArticle();
    },
    getMenuSelect() {
      this.$store
        .dispatch("details/getMenuSelect", this.alterData.platform)
        .then(data => {
          this.blockOptions = this.$store.getters.menuSelect;
        });
    },
    getGroups() {
      this.$store.dispatch("education/getGroups").then(() => {
        this.groupOptions = this.$store.getters.groupInfo;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.add-detail-container {
  .add-detail-col_1 {
    display: flex;
    padding-top: 30px;
    .add-detail-input-name,
    .add-detail-select-block {
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
    .add-detail-input-name {
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
    .add-detail-select-block {
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
  .add-detail-col_2 {
    display: flex;
    padding-top: 20px;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-detail-select-copyright,
    .add-detail-select-category {
      padding-right: 30px;
    }
  }
  .add-detail-input-intro {
    display: flex;
    align-items: center;
    padding-top: 30px;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      word-break: keep-all;
      padding-right: 10px;
    }
    .input-container {
      width: 848px;
      height: 40px;
    }
  }
  .add-detail-commit {
    background: #4373f9;
    width: 100px;
    height: 36px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    padding: 0;
    border-color: transparent;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .quill-editor-container {
    display: flex;
    padding-top: 15px;
    span {
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
    .add-detail-select-group >.el-select{

      width: 400px;
    
    
  }
  .add-detail-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-detail-upload {
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
</style>
