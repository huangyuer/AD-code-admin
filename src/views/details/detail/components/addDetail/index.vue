<template>
  <div class="add-detail-container">
     <choose-pic
      :centerDialogVisible="centerDialogVisible"
      :typeDig="typeDig"
      v-on:hideDialog="centerDialogVisible = false"
      @imgFile="imgFile"
    ></choose-pic>
    <right-title :title="platform + '详情-添加详情'"></right-title>
    <div class="add-detail-col_1">
      <div class="add-detail-input-name">
        <span>名称：</span>
        <input-tool :value="''" @input="input_title"></input-tool>
      </div>
      <div class="add-detail-select-block">
        <span>板块/分类：</span>
        <!-- <select-tool
          :options="blockOptions"
          :value="''"
          @selectOption="select_block"
        ></select-tool> -->
          <el-select
    
    placeholder="请选择"
    @change="select_block"
    value-key="_id"
    clearable
    popper-class="select-active"
  >
    <el-option v-for="item in blockOptions" :key="item._id" :label="item.name" :value="item"></el-option>
  </el-select>
      </div>
    </div>
    <div class="add-detail-col_2">
      <div class="add-detail-select-copyright">
        <span>版权保护：</span>
        <select-tool
          :options="copyrightOptions"
          :value="'有'"
          @selectOption="select_copyright"
        ></select-tool>
      </div>
        <div class="add-detail-select-category">
        <span>类别：</span>
        <select-tool
          :options="categoryOptions"
          :value="'图片'"
          @selectOption="select_type"
        ></select-tool>
      </div>
      <div class="add-detail-select-group">
        <span>学组：</span>
        <select-tool
          :options="groupOptions"
          :value="''"
          @selectOption="select_group"
          :multiple="true"
        ></select-tool>
      </div>

    </div>
    <div class="picture-upload">
      <div class="picture-upload-btn">
        <span>图片：</span>
        <div @click="select_picture(1)">选取图片</div>
        <span>建议图片尺寸200*130px</span>
      </div>
      <img :src="httpUrl" alt="" class />
    </div>
        <div class="picture-upload" v-if="platform==='官微'">
      <div class="picture-upload-btn">
        <span>头图：</span>
        <div @click="select_picture(2)">选取图片</div>
        <span>建议图片尺寸200*130px</span>
      </div>
      <img :src="headHttpUrl" alt="" class />
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
      <input-tool @input="input_intro"></input-tool>
    </div>
    <div class="quill-editor-container">
      <span>内容：</span>
      <quill-editor @quillData="quillData"></quill-editor>
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
  name: "AddDetail",
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
      imgType:1,
      centerDialogVisible: false,
      httpUrl: require("@/assets/default-picture.png"),
      headHttpUrl: require("@/assets/default-picture.png"),
      attachFile: {},
      typeDig: "png",
      selectFile: "",
      platform: this.$route.params.platform,
      blockOptions: [],
      addData: {},
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
      this.$set(this.addData, "type", "图片");
      this.$set(this.addData, "platform", this.platform);
      this.$set(this.addData, "group",'');
      this.$set(this.addData, "copyright", true);
      this.getMenuSelect();
      this.getGroups();
    },
       select_picture(val) {
         this.imgType=val
      this.centerDialogVisible = true;
    },
        imgFile(val) {
          if(this.imgType===1){
            this.$set(this.addData, "headImg", val._id);
      this.httpUrl = val.httpUrl;
          }else{
     this.$set(this.addData, "artHeadImg", val._id);
      this.headHttpUrl = val.httpUrl;

          }
      
    },
    file_name(val, f) {
      this.selectFile = val;
      this.attachFile = f.raw;
    },
        delFile() {
      this.selectFile = "";
      this.attachFile = {};
      this.$set(this.addData, "attachment", null);
    },
    quillData(content, contentHtml) {
      console.log("-----quill", content, contentHtml);
      this.$set(this.addData, "content", content);
      this.$set(this.addData, "contentHtml", contentHtml);
    },
    input_title(val) {
      this.$set(this.addData, "title", val);
    },
    select_block(val) {
      this.$set(this.addData, "menu", val);
    },
    select_copyright(val) {
      this.$set(this.addData, "copyright", val._id);
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
      this.$set(this.addData, "groups", groups);
      // this.$set(this.addData, "groupId", val._id);
    },

    select_type(val) {
      this.$set(this.addData, "type", val.name);
    },
    input_intro(val) {
      this.$set(this.addData, "introduction", val);
    },
    addArticle(){
      console.log("=====",this.addData)
 this.$store
        .dispatch("details/addArticle", this.addData)
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
      if (this.selectFile && this.attachFile.uid) {
        let info = {
          file: this.attachFile,
          group: '附件信息'
        };
        this.$store.dispatch("details/uploadFile", info).then(data => {

          this.$set(this.addData, "attachment", data.fileId);
      console.log("=====333",this.addData,data)

          this.addArticle();
        }).catch(e=>{
           this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          reject(e);
        });
      } else this.addArticle();
    },
    getMenuSelect() {
      this.$store
        .dispatch("details/getMenuSelect", this.platform)
        .then(data => {
          this.blockOptions = this.$store.getters.menuSelect;
        });
    },
    getGroups() {
      this.$store.dispatch("education/getGroups").then(() => {
        console.log("dddd", this.$store.getters.groupInfo);
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
