<template>
  <div class="article" v-loading="loading">
    <right-title :title="title" style="margin-bottom:-15px"></right-title>
    <div class="select-container">
      <div>
        <div class="input-name">
          <span>名称：</span>
          <input-tool @input="input_name"></input-tool>
        </div>
        <div class="select-block">
          <span>板块：</span>
          <select-tool :options="menuData" @selectOption="selectMenu"></select-tool>
        </div>
      </div>
      <div>
        <div class="input-name">
          <span>姓名：</span>
          <input-tool @input="input_userName"></input-tool>
        </div>
        <div class="select-block">
          <span>行为：</span>
          <select-tool :value="'浏览'" :options="typeData" @selectOption="selectType"></select-tool>
        </div>
        <div class="searchBtn-box" @click="search">检索</div>
      </div>
    </div>
    <ActionTable :tableData="tableData" @isDel="isDel" :type="params.menu"></ActionTable>
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
import RightTitle from "@/components/RightTitle";
import ActionTable from "./components/actionTable";
import Pagination from "@/components/Pagination";
import InputTool from "@/components/InputTool";
import SelectTool from "@/components/SelectTool";
export default {
  name: "UserAction",
  components: { ActionTable, Pagination, InputTool, SelectTool, RightTitle },
  data() {
    return {
      title: "用户行为",
      typeData: ["浏览", "收藏", "点击"],
      menuData: ["医院地图", "评估记录"],
      tableData: [],
      total: 0,
      params: {
        page: 1,
        limit: 10,
        menu: "",
        type: "浏览",
        userName: "",
        name: "",
        export: false
      },
      loading: true
    };
  },
  created() {
    this.getPageLogs();
  },
  methods: {
    exportBtn() {
      this.params.export = true;
      this.$store.dispatch("user/getPageLogs", this.params);
    },
    isDel(id) {
      this.getPageLogs();
    },
    addArticle() {
      this.$router.push({ path: "pointsShop/add" });
    },
    input_name(val) {
      this.params.name = val;
    },

    selectMenu(val) {
      this.params.menu = val;
      if (val == "医院地图") this.title = "用户行为-医院地图";
      else if (val == "评估记录") this.title = "用户行为-评估记录";
      else this.title = "用户行为";
    },
    selectType(val) {
      this.params.type = val;
    },
    input_userName(val) {
      this.params.userName = val;
    },
    search() {
      this.params.page = 1;
      this.getPageLogs();
    },
    jumpPage(val) {
      this.params.page = val;
      this.getPageLogs();
    },
    getPageLogs() {
      this.params.export = false;

      this.$store
        .dispatch("user/getPageLogs", this.params)
        .then(data => {
          this.tableData = data.logs;
          this.total = data.total;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.select-container {
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    margin-top: 16px;
  }
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
