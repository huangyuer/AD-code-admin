<template>
  <div class="alert-pop-container" :class="{ active: popActive }">
    <div class="alert-pop"></div>
    <div class="alert-pop-body">
      <div class="alert-pop-header">
        <span>修改用户</span>
        <img src="@/assets/icon-close.svg" alt="" @click="closePop" />
      </div>
      <div class="alert-pop-content">
        <link-input
          :title="'预留&nbsp;&nbsp;姓名：'"
          class="alert-pop-input"
          @input="reservedName"
          :value="editData.name"
          :disabled="true"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'绑&nbsp;&nbsp;&nbsp;定&nbsp;&nbsp;姓&nbsp;&nbsp;名：'"
          class="alert-pop-input"
          @input="bindName"
          :value="editData.name"
          :disabled="true"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：'"
          class="alert-pop-input"
          @input="sex"
          :value="editData.sex"
          :disabled="true"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'会&ensp;&ensp;&nbsp;&nbsp;员&ensp;&ensp;&nbsp;&nbsp;号：'"
          class="alert-pop-input"
          @input="memberCode"
          :value="editData.memberCode"
          :disabled="true"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'积&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分：'"
          class="alert-pop-input"
          @input="score"
          :value="editData.totalScore"
          :disabled="true"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'手&ensp;&ensp;&nbsp;&nbsp;机&ensp;&ensp;&nbsp;&nbsp;号：'"
          class="alert-pop-input"
          @input="phone"
          :value="editData.phone"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：'"
          class="alert-pop-input"
          @input="email"
          :value="editData.email"
        >
          <div></div>
        </link-input>
        <link-input
          :title="
            '职&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;务：'
          "
          class="alert-pop-input"
          @input="position"
          :value="editData.position"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'科室/部门：'"
          class="alert-pop-input"
          @input="department"
          :value="editData.department"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'所属医院/单位：'"
          class="alert-pop-input"
          @input="hospital"
          :value="editData.hospital"
        >
          <div></div>
        </link-input>
      </div>
      <div class="alert-pop-footer">
        <div class="alert-pop-commit" @click="commit">确定</div>
        <div class="alert-pop-cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import LinkInput from "@/views/details/home/components/LinkInput";

export default {
  name: "AlertPop",
  components: { LinkInput },
  props: {
    editData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    popActive: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log("Dddsmmm", this.editData);
  },
  data() {
    return {
      _reservedName: "",
      _bindName: "",
      _sex: "",
      _memberCode: "",
      _score: "",
      _phone: "",
      _email: "",
      _position: "",
      _department: "",
      _hospital: ""
    };
  },
  methods: {
    updateUser(data) {
      const _this = this;
      this.$store
        .dispatch("user/updateUser", data)
        .then(res => {
          _this.$emit("active", true);
        })
        .catch(e => {
          _this.$emit("active");
          reject(e);
        });
    },
    closePop() {
      this.$emit("active");
    },
    commit() {
      const data = {
        id: this.editData._id,
        department: this._department,
        position: this._position,
        hospital: this._hospital,
        phone: this._phone,
        email: this._email
      };

      this.updateUser(data);
    },
    cancel() {
      this.$emit("active");
    },
    reservedName(val) {
      this._reservedName = val;
    },
    bindName(val) {
      this._bindName = val;
    },
    sex(val) {
      this._sex = val;
    },
    memberCode(val) {
      this._memberCode = val;
    },
    score(val) {
      this._score = val;
    },
    phone(val) {
      this._phone = val;
    },
    email(val) {
      this._email = val;
    },
    position(val) {
      this._position = val;
    },
    department(val) {
      this._department = val;
    },
    hospital(val) {
      this._hospital = val;
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.alert-pop-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  display: none;

  .alert-pop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.8;
  }
  .alert-pop-body {
    width: 1118px;
    height: 475px;
    position: relative;
    background: white;
    margin-top: 110px;
    margin-left: 161px;
    border-radius: 4px;
    opacity: 1;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .alert-pop-header {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 30px;
      padding-right: 23px;
      border-bottom: 2px solid #e5e5e5;
      span {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(36, 36, 36, 1);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    .alert-pop-content {
      padding-left: 10px;
      display: flex;
      flex-wrap: wrap;
      .alert-pop-input {
        padding-left: 20px;
        padding-top: 20px;
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
          color: rgba(153, 153, 153, 1) !important;
          background: none;
        }
      }
    }
    .alert-pop-footer {
      padding-top: 30px;
      padding-left: 30px;
      display: flex;
      .alert-pop-commit {
        width: 100px;
        height: 36px;
        background: rgba(67, 115, 249, 1);
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        margin-right: 20px;
      }
      .alert-pop-cancel {
        width: 100px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid rgba(229, 229, 229, 1);
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
        line-height: 36px;
        text-align: center;
      }
    }
  }
}
.active {
  display: block;
}
</style>
