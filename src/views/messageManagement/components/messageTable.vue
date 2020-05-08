<template>
  <div class="article-table">

        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column prop="user" label="姓名" sortable></el-table-column>

      <el-table-column label="性别" sortable prop="sex" show-overflow-tooltip></el-table-column>

      <el-table-column  prop="age" label="年龄" sortable></el-table-column>
      <el-table-column min-width="100" prop="tag" label="疾病种类" sortable></el-table-column>
      <el-table-column min-width="100" prop="level" label="疾病程度" sortable></el-table-column>
      <el-table-column min-width="100" prop="diaTime" label="审核时间" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template slot-scope="scope">
        <span :class="{active1 :scope.row.status=='驳回',active2 :scope.row.status=='审核通过'}">{{ scope.row.status }}</span>
          </template>
      </el-table-column>

      <el-table-column  label="操作">
        <template slot-scope="scope">
         <span @click="checkInfo( scope.row)" class="check">
          审核
        </span>
        </template>
      </el-table-column>
    </el-table>
  </div>

  
</template>
<script>
import Table from "@/components/Table";
import { parseTime } from "@/utils";

export default {
  name: "messageTable",
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}.{m}.{d} {h}:{i}");
    }
  },
  components: { Table },
  methods: {
    editInfo(data) {
      this.$emit("editInfo", data);
    },
    del(id) {
      this.$emit("del", id);
    },
    checkInfo(item) {
      this.$router.push({
        name: "MessageCheck",
        params: {
          data: item
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
     .active1{
         font-family:PingFangSC-Medium,PingFang SC;
         color: #F2A900;
       }
        .active2{
          font-family:PingFangSC-Medium,PingFang SC;
         color: #009966;
       }
.check{
        font-family:PingFangSC-Medium,PingFang SC;
        cursor: pointer;
         color: #009966;
      }
</style>
