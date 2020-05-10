<template>
  <div class="article">
    <right-title :title="'批量导出'"></right-title>
    <div class="select-container">
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
        ></el-date-picker>
      </div>
    </div>
    <div class="content">
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 20px 0;"></div>
        <el-checkbox-group v-model="tableValue" @change="handleCheckedChange" class="check-group">
          <el-checkbox v-for="table in tableData" :label="table" :key="table">{{table}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="member-radio">
        <span>是否包含历史：</span>
        <div class="icon-radio" @click="importAdd">
          <img :src="importChecked" alt />包含
        </div>
        <div class="icon-radio" @click="importReduce">
          <img :src="importUnchecked" alt />不包含
        </div>
      </div>
      <el-button type="primary" class="commit-btn" @click="exportBtn">一键导出</el-button>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import radioChecked from "@/assets/icon-radio-checked.svg";
import radioUnchecked from "@/assets/icon-radio.svg";
export default {
  name: "BatchExport",
  components: { RightTitle },
  data() {
    return {
      importChecked: radioChecked,
      importUnchecked: radioUnchecked,
      checkAll: false,
      isIndeterminate: false,
      dateValue: [],
      tableValue: [],
      tableData: [],
      hasOld: true
    };
  },
  created() {
    this.getExportTables();
  },
  methods: {
    importAdd() {
      if (this.importChecked === radioUnchecked) {
        this.importChecked = radioChecked;
        this.importUnchecked = radioUnchecked;
        this.hasOld = true;
      }
    },
    importReduce() {
      if (this.importUnchecked === radioUnchecked) {
        this.importUnchecked = radioChecked;
        this.importChecked = radioUnchecked;
        this.hasOld = false;
        // this.$set(this.importUserData, "type", '解绑');
      }
    },
    handleCheckAllChange(val) {
      this.tableValue = val ? this.tableData : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableData.length;
    },
    exportBtn() {
      let params = {
        tables: this.tableValue,
        hasOld: this.hasOld,
        startDate: this.dateValue[0],
        endDate: this.dateValue[1]
      };
      this.$store
        .dispatch("export/batchExport", params)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          // this.$message({
          //   type: "info",
          //   message: e
          // });
        });
    },
    getExportTables() {
      this.$store
        .dispatch("export/getExportTables")
        .then(data => {
          this.tableData = data.tables;
        })
        .catch(e => {
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.member-radio{
  margin: 35px 0 20px 0;
}
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
.content {
  background: #ffffff;
  padding: 22px 0 60px 30px;
  margin-top: 20px;
  .check-group {
    width: 755px;
    display: flex;
    flex-wrap: wrap;
    line-height: 3;
  }
}
</style>
