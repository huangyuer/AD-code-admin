<template>
  <div class="left-container">
    <el-scrollbar class="pageleftscrollbar" :native="false">
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
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {

      curkey: 0,
      cureq: 0,
      activeNames: [1,2,3],
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
              this.$router.push({ path: '/userStastics/visitorInfo' });
              break;
          }
          break;
        case 3:
          switch (childrenEq + 1) {
            case 1:
              this.fucChange(parentKey, childrenEq);
              this.$router.push({ path: '/education/onlineExam' });
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
      }else if (this.$route.path.indexOf("material") != -1){
        this.fucChange(0, 4);
      }else if (this.$route.path.indexOf("home") != -1){
        this.fucChange(0, 1);
      }else if (this.$route.path.indexOf("memberCompany") !=-1){
        this.fucChange(0, 2);
      }else if (this.$route.path.indexOf("education") != -1){
        this.fucChange(2, 0);
      }else if (this.$route.path.indexOf("memberInfo") != -1){
        this.fucChange(1, 0);
      }else if (this.$route.path.indexOf("visitorInfo") != -1){
        this.fucChange(1, 1);
      }else{
        console.log("dhhuuuhhhmembercompany",this.$route.path.indexOf("memberCompany"));
      }
    },
    getPath(){
      this.init();
    }
  },
  created() {
    this.init();
  },
  watch:{
    '$route':'getPath'
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.left-container {
  min-height: 100%;
  .pageleftscrollbar {
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 15px;
    margin-top: 80px;
    transition: padding-top 0.3s;
    box-shadow: 4px -4px 4px 0.1px rgba(229, 229, 229, 0.5);
    background: #ffffff;
    z-index: 10;
  }
  @{aaa}.el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .left-collapse-box {
    display: flex;
    flex-direction: column;
    border: none;
    .left-collapse {
      position: relative;

      @{aaa} .el-collapse-item__header {
        position: relative;
        font-size: 18px;
        color: #242424;
        padding: 20px 0 10px 0;
        border: none;
        width: 141px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 59px;
        .el-collapse-item__arrow {
          margin: 0 34px 0 auto;
        }
      }

      @{aaa}.el-collapse-item__wrap {
        border: none;
      }
      @{aaa}.el-collapse-item__content {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          left: 33px;
          bottom: 0px;
          width: 141px;
          border-bottom: 1px solid #efefef;
        }
      }
      .left-collapse-item {
        font-size: 16px;
        color: #999999;
        height: 40px;
        display: flex;
        align-items: center;
        border-left: 6px solid #fff;
        padding-left: 58px;
        font-family:PingFangSC-Regular;
        cursor: pointer;
        &:hover {
          color: #4373f9;
          background: #f8faff;
          border-left: 6px solid #4373f9;
        }
        &.leftacive {
          color: #4373f9;
          background: #f8faff;
          border-left: 6px solid #4373f9;
          font-family:PingFangSC-Medium;
        }
      }
    }
    .detail-icon {
      @{aaa} .el-collapse-item__header {
        &::after {
          content: "";
          position: absolute;
          left: -33px;
          top: 32px;
          background-image: url("../assets/icon-detail.png");
          background-repeat: no-repeat;
          width: 22px;
          height: 22px;
          background-size: 100%;
        }
      }
    }
    .user-icon {
      @{aaa} .el-collapse-item__header {
        &::after {
          content: "";
          position: absolute;
          left: -33px;
          top: 32px;
          background-image: url("../assets/icon-stastic.png");
          background-repeat: no-repeat;
          width: 22px;
          height: 22px;
          background-size: 100%;
        }
      }
    }
    .education-icon {
      @{aaa} .el-collapse-item__header {
        &::after {
          content: "";
          position: absolute;
          left: -33px;
          top: 32px;
          background-image: url("../assets/icon-education.png");
          background-repeat: no-repeat;
          width: 22px;
          height: 22px;
          background-size: 100%;
        }
      }
      @{aaa}.el-collapse-item__content {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          left: 33px;
          bottom: 0px;
          width: 141px;
          border: none;
        }
      }
    }
  }
}
</style>
