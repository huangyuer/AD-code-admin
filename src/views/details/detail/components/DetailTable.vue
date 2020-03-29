<template>
  <div class="detail-table">
    <Table :tableData="tableData">
      <div slot="tableThead" class="detail-table-thead">
        <span>名称</span>
        <span>分类</span>
        <span>板块</span>
        <span>图片</span>
        <span>学组</span>
        <span>版权保护</span>
        <span>附件</span>
        <span>分类</span>
        <span>功能</span>
        <span>操作</span>
      </div>
      <div
        slot="tableBody"
        v-for="(item, index) in tableData"
        :key="index"
        class="detail-table-content"
      >
        <div>
          <span>{{ item.title }}</span>
        </div>
        <div>
          <span>{{ item.menu }}</span>
        </div>
        <div>
          <span>{{ item.parentMenu }}</span>
        </div>
        <div>
          <img v-if="item.headImg[0]" :src="item.headImg[0].httpUrl" alt="" />
        </div>
        <div>
          <!-- <span  class="ooo" v-for="gro in item.groups" :key="gro.id">
            {{ gro.group }}</span> -->

          <div class="group-style">
            <div v-for="(gro, i) in item.groups" :key="gro.id">
              <span v-if="isFold[index] || i < 2"> {{ gro.group }}</span>
            </div>
          </div>
          <div
            v-if="item.groups && item.groups.length > 2"
            @click="groupFold(index)"
            class="group-icon"
            :class="{ fold: isFold[index] }"
          >
            <img src="@/assets/select-down.png" alt="" />
          </div>
        </div>
        <div>
          <img v-if="item.copyright" src="@/assets/icon-yes.png" />
          <img v-else src="@/assets/icon-no.png" alt="" />
        </div>
        <div>
          <img v-if="item.attachment.length > 0" src="@/assets/icon-yes.png" />
          <img v-else src="@/assets/icon-no.png" alt="" />
        </div>

        <div>
          <span v-if="item.type === '视频'" @click="setHomeVideo(item._id)"
            >设为主页</span
          >
        </div>
        <div>
          <span @click="copyLink(item)" v-clipboard="articleLink"
            >复制链接</span
          >
        </div>

        <div>
          <span class="detail-operate-edit" @click="edit(item)">修改</span>
          <p>|</p>
          <span class="detail-operate-del" @click="del(index, item._id)">
            删除
          </span>
        </div>
      </div>
    </Table>
  </div>
</template>
<script>
import Table from "@/components/Table";

export default {
  name: "DetailTable",
  data() {
    return {
      articleLink: "",
      isFold: []
    };
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  components: { Table },
  methods: {
    groupFold(index) {
      if (this.isFold[index]) {
        // this.isFold[index]=false
        this.$set(this.isFold, index, false);
      } else {
        this.$set(this.isFold, index, true);
      }
      console.log("------", this.isFold);
    },
    getArticleLink(info) {
      this.$store
        .dispatch("details/getArticleLink", info)
        .then(data => {
          this.articleLink = this.$store.getters.articleLink.link;
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    },
    copyLink(item) {
      let info = {
        menu: item.menu,
        platform: item.platform,
        id: item._id
      };
      this.articleLink = "";
      this.getArticleLink(info);
    },
    del(index, id) {
      this.$emit("del", index, id);
    },
    edit(item) {
      this.$router.push({
        name: "AlterDetail",
        params: { alterData: item }
      });
    },
    setHomeVideo(id) {
      this.$store
        .dispatch("details/setHomeVideo", id)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
          console.log(e);
          reject(e);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.detail-table {
  padding-top: 30px;
  .detail-table-thead {
    display: flex;
    flex: 9;
    span {
      flex: 1 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 10px;
      &:nth-child(1) {
        flex: 2 !important;
      }
      &:nth-child(4) {
        flex: 1.5 !important;
      }
      &:nth-child(5) {
        flex: 3 !important;
      }
      &:nth-child(7) {
        flex: 0.7 !important;
      }
      &:nth-child(8) {
        flex: 1 !important;
      }
    }
  }
  .detail-table-content {
    display: flex;
    flex-direction: row;
    flex: 9;
    border-left: 1px solid rgba(229, 229, 229, 1);
    border-right: 1px solid rgba(229, 229, 229, 1);
    .group-style {
      overflow: auto;
      position: relative;
      width: 80%;
    }
    > div {
      height: 70px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      padding-right: 10px;
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:nth-child(1) {
        flex: 2 !important;
        padding-left: 30px;
      }
      &:nth-child(4) {
        flex: 1.5 !important;
        img {
          max-width: 100px;
          max-height: 60px;
        }
      }
      &:nth-child(5) {
        flex: 3 !important;
        display: flex;
        flex-direction: column;
        align-items: normal;
        justify-content: center;
        position: relative;

        .group-icon {
          position: absolute;
          right: 31px;
          top: 37px;
          img {
            width: 18px;
          }
        }
        .fold {
          transition: transform 0.3s;
          transform: rotate(180deg);
        }
      }
      &:nth-child(6) {
        img {
          width: 12px;
          height: 12px;
        }
      }
      &:nth-child(7) {
        flex: 0.7 !important;
        img {
          width: 12px;
          height: 12px;
        }
      }
      &:nth-child(8) {
        flex: 1 !important;
        span {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          cursor: pointer;
          white-space: inherit;
        }
      }
      &:nth-child(9) {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
        span{
         white-space: inherit;
        }
      }
      &:nth-child(10) {
        display: flex;
        flex-direction: row;
        .detail-operate-edit {
          color: #4373f9;
          cursor: pointer;
        }
        .detail-operate-del {
          color: #ff2661;
          cursor: pointer;
        }
        p {
          color: #999999;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
