<template>
  <div class="check-member-container">
    <right-title :title="'会员管理-查看详情'"></right-title>
    <div class="alert-pop-content">
      <link-input
        :title="'预留&nbsp;&nbsp;姓名：'"
        class="alert-pop-input"
        :value="editData.name"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'绑&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;姓&nbsp;&nbsp;名：'"
        class="alert-pop-input"
        :value="editData.name"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：'"
        class="alert-pop-input"
        :value="editData.sex"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'会&ensp;&ensp;&nbsp;&nbsp;员&ensp;&ensp;&nbsp;&nbsp;号：'"
        class="alert-pop-input"
        :value="editData.memberCode"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'积&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分：'"
        class="alert-pop-input"
        :value="editData.totalScore"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'手&ensp;&ensp;&nbsp;&nbsp;机&ensp;&ensp;&nbsp;&nbsp;号：'"
        class="alert-pop-input"
        :value="editData.phone"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：'"
        class="alert-pop-input"
        :value="editData.email"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'职&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;务：'"
        class="alert-pop-input"
        :value="editData.position"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'科室/部门：'"
        class="alert-pop-input"
        :value="editData.department"
        :disabled="true"
      >
        <div></div>
      </link-input>
      <link-input
        :title="'所属医院/单位：'"
        class="alert-pop-input"
        :value="editData.hospital"
        :disabled="true"
      >
        <div></div>
      </link-input>
    </div>
  </div>
</template>
<script>
import RightTitle from "@/components/RightTitle";
import LinkInput from "@/views/details/home/components/LinkInput";

export default {
  name: "CheckMember",
  components: { RightTitle, LinkInput },
  data() {
    return {
      editData: this.$route.params.data
    };
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.check-member-container {
  .alert-pop-content {
    display: flex;
    flex-wrap: wrap;
    .alert-pop-input {
      margin-right: 15px;
      padding-top: 30px;
      @{aaa} .link-input-title {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      @{aaa} .link-input-style {
        width: 400px;
        height: 40px;
      }
      @{aaa} .el-input__inner {
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      @{aaa} .el-input.is-disabled .el-input__inner {
        color: rgba(102, 102, 102, 1) !important;
        background: none;
      }
    }
  }
}
</style>
