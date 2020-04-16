<template>
  <div class="messageCheck">
    <right-title :title="'留言管理-审核'"></right-title>
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
      <div class="message-des">
        2个月前出现头皮非瘙痒性皮疹，继而出现双侧眼睑及眶周水肿。非瘙痒性皮疹逐渐蔓延至全身大部分皮肤。最近
        3周，患者出现肌无力、活动后轻度肌痛以及吞咽固体食物困难。患者无其他症状。患者既往有
        50包年的吸烟史，每日饮酒 2-3次。
      </div>
      <div class="message-pic">
        <div v-for="li in item.images" :key="li.index">
          <img :src="li.httpUrl" alt />
        </div>
      </div>
    </div>
    <div class="message-btn">
      <div @click="upLeaveMsg('审核通过')">通过</div>
      <div @click="upLeaveMsg('驳回')">驳回</div>
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
      item: this.$route.params.data
    };
  },
  methods: {
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
        })
        .catch(e => {
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.message-box {
  width: 1022px;
  height: 482px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 26px 0 60px 20px;
  box-sizing: border-box;
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
      }
    }
  }
}
.message-btn {
  display: flex;
  margin-top: 20px;
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
