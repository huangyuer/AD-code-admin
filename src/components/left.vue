<template>
  <div class="left-container">
    <!-- <div v-for="item in routerLi" :key="item.id">{{item.title}}</div> -->
    <!-- <el-scrollbar class="pageleftscrollbar" :native="false"> -->
    <div class="nav">
      <router-link v-for="(item, key) in routerLi" :key="key" :to="item.link">{{
        item.title
      }}</router-link>
    </div>
    <!-- </el-scrollbar> -->
    <!-- <el-scrollbar class="pageleftscrollbar" :native="false">
      <el-collapse v-model="activeNames" @change="handleChange" class="left-collapse-box">
        <el-collapse-item
          v-for="(item,key) in collapseItem"
          :key="key"
          :title="item.title"
          :name="item.name"
          :class="{'left-collapse':true,'detail-icon':item.name==1,'user-icon':item.name==2,'education-icon':item.name==3}"
        >
          <div
            :class="{'left-collapse-item':true,'leftacive':curkey==key && cureq==eq}"
            v-for="(index,eq) in item.children"
            @click="routerTo(key,eq)"
            :key="eq"
          >{{index.title}}</div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>-->
  </div>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {
      routerLi: [
        { title: "文章管理", link: "/article" },
        { title: "视频管理", link: "/video" },
        { title: "视频直播", link: "/videoLive" },
        { title: "留言管理", link: "/message" },
        { title: "医院地图", link: "/hospitalMap" },
        { title: "积分商城", link: "/pointsShop" },
        { title: "积分兑换", link: "/pointsExchange" },
        { title: "积分赚取", link: "/pointsEarn" },
        { title: "用户管理", link: "/userManagement" },
        { title: "用户行为", link: "/userAction" },
        { title: "批量导出", link: "/batchExport" },
        { title: "导出记录", link: "/exportLog" },
        { title: "素材管理", link: "/material" }
      ],

     
    };
  },

};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.left-container {
  min-height: 100%;
  width: 200px;
  height: 100%;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
      width: 164px;
      height: 36px;
      line-height: 36px;

      border-radius: 30px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 4px 0;
      &:first-child {
        margin-top: 25px;
      }
      &:hover {
        background: rgba(0, 153, 102, 1);
        color: #ffffff;
      }
      &.navitemActive {
        background: rgba(0, 153, 102, 1);
        color: #ffffff;
      }

      // &.router-link-exact-active {
      //  color: red;
      //   &::after {
      //     width: 100%;
      //     bottom: 0;
      //     transform: scale(1, 1);
      //   }
      // }
    }
  }
}
</style>
