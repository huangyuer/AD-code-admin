<template>
  <div class="member-company-container" v-loading="loading">
    <div class="member-company-title">会员单位</div>
    <div class="member-company-table">
      <member-table :tableData="memberInfo" @del="del"> </member-table>
      <div class="member-company-footer">
        <div class="add-btn" @click="add()">添加详情</div>
        <Pagination :total="memberTotal" :limit="memberData.limit"></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MemberTable from "./components/MemberTable";
import Pagination from "@/components/Pagination";

export default {
  name: "index",
  components: { MemberTable, Pagination },
  data() {
    return {
      memberData: {
        page: 1,
        limit: 10
      },
      memberInfo: [],
      memberTotal: 0,
      loading:true,
    };
  },
  created() {
    this.getMembers();
  },
  methods: {
    init() {},
    del(info, index) {
      this.$store.dispatch("details/delMember", info._id).then(() => {
        this.getMembers();
      });
    },
    jumpPage(val) {
      this.$set(this.memberData, page, val);
      this.getMembers();
    },
    getMembers() {
      this.$store
        .dispatch("details/getMembers", this.memberData)
        .then(() => {
          console.log("dddd", this.$store.getters.memberInfo);
          this.memberInfo = this.$store.getters.memberInfo.members;
          this.memberTotal = this.$store.getters.memberInfo.total;
          this.loading=false;
        })
        .catch(e => {
          // this.$alert(e, {
          //   confirmButtonText: "确定",
          //   center: true
          // });
          this.loading=false;
          console.log(e);
        });
    },
    add() {
      this.$router.push({ path: "/memberCompany/add" });
    }
  }
};
</script>
<style lang="less" scoped>
.member-company-container {
  .member-company-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
    padding-bottom: 30px;
    font-family: "PingFangSC-Medium";
  }
  .member-company-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:30px 0;
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
