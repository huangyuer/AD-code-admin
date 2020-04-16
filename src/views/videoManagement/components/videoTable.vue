<template>
  <div class="article-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="article-table-thead">
        <span>名称</span>
        <span>封面</span>
        <span>分类</span>
        <span>点击次数</span>
        <span>收藏次数</span>
        <span>操作</span>
      </div>
      <div
        slot="tableBody"
        v-for="item in tableData"
        :key="item.id"
        class="article-table-content"
      >
        <span
          ><p>{{ item.title }}</p></span
        >
        <span>
          <img v-if="item.coverImg[0]" :src="item.coverImg[0].httpUrl" alt=""
        /></span>
        <span>{{ item.tag }}</span>
        <span>{{ item.clickNum }}</span>
        <span>{{ item.starNum }}</span>
        <span>
          <div class="operate-edit" @click="editInfo(item)">修改</div>
          <p>|</p>
          <div class="operate-del" @click="del(item._id)">删除</div>
        </span>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { parseTime } from "@/utils";

export default {
  name: "videoTable",
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
      // this.$emit("editInfo", data);
      this.$router.push({
        name: "AlterVideo",
        params: {
          data: data
        }
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
.article-table {
  padding-top: 20px;
  .article-table-thead {
    display: flex;
    flex: 6;
    span {
      flex: 1 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        flex: 1.5 !important;
      }

      &:nth-child(2) {
        flex: 1.2 !important;
      }

      &:last-child {
        flex: 0.5 !important;
      }
    }
  }
  .article-table-content {
    display: flex;
    flex-direction: row;
    flex: 6;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    span {
      height: 80px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      flex:1;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        flex: 1.5 !important;
        padding-left: 30px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &:nth-child(2) {
        flex: 1.2 !important;
        img {
          max-width: 100px;
          max-height: 60px;
        }
      }

      &:last-child {
        flex: 0.5 !important;
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
      }
    }
  }
}
</style>
