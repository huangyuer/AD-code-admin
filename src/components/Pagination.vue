<template>
  <div class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="prev, slot,next,jumper"
      :total="total"
    >
      <div class="pagination-container-pager">
        <div>{{currentPage}}</div>
        <div>/</div>
        <div>{{parseInt((total + limit - 1)/limit)}}</div>
      </div>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  // props: ["total","limit","currentPages"],
  props: {
    total: {
      type: Number
    },
    limit: {
      type: Number
    },
    currentPages: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("currentPage", val);
    }
  },
  watch: {
    currentPages: {
      handler(newV, oldV) {
        // do something, 可使用this
        console.log("------3333", newV);
        if (newV) {
          this.currentPage = 1;
        }
      },
      deep: true
    }
  }
};
</script>
<style lang='less' scoped>
@aaa: ~">>>";
.pagination-container {
  padding-left: 10px;
  @{aaa} .el-pagination {
    display: flex;
  }
  .pagination-container-pager {
    display: flex;
    align-items: center;
    div {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
    }

    div:first-child {
      color: #009966;
    }
  }
  @{aaa} .el-icon-arrow-left {
    position: relative;
    &::before {
      content: "";
      background-image: url("../assets/icon-pre.png");
      background-size: 100%;
      width: 22px;
      height: 22px;
      background-repeat: no-repeat;
      position: absolute;
      left: 0px;
      top: -10px;
    }
  }
  @{aaa} .btn-prev,
  @{aaa}.btn-next {
    background: transparent;
  }
  @{aaa} .el-icon-arrow-right {
    position: relative;
    &::before {
      content: "";
      background-image: url("../assets/icon-next.png");
      background-size: 100%;
      width: 22px;
      height: 22px;
      background-repeat: no-repeat;
      position: absolute;
      left: -4px;
      top: -10px;
    }
  }
  @{aaa} .el-input__inner {
    background: transparent;
  }
}
</style>
