<template>
  <div class="picturePage" v-loading="loading">
    <el-collapse accordion>
      <div class="filegroupsList">
        <!-- <div class="filegroupsItem" :class="{active : active == item.name}"  v-for="(item,index) in defaultgroups" @click="ClickgroupsItem(item)">{{item.name}}</div> -->
        <div
          class="filegroupsItem"
          :class="{ active: activeitem == item }"
          v-for="(item, key) in filegroups"
          :key="item"
        >
          <span @click="ClickgroupsItem(item)">{{ item }}</span>
          <!-- <div
            class="shanchucopy"
            v-show="(key == filegroups.length - 1 && key > 1 && (activeitem=='全部' || activeitem=='未分组')) 
            || item==activeitem && item!='全部' && item!='未分组'"
            @click="submitdeletell(activeitem)"
          >
            <img src="../../../../assets/shanchucopy@2x.png" alt="" />
          </div>-->
        </div>
      </div>
      <div
        role="button"
        id="el-collapse-head-6829"
        tabindex="0"
        class="el-collapse-item__header"
        @click="eliconright($event)"
      >
        展开全部
        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
      </div>
      <el-popover placement="bottom" width="300" v-model="visible">
        <div style="margin:8px;box-sizing:border-box;">
          <div style="font-size:14px;color:#333333;" class="p-titleinput">请输入分组名称</div>
          <el-input class="inputadd" v-model="addGroupName" type="text" style="width:240px;"></el-input>
          <div style="text-align: center; margin-top:20px;display:flex;">
            <div
              style="width:100px;background:#009966;padding:5px 0;margin-right:10px;border-radius:4px;color:#ffffff;"
              @click="addFileGroup(addGroupName, gettype)"
            >确定</div>
            <div
              style="width:100px;border:1px solid #E5E5E5;padding:5px 0;margin-left:10px;border-radius:4px;color:#999999"
              @click="visible = false"
            >取消</div>
          </div>
        </div>
        <el-button slot="reference" style="background:#009966;color:#ffffff;margin-right:47px;">新建分组</el-button>
      </el-popover>
    </el-collapse>
    <!-- <div class="delete-line" v-if="deletefileIds.length > 0">
      <div class="line-left">
        <div class="deleteicon-img">
          <img src="../../../../assets/quanxuan@2x.png" alt="" />
        </div>
        <div class="p-one">已选择{{ deletefileIds.length }}项内容</div>
        <div class="p-two" @click="cancelSelect()">取消选择</div>
      </div>
      <div class="line-right">
        <div class="shanchucopy" @click="submitdelete()">
          <img src="../../../../assets/shanchucopy@2x.png" alt="" />
        </div>
      </div>
    </div>-->
    <div class="demoimagelist">
      <div class="demo-image">
        <div
          class="block clickfalse"
          v-for="fit in filesimagevideo"
          @click="deleteImage($event, fit)"
          :key="fit.id"
        >
          <div class="xuanze-gou" v-show="deletefileIds.includes(fit._id)">
            <img src="../../../../assets/xuanzeicon@2x.png" alt />
          </div>
          <div
            class="hover_img"
            :class="{
              hovermaster: true,
              psmasterimage: deletefileIds.includes(fit._id)
            }"
          >
            <el-image style="width: 200px; height: 120px" :src="fit.httpUrl" fit="cover"></el-image>
          </div>
          <el-tooltip class="item" effect="dark" :content="fit.fileName" placement="bottom-start">
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
</template>

<script>
import ChoosePic from "@/components/ChoosePic";
import Pagination from "@/components/Pagination";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "MaterialPic",
  data() {
    return {
      centerDialogVisible: false,
      visible: false,
      // active:'全部图片',
      activeitem: "",
      // DELETE
      deletefileIds: [],
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
      loading: false
    };
  },
  components: {
    ChoosePic,
    Pagination
  },
  methods: {
    eliconright(e) {
      if (e.currentTarget.firstElementChild.classList.contains("is-active")) {
        e.currentTarget.firstElementChild.classList.remove("is-active");
        e.currentTarget.previousElementSibling.style.height = "20px";
      } else {
        e.currentTarget.firstElementChild.classList.add("is-active");
        e.currentTarget.previousElementSibling.style.height = "auto";
      }
    },
    cancelSelect() {
      this.deletefileIds = [];
    },
    ClickgroupsItem(item) {
      // this.active = item.name;
      this.activeitem = item;
      this.currentsItem.page = 1;
      this.currentsItem.group = item;
      this.currentsItem.type = "图片";
      this.currentPages = true;
      this.getFileImageVideo();
    },
    deleteImage(e, item) {
      if (!this.deletefileIds.includes(item._id)) {
        this.deletefileIds.push(item._id);
        console.log("this.deletefileIds", this.deletefileIds);
      } else {
        for (var i = 0; i < this.deletefileIds.length; i++) {
          if (this.deletefileIds[i] == item._id) {
            this.deletefileIds.splice(i, 1);
            break;
          }
        }
      }
    },
    submitdelete() {
      this.$store
        .dispatch("details/delFiles", this.deletefileIds)
        .then(() => {
          this.deletefileIds = [];
          this.getFileImageVideo();
        })
        .catch(e => {
          console.log(e);
        });
    },
    submitdeletell(tis) {
      if (tis == "全部" || tis == "未分组") {
        this.$message("全部和未分组不能删除");
        return;
      }
      this.$store
        .dispatch("details/delFileGroup", tis)
        .then(data => {
          this.getFileGroups();
          this.getFileImageVideo();
          this.$message("删除成功");
        })
        .catch(e => {
          // this.$message(e);
        });
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
          this.activeitem = this.filegroups[0];
          this.currentsItem.page = 1;
          this.currentsItem.group = this.filegroups[0];
          this.getFileImageVideo();
          // this.initaddFileGroup();
        })
        .catch(e => {
          console.log(e);
        });
    },
    addFileGroup(name, type) {
      const addfileatc = {
        name: name,
        type: type
      };
      this.$store
        .dispatch("details/addFileGroup", addfileatc)
        .then(() => {
          this.addfilegroups = this.$store.getters.addfilegroups;
          this.visible = false;
          this.getFileGroups();
          console.log("this.addfilegroups", this.addfilegroups);
        })
        .catch(e => {
          console.log(e);
        });
    },
    initaddFileGroup() {
      // const kone = this.filegroups[this.filegroups.length-2];
      // this.filegroups.splice(0,0,kone);
      // const ktwo = this.filegroups[this.filegroups.length-1];
      // this.filegroups.splice(1,0,kone);
      // this.filegroups.splice(this.filegroups.length-1,1);
      // console.log("kone",kone);
      // const addfileatc={
      //   name:'未分组',
      //   type:'图片',
      // }
      // this.$store
      //   .dispatch("details/addFileGroup",addfileatc)
      //   .then(() => {
      //     this.addfilegroups = this.$store.getters.addfilegroups;
      //      this.visible = false;
      //     //  this.getFileGroups();
      //     console.log("this.addfilegroups",this.addfilegroups);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },
    getFileImageVideo() {
      this.loading = true;
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
    }
  },
  mounted() {
    this.loading = true;
    this.getFileGroups();
  },
  created() {}
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
@color: #009966;
.picturePage {
  box-sizing: border-box;
  max-width: 1240px;
  // width: 80%;
  // min-width: 1000px;
  width: 73%;
  min-width: 937px;
  .active {
    color: @color;
  }
  .filegroupsList {
    color: #999999;
    font-size: 16px;
    overflow: hidden;
    float: left;
    width: 72%;
    height: 20px;
    .filegroupsItem {
      float: left;
      padding-right: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      .shanchucopy {
        width: 14px;
        height: 18px;
        cursor: pointer;
        margin-left: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
  .inputadd {
    width: 240px;
    input {
      width: 100%;
    }
  }
  .delete-line {
    background: #efefef;
    width: 95%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 20px;
    .line-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .deleteicon-img {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
        }
      }
      .p-one {
        color: #333333;
        font-size: 14px;
        padding-left: 10px;
      }
      .p-two {
        color: #666666;
        font-size: 14px;
        padding-left: 10px;
        cursor: pointer;
      }
    }
    .line-right {
      .shanchucopy {
        width: 16px;
        height: 20px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
  }
  .demoimagelist {
    margin-top: 30px;
    .demo-image {
      overflow: hidden;
      margin-left: -15px;
      .block {
        float: left;
        padding: 0 15px;
        position: relative;
        margin-bottom: 20px;
        .xuanze-gou {
          // display: none;
          position: absolute;
          left: 25px;
          top: 5px;
          width: 20px;
          height: 20px;
          z-index: 2;
          img {
            width: 100%;
          }
        }
        .psmasterimage {
          position: relative;
          cursor: pointer;
          &:after {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 1);
            opacity: 0.6;
          }
        }
        .hover_img {
          cursor: pointer;
        }
        .demonstration {
          display: block;
          text-align: center;
          color: #666666;
          font-size: 14px;
          width: 200px;
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
    padding: 30px 0;
    padding-right: 30px;
  }
}
@{aaa}.el-collapse {
  border-top: none;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  position: relative;
}
@{aaa}.el-collapse-item__wrap {
  border-bottom: none;
}
@{aaa}.el-collapse-item {
  position: absolute;
  width: 89.6%;
  right: 108px;
  top: 22px;
}
@{aaa}.el-collapse-item__header {
  border-bottom: none;
  float: right;
  position: absolute;
  top: -14px;
  right: 185px;
  color: @color;
  width: 83px;
  background: transparent;
}
</style>
