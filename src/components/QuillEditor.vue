<template>
  <div class="edit_container">
    <choose-pic
      :centerDialogVisible="centerDialogVisible"
      v-on:hideDialog="centerDialogVisible = false"
      @imgFileList="imgFile"
      :ismultiple="true"
    ></choose-pic>
    <choose-vid
      :centerDialogVisible="visible_Vid"
      v-on:hideDialog="visible_Vid = false"
      @videoFileList="videoFile"
    ></choose-vid>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import quillConfig from "@/utils/quill-config.js";
import { imgFun, videoFun, flag } from "@/utils/quill-config.js";
import ChoosePic from "@/components/ChoosePic";
import ChooseVid from "@/components/ChooseVid";
import "quill/dist/quill.snow.css";
import * as Quill from "quill";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  // [{ 'header': 1 }, { 'header': 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  // [{ 'indent': '-1' }, { 'indent': '+1' }],
  // [{ 'direction': 'rtl' }],
  [{ size: ["small", false, "large", "huge"] }],
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  // ['clean'],
  ["image", "video"]
];
let _this = this;
let _dialogVisible = false;
let _editor;
export default {
  components: {
    quillEditor,
    ChoosePic,
    ChooseVid
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    var self = this;
    return {
      editor: null,
      text: this.img,
      content: this.value,
      // quillOption: quillConfig,
      visible_Vid: false,
      centerDialogVisible: _dialogVisible,
      editorOption: {
        modules: {
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          toolbar: {
            container: toolbarOptions,
            centerDialogVisible: false,

            handlers: {
              self: this,
              image: function() {
                self.centerDialogVisible = true;
                _editor = this;
              },
              video: function() {
                self.visible_Vid = true;
                _editor = this;
              }
            }
          }
        }
      }
    };
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  watch: {
    value: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        this.content = newV;
      },
      deep: true
    }
  },
  methods: {
    videoFile(val) {
      let quill = _editor.quill;
      // 获取光标所在位置
      let length;
      if (quill.getSelection()) {
        length = quill.getSelection().index;
      } else if (quill.selection.savedRange.index) {
        length = quill.selection.savedRange.index;
      } else {
        length = 0;
      }
      // 插入视频 res.url为服务器返回的图片地址
      val.forEach(el => {
        quill.insertEmbed(length, "video", el.httpUrl);
        // 调整光标到最后
        quill.setSelection(++length);
      });
    },
    imgFile(val) {
      let quill = _editor.quill;
      // 获取光标所在位置
      let length;
      if (quill.getSelection()) {
        length = quill.getSelection().index;
      } else if (quill.selection.savedRange.index) {
        length = quill.selection.savedRange.index;
      } else {
        length = 0;
      }
      // 插入图片  res.url为服务器返回的图片地址
      val.forEach(el => {
        quill.insertEmbed(length, "image", el.httpUrl);
        // 调整光标到最后
        quill.setSelection(++length);
      });
    },

    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {
      this.$emit("quillData", this.editor.container.innerText, this.content);
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.edit_container {
  width: 853px;
  height: 552px;
  .deActivate {
    display: none;
    // background:transparent;
  }

  .quill-editor {
    flex: 1;
    background: #fff;
    height: 100%;
    flex-direction: column;
    display: flex;
    @{aaa} .ql-container {
      height: calc(100% - 42px) !important;
    }
  }
}
</style>
