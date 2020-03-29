<template>
  <div class="education-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="education-table-thead">
        <span>名称</span>
        <span>学组</span>
        <span>难度</span>
        <span>操作</span>
      </div>
      <div
        slot="tableBody"
        v-for="(item, index) in tableData"
        :key="item.id"
        class="education-table-content"
      >
        <span>{{ item.title }}</span>
        <span>
          <div class="group-style">
            <div v-for="(gro, i) in item.groups" :key="gro.id">
              <span v-if="isFold[index] || i < 2"> {{ gro.group }}</span>
            </div>
          </div>
          <div
            v-if="item.groups && item.groups.length > 2"
            @click="groupFold(index)"
            class="group-icon"
            :class="{ fold: isFold[index] }"
          >
            <img src="@/assets/select-down.png" alt="" />
          </div>
        </span>

        <span>
          <div v-for="(icon, index) in level" :key="icon.id">
            <img :src="icon" alt="" v-if="item.level - 1 >= index" />
            <img :src="levelUncheck" alt="" v-else />
          </div>
        </span>
        <span>
          <div class="education-operate-edit" @click="edit(item)">修改</div>
          <p>|</p>
          <div class="education-operate-del" @click="del(index, item._id)">
            删除
          </div>
        </span>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import IconLevel from "@/assets/icon-level.svg";
import IconLevelSelected from "@/assets/icon-level-selected.svg";
import { parseTime } from "@/utils";

export default {
  name: "VistorTable",
  data() {
    return {
      level: [
        IconLevelSelected,
        IconLevelSelected,
        IconLevelSelected,
        IconLevelSelected,
        IconLevelSelected
      ],
      levelUncheck: IconLevel,
      isFold: []
    };
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
    groupFold(index) {
      if (this.isFold[index]) {
        // this.isFold[index]=false
        this.$set(this.isFold, index, false);
      } else {
        this.$set(this.isFold, index, true);
      }
      console.log("------", this.isFold);
    },
    del(index, id) {
      this.$emit("del", index, id);
    },
    edit(item) {
      this.$router.push({
        name: "AlterEducation",
        params: { alterData: item }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.education-table {
  padding-top: 30px;
  .education-table-thead {
    display: flex;
    flex: 4;
    span {
      flex: 1 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        flex: 1.3 !important;
      }
      &:nth-child(4) {
        flex: 0.4 !important;
      }
    }
  }
  .education-table-content {
    display: flex;
    flex-direction: row;
    flex: 4;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    .group-style {
      overflow: auto;
      position: relative;
      width: 60%;
    }
    > span {
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
        flex: 1.3 !important;

        padding-left: 30px;
      }
      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: normal;
        justify-content: center;
        position: relative;
        .group-icon {
          position: absolute;
          right: 90px;
          top: 37px;
          img {
            width: 18px;
          }
        }
        .fold {
          transition: transform 0.3s;
          transform: rotate(180deg);
        }
      }
      &:nth-child(3) {
        img {
          margin-right: 6px;
          width: 16px;
          height: 15px;
        }
      }
      &:nth-child(4) {
        display: flex;
        flex-direction: row;
        flex: 0.4 !important;
        .education-operate-edit {
          color: #4373f9;
          cursor: pointer;
        }
        .education-operate-del {
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
