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
    <el-scrollbar
        class="pageappscrollbar"
        :native="true"
      >

        <left></left>
         </el-scrollbar>
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


</style>
