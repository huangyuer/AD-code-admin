<template>
  <div class="RightPanel">
    <slot />
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.RightPanel {
  flex: 1;
  height: 100%;
  background: #F7F7F7;
  padding-left: 20px;
  padding-top:30px;
  box-sizing: border-box;
  padding-right: 20px;
  overflow: auto;
}
</style>
