<template>
  <div class="index" v-loading="loading">
    <right-title :title="'医院地图'"></right-title>
    <div class="select-container">
      <div class="input-name">
        <span>名称：</span>
        <input-tool @input="input_title"></input-tool>
      </div>
      <div class="searchBtn-box" @click="search">检索</div>
      <!-- <div class="add-article" @click="importHos">导入医院</div>
      <div class="add-article" @click="importdoc">导入医生</div>-->
      <el-upload
        class="upload"
        ref="upload"
        action
        :on-change="importHos"
        :auto-upload="false"
        :show-file-list="false"
      >
        <div class="add-article">导入医院</div>
      </el-upload>
      <el-upload
        class="upload"
        ref="upload"
        action
        :on-change="importdoc"
        :auto-upload="false"
        :show-file-list="false"
      >
        <div class="add-article">导入医生</div>
      </el-upload>
    </div>
    <videoTable :tableData="tableData"></videoTable>
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
import videoTable from "./components/Table";
import Pagination from "@/components/Pagination";
import InputTool from "@/components/InputTool";
import RightTitle from "@/components/RightTitle";
export default {
  name: "HospitalMap",
  components: { videoTable, Pagination, InputTool, RightTitle },
  data() {
    return {
      tableData: [],
      total: 0,
      params: { page: 1, limit: 10, name: "",export:false },
      loading: true
    };
  },
  created() {
    this.getHospitals();
  },
  methods: {
        exportBtn() {
      this.params.export = true;
      this.$store.dispatch("hospitalMap/getHospitals", this.params);
    },
    importHos(file) {
      this.$store
        .dispatch("hospitalMap/importHospitals", file.raw)
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
        });
    },
    importdoc(file) {
      this.$store
        .dispatch("hospitalMap/importDoctors", file.raw)
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
        });
    },
    input_title(val) {
      this.params.name = val;
    },
    search() {
      this.params.page = 1;
      this.getHospitals();
    },
    getHospitals() {
      this.params.export = false;

      this.$store
        .dispatch("hospitalMap/getHospitals", this.params)
        .then(data => {
          this.tableData = data.hospitals;
          this.total = data.total;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          reject(e);
        });
    },
    jumpPage(val) {
      this.params.page = val;
      this.getHospitals();
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
  .upload {
    margin-left: 40px;
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
