<template>
  <div class="article" v-loading="loading">
    <right-title :title="'导出记录'" style="margin-bottom:-15px"></right-title>
    <Table :tableData="tableData" @isDel="isDel"></Table>
    <div class="pagination-box">
      <div>
        文章总数量
        <span>{{ total }}</span>篇
      </div>
      <Pagination :total="total" :limit="params.limit" @currentPage="jumpPage"></Pagination>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import Table from "./components/Table";
import Pagination from "@/components/Pagination";
import InputTool from "@/components/InputTool";
import SelectTool from "@/components/SelectTool";
export default {
  name: "PointsEarn",
  components: { Table, Pagination, InputTool, SelectTool,RightTitle },
  data() {
    return {
      typeData: ["实体书", "电子书", "科普视频", "入场券"],
      tableData: [],
      total: 0,
      params: { page: 1, limit: 10},
      loading: true
    };
  },
  created() {
    this.getExportLogs();
  },
  methods: {
    isDel(id) {
      this.getExportLogs();
    },

    input_job(val) {
      this.params.jobName = val;
    },
    search() {
      this.params.page = 1;
      this.getExportLogs();
    },
    input_title(val) {
      this.params.userName = val;
    },
    jumpPage(val) {
      this.params.page = val;
      this.getExportLogs();
    },
    getExportLogs() {
      this.$store
        .dispatch("export/getExportLogs", this.params)
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
</style>
