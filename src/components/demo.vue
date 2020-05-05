<template>
<div>


  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
 >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120"
      sortable
      prop="childMenu"
      >
      <template slot-scope="scope">{{ scope.row.childMenu }}</template>
    </el-table-column>
    <el-table-column
      prop="clickNum"
      label="姓名"
      width="120"
      sortable>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="select">选择</el-button>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          params: { page: 1, limit: 10, title: "", menu: "" },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
  created() {
    this.getArticles();
  },
    methods: {
        select(){
console.log("-------444",this.$refs.multipleTable)
        },
            getArticles() {
      this.$store
        .dispatch("article/getArticles", this.params)
        .then(data => {
          this.tableData = data.articles;
        //   this.total = data.total;
        //   this.loading = false;
        })
        .catch(e => {
        //   this.loading = false;
          reject(e);
        });
    },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortChange(val,d){
          console.log("--------1221111",val,d)

      }
    }
  }
</script>