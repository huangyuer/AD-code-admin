<template>
  <div class='title'>
    {{title}}
  </div>
</template>
<script>
export default {
  name: "Title",
  props: ["title"],
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(36, 36, 36, 1);
}
</style>
