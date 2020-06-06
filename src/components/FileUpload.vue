<template>
  <el-upload
    class="upload-file"
    ref="upload"
    action=""
    :on-change="handleChange"
    :auto-upload="false"
    :accept="''"
    :show-file-list="false"
    :disabled="disabled"
  >
    <!-- :file-list="fileList" -->
    <!-- :on-preview="handlePreview"
    :on-remove="handleRemove" -->
    <!-- :http-request="handleRequest" -->
    <div slot="trigger" class="upload-btn" :class="{ disabled: disabled }">
      {{value}}
    </div>
    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
    <!-- <div slot="tip" class="upload-tip">
      <span>
        下载模版：
      </span>
      <span>{{ fileName }}</span>
    </div> -->
  </el-upload>
</template>
<script>
export default {
  name: "FileUpload",
  props: {
    selectFile: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    accept:{
      type:String,
      default:'.xlsx,.xls'
    },
    value:{
      type:String,
      default:'选取文件'
    }
  },
  data() {
    return {
      fileName: ""
      //   fileList: [
      //     // {
      //     //   name: "food.xlsx",
      //     //   url:
      //     //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      //     // },
      //   ]
    };
  },
  methods: {
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    handleChange(file) {
      this.fileName = file.name;
      console.log("----------handleChange", file, this.form);
      this.$emit("fileName", file.name, file);
    }
    //  handleRequest(param) {
    //      console.log("pppp------------",param)
    //       let fileObj = param.file;
    //       // FormData 对象
    //       let form = new FormData();
    //       // 文件对象
    //       form.append("file", fileObj);
    //       form.append('title','下一站')
    //       form.append('groupId', '5e3bc97c31ee6277242e43e9')
    //       form.append('level', 3)
    //     //    form.append("file", fileObj);
    //     //   form.append('id', param.data.featid || param.data.XM_GUID)

    //             let addGroup= {
    //         title: 'this.resourceId',
    //         level: 3,
    //         file: fileObj,
    //         group: '特应性皮炎康复学组',
    //         groupId:'5e3bc97c31ee6277242e43e9',
    //         id:param.uid,

    //       };
    //       let self = this
    //  this.$store
    //       .dispatch("education/addQuestionnaire",form)
    //       .then((data) => {
    //           console.log("dddd",data);
    //       })
    //       .catch(e => {
    //         // this.$alert(e, {
    //         //   confirmButtonText: "确定",
    //         //   center: true
    //         // });
    //         console.log(e);
    //       });
    //     },
  },
  watch: {
    selectFile: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        if (!newV) {
          this.$refs.upload.clearFiles();
          this.$refs.upload.uploadFiles.length = 0;
          console.log("----删除", this.$refs.upload);
          //   this.$emit("fileName",new String,new File);
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.upload-file {
  display: flex;
  align-items: center;
  .upload-btn {
    width: 80px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid rgba(229, 229, 229, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    margin-right: 20px;
  }
  .disabled {
    cursor: not-allowed;
  }

  //   .upload-tip {
  //       display:flex;
  //     span {
  //       font-size: 14px;
  //       font-family: PingFangSC-Regular;
  //       font-weight: 400;
  //       color: rgba(51, 51, 51, 1);
  //       &:nth-child(2) {
  //         color: #4373f9;
  //       }
  //     }
  //   }
}
</style>
