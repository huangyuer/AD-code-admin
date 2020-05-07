<template>
  <div>
    <div class="navList">
      <router-link class="navitem" v-for="(item,key) in navlist" :key="key" :to="item.link" exact>
        {{item.title}}
        <b class="navitem-b" v-if="key!=(navlist.length-1)"></b>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: ["navlist"],
  methods: {
    navItemLink(key) {
      this.navlistcurrent = key;
      this.$router.push({ path: this.navlist[key].link });
    }
  }
};
</script>

<style lang="less" scoped>
.navList {
  margin: 30px 0;
  .navitem {
    font-size: 16px;
    color: #999999;
    cursor: pointer;
    &.navitemActive {
      color: #009966;
    }
    .navitem-b {
      display: inline-block;
      width: 1px;
      height: 14px;
      border-left: 1px solid #999999;
      margin: 0 10px;
    }
  }
}
</style>
