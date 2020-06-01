<template>
  <div class="add-container">
    <right-title :title="name"></right-title>
    <div class="add-col_1">
      <div class="add-input-name">
        <span>名称：</span>
        <input-tool :value="title" @input="input_title"></input-tool>
      </div>
      <div class="add-select-block">
        <span>分类：</span>
        <el-select
          v-model="typeVal"
          placeholder="请选择"
          @change="select_type"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option v-for="item in typeData" :key="item._id" :label="item.name" :value="item"></el-option>
        </el-select>
      </div>
    </div>
    <div class="add-col_2">
      <div class="add-select-category">
        <span>库存分类：</span>
        <el-select
          v-model="stockType"
          placeholder="请选择"
          @change="select_stock"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option v-for="item in stockData" :key="item._id" :label="item.name" :value="item"></el-option>
        </el-select>
      </div>
      <div class="add-input-name" style="padding-top:20px" v-if="stockType=='有限库存'">
        <span>库存：</span>
        <input-tool :value="stockNum" @input="input_stock" style="width:180px"></input-tool>
      </div>
      <div class="add-input-name" style="padding-top:20px;padding-left:30px">
        <span>积分：</span>
        <input-tool :value="score" @input="input_score" style="width:180px"></input-tool>
      </div>
      <div style="padding-left: 30px;" v-if="typeVal=='电子书'">
        <div class="add-detail-file">
          <span style="padding-right: 10px;">附件：</span>
          <!-- :accept="'.pdf,.jpg,.png,.docx,.xlsx'" -->
          <file-upload :value="'添加附件'" @fileName="file_name" :selectFile="selectFile"></file-upload>
          <!-- <div class="add-detail-upload">
            <span>允许附件格式：pdf，jpg，png，docx，xlsx</span>
          </div>-->
        </div>
        <div class="select-file" v-if="selectFile">
          <span>{{ selectFile }}</span>
          <span @click="delFile">删除</span>
        </div>
      </div>
    </div>
    <div class="add-col_2">
      <picture-upload
        :src="coverUrl"
        :value="'封面：'"
        :valueBtn="'选取图片'"
        :tip="'建议图片尺寸150*90px'"
        @select_picture="coverFile"
      ></picture-upload>
      <picture-upload
        v-if="typeVal=='科普视频'"
        style="margin-left:55px"
        :isImg="false"
        :src="videoUrl"
        :value="'视频：'"
        :valueBtn="'选取视频'"
        @select_video="videoFile"
      ></picture-upload>
    </div>
    <div class="add-col_2" v-if="typeVal=='实体书'">
      <picture-upload
        :src="goodsUrl"
        :value="'商品图：'"
        :valueBtn="'选取图片'"
        :tip="'图片可多选，最多可上传6张'"
        @select_picture="goodsFile"
        :ismultiple="true"
        :limit="limit"
      ></picture-upload>
    </div>
    <div class="add-input-intro" v-if="typeVal=='入场券'">
      <span>入场券内容：</span>
      <input-tool :value="qtText" @input="input_qtText"></input-tool>
    </div>
    <div class="add-input-intro content">
      <span>内容:</span>

      <!-- <input-tool @input="input_content"></input-tool> -->
      <el-input
        style="width:856px;margin-top:12px"
        type="textarea"
        :autosize="{ minRows: 23}"
        placeholder="请输入商品简介…"
        v-model="introduction"
      ></el-input>
    </div>
    <div class="member-radio">
      <span>选择类型：</span>
      <div class="icon-radio" @click="importAdd">
        <img :src="importChecked" alt />上架
      </div>
      <div class="icon-radio" @click="importReduce">
        <img :src="importUnchecked" alt />下架
      </div>
    </div>
    <el-button type="primary" class="commit-btn" @click="submit">提交</el-button>
  </div>
</template>
<script>
import InputTool from '@/components/InputTool';
import SelectTool from '@/components/SelectTool';
import QuillEditor from '@/components/QuillEditor';
import RightTitle from '@/components/RightTitle';
import PictureUpload from '@/components/PictureUpload';
import FileUpload from '@/components/FileUpload';
import ChoosePic from '@/components/ChoosePic';
import radioChecked from '@/assets/icon-radio-checked.svg';
import radioUnchecked from '@/assets/icon-radio.svg';
export default {
  name: 'addGoods',
  props: {
    type: {
      default: '添加'
    }
  },
  components: {
    InputTool,
    SelectTool,
    PictureUpload,
    FileUpload,
    QuillEditor,
    RightTitle,
    ChoosePic
  },
  data() {
    return {
      attachFile: {},
      attachment: '',
      selectFile: '',
      limit: 6,
      typeData: ['实体书', '电子书', '科普视频', '入场券'],
      stockData: ['有限库存', '无限库存'],
      importChecked: radioChecked,
      importUnchecked: radioUnchecked,
      name: '',
      coverUrl: '',
      goodsUrl: [],
      videoUrl: '',
      active: true,
      title: '',
      score: '',
      typeVal: '',
      introduction: '',
      stockType: '',
      stockNum: '',
      coverImg: '',
      goodsImg: [],
      qtText: '',
      video: '',
      isDel: false
    };
  },
  watch: {
    isDel: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        if (newV) {
          this.importUnchecked = radioChecked;
          this.importChecked = radioUnchecked;
        } else {
          this.importChecked = radioChecked;
          this.importUnchecked = radioUnchecked;
        }
      },
      deep: true
    }
  },
  created() {
    this.init();
    this.name = '积分商城-' + this.type + '商品';
  },
  methods: {
    init() {},
    file_name(val, f) {
      this.selectFile = val;
      this.attachFile = f.raw;
      console.log('-----d--d-d', this.attachFile);
    },
    delFile() {
      this.selectFile = '';
      this.attachFile = {};
      this.attachment = '';
      // this.$set(this.addData, "attachFile", null);
    },
    importAdd() {
      if (this.importChecked === radioUnchecked) {
        this.importChecked = radioChecked;
        this.importUnchecked = radioUnchecked;
        this.isDel = false;
        // this.$set(this.importUserData, "type", '新增');
      }
    },
    importReduce() {
      if (this.importUnchecked === radioUnchecked) {
        this.importUnchecked = radioChecked;
        this.importChecked = radioUnchecked;
        this.isDel = true;
        // this.$set(this.importUserData, "type", '解绑');
      }
    },

    coverFile(val) {
      this.coverUrl = val.httpUrl;
      this.coverImg = val._id;
      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.coverImg = res.fileId;
      // });
    },
    goodsFile(val) {
      console.log('-----', val);
      val.forEach(el => {
        this.goodsUrl.push(el.httpUrl);
        this.goodsImg.push(el._id);
      });
      // this.goodsUrl = val.httpUrl;
      // this.goodsImg = val._id;
      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.goodsImg = res.fileId;
      // });
    },
    videoFile(val) {
      this.videoUrl = val.httpUrl;
      this.video = val._id;
      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.video = res.fileId;
      // });
    },

    select_type(val) {
      this.typeVal = val;
    },
    select_stock(val) {
      this.stockType = val;
    },
    input_title(val) {
      this.title = val;
    },
    input_stock(val) {
      this.stockNum = val;
    },
    input_score(val) {
      this.score = val;
    },
    input_qtText(val) {
      this.qtText = val;
    },

    submit() {
      if (this.stockType != '有限库存') this.stockNum = '';
      if (this.typeVal != '科普视频') this.video = '';
      if (this.typeVal != '实体书') this.goodsImg = [];
      if (this.typeVal != '入场券') this.qtText = '';
      let params = {
        name: this.title,
        score: this.score && parseInt(this.score),
        type: this.typeVal,
        introduction: this.introduction,
        stockType: this.stockType,
        // stockNum:this.stockNum&&parseInt(this.stockNum),
        // coverImg: this.coverImg,
        // goodsImg:this.goodsImg,
        // qtText:this.qtText,
        // video: this.video,
        isDel: this.isDel
      };
      if (this.stockNum)
        params.stockNum = this.stockNum && parseInt(this.stockNum);
      if (this.coverImg) params.coverImg = this.coverImg;
      if (this.goodsImg) params.goodsImg = this.goodsImg;
      if (this.qtText) params.qtText = this.qtText;
      if (this.video) params.video = this.video;
      if (this.attachment) params.attachment = this.attachment;
      if (this.type == '修改') {
        if (this.selectFile && this.attachFile.uid) {
          let info = {
            file: this.attachFile,
            group: '附件信息'
          };
          this.$store
            .dispatch('details/uploadFile', info)
            .then(data => {
              this.attachment = data.fileId;
              params.attachment = data.fileId;
              this.$emit('alterBtn', params);
            })
            .catch(e => {
              reject(e);
            });
        }

        return;
      }
      if (this.selectFile && this.attachFile.uid) {
        let info = {
          file: this.attachFile,
          group: '附件信息'
        };
        this.$store
          .dispatch('details/uploadFile', info)
          .then(data => {
            this.attachment = data.fileId;
            params.attachment = data.fileId;

            this.addGoods(params);
          })
          .catch(e => {
            reject(e);
          });
      } else this.addGoods(params);
    },
    addGoods(params) {
      this.$store
        .dispatch('points/addGoods', params)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: '确定',
            center: true
          }).then(() => {
            this.$router.push({
              path: '/pointsShop'
            });
          });
        })
        .catch(e => {
          // this.$alert(e, {
          //   confirmButtonText: "确定",
          //   center: true
          // });
          reject(e);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@aaa: ~'>>>';
.add-container {
  .member-radio {
    display: flex;
    align-items: center;
    padding-top: 13px;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .icon-radio {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      padding: 0 8px;

      img {
        width: 20px;
        height: 20px;
        padding-right: 5px;
        box-sizing: content-box;
        cursor: pointer;
      }
    }
  }
  .add-input-name,
  .add-select-block {
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      word-break: keep-all;
      padding-right: 10px;
    }
  }
  .add-col_1 {
    display: flex;
    // padding-top: 30px;

    .add-input-name {
      position: relative;
      margin-right: 55px;
      &::after {
        content: '*';
        color: #fc4b4b;
        font-size: 18px;
        position: absolute;
        right: -18px;
        top: 13px;
      }
      .input-container {
        width: 360px;
        height: 40px;
      }
    }
    // .add-select-block {
    //   position: relative;
    //   &::after {
    //     content: "*";
    //     color: #fc4b4b;
    //     font-size: 18px;
    //     position: absolute;
    //     right: -18px;
    //     top: 13px;
    //   }
    // }
  }
  .add-col_2 {
    display: flex;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-select-category {
      padding-top: 20px;
      padding-right: 30px;
    }
  }
  .add-detail-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-detail-upload {
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .add-input-intro {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      word-break: keep-all;
      padding-right: 10px;
    }
    .input-container {
      margin-top: 14px;
      width: 848px;
      height: 40px;
    }
    &.content {
      cursor: pointer;
      .active {
        color: #009966;
      }
      span {
        padding: 0;
      }
    }
  }
  // .commit-btn {
  //   background: #4373f9;
  //   width: 100px;
  //   height: 36px;
  //   border-radius: 4px;
  //   font-size: 16px;
  //   font-weight: 500;
  //   padding: 0;
  //   border-color: transparent;
  //   margin-top: 30px;
  //   margin-bottom: 30px;
  // }
  .quill-editor-container {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    span {
      margin-bottom: 14px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      word-break: keep-all;
      padding-right: 10px;
    }
  }

  .el-select {
    width: 180px;
    height: 40px;
  }
  .add-select-group > .el-select {
    width: 400px;
  }
  .add-file {
    display: flex;
    padding-top: 20px;
    align-items: center;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .add-upload {
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .select-file {
    // padding-top: 12px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      &:nth-child(2) {
        color: #009966;
        padding-left: 12px;
        cursor: pointer;
      }
    }
  }
  .picture-upload {
    .picture-upload-btn {
      display: flex;
      padding-top: 20px;
      align-items: center;
      div {
        width: 80px;
        height: 26px;
        border-radius: 6px;
        text-align: center;
        line-height: 26px;
        border: 1px solid rgba(229, 229, 229, 1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(74, 74, 74, 1);
        cursor: pointer;
        margin-right: 10px;
        margin-left: 2px;
      }
      span {
        &:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        &:nth-child(3) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    img {
      // width: 200px;
      height: 130px;
      margin-top: 14px;
    }
  }
}

//下拉框
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
      content: '';
      background-image: url('../../../assets/select-down.png');
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
      content: '\E6DB';
      transform: translate(0, 0.5px);
      //  position: absolute;
      // top: 15px;
      // right: 40px;
    }
  }
}
</style>