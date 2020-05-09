<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" label="名称" sortable prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column prop="score" label="积分" sortable></el-table-column>
      <el-table-column min-width="100" prop="date" label="兑换时间" sortable></el-table-column>
      <el-table-column prop="user" label="姓名" sortable></el-table-column>
      <el-table-column min-width="100" prop="phone" label="手机号" sortable></el-table-column>
      <el-table-column min-width="200" prop="address" label="收货地址" sortable show-overflow-tooltip></el-table-column>
      <el-table-column min-width="100" prop="status" label="发货状态" sortable>
        <template slot-scope="scope">
          <div v-if="scope.row.status=='已发货'" style="color: #009966">{{scope.row.status}}</div>
          <div v-if="scope.row.status=='未发货'" style="color: #F2A900">{{scope.row.status}}</div>
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="order" label="物流单号" sortable>
        <template slot-scope="scope">
          <div
            v-if="!scope.row.order&&!scope.row.show"
            style="color: #009966;cursor: pointer;"
            :class="{deactivate :scope.row.isVirtual}"
            @click="editInfo(scope.row)"
          >编辑</div>
          <el-input
             :disabled="scope.row.isVirtual"
            v-if="scope.row.show||scope.row.order"
            suffix-icon="el-icon-edit el-input__icon"
            v-model="scope.row.order"
            @change="change(scope.row)"
          ></el-input>
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
.deactivate{
    pointer-events: none;
    cursor: not-allowed!important;
}
.el-input{
    margin-left:-10px
}
@{aaa} .el-input__inner {
  border: none;
}
</style>