<template>
  <div class="item">
    <div class="bold">
      <div class="mode" :class="{'mode':true,'dds':typePlate==2 || (addChildActive && typePlate==1)}">
        <span class="duang" :class="{
        'ddup':!isChirldEnd,
        'psend':isChirldEnd && typePlate==1,
        'dep': isChirldEnd && styleline,
        'dds':typePlate==2 || (addChildActive && typePlate==1)}"
        >
          <div v-if="typePlate==1 && !addChildActive" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background:#4373f9;z-index:1;"></div>
          <img class="ddef" v-if="typePlate==1 && !addChildActive" src="@/assets/up.png" />
          <!-- <img  src="../assets/down.png" /> -->
          <img v-if="typePlate==2 || (addChildActive && typePlate==1)" src="@/assets/jian.png" />
        </span>
        <div class="item-name">
          <div class="formdisplay">
            <el-form ref="form" :model="form">
              <el-form-item label="名称" class="nameformitem">
               
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="选项" class="regionformitem">
                <!-- <select-tool
                  :options="blockOptions"
                  :value="''"
                  @selectOption="select_block"
                ></select-tool> -->
                <el-select v-model="form.region" placeholder="设置权限">
                  <el-option label="验证用户可见" value="2"></el-option>
                  <el-option label="其他" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="链接" class="linkformitem">
                <el-input v-model="form.link"></el-input>
              </el-form-item>
              <el-form-item class="Btnformitem">
                <el-button type="primary" @click="!updateActive?addMenu():updateMenu()">提交</el-button>
                <el-button @click="cancelsubmit()">取消</el-button>
              </el-form-item>
            </el-form>
            <!-- <div class="name-page">{ itemData.department_name }</div>
            <div class="link-page">{itemData.link}</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  props:{
    typeAboutPlate:{
      type:String,
      default:'',
    },
    typePlate:{
      type:Number,
      default:'',
    },
    isChirldEnd:{
      type:Boolean,
      default:false,
    },
    styleline:{
      type:Boolean,
      default:false,
    },
    level:{
      type:Number,
      default:1,
    },
    groupId:{
      type:String,
      default:'',
    },
    addChildActive:{
      type:Boolean,
      default:false,
    },
    updateActive:{
      type:Boolean,
      default:false,
    },
    formData:{
      type:Object,
      default: () => {
      return {
      };
    },
    }
  },
  data() {
    return {
      form:{
        name: Object.keys(this.formData).length==0?"":this.formData.name,
        region: Object.keys(this.formData).length==0?"":String(this.formData.role),
        link: Object.keys(this.formData).length==0?"":this.formData.router,
      },
      Isopen: false,
      blockOptions: [],
    };
  },
  computed: {
    ...mapGetters(["isExistPlate"]),
  },
  methods: {
    ...mapMutations(["SetIsExistPlate"]),
    openmedth(){
      this.Isopen = false;
      this.$emit("isopenAdd", this.Isopen);
      this.$store.commit("details/SetIsExistPlate",false);
    },
    cancelsubmit() {
      this.openmedth();
    },
    addMenu(){
        const formItem = {
          name:this.form.name,
          role:parseInt(this.form.region),
          router:this.form.link,
          level:this.level,
          groupId:this.groupId,
          type:this.typeAboutPlate
        }
        this.$store
        .dispatch("details/addMenu",formItem)
        .then((data) => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.openmedth();
          this.$parent.getMenus();
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: e,
          });
        });
    },
    updateMenu(){
      const formItem = {
          name:this.form.name,
          role:parseInt(this.form.region),
          router:this.form.link,
          id:this.formData._id,
          type:this.formData.type
        }
        this.$store
        .dispatch("details/updateMenu",formItem)
        .then((data) => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this.visibleupdate=false;
          this.openmedth();
          this.$parent.getMenus();
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: e,
          });
        });
    },
  },
  mounted(){
    console.log("updateActive",this.updateActive);
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.duang{
  background: #4373f9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  // box-sizing: border-box;
  align-items: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 10px;
    width: 20px;
    border-top: 1px solid #e5e5e5;
    height: 1px;
    box-sizing: border-box;
  }
  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: -103px;
    width: 1px;
    border-left: 1px solid #e5e5e5;
    // height: 103px;
    height: 173px;
    box-sizing: border-box;
  }
  &.dds {
    background: #ffffff;
    border: 1px solid #4373f9;
  }
  &.dds::after {
    border-left: transparent;
  }
  img {
    width: 60%;
    margin: 0 auto;
    display: block;
    position: relative;
    z-index: 2;
  }
}
//dfs
.duang.ddup {
  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: -103px;
    width: 1px;
    border-left: 1px solid #e5e5e5;
    // height: 103px;
    height: 173px;
    box-sizing: border-box;
  }
  &.dds::after {
    border-left: transparent;
  }
}
.duang.psend {
  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: -103px;
    width: 1px;
    border-left: 1px solid #e5e5e5;
    // height: 103px;
    height: 103px;
    box-sizing: border-box;
    z-index: 3;
  }
}
.duang.psend.dep {
  &::after {
    content: "";
    content: "";
    position: absolute;
    left: -21px;
    top: -94px;
    width: 1px;
    border-left: 1px solid #e5e5e5;
    height: 105px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
/* item组件 */
.item {
  cursor: pointer;
  position: relative;
}
.item-active {
  color: #cdcdcd !important;
}
.item .bold {
  // padding: 10px;
  // display: flex;
}
.item .folder {
  color: #bfbfbf;
  width: 12px !important;
  height: 12px !important;
  margin-right: 5px;
}
.mode {
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 16px;
}
.mode.dds {
  padding-left: 50px;
}
.mode .item-name {
  flex: 1;
  margin-left: 17px;
  padding-left: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  height: 138px;
  width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .name-page {
    color: #242424;
    font-size: 15px;
  }
  .link-page {
    color: #666666;
    font-size: 14px;
  }
}
.f-caret {
  font-size: 14px;
  margin-right: 6px;
  width: 6px;
  display: inline-block;
}
.ul-parent {
  position: relative;
}
.anddelete {
  position: absolute;
  width: 180px;
  height: 137px;
  left: 22px;
  background: #ffffff;
  padding: 0px !important;
  border: 0 solid #e7eaec;
  z-index: 2;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  display: none;
}
.anddelete li {
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  border-bottom: 1px solid #e7eaec;
  color: #676a6c;
}
.formdisplay {
  display: flex;
  align-items: center;
}
@{aaa} .el-input {
  // width: 200px;
}
@{aaa} .el-form-item__label {
  // text-align: left;
}
.nameformitem {
  width: 264px;
  display: inline-block;
  @{aaa} .el-form-item__label {
    width: 40px;
  }
  @{aaa}.el-form-item__content {
    margin-left: 40px;
  }
}
.regionformitem {
  width: 250px;
  display: inline-block;
  @{aaa} .el-form-item__label {
    width: 70px;
  }
  @{aaa}.el-form-item__content {
    margin-left: 70px;
    // display: flex;
    // align-items: center;
    height: 40px;
  }
  
}
@{aaa} .el-input{ 
  i {
    position: relative;
    &::before {
      content: "";
      background-image: url("../../../../assets/select-down.png");
      position: absolute;
      width: 12px;
      height: 9px;
      top: 10px;
      right: 4px;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: rotateZ(180deg);
    }
  }
  }
@{aaa}.el-input__inner {
  height: 30px;
}
@{aaa} .el-form-item {
  margin-bottom: 5px;
}
@{aaa}.el-form-item__content {
  line-height: initial;
}
@{aaa}.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background: #4373f9;
  border-color: #4373f9;
  color: #fff;
}
.Btnformitem {
  .el-button {
    padding: 5px 20px;
  }
}
.linkformitem {
  width: 550px;
  @{aaa} .el-form-item__label {
    width: 40px;
  }
  @{aaa}.el-form-item__content {
    margin-left: 40px;
  }
}
</style>
