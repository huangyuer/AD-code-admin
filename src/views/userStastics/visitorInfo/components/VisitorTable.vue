<template>
  <div class="visitor-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="visitor-table-thead">
        <span>姓名</span>
        <span>注册时间</span>
        <span>性别</span>
        <span>手机/邮箱</span>
      </div>
      <div
        slot="tableBody"
        v-for="item in tableData"
        :key="item.id"
        class="visitor-table-content"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.createdAt | formatDate }}</span>
        <span>{{ item.sex }}</span>
        <span>
          <div>{{ item.phone }}</div>
          <div>{{ item.email }}</div>
        </span>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { parseTime } from "@/utils";

export default {
  name: "VistorTable",
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  filters: {
    formatDate(time) {
      return parseTime(time, "{y}.{m}.{d} {h}:{i}");
    }
  },
  components: { Table },
  methods: {}
};
</script>
<style lang="less" scoped>
.visitor-table {
  padding-top: 30px;
  .visitor-table-thead {
    display: flex;
    flex: 4;
    span {
      flex: 1 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .visitor-table-content {
    display: flex;
    flex-direction: row;
    flex: 4;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    span {
      height: 70px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        padding-left: 30px;
      }

      &:nth-child(4) {
        flex: 1 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }
}
</style>
