<template>
  <div class="article-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="article-table-thead">
        <span>姓名</span>
        <span>性别</span>
        <span>年龄</span>
        <span>疾病种类</span>
        <span>疾病程度</span>
        <span>状态</span>
        <span>操作</span>
      </div>
      <div
        slot="tableBody"
        v-for="item in tableData"
        :key="item.id"
        class="article-table-content"
      >
        <span
          >{{ item.user }}</span
        >
        <span>{{ item.sex }}</span>
        <span>{{ item.age }}</span>
        <span>{{ item.tag }}</span>
        <span>{{ item.level }}</span>
        <span :class="{active1 :item.status=='驳回',active2 :item.status=='审核通过'}">{{ item.status }}</span>
        <span @click="checkInfo(item)">
          查看详情
        </span>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { parseTime } from "@/utils";

export default {
  name: "messageTable",
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
  methods: {
    editInfo(data) {
      this.$emit("editInfo", data);
    },
    del(id) {
      this.$emit("del", id);
    },
    checkInfo(item) {
      this.$router.push({
        name: "MessageCheck",
        params: {
          data: item
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.article-table {
  padding-top: 20px;
  .article-table-thead {
    display: flex;
    flex: 7;
    span {
      flex: 1 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        flex: 1 !important;
      }
      // &:nth-child(2) {
      //   flex: 0.7 !important;
      // }
      // &:nth-child(3) {
      //   flex: 0.8 !important;
      // }

      // &:last-child {
      //   flex: 0.5 !important;
      // }
    }
  }
  .article-table-content {
    display: flex;
    flex-direction: row;
    flex: 7;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    span {
      height: 80px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        flex: 1 !important;
        padding-left: 30px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
          &:nth-child(6) {
       
       &.active1{
         font-family:PingFangSC-Medium,PingFang SC;
         color: #F2A900;
       }
        &.active2{
          font-family:PingFangSC-Medium,PingFang SC;
         color: #009966;
       }
      }
      &:nth-child(7){
        font-family:PingFangSC-Medium,PingFang SC;
        cursor: pointer;
         color: #009966;
      }
      // &:nth-child(2) {
      //   flex: 0.7 !important;
      // }
      // &:nth-child(3) {
      //   flex: 0.8 !important;
      //   img {
      //     max-width: 100px;
      //     max-height: 60px;
      //   }
      // }

      // &:last-child {
      //   flex: 0.5 !important;
      //   .operate-edit {
      //     color: #009966;
      //     cursor: pointer;
      //   }
      //   .operate-del {
      //     color: #ff2661;
      //     cursor: pointer;
      //   }
      //   p {
      //     color: #999999;
      //     padding: 0 5px;
      //   }
      // }
    }
  }
}
</style>
