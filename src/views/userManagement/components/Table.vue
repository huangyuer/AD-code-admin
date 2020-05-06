<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>

      <el-table-column  label="性别" sortable prop="sex"></el-table-column>

      <el-table-column prop="birthday" label="出生年月" sortable></el-table-column>
      <el-table-column  prop="city" label="所在地区" sortable>
            <template slot-scope="scope">
        
          <div>{{scope.row.province}}{{scope.row.city}}</div>
        </template>
      </el-table-column>
      <el-table-column  prop="disease" label="疾病种类" sortable></el-table-column>
      <el-table-column  prop="diaTime" label="确诊年份" sortable></el-table-column>
      <el-table-column  prop="medications" label="用药历史" sortable></el-table-column>
      <el-table-column  prop="level" label="疾病程度" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    editInfo(data) {
      this.$set(data, "show", true);
    },
    change(data) {
      this.$store
        .dispatch("points/upExgOrder", { id: data.id, order: data.order })
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
          this.$emit("editInfo");
        })
        .catch(e => {
          this.$message({
            type: "info",
            message: e
          });
        });
    },
    isDel(data) {
      //  data.id=data._id;
      //  delete data._id
      let _this = this;
      let params = {
        id: data._id,
        isDel: !data.isDel
      };
      this.$confirm("确认修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          _this.$store.dispatch("points/upGoods", params).then(data => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$emit("isDel");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.deactivate{
    pointer-events: none;
    cursor: not-allowed!important;
}
.el-input{
    margin-left:-10px
}
@{aaa} .el-input__inner {
  border: none;
  padding: 0;
}
</style>