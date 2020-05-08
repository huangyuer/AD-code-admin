<template>
  <el-dialog
    ref="dialog"
    :append-to-body="true"
    :visible.sync="centerDialogVisible"
    :close-on-click-modal="false"
    width="900px"
    @opened="openDialog"
    :before-close="hideData"
    @close="closeDialog"
    left
  >
    <div class="el-dialog__header tise">
      <span class="el-dialog__title">选择图片</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn">
        <i class="el-dialog__close el-icon el-icon-close" @click="hideData()"></i>
      </button>
    </div>
    <div class="dialogChooseWapper" v-loading="loading">
      <div class="ChooseleftTab">
        <el-scrollbar class="pageleftscrollbar" :native="false">
          <div class="filegroupsList">
            <div
              class="filegroupsItem"
              :class="{
                  active: active && item && active == item
                }"
              v-for="(item, key) in filegroups"
              @click="ClickgroupsItem(item)"
            >{{ item }}</div>
            <div class="addgroupbtn" @click="visible=true">新建分组</div>
            <el-dialog
              width="300px"
              :append-to-body="true"
              :close-on-click-modal="false"
              :visible.sync="visible"
              @open="openvisible"
            >
              <div style="margin:20px;box-sizing:border-box;">
                <div
                  style="font-size:14px;color:#333333;padding:20px 0;"
                  class="p-titleinput"
                >请输入分组名称</div>
                <el-input class="inputadd" v-model="addGroupName" type="text" style="width:240px;"></el-input>
                <div style="text-align: center; margin-top:20px;padding-bottom:30px;display:flex;">
                  <div
                    style="flex:1;background:#009966;padding:5px 0;margin-right:10px;border-radius:4px;color:#ffffff;"
                    @click="addFileGroup()"
                  >确定</div>
                  <div
                    style="flex:1;border:1px solid #E5E5E5;padding:5px 0;margin-left:10px;border-radius:4px;color:#999999"
                    @click="visible = false"
                  >取消</div>
                </div>
              </div>
            </el-dialog>
          </div>
        </el-scrollbar>
      </div>
      <div class="ChooserightList">
        <div class="demoimagelist">
          <div class="demo-image">
            <div
              :class="{
                  block: true,
                  clickfalse: true,
                  activeborder: ismultiple?currentchooseimagelist.includes(fit):currentchooseimage._id == fit._id
                }"
              v-for="fit in filesimagevideo"
              @click="selectImage($event, fit)"
            >
              <div
                class="xuanze-gou"
                v-show="ismultiple?currentchooseimagelist.includes(fit):currentchooseimage._id == fit._id"
              >
                <img src="../assets/xuanzeicon@2x.png" alt />
              </div>
              <div class="maskelimage"></div>
              <el-image style="width: 100px; height: 60px" :src="fit.httpUrl" fit="cover"></el-image>
              <el-tooltip
                class="item"
                effect="dark"
                :content="fit.fileName"
                placement="bottom-start"
              >
                <span class="demonstration">{{ fit.fileName }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="member-info-footer">
          <Pagination
            :total="total"
            :limit="currentsItem.limit"
            :currentPages="currentPages"
            @currentPage="jumpPage"
          ></Pagination>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div>
        <el-upload
          :action="''"
          :show-file-list="false"
          list-type="picture"
          :multiple="ismultiple"
          :auto-upload="true"
          :http-request="uploadMethod"
          accept=".BMP, .JPG, .JPEG, .PNG, .GIF"
        >
          <button class="footerdialogbtn">
            <span>上传文件</span>
          </button>
        </el-upload>
      </div>
      <button @click="submitTrue()" class="footerdialogbtn primary">
        <span>确 定</span>
      </button>
    </span>
  </el-dialog>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  name: "ChoosePic",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    ismultiple: {
      type: Boolean,
      default: false
    }
  },
  components: { Pagination },
  data() {
    return {
      visible: false,
      //
      active: "",
      //ADD GROUP
      addGroupName: "",
      addfilegroups: [],
      //GET IMAGEVIDEO
      filesimagevideo: [],
      total: 1,
      currentPages: false,
      currentsItem: {
        page: 1,
        limit: 12,
        type: "图片",
        group: String
      },
      //GET GROUP
      gettype: "图片",
      defaultgroups: [
        {
          _id: "",
          name: "全部"
        },
        {
          _id: "",
          name: "未分组"
        }
      ],
      filegroups: [],
      //uploadfile
      uploadfiles: {
        file: "",
        group: ""
      },
      //chooseImage
      currentchooseimage: "",
      currentchooseimagelist: [],
      //chooseVideo
      currentchoosevideo: "",
      file: [],
      loading: false
    };
  },
  methods: {
    hideData() {
      this.$emit("hideDialog");
    },
    openDialog() {
      console.log("this.isvideo");
      this.gettype = "图片";
      this.currentsItem.type = "图片";
      this.loading = true;
      this.getFileGroups();
    },
    closeDialog() {
      this.filegroups = [];
      this.filesimagevideo = [];
      console.log("close");
      this.$emit("hideDialog");
    },
    openvisible() {
      this.addGroupName = "";
    },
    uploadMethod(param) {
      this.uploadfiles.file = param.file;
      this.uploadfiles.group = this.active;
      this.$store
        .dispatch("details/uploadFile", this.uploadfiles)
        .then(() => {
          this.init(this.active);
          this.$message({
            type: "success",
            message: "上传成功"
          });
        })
        .catch(e => {
          this.$message({
            type: "error",
            message: e
          });
        });
    },
    selectImage(e, item) {
      if (!this.ismultiple) {
        if (this.currentchooseimage == item) {
          this.currentchooseimage = "";
        } else {
          this.currentchooseimage = item;
        }
      } else {
        if (!this.currentchooseimagelist.includes(item)) {
          this.currentchooseimagelist.push(item);
        } else {
          for (var i = 0; i < this.currentchooseimagelist.length; i++) {
            if (this.currentchooseimagelist[i] == item) {
              this.currentchooseimagelist.splice(i, 1);
              return;
            }
          }
        }
      }
    },
    //选择确定传值给需要的地方
    submitTrue() {
      if (!this.ismultiple && this.currentchooseimage == "") {
        this.$message({
          message: "没有选择图片",
          type: "success"
        });
        return;
      }
      if (this.ismultiple && this.currentchooseimagelist == "") {
        this.$message({
          message: "没有选择图片",
          type: "success"
        });
        return;
      }
      if (!this.ismultiple && this.currentchooseimage != "") {
        this.$emit("imgFile", this.currentchooseimage);
        this.currentchooseimage = "";
        this.$message({
          message: "图片选择成功",
          type: "success"
        });
      } else if (this.ismultiple && this.currentchooseimagelist != "") {
        this.$emit("imgFileList", this.currentchooseimagelist);
        this.currentchooseimagelist = [];
        this.$message({
          message: "图片选择成功",
          type: "success"
        });
      }
      this.hideData();
    },
    ClickgroupsItem(item) {
      this.active = item;
      this.currentsItem.page = 1;
      this.currentsItem.type = "图片";
      this.currentsItem.group = item;
      this.loading = true;
      this.currentPages = true;
      this.getFileImageVideo();
    },
    jumpPage(val) {
      this.currentPages = false;
      this.currentsItem.page = val;
      this.getFileImageVideo();
    },
    getFileGroups() {
      this.$store
        .dispatch("details/getFileGroups", this.gettype)
        .then(() => {
          this.filegroups = this.$store.getters.filegroups.groups;
          this.init(this.filegroups[0]);
        })
        .catch(e => {
          console.log("dddddddd", e);
        });
    },
    addFileGroup() {
      const addfileatc = {
        name: this.addGroupName,
        type: this.gettype
      };
      this.$store
        .dispatch("details/addFileGroup", addfileatc)
        .then(() => {
          this.addfilegroups = this.$store.getters.addfilegroups;
          this.visible = false;
          this.getFileGroups();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getFileImageVideo() {
      this.$store
        .dispatch("details/getFileImageVideo", this.currentsItem)
        .then(() => {
          this.loading = false;
          this.filesimagevideo = this.$store.getters.filesimagevideo.files;
          this.total = this.$store.getters.filesimagevideo.total;
        })
        .catch(e => {
          console.log(e);
        });
    },
    init(groupitem) {
      console.log("00000000");
      this.active = groupitem;
      this.currentsItem.group = groupitem;
      // this.currentsItem.groupId = this.active._id;
      this.getFileImageVideo();
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.dialogChooseWapper {
  display: flex;
  .ChooseleftTab {
    flex: 123;
    .pageleftscrollbar {
      height: 100%;
      border-right: 2px solid #e5e5e5;
      .filegroupsList {
        .filegroupsItem {
          height: 38px;
          line-height: 38px;
          text-align: center;
          font-size: 15px;
          color: #999999;
          cursor: pointer;
          &.active {
            background: #f7f7f7;
            color: #333333;
          }
        }
        .addgroupbtn {
          text-align: center;
          color: #009966;
          font-size: 15px;
          position: absolute;
          width: 100%;
          bottom: 80px;
          cursor: pointer;
        }
      }
    }
  }
  .ChooserightList {
    flex: 777;
    .demoimagelist {
      margin-top: 30px;
      min-height: 210px;
      .demo-image {
        overflow: hidden;
        margin-left: 40px;
        .block {
          float: left;
          margin: 0 7px;
          position: relative;
          margin-bottom: 20px;
          &.activeborder::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
          .xuanze-gou {
            // display: none;
            position: absolute;
            left: 5px;
            top: 5px;
            width: 20px;
            height: 20px;
            z-index: 2;
            img {
              width: 100%;
            }
          }
          .demonstration {
            display: block;
            text-align: center;
            color: #666666;
            font-size: 14px;
            width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .member-info-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 30px;
      padding-right: 30px;
      padding-bottom: 126px;
    }
  }
}
@{aaa}.el-dialog__header {
  padding: 0;
  &.tise {
    height: 20px;
    padding: 20px 20px 10px;
    border-bottom: 2px solid #e5e5e5;
    text-align: center;
  }
}
@{aaa}.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  position: absolute;
  top: 16px;
  left: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
}
@{aaa}.el-dialog__body {
  padding: 0;
  height: 100%;
}
@{aaa}.el-scrollbar__wrap {
  overflow-x: hidden;
  height: 72%;
}
@{aaa}.dialogChooseWapper {
  height: 100%;
}
@{aaa}.el-scrollbar__bar.is-vertical {
  width: 5px;
}
@{aaa}.el-dialog__footer {
  position: absolute;
  bottom: 20px;
  left: 123px;
  .dialog-footer {
    display: flex;
  }
  .footerdialogbtn {
    display: inline-block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dae4ff;
    color: #009966;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 0;
    font-size: 14px;
    border-radius: 4px;
    &.primary {
      background: #009966;
      color: #ffffff;
      margin-left: 15px;
    }
  }
}
</style>
