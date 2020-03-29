<template>
  <div class="temp-member-container">
    <right-title :title="title"></right-title>
    <div class="temp-member-content">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="temp-member-list"
      >
        <picture-upload
          :value="'图片：'"
          :valueBtn="'选取图片'"
          :tip="'图片建议尺寸582*486px'"
          :itemPic="index"
          @select_picture="imgFile"
          :src="item.httpUrl"
        ></picture-upload>
        <link-input
          :title="'名称：'"
          class="temp-member-item"
          :value="item.name"
          :itemInput="index"
          @input="input_name"
        >
          <div
            v-show="title === '会员单位-添加详情'"
            class="temp-member-btn"
            v-if="index === list.length - 1"
            @click="add()"
          >
            新增
          </div>
          <div class="temp-member-btn" v-else @click="remove(index)">删除</div>
        </link-input>
      </div>
    </div>
    <div class="temp-member-commit" @click="commit">提交</div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import PictureUpload from "@/components/PictureUploads";
import LinkInput from "@/views/details/home/components/LinkInput";
export default {
  name: "TempMember",
  props: {
    title: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {};
  },
  components: {
    RightTitle,
    PictureUpload,
    LinkInput
  },
  methods: {
    add() {
      this.$emit("add");
    },
    remove(i) {
      this.$emit("remove", i);
    },
    imgFile(file, index) {
      this.$emit("imgFile", file, index);
    },
    input_name(val, index) {
      this.$emit("input_name", val, index);
    },
    commit() {
      this.$emit("commit");
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.temp-member-container {
  .temp-member-content {
    display: flex;
    flex-wrap: wrap;
    .temp-member-list {
      padding-right: 77px;
      @media screen and (max-width: 1440px) {
        padding-right: 60px;
      }
      @{aaa} .el-button--mini {
        left: 55px;
      }
      .temp-member-item {
        padding-top: 10px;
        @media screen and (max-width: 1440px) {
          @{aaa} .input-container {
            width: 200px;
          }
        }
      }
      .temp-member-btn {
        font-size: 14px;
        font-family: "PingFangSC-Medium";
        font-weight: 500;
        color: rgba(67, 115, 249, 1);
        cursor: pointer;
      }
    }
  }
  .temp-member-commit {
    width: 100px;
    height: 36px;
    background: rgba(67, 115, 249, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
    text-align: center;
    margin: 30px 0;
    cursor: pointer;
  }
}
</style>
