<template>
  <div class="article-table">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" prop="title" label="名称" sortable show-overflow-tooltip></el-table-column>

      <el-table-column label="分类" sortable prop="tag"></el-table-column>

      <el-table-column min-width="120" label="封面">
        <template slot-scope="scope">
          <img
            style="max-width: 100px;max-height: 60px;"
            :src="scope.row.coverImg&&scope.row.coverImg[0].httpUrl"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column min-width="100" prop="clickNum" label="打开次数" sortable></el-table-column>
      <el-table-column min-width="100" prop="lookNum" label="浏览次数" sortable></el-table-column>
      <el-table-column min-width="100" prop="starNum" label="收藏次数" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="display: flex;">
            <div class="operate-edit" @click="editInfo(scope.row)">修改</div>
            <p>|</p>
            <div class="operate-del" @click="del(scope.row._id)">删除</div>
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
  name: "videoTable",
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
      // this.$emit("editInfo", data);
      this.$router.push({
        name: "AlterVideo",
        path: "/video/alter",
        query: { id: data._id }
      });
    },
    del(id) {
      this.$emit("del", id);
    },
    checkInfo(item) {
      this.$router.push({
        name: "CheckMember",
        params: {
          data: item
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.operate-edit {
  color: #009966;
  cursor: pointer;
}
.operate-del {
  color: #ff2661;
  cursor: pointer;
}
p {
  color: #999999;
  padding: 0 5px;
}
</style>
