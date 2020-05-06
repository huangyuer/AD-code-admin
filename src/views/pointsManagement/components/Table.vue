<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" label="名称" sortable prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column prop="coverImg" label="封面">
        <template slot-scope="scope">
          <img
            style="max-width: 100px;max-height: 60px;"
            :src="scope.row.coverImg&&scope.row.coverImg[0].httpUrl"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="分类" sortable></el-table-column>
      <el-table-column prop="score" label="积分" sortable></el-table-column>
      <el-table-column min-width="100" prop="stockType" label="库存分类" sortable></el-table-column>
      <el-table-column prop="stockNum" label="库存" sortable></el-table-column>
      <el-table-column min-width="100" prop="clickNum" label="打开次数" sortable></el-table-column>
      <el-table-column min-width="100" prop="clickNum" label="兑换次数" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="display:flex">
            <div style="color: #009966;cursor: pointer;" @click="editInfo(scope.row)">修改</div>
            <p style="color: #999999;padding: 0 5px;">|</p>
            <div v-if="!scope.row.isDel" style="color: #ff2661;cursor: pointer;" @click="isDel(scope.row)">下架</div>
            <div v-else style="color: #F2A900;cursor: pointer;" @click="isDel(scope.row)">上架</div>
          </span>
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
    editInfo(data) {
      this.$router.push({
        name: "AlterGoods",
        path: "/alterGoods",
        query: { id: data._id }
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
            this.$emit("isDel")
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