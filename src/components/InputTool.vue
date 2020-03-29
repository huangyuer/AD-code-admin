<template>
  <div class="input-container">
    <el-input v-model="input" @change="change" :disabled="disabled"></el-input>
  </div>
</template>
<script>
export default {
  name: "InputTool",
  props: {
    value: {
      type: [String,Number],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input: this.value
    };
  },
  methods: {
    change() {
      this.$emit("input", this.input);
      console.log("ppppp", this.input);
    }
  },
  watch: {
    value: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        this.input = newV;
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.input-container {
  width: 300px;
  height: 40px;
  @{aaa} .el-input__inner {
    border-radius: 4px;
    height: 100%;
    border: 1px solid rgba(229, 229, 229, 1);
  }
  @{aaa} .el-input {
    height: 100%;
  }
}
</style>
