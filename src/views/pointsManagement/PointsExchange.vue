<template>
  <div class="article" v-loading="loading">
    <right-title :title="'积分兑换'" style="margin-bottom:-15px"></right-title>
    <div class="select-container">
      <div>
        <div class="input-name">
          <span>名称：</span>
          <input-tool @input="input_title"></input-tool>
        </div>
        <div class="input-name">
          <span>姓名：</span>
          <input-tool @input="input_userName"></input-tool>
        </div>
      </div>

      <div>
        <div class="select-block">
          <span>时间段：</span>
          <el-date-picker
            style="width:220px;"
            type="daterange"
            v-model="dateValue"
            :clearable="true"
            placeholder="选择一个或多个日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator
            @change="change"
          ></el-date-picker>
        </div>
        <div class="select-block">
          <span>发货状态：</span>
          <select-tool :options="statusDate" @selectOption="selectBlock"></select-tool>
        </div>
        <div class="searchBtn-box" @click="search">检索</div>
      </div>
    </div>
    <Table :tableData="tableData" @isDel="isDel" @editInfo="editInfo"></Table>
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
import Table from "./components/exchangeTable";
import Pagination from "@/components/Pagination";
import InputTool from "@/components/InputTool";
import SelectTool from "@/components/SelectTool";
export default {
  name: "PointsExchange",
  components: { Table, Pagination, InputTool, SelectTool, RightTitle },
  data() {
    return {
      statusDate: ["已发货", "未发货"],
      tableData: [],
      total: 0,
      dateValue: [],
      params: {
        page: 1,
        limit: 10,
        startDate: "",
        endDate: "",
        userName: "",
        name: "",
        status: "",
        export: false
      },
      loading: true
    };
  },
  created() {
    this.getExgLogsAdmin();
  },
  methods: {
    exportBtn() {
      this.params.export = true;
      this.$store.dispatch("points/getExgLogsAdmin", this.params).then(res => {
          this.$message({
            type: "success",
            message: res.msg
          });
        });
    },
    editInfo(data) {
      this.getExgLogsAdmin();
    },
    change(val) {
      if(val){
        this.params.startDate = val[0];
        this.params.endDate = val[1];
      }
      
    },
    isDel(id) {
      this.getExgLogsAdmin();
    },
    addArticle() {
      this.$router.push({ path: "pointsShop/add" });
    },
    selectBlock(val) {
      this.params.status = val;
    },
    search() {
      this.params.page = 1;
      this.getExgLogsAdmin();
    },
    input_title(val) {
      this.params.name = val;
    },
    input_userName(val) {
      this.params.userName = val;
    },
    jumpPage(val) {
      this.params.page = val;
      this.getExgLogsAdmin();
    },
    getExgLogsAdmin() {
      this.params.export = false;

      this.$store
        .dispatch("points/getExgLogsAdmin", this.params)
        .then(res => {
          this.tableData = res.data.logs;
          this.total = res.data.total;
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
    height: 38px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(229, 229, 229, 1);
    line-height: 38px;
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
