<template>
  <div>
    <div class="right-material">
      <div class="block-container-title">素材管理</div>
      <nav-item :navlist="navlist"></nav-item>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavItem from "@/components/NavItem";
import MaterialPic from "./components/MaterialPic";
import MaterialVid from "./components/MaterialVid";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "material",
  data() {
    return {
    navlist: [
        {
          title: "图片",
          link: "/material/materialPic"
        },
        {
          title: "视频",
          link: "/material/materialVid"
        }
      ],
    //   departmentId: "",
    //   addparentplateAtr: false,
    //   type: "typeAddParentPlate",
    //   form: {
    //     name: "",
    //     region: "",
    //     link: ""
    //   }
    };
  },
  components: {
    NavItem,
    // TreeCustom,
    // AddTreeForm
  },
  computed: {
    ...mapGetters(["isExistPlate"])
  },
  methods: {
    ...mapMutations(["SetIsExistPlate"]),
    // addParentPlate() {
    //   if (!this.isExistPlate) {
    //     this.addparentplateAtr = true;
    //     this.SetIsExistPlate(true);
    //   } else {
    //     this.$alert("请先填写内容或先取消", "提示", {
    //       confirmButtonText: "确定",
    //       callback: action => {
    //         this.$message({
    //           type: "info",
    //           message: `action: ${action}`
    //         });
    //       }
    //     });
    //   }
    // },
    // getIsOpenAdd(data) {
    //   this.addparentplateAtr = data;
    // }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";
.right-material {
  .block-container-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
  }
}
// @{aaa}.Tree-tip {
//   min-height: 100px;
//   width: 1000px;
//   border-left: 1px solid #e5e5e5;
//   margin: 0px 0 0px 45px;
//   padding: 30px 0;
// }
// @{aaa}.el-button--primary,
// .el-button--primary:focus,
// .el-button--primary:hover {
//   background: #4373f9;
//   border-color: #4373f9;
//   color: #fff;
// }
</style>
