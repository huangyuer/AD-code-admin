<template>
  <div class="messageCheck">
    <right-title :title="'留言管理-审核'" style="margin-bottom:-10px"></right-title>
    <span style="color:#666666;font-size:16px;cursor:pointer">
      <span :class="{active :!activeTab}" @click="selectLink(false)">未审核</span>
      <span style="color:#242424;font-size:18px">|</span>
      <span :class="{active :activeTab}" @click="selectLink(true)">已审核</span>
    </span>
    <div class="message-box">
      <div class="message-avatar">
        <img v-if="item.images.length>0" :src="item.images[0].httpUrl" alt />
        <span>
          <p>{{ item.sex }}</p>
          <p>{{ item.age }}</p>
        </span>
      </div>
      <div class="message-type">
        <div>{{ item.tag }}</div>
        <div>{{ item.level }}</div>
      </div>
      <div class="message-des">{{item.description}}</div>
      <div class="message-pic">
        <div v-for="li in item.images" :key="li.index">
          <img :src="li.httpUrl" alt />
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between; width: 1022px;margin-top: 20px;">
      <div class="message-btn">
        <div @click="upLeaveMsg('审核通过')">通过</div>
        <div @click="upLeaveMsg('驳回')">驳回</div>
      </div>
      <span style="font-size:14px;color:#009966">
        {{ckNum}}
        <span style="font-size:14px;color:#666666">/{{total}}</span>
      </span>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
export default {
  name: "MessageCheck",
  components: { RightTitle },
  data() {
    return {
      item: this.$route.params.data,
      activeTab: this.$route.params.data.status == "审核通过" ? true : false,
      type: this.$route.params.data.status,
      ckNum: 0,
      total: 0
    };
  },
  created() {
    this.$store
      .dispatch("message/getUnCheckMsg", { status: this.type })
      .then(res => {
        this.ckNum = res.ckNum;
        this.total = res.total;
      });
  },
  methods: {
    getUnCheckMsg() {
      this.$store
        .dispatch("message/getUnCheckMsg", { status: this.type })
        .then(res => {
          this.ckNum = res.ckNum;
          this.total = res.total;
          this.item = res.lvMsg;
        });
    },
    selectLink(val) {
      this.activeTab = val;
      if (val) this.type = "审核通过";
      else this.type = "待审核";
      this.getUnCheckMsg();
      console.log("------d", this.type);
    },
    upLeaveMsg(status) {
      let params = {
        id: this.item._id,
        status: status
      };
      this.$store
        .dispatch("message/upLeaveMsg", params)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
          this.getUnCheckMsg();
        })
        .catch(e => {
          // this.$message({
          //   type: "info",
          //   message: e
          // });
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.active {
  color: #009966;
  font-size: 18px;
}
.message-box {
  width: 1022px;
  height: 482px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 26px 0 60px 20px;
  box-sizing: border-box;
  margin-top: 30px;
  .message-avatar {
    display: flex;
    img {
      width: 36px;
      height: 36px;
      border-radius: 100%;
    }
    span {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-left: 10px;
    }
  }
  .message-type {
    margin-top: 8px;
    display: flex;
    div {
      min-width: 60px;
      height: 26px;
      line-height: 26px;
      padding: 0 9px;
      box-sizing: border-box;

      text-align: center;
      background: #caf6e7;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 153, 102, 1);
      margin-right: 10px;
      &:last-child {
        background: #fff0ce;
        color: #f2a900;
      }
    }
  }
  .message-des {
    width: 822px;
    margin-top: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(85, 85, 85, 1);
    text-indent: 2em;
  }
  .message-pic {
    width: 365px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 7px;
    div {
      justify-content: center;
      display: flex;
      align-items: center;
      margin-right: 15px;
      padding: 7px 0;
      img {
        height: 120px;
        width: 165px;
        object-fit: cover;
        overflow: hidden;
      }
    }
  }
}
.message-btn {
  display: flex;
  // margin-top: 20px;
  margin-bottom: 40px;
  div {
    cursor: pointer;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 153, 102, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin-right: 30px;
    &:last-child {
      background: rgba(242, 169, 0, 1);
    }
  }
}
</style>
