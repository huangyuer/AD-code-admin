<template>
  <div>
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-if="type=='医院地图'">
      <el-table-column width="25"></el-table-column>

      <el-table-column prop="user" label="姓名" sortable></el-table-column>

      <el-table-column label="板块" sortable prop="menu"></el-table-column>

      <el-table-column min-width="200" prop="name" label="名称" sortable show-overflow-tooltip></el-table-column>
      <el-table-column min-width="300" prop="address" label="地址" sortable show-overflow-tooltip></el-table-column>
    </el-table>
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-else-if="type=='评估记录'">
      <el-table-column width="25"></el-table-column>

      <el-table-column prop="user" label="姓名" sortable></el-table-column>

      <el-table-column label="板块" sortable prop="menu"></el-table-column>
      <el-table-column label="得分" sortable prop="score"></el-table-column>
      <el-table-column min-width="300" label="结论" sortable prop="conclusion"></el-table-column>
    </el-table>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-else-if="menu.indexOf('收藏')>-1||menu.indexOf('点击')>-1">
      <el-table-column width="25"></el-table-column>

      <el-table-column prop="date" label="收藏时间" sortable></el-table-column>

      <el-table-column label="名称" sortable prop="title"></el-table-column>
      <el-table-column min-width="100" label="用户" sortable prop="user"></el-table-column>
    </el-table>

    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-else>
      <el-table-column width="25"></el-table-column>

      <el-table-column prop="user" label="姓名" sortable></el-table-column>

      <el-table-column label="板块" sortable prop="menu"></el-table-column>

      <el-table-column prop="childMenu" label="分类" sortable></el-table-column>
      <el-table-column prop="name" label="名称" sortable show-overflow-tooltip></el-table-column>

      <el-table-column prop="startTime" label="开始时间" sortable></el-table-column>
      <el-table-column prop="useTime" label="查看时长" sortable></el-table-column>
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
    },
    type: {
      type: String,
      default: ""
    },
     menu: {
      type: String,
      default: ""
    },
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
          // this.$message({
          //   type: "info",
          //   message: e
          // });
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
.deactivate {
  pointer-events: none;
  cursor: not-allowed !important;
}
.el-input {
  margin-left: -10px;
}
@{aaa} .el-input__inner {
  border: none;
  padding: 0;
}
</style>