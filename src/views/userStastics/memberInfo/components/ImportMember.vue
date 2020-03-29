<template>
  <div>
    <div class="import-member-container">
      <right-title :title="'导入会员'"></right-title>
      <div class="import-member-file">
        <span>考题：</span>
        <file-upload
          @fileName="fileName"
          :selectFile="selectFile"
        ></file-upload>
        <div class="import-member-upload">
          <span>
            下载模版：
          </span>
          <span @click="uploadTemp">导入会员模版.xlsx</span>
        </div>
      </div>
      <div class="select-file" v-if="selectFile">
        <span>{{ selectFile }}</span>
        <span @click="delFile">删除</span>
      </div>
      <div class="member-radio">
        <span>操作：</span>
        <div class="icon-radio" @click="importAdd">
          <img :src="importChecked" alt="" /> 添加
        </div>
        <div class="icon-radio" @click="importReduce">
          <img :src="importUnchecked" alt="" />解绑
        </div>
      </div>
      <div class="member-commit" @click="importUser">提交</div>
    </div>
    <div class="add-member-container">
      <right-title :title="'添加会员'"></right-title>
      <div class="add-member-input">
        <span>会员号：</span>
        <el-input type="textarea" autosize v-model="addUserData.users"> </el-input>
      </div>
      <span class="input-tip">每行一个“姓名 会员号”，英文逗号分隔</span>
      <div class="member-radio">
        <span>操作：</span>
        <div class="icon-radio" @click="joinAdd">
          <img :src="joinChecked" alt="" /> 添加
        </div>
        <div class="icon-radio" @click="joinReduce">
          <img :src="joinUnchecked" alt="" />解绑
        </div>
      </div>
      <div class="member-commit" @click="addCommit">提交</div>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import FileUpload from "@/components/FileUpload";
import LinkInput from "@/views/details/home/components/LinkInput";
import radioChecked from "@/assets/icon-radio-checked.svg";
import radioUnchecked from "@/assets/icon-radio.svg";
export default {
  name: "ImportMember",
  data() {
    return {
      radio1: 1,
      radio2: 1,
      importChecked: radioChecked,
      importUnchecked: radioUnchecked,
      joinChecked: radioChecked,
      joinUnchecked: radioUnchecked,
      
      importUrl: "",
      selectFile: "",
      importUserData: {
        file: {},
        type: "新增"
      },
      addUserData:{
users: "",
 type: "新增"
      }
    };
  },
  components: { RightTitle, LinkInput, FileUpload },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$store.getters.userImportUrl) {
        this.importUrl = this.$store.getters.userImportUrl;
      } else {
        this.getUserImportFile();
      }
    },
    getUserImportFile() {
      this.$store.dispatch("user/getUserImportFile").then(() => {
        this.importUrl = this.$store.getters.userImportUrl;
      });
    },
    delFile() {
      this.selectFile = "";
      this.$set(this.importUserData, "file", {});
    },
    uploadTemp() {
      window.location.href = this.importUrl;
    },
    fileName(val, f) {
      this.selectFile = val;
      this.$set(this.importUserData, "file", f.raw);
    },
    importUser() {
      this.$store
        .dispatch("user/importUser", this.importUserData)
        .then(data => {
          this.$alert("新增成功", {
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
        });
    },
    importAdd() {
      if (this.importChecked === radioUnchecked) {
        this.importChecked = radioChecked;
        this.importUnchecked = radioUnchecked;
      this.$set(this.importUserData, "type", '新增');
        
      }
    },
    importReduce() {
      if (this.importUnchecked === radioUnchecked) {
        this.importUnchecked = radioChecked;
        this.importChecked = radioUnchecked;
      this.$set(this.importUserData, "type", '解绑');

      }
    },
    joinAdd() {
      if (this.joinChecked === radioUnchecked) {
        this.joinChecked = radioChecked;
        this.joinUnchecked = radioUnchecked;
      this.$set(this.addUserData, "type", '新增');

      }
    },
    joinReduce() {
      if (this.joinUnchecked === radioUnchecked) {
        this.joinUnchecked = radioChecked;
        this.joinChecked = radioUnchecked;
      this.$set(this.addUserData, "type", '解绑');

      }
    },
    addCommit() {
      this.$store
        .dispatch("user/addUsers", this.addUserData)
        .then(data => {
          this.$alert("新增成功", {
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
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";

.import-member-container {
  .import-member-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .import-member-upload {
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        &:nth-child(2) {
          color: #4373f9;
          cursor: pointer;
        }
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
}
.add-member-container {
  padding-top: 45px;
  .add-member-input {
    display: flex;
    padding-top: 22px;
    padding-bottom: 15px;
    span {
      padding-right: 5px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    @{aaa} .el-textarea {
      width: 400px;
      height: 80px;
      border-radius: 4px;
    }
    @{aaa} .el-textarea__inner {
      height: 100% !important;
      border: 1px solid rgba(229, 229, 229, 1);
    }
  }
  .input-tip {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding-top: 10px;
  }
}
.member-radio {
  display: flex;
  align-items: center;
  padding-top: 13px;
  span {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .icon-radio {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding: 0 8px;

    img {
      width: 20px;
      height: 20px;
      padding-right: 5px;
      box-sizing: content-box;
      cursor: pointer;
    }
  }
}
.member-commit {
  width: 100px;
  height: 36px;
  background: rgba(67, 115, 249, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
}
</style>
