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


   
        { title: "素材管理", link: "/media" }
      ],

      curkey: 0,
      cureq: 0,
      activeNames: [1, 2, 3],
      collapseItem: [
        {
          title: "详情管理",
          name: 1,
          children: [
            { title: "板块管理" },
            { title: "功能管理" },
            { title: "会员单位" },
            { title: "详情管理" },
            { title: "素材管理" }
          ]
        },
        {
          title: "用户统计",
          name: 2,
          children: [{ title: "会员管理" }, { title: "访客管理" }]
        },
        {
          title: "继续教育",
          name: 3,
          children: [{ title: "在线考核题库" }]
        }
      ]
    };
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },
    fucChange(key, eq) {
      this.curkey = key;
      this.cureq = eq;
    },
    routerTo(parentKey, childrenEq) {
      switch (parentKey + 1) {
        case 1:
          switch (childrenEq + 1) {
            case 1:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/block/officialMic" });
              break;
            case 2:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/home" });
              break;
            case 3:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/memberCompany" });
              break;
            case 4:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/weiDetail" });
              break;
            case 5:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/material/materialPic" });
              break;
          }
          break;
        case 2:
          switch (childrenEq + 1) {
            case 1:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/userStastics/memberInfo" });
              break;
            case 2:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/userStastics/visitorInfo" });
              break;
          }
          break;
        case 3:
          switch (childrenEq + 1) {
            case 1:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: "/education/onlineExam" });
              break;
          }
          break;
      }
    },
    init() {
      if (this.$route.path.indexOf("block") != -1) {
        this.fucChange(0, 0);
      } else if (this.$route.path.indexOf("weiDetail") != -1) {
        this.fucChange(0, 3);
      } else if (this.$route.path.indexOf("material") != -1) {
        this.fucChange(0, 4);
      } else if (this.$route.path.indexOf("home") != -1) {
        this.fucChange(0, 1);
      } else if (this.$route.path.indexOf("memberCompany") != -1) {
        this.fucChange(0, 2);
      } else if (this.$route.path.indexOf("education") != -1) {
        this.fucChange(2, 0);
      } else if (this.$route.path.indexOf("memberInfo") != -1) {
        this.fucChange(1, 0);
      } else if (this.$route.path.indexOf("visitorInfo") != -1) {
        this.fucChange(1, 1);
      } else {
        console.log(
          "dhhuuuhhhmembercompany",
          this.$route.path.indexOf("memberCompany")
        );
      }
    },
    getPath() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route: "getPath"
  }
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
