<template>
  <div class="education-info-container" v-loading="loading">
    <right-title :title="'在线考核题库'"></right-title>
    <div class="education-info-search">
      <link-input
        :title="'名称：'"
        class="education-info-input"
        @input="input_name"
      >
        <div></div>
      </link-input>
      <div class="education-info-select">
        <span>学组：</span>
        <select-tool
          :options="groupInfo"
          @selectOption="selectOption"
        ></select-tool>
      </div>
      <div class="search-btn" @click="search">检索</div>
    </div>
    <education-table :tableData="questionnaires" @del="del"></education-table>
    <div class="education-info-footer">
      <div class="add-btn" @click="importQsn()">添加题库</div>
      <Pagination
        :total="total"
        :limit="questionData.limit"
        @currentPage="jumpPage"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import EducationTable from "./components/EducationTable";
import Pagination from "@/components/Pagination";
import LinkInput from "@/views/details/home/components/LinkInput";
import SelectTool from "@/components/SelectTool";
export default {
  name: "index",
  components: { EducationTable, Pagination, RightTitle, LinkInput, SelectTool },

  data() {
    return {
      groupInfo: [],
      questionnaires: [],
      questionTotal: Number,
      questionData: {
        page: 1,
        limit: 10,
        title: String,
        groupId: String
      },
      total: 0,
      searchName: "",
      loading: true,
      searchGroup: String
    };
  },
  created() {
    this.getGroups();
    this.getQuestionnaires();
  },
  methods: {
    del(index, id) {
      // this.$set(questionnaires, indexOfItem, newValue)
      this.questionnaires.splice(index, 1);
      // this.questionnaires.$delete(index)
      console.log("-----------");

      this.delQuestionnaire(id);
    },
    delQuestionnaire(id) {
      this.$store
        .dispatch("education/delQuestionnaire", id)
        .then(data => {
          console.log("dddd", data);
        })
        .catch(e => {
          // this.$alert(e, {
          //   confirmButtonText: "确定",
          //   center: true
          // });
          console.log(e);
        });
    },
    selectOption(val) {
      this.searchGroup = val._id;
      console.log("ddssssskk111111");
    },
    jumpPage(val) {
      this.questionData.page = val;
      this.getQuestionnaires();
    },
    getGroups() {
      this.$store
        .dispatch("education/getGroups")
        .then(() => {
          console.log("dddd", this.$store.getters.groupInfo);
          this.groupInfo = this.$store.getters.groupInfo;
        })
    },
    getQuestionnaires() {
      this.$store
        .dispatch("education/getQuestionnaires", this.questionData)
        .then(() => {
          this.questionnaires = this.$store.getters.questionInfo.questionnaires;
          this.total = this.$store.getters.questionInfo.total;
          this.loading = false;
        })
        .catch(e => {
          // this.$alert(e, {
          //   confirmButtonText: "确定",
          //   center: true
          // });
          this.loading = false;
          console.log(e);
        });
    },
    input_name(val) {
      this.searchName = val;
    },
    search() {
      this.questionData.title = this.searchName;
      this.questionData.groupId = this.searchGroup;
      this.loading = true;

      this.getQuestionnaires();
    },
    importQsn() {
      this.$router.push({ path: "/education/onlineExam/add" });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.education-info-container {
  .education-info-search {
    display: flex;
    padding-top: 30px;
    align-items: center;
    .education-info-input {
      &:nth-child(1) {
        margin-right: 15px;
      }
      @{aaa} .link-input-title {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      @{aaa} .link-input-style {
        width: 400px;
        height: 40px;
      }
      @{aaa} .el-input__inner {
        border-radius: 4px;
      }
    }
    .education-info-select {
      padding-right: 20px;

      span {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .el-select {
        width: 400px;
        height: 40px;
      }
    }
    .search-btn {
      min-width: 90px;
      height: 34px;
      background: rgba(249, 251, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(218, 228, 255, 1);
      line-height: 36px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(67, 115, 249, 1);
      cursor: pointer;
    }
  }
  .education-info-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    .add-btn {
      width: 100px;
      height: 36px;
      background: rgba(67, 115, 249, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
