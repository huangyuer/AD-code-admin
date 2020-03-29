<template>
  <div class="member-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="member-table-thead">
        <span>会员号</span>
        <span>预留姓名</span>
        <span>绑定姓名</span>
        <span>关联状态</span>
        <span>关联时间</span>
        <span>性别</span>
        <span>积分</span>
        <span>手机/邮箱</span>
        <span>查看</span>
        <span>操作</span>
      </div>
      <div
        slot="tableBody"
        v-for="item in tableData"
        :key="item.id"
        class="member-table-content"
      >
        <span>{{ item.memberCode }}</span>
        <span>{{ item.name}}</span>
        <span>{{ item.status=='已绑定'?item.name:'' }}</span>
        <span>{{ item.status }}</span>
        <span>
          <b style="font-weight:normal" v-if="item.status=='已绑定'">{{ item.date | formatDate }}</b>
          <b style="font-weight:normal" v-if="item.status=='未绑定'"></b>
        </span>
        <span>{{ item.sex }}</span>
        <span>{{ item.userScore[0]?item.userScore[0].totalScore:'' }}</span>
        <span>
          <div>{{ item.phone }}</div>
          <div>{{ item.email }}</div>
        </span>
        <span @click="checkInfo(item)">详情</span>
        <span>
          <div class="operate-edit" @click="editInfo(item)">修改</div>
          <p>|</p>
          <div class="operate-del" @click="del(item._id)">
            删除
          </div>
        </span>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { parseTime } from "@/utils";

export default {
  name: "MemberTable",
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    },
  },
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}.{m}.{d} {h}:{i}");
    }
  },
  components: { Table },
  methods: {
    editInfo(data) {
      this.$emit("editInfo", data);
    },
    del(id){
      this.$emit("del",id);
    },
    checkInfo(item) {
      this.$router.push({
        name: "CheckMember",
        params: {
          data: item
        }
      });
    },

  }
};
</script>
<style lang="less" scoped>
.member-table {
  padding-top: 30px;
  .member-table-thead {
    display: flex;
    flex: 9;
    span {
      flex: 0.5 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(5) {
        flex: 0.8 !important;
      }
      &:nth-child(8) {
        flex: 1 !important;
      }
      &:nth-child(9) {
        flex: 0.3 !important;
      }
      &:nth-child(10) {
        flex: 0.5 !important;
      }
    }
  }
  .member-table-content {
    display: flex;
    flex-direction: row;
    flex: 9;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    span {
      height: 70px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      flex: 0.5;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        padding-left: 30px;
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(67, 115, 249, 1);
        cursor: pointer;
      }
      &:nth-child(5) {
        flex: 0.8 !important;
      }
      &:nth-child(8) {
        flex: 1 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      &:nth-child(9) {
        flex: 0.3 !important;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(67, 115, 249, 1);
        cursor: pointer;
      }
      &:nth-child(10) {
        flex: 0.5 !important;
        .operate-edit {
          color: #4373f9;
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
      }
    }
  }
}
</style>
