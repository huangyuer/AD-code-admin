<template>
  <div class="Treeover" v-loading='loading'>
    <div style="position: relative;z-index: 4;">
      <el-button type="primary">官微板块</el-button>
    </div>
    <div class="Tree-tip">
      <ul class="tree-list">
        <tree-custom
          v-for="(item,index) in dlist"
          :key="index"
          :index="index"
          :dlist="dlist"
          :item-data="item"
          :typeAboutPlate="typeAboutPlate"
        ></tree-custom>
        <div v-if="addparentplateAtr">
          <add-tree-form :typePlate="type"
          :isChirldEnd="true"
          :typeAboutPlate="typeAboutPlate"
          :updateActive="updateActive"
          :level="1" 
          @isopenAdd="getIsOpenAdd"></add-tree-form>
        </div>
      </ul>
    </div>
    <div>
      <el-button type="primary" @click="addParentPlate()">添加板块</el-button>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import TreeCustom from "./TreeCustom";
import AddTreeForm from "./AddTreeForm";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "OfficialWeb",
  data() {
    return {
      typeAboutPlate:'官微',
      dlist:[],
      departmentId: "",
      addparentplateAtr: false,
      type: 1,
      updateActive:false,
      form: {
        name: "",
        region: "",
        link: ""
      },
      loading:false,
    };
  },
  components: {
    TreeCustom,
    AddTreeForm
  },
  computed: {
  },
  methods: {
    addParentPlate() {
      console.log("this.$store.getters.isExistPlate",this.$store.getters.isExistPlate);
      if (!this.$store.getters.isExistPlate) {
        this.updateActive = false,
        this.addparentplateAtr = true;
        this.$store.commit("details/SetIsExistPlate",true)
      } else {
        this.$alert("请先填写内容或先取消", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: '请先填写内容或先取消'
            });
          }
        });
      }
    },
    getIsOpenAdd(data) {
      this.addparentplateAtr = data;
    },
    getMenus(){
      this.loading = true;
      const type=this.typeAboutPlate;
        this.$store
        .dispatch("details/getMenus",type)
        .then(() => {
          this.dlist = this.$store.getters.getmenus.menus;
          this.loading=false;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted(){
    this.getMenus();
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
@{aaa}.Treeover {
  padding-left: 30px;
}
.Tree-tip {
  min-height: 600px;
  width: 1000px;
  border-left: 1px solid #e5e5e5;
  margin: 0px 0 0px 45px;
}
@{aaa}.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background: #4373f9;
  border-color: #4373f9;
  color: #fff;
}
