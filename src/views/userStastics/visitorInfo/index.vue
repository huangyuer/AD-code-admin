<template>
  <div class="visitor-info-conatiner" v-loading="loading">
    <right-title :title="'访客管理'"></right-title>
    <div class="visitor-info-search">
      <link-input
        :title="'姓名：'"
        class="visitor-info-input"
        @input="input_name"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'手机号：'"
        class="visitor-info-input"
        @input="input_phone"
      >
        <div></div>
      </link-input>
      <div class="search-btn" @click="search">检索</div>
    </div>
    <visitor-table :tableData="visitorInfo"> </visitor-table>
    <Pagination
      :total="total"
      :limit="getUsers.limit"
      @currentPage="jumpPage"
      class="visitor-info-jump"
    ></Pagination>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import VisitorTable from "./components/VisitorTable";
import Pagination from "@/components/Pagination";
import LinkInput from "@/views/details/home/components/LinkInput";
export default {
  name: "index",
  components: { VisitorTable, Pagination, RightTitle, LinkInput },
  data() {
    return {
      searchName: "",
      searchPhone: Number,
      total: 0,
      visitorInfo: [],
      getUsers: {
        page: 1,
        limit: 10,
        name: String,
        phone: Number,
        memberCode: Number,
        type: "访客"
      },
      loading:true,
    };
  },
  created() {
    this.getUsersData();
  },
  methods: {
    jumpPage(val) {
      this.getUsers.page = val;
      this.getUsersData();
    },
    getUsersData() {
      this.$store
        .dispatch("user/getUsers", this.getUsers)
        .then(() => {
          console.log("dddd", this.$store.getters.userInfo.users);
          this.total = this.$store.getters.userInfo.total;
          this.visitorInfo = this.$store.getters.userInfo.users;
          this.loading=false;
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          this.loading=false;
          console.log(e);
        });
    },
    search() {
      this.getUsers.name = this.searchName;
      this.getUsers.phone = parseInt(this.searchPhone);
      this.getUsersData();
    },
    input_name(val) {
      this.searchName = val;
    },
    input_phone(val) {
      this.searchPhone = val;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.visitor-info-conatiner {
  .visitor-info-search {
    display: flex;
    padding-top: 30px;
    align-items: center;
    .visitor-info-input {
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
        border-radius: 4px;
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
  .visitor-info-jump {
    padding: 30px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
