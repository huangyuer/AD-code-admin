<template>
  <el-select
    v-model="curValue"
    placeholder="请选择"
    :multiple="multiple"
    @change="handleChange"
    value-key="_id"
    :clearable="!multiple&&true"
    popper-class="select-active"
  >
    <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item"></el-option>
  </el-select>
</template>
<script>
export default {
  name: "Select",
  props: {
    value: {
      type: [String, Array],
      default: ""
    },
    options: {
      type: Array,
      default() {
        return {};
      }
    },
    type:{
      type:String,
      default:''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curValue: this.value
    };
  },
  // watch: {
  //   curValue:{
  //     handler(newV, oldV) { 
  //       // this.curValue = '';
  //       console.log("999999999999",newV,oldV)
  //   },deep: true},
  //    options:{
  //      handler(newV, oldV) { 
  //       this.curValue = '';
  //       console.log("888888",newV)
  //   },
  //    deep: true
  //    },
  // },
  created() {
    if (Object.prototype.toString.call(this.curValue) == "[object String]") {
      console.log("----", typeof this.curValue);
      // return this.curValue
    } else {
      let info = [];
      this.curValue.forEach(el => {
        info.push({
          name: el.group,
          _id: el.groupId
        });
      });
      this.curValue = info;
    }
  },

  methods: {
    handleChange(val) {
      console.log("=====", val);
      this.$emit("selectOption", val);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.select-active {
  .selected {
    color: #009966;
  }
}
@{aaa} .el-tag {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  background: transparent;
  border: none;
}

@{aaa} .el-select__tags > span {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@{aaa} .el-input {
  width: 100%;
  height: 100%;
  input {
    height: 100%;
    border-radius: 4px;
    width: 100%;
    border: 1px solid rgba(229, 229, 229, 1) !important;
    &::-webkit-input-placeholder {
      font-weight: 400;
      color: #666666;
      line-height: 21px;
    }
  }
  .el-icon-arrow-up {
    position: relative;
    &::before {
      content: "";
      background-image: url("../assets/select-down.png");
      position: absolute;
      width: 12px;
      height: 9px;
      top: 15px;
      right: 4px;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: rotateZ(180deg);
    }
  }
  .el-icon-circle-close {
    position: relative;
    background-color: #c0c4cc;
    right: 0px;
    top: 10px;
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 18px;
    width: 18px;
    line-height: 18px;
    vertical-align: middle;
    transform: scale(0.8);
    color: #909399;
    &:hover {
      color: white;
    }
    &::before {
      content: "\E6DB";
      transform: translate(0, 0.5px);
      //  position: absolute;
      // top: 15px;
      // right: 40px;
    }
  }
}
</style>
