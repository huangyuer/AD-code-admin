<template>
  <el-upload
    class="picture-uploader"
    action
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-change="onchange"
    list-type="picture"
    :auto-upload="false"
  >
    <el-button size="mini" slot="trigger">{{valueBtn}}</el-button>
    <div class="picture-upload-btn">
      <span>{{value}}</span>

      <div slot="tip" class="picture-upload__tip">{{tip}}</div>
    </div>
    <img v-if="imageUrl&&isImg&&!isVideo" :src="imageUrl" class="picture-box" />
    <video
      v-if="imageUrl&&isImg&&isVideo"
      style="object-fit: cover;"
      preload="metadata"
      :src="imageUrl"
      :class="{upvideo:true,
              activeborder:true
              }"
      width="200"
      height="120"
    ></video>
  </el-upload>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    isVideo: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    valueBtn: {
      type: String,
      default: ""
    },
    tip: {
      type: String,
      default: ""
    },
    imgIndex: {
      type: Number,
      default: 0
    },
    isImg: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imageUrl: this.imgUrl
    };
  },
  watch: {
    imgUrl: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        this.imageUrl = newV;
      },
      deep: true
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      this.$emit("imgFile", file, this.imgIndex);
    }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~">>>";

.picture-uploader {
  position: relative;
  @{aaa} .el-upload {
    text-align: left;
  }

  .picture-upload-btn {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    flex-wrap: wrap;

    span {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    .picture-upload__tip {
      padding-left: 100px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      word-break: keep-all;
    }
  }

  .picture-box {
    width: 200px;
    max-height: 132px;
  }

  @{aaa} .el-button--mini {
    width: 80px;
    height: 26px;
    border-radius: 6px;
    border: 1px solid rgba(229, 229, 229, 1);
    padding: 0;
    position: absolute;
    left: 58px;
    top: 19px;

    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
    }
  }
}
</style>
