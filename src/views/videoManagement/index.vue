<template>
  <div class="index" v-loading="loading">
    <right-title :title="'视频管理'"></right-title>
    <div class="select-container">
      <div class="input-name">
        <span>名称：</span>
        <input-tool @input="input_title"></input-tool>
      </div>
      <div class="select-block">
        <span>分类：</span>
        <select-tool :options="typeData" @selectOption="selectBlock"></select-tool>
      </div>
      <div class="searchBtn-box" @click="search">检索</div>
      <div class="add-article" @click="addVideo">添加详情</div>
    </div>
    <videoTable :tableData="tableData" @del="del"></videoTable>
    <div style="display: flex;justify-content: space-between;">
      <el-button type="primary" class="commit-btn" @click="exportBtn">导出</el-button>
      <div class="pagination-box">
        <div>
          文章总数量
          <span>{{ total }}</span>篇
        </div>
        <Pagination :total="total" :limit="params.limit" @currentPage="jumpPage"></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import videoTable from "./components/videoTable";
import Pagination from "@/components/Pagination";
import InputTool from "@/components/InputTool";
import RightTitle from "@/components/RightTitle";
import SelectTool from "@/components/SelectTool";

export default {
  name: "Video",
  components: { SelectTool, videoTable, Pagination, InputTool, RightTitle },
  data() {
    return {
      typeData: ["我的故事", "医学大咖", "家园活动"],
      tableData: [],
      total: 0,
      params: { page: 1, limit: 10, title: "", tag: "", export: false },
      loading: true
    };
  },
  created() {
    this.getVideos();
    this.getMenuSelect()
  },
  methods: {
    getMenuSelect(){
      this.$store
        .dispatch("details/getMenuSelect",'科普视频')
        .then(data => {
          this.typeData=data.selects[0].tags
        })
        .catch(e => {
        });
    },
    exportBtn() {
      this.params.export = true;
      this.$store.dispatch("video/getVideos", this.params).then(res => {
        this.$message({
          type: "success",
          message: res.msg
        });
      });
    },
    selectBlock(val) {
      this.params.tag = val;
    },
    del(id) {
      this.$confirm("确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.$store
            .dispatch("video/delVideo", id)
            .then(data => {
              this.$message({
                type: "success",
                message: data
              });
              this.getVideos();
            })
            .catch(e => {
              // this.$alert(e, {
              //   confirmButtonText: "确定",
              //   center: true
              // });
              reject(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    addVideo() {
      this.$router.push({ path: "/video/add" });
    },
    input_title(val) {
      this.params.title = val;
    },
    search() {
      this.params.page = 1;
      this.getVideos();
    },
    getVideos() {
      this.params.export = false;
      this.$store
        .dispatch("video/getVideos", this.params)
        .then(res => {
          this.tableData = res.data.videos;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          reject(e);
        });
    },
    jumpPage(val) {
      this.params.page = val;
      this.getVideos();
    }
  }
};
</script>
<style lang='less' scoped>
.select-container {
  display: flex;
  align-items: center;
  .input-name,
  .select-block {
    word-break: keep-all;
    display: flex;
    align-items: center;
    padding-right: 20px;
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .el-select {
      width: 180px;
      height: 40px;
    }
  }

  .searchBtn-box {
    width: 88px;
    min-width: 88px;
    height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(229, 229, 229, 1);
    line-height: 36px;
    text-align: center;
    font-weight: 500;
    color: #009966;
    cursor: pointer;
  }
  .add-article {
    width: 100px;
    min-width: 100px;
    line-height: 40px;
    text-align: center;
    height: 40px;
    background: rgba(0, 153, 102, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 40px;
    cursor: pointer;
  }
}
.pagination-box {
  padding: 32px 0 117px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  span {
    color: #009966;
  }
}
.commit-btn {
  margin-top: 30px;
}
</style>
