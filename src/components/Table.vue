<template>
  <div class="table-container">
    <div class="table-thead">
      <slot name="tableThead">
        <span>名称</span>
        <span>图片</span>
        <span>操作</span>
      </slot>
    </div>
    <slot name="tableBody">
      <div class="table-content" v-for="item in tableData" :key="item.id">
        <div class="table-row">
          <span>
            {{ item.name }}
          </span>
        </div>
        <div class="table-row">
          <img :src="item.image" alt="" />
        </div>
        <div class="table-operate-btn table-row">
          <div class="alter-btn">修改</div>
          <div>|</div>
          <div class="del-btn">删除</div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.table-container {
  max-width: 1170px;
  display: flex;
  flex-direction: column;
  .table-thead {
    height: 60px;
    line-height: 60px;
    background: rgba(249, 251, 255, 1);
    border: 1px solid rgba(218, 228, 255, 1);
    display: flex;
    flex-direction: row;
    flex: 3;
    padding-left: 30px;

    span {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(67, 115, 249, 1);

      &:nth-child(1) {
        flex: 1.5;
      }

      &:nth-child(2) {
        flex: 1.2;
      }
      &:nth-child(3) {
        flex: 0.3;
      }
    }
  }

  .table-content {
    display: flex;
    flex-direction: row;
    flex: 3;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);

    .table-row {
      height: 80px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      &:nth-child(1) {
        padding-left: 30px;
        flex: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }

      &:nth-child(2) {
        flex: 1.2;
        img {
          max-width: 60px;
          max-height: 64px;
        }
      }
      &:nth-child(3) {
        flex: 0.3;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        cursor: pointer;
        .alter-btn {
          color: rgba(67, 115, 249, 1);
          padding-right: 5px;
        }
        .del-btn {
          color: #ff2661;
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
