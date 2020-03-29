<template>
  <div class='home-select-container'>
    <div class='home-select-btn' @click="unfold()">
      <div
        class='home-select-title'
      >{{title}}</div>
      <i
        class="el-icon-arrow-down"
        :class="{'el-collapse-item__arrow':isActive}"
      ></i>
    </div>

    <div
      class="home-select-content"
      :class="{active:isActive}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSelect",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    unfold() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style lang="less" scoped>

.home-select-container {
    padding-bottom: 28px;
  .home-select-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    .home-select-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(36, 36, 36, 1);
      line-height: 22px;
      padding-right: 10px;
      font-family:PingFangSC-Medium,PingFang SC;
    }
    .el-icon-arrow-down {
      transition: transform 0.3s;
      color: #999999;
    }

    .el-collapse-item__arrow {
      transition: transform 0.3s;
      transform: rotate(180deg);
    }
  }
  .home-select-content {
    display: none;
    flex-direction: row;
   flex-flow: wrap;
  }
  .active {
    display: flex;
  }
}
</style>
