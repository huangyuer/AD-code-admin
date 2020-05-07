<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column prop="menu" label="板块" sortable></el-table-column>

      <el-table-column label="分类" sortable prop="childMenu" show-overflow-tooltip></el-table-column>

      <el-table-column prop="date" label="导出时间" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable></el-table-column>
      <el-table-column prop="httpUrl" label="操作">
        <template slot-scope="scope">
          <div class="download" @click="download(scope.row.httpUrl)">下载</div>
        </template>
      </el-table-column>
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
    download(url){
        window.location=url
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
  
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.download {
  width: 60px;
  height: 24px;
  background: rgba(0, 185, 139, 1);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>