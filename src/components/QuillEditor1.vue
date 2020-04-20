<template>
  <div class="edit_container">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <!-- <button v-on:click="saveHtml">保存</button> -->
  </div>
</template>
<script>
// import { quillEditor } from "vue-quill-editor";
// import * as Quill from "quill";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  // [{ 'header': 1 }, { 'header': 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  // ["sourceEditor"],
  [{ indent: "-1" }, { indent: "+1" }],
  // [{ 'direction': 'rtl' }],
  [{ size: ["small", false, "large", "huge"] }],
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  // ['clean'],
  ["image", "video"]
];
export default {
  name: "App",
  props: {
    value: {
      type: String,
      default: ""
    }
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
  mounted() {
    //在使用的页面中初始化按钮样式
    // const sourceEditorButton = document.querySelector(".ql-sourceEditor");
    // sourceEditorButton.classList.add("el-icon-edit-outline");
    // sourceEditorButton.title = "源码编辑";
  },
  data() {
    return {
      content: this.value,
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
              indent: function(val, r) {
                //添加工具方法
                if (val == "+1") this.quill.format("indent", "1");
                else {
                  this.quill.format("indent", "-1");
                }
              }
            }
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(editor) {
      this.$emit("quillData", this.editor.container.innerText, this.content);
    }, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
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