<template>
  <div class="member-info-container" v-loading="loading">
    <right-title :title="'会员管理'"></right-title>
    <div class="member-info-search">
      <link-input
        :title="'姓名：'"
        class="member-info-input"
        @input="input_name"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'会员号：'"
        class="member-info-input"
        @input="input_id"
      >
        <div></div>
      </link-input>
      <div class="search-btn" @click="search">检索</div>
    </div>
    <member-table :tableData="memberInfo" @editInfo="editInfo" @del="del">
    </member-table>
    <div class="member-info-footer">
      <div class="add-btn" @click="importMember()">导入会员</div>
      <Pagination
        :total="total"
        :limit="getUsers.limit"
        @currentPage="jumpPage"
      ></Pagination>
    </div>
    <alert-pop
      @active="active"
      :editData="editData"
      :popActive="popActive"
    ></alert-pop>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import MemberTable from "./components/MemberTable";
import AlertPop from "./components/AlertPop";
import Pagination from "@/components/Pagination";
import LinkInput from "@/views/details/home/components/LinkInput";

export default {
  name: "index",
  data() {
    return {
      memberInfo: [],
      total: 0,
      getUsers: {
        page: 1,
        limit: 10,
        name: String,
        phone: Number,
        memberCode: Number,
        type: "会员"
      },
      searchName: String,
      searchId: Number,
      popActive: false,
      loading:true,
      editData: {}
    };
  },
  components: { MemberTable, Pagination, RightTitle, LinkInput, AlertPop },
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
          this.total = this.$store.getters.userInfo.total;
          this.memberInfo = this.$store.getters.userInfo.users;
          this.loading=false;
        })
        .catch(e => {
          this.loading=false;
          reject(e);
        });
    },
    importMember() {
      this.$router.push({ path: "/userStastics/importMember" });
    },
    input_name(val) {
      this.searchName = val;
    },
    input_id(val) {
      this.searchId = val;
    },
    search() {
      this.getUsers.name = this.searchName;
      this.getUsers.memberCode = parseInt(this.searchId);
      this.getUsersData();
    },
    editInfo(data) {
      this.popActive = !this.popActive;
      this.editData = Object.assign({}, data);
    },
    del(id) {
      this.$store
        .dispatch("user/delUser", id)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          });
          this.getUsersData();
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          reject(e);
        });
    },
    active(val) {
      if (val) this.getUsersData();
      this.popActive = !this.popActive;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";

.member-info-container {
  .member-info-search {
    display: flex;
    padding-top: 30px;
    align-items: center;
    .member-info-input {
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
  .member-info-footer {
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
