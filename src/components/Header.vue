<template>
  <div class="Header">
    <div class="headerlogo">
      <img src="../assets/logo@2x.png" alt />
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.Header {
  display: flex;
  width: 100%;
  height: 80px;
  background: #009966;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  box-shadow:0px 2px 4px 0px rgba(229,229,229,0.5);
  .headerlogo {
    width: 340px;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    img {
      width: 280px;
    }
  }
}
</style>
