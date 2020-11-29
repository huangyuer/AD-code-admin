<template>
  <div class="add-container">
    <right-title :title="name"></right-title>
    <div class="add-col_1">
      <div class="add-input-name">
        <span>名称：</span>
        <input-tool :value="title" @input="input_title"></input-tool>
      </div>
      <div class="add-select-block">
        <span>板块/分类：</span>
        <el-select
          v-model="menuVal"
          placeholder="请选择"
          @change="select_block"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option
            v-for="item in this.$store.getters.getMenus"
            :key="item._id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </div>
       <div class="add-input-name" style="margin-left:55px">
        <span>省份/地区：</span>
        <input-tool style="width:200px" :value="province" @input="input_province"></input-tool>
      </div>
    </div>
    <div class="add-col_2 add-col_1">
      <div class="add-select-category" v-if="menuType.length>0||typeVal">
        <span>分类：</span>
        <el-select
          v-model="typeVal"
          placeholder="请选择"
          @change="select_type"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option v-for="item in menuType" :key="item._id" :label="item.name" :value="item"></el-option>
        </el-select>
      </div>
      <div class="add-select-category" v-if="menuTag.length>0||tagVal">
        <span>子分类：</span>
        <el-select
          v-model="tagVal"
          placeholder="请选择"
          @change="select_tag"
          value-key="_id"
          clearable
          popper-class="select-active"
        >
          <el-option v-for="item in menuTag" :key="item._id" :label="item.name" :value="item"></el-option>
        </el-select>
      </div>
      <div class="add-other" style="margin-top:20px">
        <span>城市：</span>
        <input-tool style="width:200px" :value="city" @input="input_city"></input-tool>
      </div>
    </div>
    <picture-upload
      :src="imgUrl"
      :value="'封面：'"
      :valueBtn="'选取图片'"
      :tip="'建议图片尺寸140*90px'"
      @select_picture="imgFile"
    ></picture-upload>
    <div class="add-input-intro" v-if="menuVal !=='关爱行动'">
      <span>简介：</span>
      <input-tool :value="intro" @input="input_intro"></input-tool>
    </div>
    <div class="add-input-intro content" v-else>
      <span>
        <span :class="{active :active}" @click="selectLink">链接</span>
        <span>|</span>
        <span :class="{active :!active}" @click="selectLink">内容</span>
      </span>
      <input-tool v-if="active" :value="link" @input="input_link"></input-tool>
      <!-- <input-tool @input="input_content" v-if="activeTab"></input-tool> -->
      <!-- <el-input
        v-else
        style="width:856px;margin-top:12px"
        type="textarea"
        :autosize="{ minRows: 23}"
        placeholder="请输入文章简介…"
        v-model="intro"
      ></el-input>-->
      <quill-editor v-else :value="contentHtml" @quillData="quillData1"></quill-editor>
    </div>
    <div class="quill-editor-container" v-if="menuVal!=='关爱行动'">
      <span>内容：</span>
      <quill-editor :value="contentHtml" @quillData="quillData"></quill-editor>
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

export default {
  name: 'AddArticle',
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
      name: '',
      imgUrl: '',
      active: true,
      title: '',
      menuVal: '',
      typeVal: '',
      tagVal: '',
      menuType: [],
      menuTag: [],
      fileId: '',
      intro: '',
      link: '',
      content: '',
      contentHtml: '',
      city:'',
      province :''
    };
  },
  created() {
    this.init();
    this.name = '文章管理-' + this.type + '详情';
  },
  methods: {
    init() {},
    selectLink() {
      this.active = !this.active;
    },
    input_link(val) {
      this.link = val;
      // this.content = val;
      // this.contentHtml = val;
    },

    imgFile(val) {
      console.log('------222', val);
      this.imgUrl = val.httpUrl;
      this.fileId = val._id;

      // this.$store.dispatch("common/uploadFile", val).then(res => {
      //   this.fileId = res.fileId;
      // });
    },
    select_type(val) {
      this.typeVal = val;
      let params = {
        menu: this.menuVal,
        type: this.typeVal
      };
      this.menuTag = [];
      if (!params.menu || !params.type) {
        this.tagVal = '';
        return;
      }
      this.$store.dispatch('common/getMenuTags', params).then(res => {
        this.menuTag = res;
        this.tagVal = '';
      });
    },
    select_block(val) {
      this.menuVal = val;
      this.menuType = [];
      if (!val) {
        this.typeVal = '';
        this.tagVal = '';
        return;
      }
      this.$store.dispatch('common/getMenuTypes', { menu: val }).then(res => {
        this.menuType = res;
        this.menuTag = [];
        this.typeVal = '';
        this.tagVal = '';
      });
    },
    select_tag(val) {},

    quillData(content, contentHtml) {
      console.log('-----quill', content, contentHtml);
      // this.link = "";
      this.content = content;
      this.contentHtml = contentHtml;
    },
    quillData1(content, contentHtml) {
      console.log('-----quill', content, contentHtml);
      // this.link = "";
      this.content = content;
      this.contentHtml = contentHtml;
    },
    input_title(val) {
      this.title = val;
    },
    input_intro(val) {
      this.intro = val;
    },
    input_province(val){
      this.province = val
    },
     input_city(val){
      this.city = val
    },
    submit() {
      let params = {
        title: this.title,
        menu: this.menuVal,
        childMenu: this.typeVal,
        tag: this.tagVal,
        coverImg: this.fileId,
        introduction: this.intro,
        content: this.content,
        contentHtml: this.contentHtml,
        link: this.link,
        province:this.province,
        city:this.city
      };
      if (this.type == '修改') {
        this.$emit('alterBtn', params);
        return;
      }
      this.$store
        .dispatch('article/addArticle', params)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: '确定',
            center: true
          }).then(() => {
            this.$router.push({
              path: '/article'
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
  .add-col_1 {
    display: flex;
    // padding-top: 30px;
    .add-input-name,
    .add-select-block,
    .add-other {
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
    .add-select-block {
      position: relative;
      &::after {
        content: '*';
        color: #fc4b4b;
        font-size: 18px;
        position: absolute;
        right: -18px;
        top: 13px;
      }
    }
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
    padding-top: 12px;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      &:nth-child(2) {
        color: #4373f9;
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

@{aaa} .el-select .el-input {
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
