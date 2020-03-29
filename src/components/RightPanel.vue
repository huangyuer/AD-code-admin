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
  width: 100%;
  height: 100%;
  padding-left: 230px;
  padding-top:30px;
  box-sizing: border-box;
  padding-right: 20px;
}
</style>
