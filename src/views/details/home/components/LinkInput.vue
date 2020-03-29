<template>
  <div class="link-input-container">
    <div class="link-input-title" v-html="title"></div>
    <input-tool
      class="link-input-style"
      @input="input"
      :value="value||''"
      :disabled="disabled"
    ></input-tool>
    <slot>
      <div class="link-add-btn">
        新增
      </div>
    </slot>
  </div>
</template>
<script>
import InputTool from "@/components/InputTool";
export default {
  name: "LinkInput",
  components: {
    InputTool
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itemInput:{
       type: [String,Number,Object],
      default:function () {
        
      }
    },
    type:{
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    input(val) {
      this.$emit("input", val,this.itemInput,this.type);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.link-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  .link-input-title {
    font-size: 17px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
    word-break: keep-all;
  }
  .link-input-style {
    width: 260px;
    height: 40px;
    padding: 0 18px 0 12px;
    @{aaa} .el-input__inner {
      border-radius: 0px;
      border: 1px solid rgba(229, 229, 229, 1);
      font-size: 15px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      padding: 0 8px;
    }
     @{aaa} .el-input.is-disabled .el-input__inner {
          color: rgba(153, 153, 153, 1) !important;
          background: none;
        }
  }
  .link-add-btn {
    width: 80px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(218, 228, 255, 1);
    font-size: 14px;
    font-weight: 500;
    color: rgba(67, 115, 249, 1);
    line-height: 28px;
    text-align: center;
    font-family: "PingFangSC-Medium";
  }
}
</style>
