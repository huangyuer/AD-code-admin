<template>
  <div class="detail-container" v-loading="loading">
    <div class="detail-container-title">详情管理</div>
    <nav-item :navlist="navlist"></nav-item>
    <div class="detail-select-container">
      <div class="detail-input-name">
        <span>名称：</span>
        <input-tool @input="input_title"></input-tool>
      </div>
      <div class="detail-select-block">
        <span>板块/分类：</span>
        <select-tool
          :options="blockOptions"
          @selectOption="selectBlock"
        ></select-tool>
      </div>
      <div class="detail-select-copyright">
        <span>版权保护：</span>
        <select-tool
          :options="copyrightOptions"
          @selectOption="selectCopyright"
        ></select-tool>
      </div>
      <div class="detail-searchBtn-box" @click="search">
        检索
      </div>
    </div>
    <detail-table :tableData="tableData" @edit="edit" @del="del"></detail-table>
    <div class="detail-pagination-container">
      <el-button type="primary" @click="addDetail()">添加详情</el-button>
      <div class="detail-pagination-box">
        <div>
          文章总数量
          <span>{{ tableTotal }}</span
          >篇
        </div>
        <Pagination
          :total="tableTotal"
          :limit="articlesData.limit"
          @currentPage="jumpPage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import NavItem from "@/components/NavItem";
import DetailTable from "./components/DetailTable";
import InputTool from "@/components/InputTool";
import SelectTool from "@/components/SelectTool";
import Pagination from "@/components/Pagination";
export default {
  name: "index",
  components: { NavItem, DetailTable, InputTool, SelectTool, Pagination },
  data() {
    return {
      loading:true,
      input: "",
      platform: this.$route.meta.type,
      articlesData: {
        page: 1,
        limit: 10,
        title: "",
        menu: "",
        copyright: "",
        platform: this.$route.meta.type
      },
      navlist: [
        {
          title: "官微详情",
          link: "/weiDetail"
        },
        {
          title: "官网详情",
          link: "/detail"
        }
      ],
      blockOptions: [],
      copyrightOptions: [
        {
          name: "有",
          _id: "有"
        },
        {
          name: "无",
          _id: "无"
        }
      ],
      tableData: [],
      tableTotal: 0
    };
  },
  activated: function() {
　　　console.log("----ss")
　　},
  created() {
    this.getArticles();
    this.getMenuSelect();
  },
  methods: {
    search() {
      this.getArticles();
    },
    input_title(val) {
      this.$set(this.articlesData, "title", val);
    },
    selectBlock(val) {
      this.$set(this.articlesData, "menu", val);
    },
    selectCopyright(val) {
      this.$set(this.articlesData, "copyright", val.name);
    },
    jumpPage(val) {
      this.articlesData.page = val;
      this.getArticles();
    },
    getMenuSelect() {
      this.$store
        .dispatch("details/getMenuSelect", this.platform)
        .then(data => {
          this.blockOptions = this.$store.getters.menuSelect;
        });
    },
    getArticles() {
      this.$store
        .dispatch("details/getArticles", this.articlesData)
        .then(data => {
          this.tableData = this.$store.getters.articlesInfo.articles;
          this.tableTotal = this.$store.getters.articlesInfo.total;
          this.loading=false;
        })
        .catch(e => {
          this.loading=false;
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    },
    addDetail() {
      this.$router.push({ path: "/detail/add",name: "AddDetail", params: { platform: this.platform }});
    },
    edit(data) {
      console.log("-----11", data);
    },
    del(index, id) {
      const _this=this
      this.tableData.splice(index,1)
      this.$store
        .dispatch("details/delArticle", id)
        .then(data => {
          this.getArticles()
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
        });
      console.log("-----22",index,id);

    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.detail-container {
  .detail-container-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
  }
  .detail-select-container {
    display: flex;
    align-items: center;
    .detail-input-name,
    .detail-select-block,
    .detail-select-copyright {
      word-break: keep-all;
      display: flex;
      align-items: center;
      padding-right: 20px;
      span {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .el-select {
        width: 180px;
        height: 40px;
      }
    }

    .detail-searchBtn-box {
      width: 88px;
      min-width: 88px;
      height: 34px;
      background: rgba(249, 251, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(218, 228, 255, 1);
      line-height: 36px;
      text-align: center;
      font-weight: 500;
      color: rgba(67, 115, 249, 1);
      cursor: pointer;
    }
  }
  .detail-pagination-container {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 40px;
    @{aaa} .el-button--primary {
      background: #4373f9;
      width: 100px;
      height: 36px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      padding: 0;
      border-color: transparent;
    }
    .detail-pagination-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      span {
        color: #4373f9;
      }
    }
  }
}
</style>
