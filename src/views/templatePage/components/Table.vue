<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" label="名称" sortable prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column  min-width="400" prop="address" label="生成链接" >
           <template slot-scope="scope">
               <span>{{scope.row.address}}</span><span>复制</span>
               </template>
      </el-table-column>
            <el-table-column min-width="100" label="操作">
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
        path: "/hospitalMap/edit",
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
