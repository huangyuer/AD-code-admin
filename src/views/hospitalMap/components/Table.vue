<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" label="名称" sortable prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="200" prop="address" label="地址" show-overflow-tooltip sortable></el-table-column>
      <el-table-column prop="total" label="打开次数" sortable></el-table-column>
      <el-table-column prop="total" label="浏览次数" sortable></el-table-column>
            <el-table-column min-width="100" label="操作">
        <template slot-scope="scope">
          <div
            
            style="color: #009966;cursor: pointer;"
            
            @click="editInfo(scope.row)"
          >编辑详情</div>

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
  methods:{
     editInfo(data) {
      // this.$emit("editInfo", data);
      this.$router.push({
        name: "EditHospital",
        path: "/editHospital",
        query: { id: data._id }
      });
    },
  }
};
</script>