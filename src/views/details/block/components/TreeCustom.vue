<template>
  <div>
<div class="item">
    <div class="bold" :class="{'item-active':true}">
      <div class="mode" :class="{'dds':itemData.level==2}">
        <span
          class="ddup"
          :class="{'dds':itemData.level==2,'ddu':index && index!=0}"
          @click="changeToggleOpen($event)"
        >
          <img class="is-active" v-if="itemData.level==1" src="@/assets/up.png" />
          <img class="is-active" v-else-if="itemData.level==2" src="@/assets/jian.png" />
        </span>
        <div class="item-name">
          <div class="edit-page">
            <div class="name-page">{{itemData.name }}</div>
            <div class="link-page">{{itemData.router}}</div>
          </div>
          <div class="edit-fuc">
            <div class="edit-fuc-edit" @click="updateMenuOpen(itemData)">修改</div>|
            <div class="edit-fuc-delete" @click="EditFucDelete(itemData)">删除</div>
          </div>
        </div>
        <div
          v-if="itemData.level==1"
          class="addChirdPlate"
          @click="addChirdPlate()"
        >添加子级</div>
      </div>
      <!-- 这个是修改level==1的addtreeform -->
      <div v-if="visibleupdate">
        <add-tree-form
          :typeAboutPlate="typeAboutPlate"
          :typePlate="itemData.level"
          :updateActive="updateActive"
          @isopenAdd="getIsOpenAdd"
          :isChirldEnd="this.itemData==dlist[dlist.length-1]?true:false"
          :formData="this.itemData"
          :groupId="itemData.groupId"
        ></add-tree-form>
      </div>
      <!-- + + + -->
      <div class="childList">
        <tree-custom
          v-for="(item,key) in itemData.slideNavData"
          :key="key"
          :item-data="item"
          :dlist="itemData.slideNavData"
        ></tree-custom>
      </div>
      <!-- 这是添加子集或修改level==2的addtreeform -->
      <div v-if="addChirldPlateAtr">
        <add-tree-form
          :typeAboutPlate="typeAboutPlate"
          :typePlate="itemData.level"
          :addChildActive="addChildActive"
          :updateActive="updateActive"
          :styleline="styleline"
          :isChirldEnd="true"
          @isopenAdd="getIsOpenAdd"
          :level="2"
          :form="this.itemData"
          :groupId="itemData.groupId"
        ></add-tree-form>
      </div>
      <!-- + + + -->
    </div>
    <div class="pos"></div>
    <div :class="{'mask':index==dlist.length-1 && itemData.level==1}"></div>
  </div>
</div>
  
<!-- </el-menu> -->
</template>

<script>
import AddTreeForm from "./AddTreeForm";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TreeCustom",
  props:{
    itemData:{
      type:Object,
      default: () => {
      return {
      };
    },
    },
    dlist:{
      type:Array,
      default: [],
    },
    index:{
      type:Number,
      default:0,
    },
    typeAboutPlate:{
      type:String,
      default:'',
    },
  },
  // props: ["itemData", "index", "dlist","key"],
  data() {
    return {
      pleft: "padding-left:0px;",
      childckey: "",
      addChirldPlateAtr: false,
      //判断是否是添加子级
      addChildActive:false,
      updateActive:false,
      type: "typeAddChirldPlate",
      //visibleupdate
      visibleupdate:false,
      //form
      //current
      currentSet:'',
      //
      styleline:false,
    };
  },
  components: {
    AddTreeForm
  },
  methods: {
    ...mapMutations(["SetIsExistPlate"]),
    addChirdPlate() {
      if (!this.$store.getters.isExistPlate) {
        this.styleline=true;
        this.updateActive = false;
        this.addChildActive=true;
        this.addChirldPlateAtr = true;
        this.$store.commit("details/SetIsExistPlate",true)
      } else {
        this.$alert("请先填写内容或先取消", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: "请先填写内容或先取消",
            });
          }
        });
      }
    },
    getIsOpenAdd(data) {
      this.addChirldPlateAtr = data;
      this.visibleupdate = data;
    },
    
    countPleft() {
      var dd = document.getElementsByClassName("item").length;
      // console.log(dd);
      if (this.itemData.slideNavData>0) {
        var height = (56 + 16) * this.itemData.slideNavData.length - 9;
        this.ll = "height:" + height + "px;";
      } else {
      }
      this.pleft = "padding-left:" + 20 + "px;";

      // this.pleft = "padding-left:"+ num*10 +"px;";
    },
    changeToggleOpen(e) {
      if(e.currentTarget.firstElementChild.classList.contains("is-active")){
        e.currentTarget.firstElementChild.classList.remove("is-active");
        e.currentTarget.parentElement.nextElementSibling.style.display="none";
      }else{
        e.currentTarget.firstElementChild.classList.add("is-active");
        e.currentTarget.parentElement.nextElementSibling.style.display="block";
      }
    },
    updateMenuOpen(item){
      if (!this.$store.getters.isExistPlate) {
        this.updateActive = true;
        this.visibleupdate=true;
        this.currentSet = item;
        this.$store.commit("details/SetIsExistPlate",true)
      } else {
        this.$alert("请先填写内容或先取消", "提示", {
          confirmButtonText: "确定",
          center:true,
        });
      }
      console.log("item===>",item);
    },
     EditFucDelete(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
          .dispatch("details/delMenu",data._id)
          .then(() => {
            this.$parent.getMenus();
          })
          .catch(e => {
            console.log(e);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(e => {
          this.$message({
            type: 'error',
            message: e
          });
        });
    },
    getMenus(){
      this.$parent.getMenus();
    }
  },
  mounted() {
    this.$store.commit("details/SetIsExistPlate",false);
    this.countPleft();
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
/* main */
.is-active{
  transform: rotate(180deg);
}
.ddup {
  transition: -webkit-transform .3s;
  -webkit-transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
  transition: transform .3s,-webkit-transform .3s;
  background: #4373f9;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  // box-sizing: border-box;
  align-items: center;
  position: relative;
  z-index: 3;
  &::before {
    // content: "";
    // position: absolute;
    // left: -20px;
    // top: 10px;
    // width: 20px;
    // border-top: 1px solid #e5e5e5;
    // height: 1px;
    // box-sizing: border-box;
    content: "";
    position: absolute;
    left: -21px;
    top: -52px;
    width: 20px;
    border-bottom: 1px solid #e5e5e5;
    height: 63px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-left: 1px solid #e5e5e5;
  }
  img {
    width: 60%;
    margin: 0 auto;
    display: block;
  }
}
.ddup.ddu::after {
  content: "";
  position: absolute;
  left: 10px;
  top: -52px;
  width: 1px;
  border-left: 1px solid #E5E5E5;
  height: 52px;
  box-sizing: border-box;
}
.ddup.update::after {
  content: "";
  position: absolute;
  left: 10px;
  top: -99px;
  width: 1px;
  border-left: 1px solid #E5E5E5;
  height: 99px;
  box-sizing: border-box;
}

.ddup.dds {
  background: #ffffff;
  border: 1px solid #4373f9;
}
.tree-list {
  // width: 200px;
  // height: 600px;
  // border: 1px solid #ccc;
}

/* item组件 */
.item {
  cursor: pointer;
  position: relative;
}
.pos {
  position: absolute;
  height: 100%;
  border-left: 1px solid #e5e5e5;
  left: 30px;
  top: 38px;
}
.mask{
  position: absolute;
&::after{
    content: '';
    position: absolute;
    left: 30px;
    top: -85px;
    width: 1px;
    height: 109px;
    background: #ffffff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
}
}
.pos.poslast {
  height: 67.5%;
}
.item-active {
  // background: #4597E0;
  // border: 1px solid #DEE1E6;
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
  height: 54px;
  width: 600px;
  display: flex;
  justify-content: space-between;
  // flex-direction: column;
  .edit-page {
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
  .edit-fuc {
    display: flex;
    width: 100px;
    float: right;
    border-left: 1px solid rgba(229, 229, 229, 0.5);
    justify-content: center;
    align-items: center;
    color: rgba(153, 153, 153, 1);
    .edit-fuc-edit {
      font-size: 14px;
      color: rgba(67, 115, 249, 1);
      padding: 5px;
    }
    .edit-fuc-delete {
      color: rgba(255, 38, 97, 1);
      font-size: 14px;
      padding: 5px;
    }
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
.addChirdPlate {
  width: 80px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(229, 229, 229, 1);
  font-size: 14px;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  line-height: 30px;
  margin-left: 20px;
}
//dialog
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
    display: flex;
    align-items: center;
    height: 40px;
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