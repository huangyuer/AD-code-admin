<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column width="25"></el-table-column>
      <el-table-column min-width="200" label="名称" sortable prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column min-width="400" prop="address" label="生成链接">
        <template slot-scope="scope">
          <div class="form-link-column">
            <span class="link">{{scope.row.link}}</span>
            <span class="copy-btn" @click="copyLink(scope.row.link)">复制</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column min-width="80" prop="num" label="打开次数" sortable></el-table-column>
      <el-table-column min-width="100" label="操作">
        <template slot-scope="scope">
          <span style="display: flex;">
            <div class="operate-edit" @click="editInfo(scope.row)">修改</div>
            <p>|</p>
            <div class="operate-del" @click="del(scope.row.id)">删除</div>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Clipboard from "clipboard";

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
    copyLink(data) {
      let clipboard = new Clipboard(".copy-btn", {
        text: function() {
          return data;
        }
      });
      console.log("----3-3-33", clipboard);
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          showClose: true,
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message({ message: "复制失败,", showClose: true, type: "error" });
        clipboard.destroy();
      });
    },
    editInfo(data) {
      // this.$emit("editInfo", data);
      this.$router.push({
        name: "AlterTemp",
        path: "/templatePage/alter",
        query: { id: data.id }
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
.form-link-column {
  display: flex;
  align-items: center;
  span {
    display: block;
  }
  .link {
    max-width: 600px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .copy-btn {
    color: rgb(0, 153, 102);
    padding-left: 15px;
    cursor: pointer;
  }
}
</style>
