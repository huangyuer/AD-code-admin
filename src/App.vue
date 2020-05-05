<template>
  <div id="app">
    <Header></Header>
    <div
      v-if="this.$route.name=='Login'"
      class="app-content"
    >
      <router-view></router-view>
    </div>
    <div
      class="app-content"
      v-else
    >

        <left></left>
      <right-panel>
        <router-view :key="$route.path + $route.meta.type"></router-view>
      </right-panel>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Left from "@/components/Left";
import RightPanel from "@/components/RightPanel";
export default {
  name: "App",
  components: {
    Left,
    Header,
    RightPanel
  }
};
</script>

<style lang="less">
@import "./common/font/font.css";
@import "./common/index.less";
@aaa: ~">>>";
/* #app {
  display: flex;
} */
.pageappscrollbar {
  height: 100%;
}
html,
body {
  height: 100%;
  font-family: "PingFangSC-Regular";
  overflow: hidden;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app-content {
  display: flex;
  padding-top: 80px;
  height: calc(100% - 80px);
  > .el-scrollbar__view {
    width: 100%;
  }
}
a {
  text-decoration: none;
}



// 公共样式
    .commit-btn {
    background: #009966;
    width: 100px;
    height: 36px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    padding: 0;
    border-color: transparent;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
