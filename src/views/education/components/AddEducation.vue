<template>
  <div class="add-education-container">
    <right-title :title="'添加题库'"></right-title>
    <div class="add-education-name">
      <link-input
        :title="'名称：'"
        class="add-education-input"
        @input="input_name"
      >
        <span>*</span>
      </link-input>
      <div class="add-education-select">
        <span>学组：</span>
        <select-tool
          :options="groupInfo"
          @selectOption="selectOption"
          :multiple="true"
        ></select-tool>
      </div>
    </div>
    <div class="add-education-level">
      <span>难度：</span>
      <div v-for="(item, index) in level" :key="index">
        <img :src="item" alt="" @click="selectLevel(index)" />
        <!-- <img v-if="!item" :src="levelStatus" alt="" @click="selectLevel(index)"/> -->
      </div>
    </div>
    <div class="add-education-file">
      <span>考题：</span>
      <file-upload @fileName="fileName" :selectFile="selectFile"></file-upload>
      <div class="add-education-upload">
        <span>
          下载模版：
        </span>
        <span @click="uploadTemp">考题模版.xlsx</span>
      </div>
    </div>
    <div class="select-file" v-if="selectFile">
      <span>{{ selectFile }}</span>
      <span @click="delFile">删除</span>
    </div>
    <div class="commit-btn" @click="commit">提交</div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import LinkInput from "@/views/details/home/components/LinkInput";
import SelectTool from "@/components/SelectTool";
import IconLevel from "@/assets/icon-level.svg";
import IconLevelSelected from "@/assets/icon-level-selected.svg";
import FileUpload from "@/components/FileUpload";

export default {
  name: "AddEducation",
  components: { RightTitle, LinkInput, SelectTool, FileUpload },
  data() {
    return {
      name: "",
      groupInfo: [],
      level: [IconLevel, IconLevel, IconLevel, IconLevel, IconLevel],
      selectFile: "",
      addGroup: {
        title: String,
        level: Number,
        file: {},
          groupNames:[],
        groupIds:[],
        // groups:[]
      },
      importUrl: ""
    };
  },
  created() {
    if (this.$store.getters.groupInfo.length > 0) {
      this.groupInfo = this.$store.getters.groupInfo;
    } else {
      this.getGroups();
    }
    if (this.$store.getters.importFileUrl) {
      this.importUrl = this.$store.getters.importFileUrl;
    } else {
      this.getQsnImportFile();
    }
  },
  methods: {
    getGroups() {
      this.$store
        .dispatch("education/getGroups")
        .then(() => {
          this.groupInfo = this.$store.getters.groupInfo;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getQsnImportFile() {
      this.$store
        .dispatch("education/getQsnImportFile")
        .then(() => {
          this.importUrl = this.$store.getters.importFileUrl;
        })
        .catch(e => {
          console.log(e);
        });
    },
    selectLevel(index) {
      const _this = this;
      this.level.forEach((el, i) => {
        if (i <= index) {
          el = IconLevelSelected;
          _this.$set(_this.level, i, IconLevelSelected);
        } else {
          _this.$set(_this.level, i, IconLevel);
        }
      });
      this.$set(this.addGroup, "level", index + 1);
    },
    input_name(val) {
      this.$set(this.addGroup, "title", val);
    },
    selectOption(val) {
       let groups=[]
           let groupNames=[]
       let groupIds=[]
      val.forEach(el => {
        let info={
          group:el.name,
          groupId:el._id
        };
        groups.push(info)
        groupNames.push(el.name);
groupIds.push(el._id);
      });
      // this.$set(this.addGroup, "groups", groups);
   this.$set(this.addGroup, "groupNames", groupNames);
      this.$set(this.addGroup, "groupIds", groupIds);
      // this.$set(this.addGroup, "groupId", val._id);
      // this.$set(this.addGroup, "group", val.name);
    },
    fileName(val, f) {
      this.selectFile = val;
      this.$set(this.addGroup, "file", f.raw);
    },
    delFile() {
      this.selectFile = "";
      this.$set(this.addGroup, "file", {});
    },
    uploadTemp() {
      window.location.href = this.importUrl;
    },
    commit() {
      this.$store
        .dispatch("education/addQuestionnaire", this.addGroup)
        .then(data => {
          this.$alert("添加成功", {
            confirmButtonText: "确定",
            center: true
          });
        })
        .catch(e => {
          this.$alert("必填项不能为空", {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.add-education-container {
  .add-education-name {
    display: flex;
    padding-top: 30px;
    align-items: center;
    .add-education-input {
      span {
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(252, 75, 75, 1);
        margin-left: -8px;
        margin-top: 10px;
      }
      @{aaa} .link-input-title {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      @{aaa} .link-input-style {
        width: 360px;
        height: 40px;
      }
    }
    .add-education-select {
      padding-left: 49px;
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .el-select {
        width: 400px;
        height: 40px;
      }
    }
  }
  .add-education-level {
    display: flex;
    align-items: center;
    padding-top: 20px;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    img {
      width: 24px;
      height: 23px;
      margin: 0 7px;
      cursor: pointer;
    }
  }
  .add-education-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-education-upload {
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
  // .commit-btn {
  //   width: 100px;
  //   height: 36px;
  //   background: rgba(67, 115, 249, 1);
  //   border-radius: 4px;
  //   line-height: 36px;
  //   text-align: center;
  //   font-size: 16px;
  //   font-family: PingFangSC-Medium;
  //   font-weight: 500;
  //   color: rgba(255, 255, 255, 1);
  //   cursor: pointer;
  //   margin-top: 30px;
  // }
}
</style>
