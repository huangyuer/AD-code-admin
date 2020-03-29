<template>
  <div class="alter-member-container">
    <temp-member
      :title="'会员单位-修改详情'"
      :list="list"
      @imgFile="imgFile"
      @input_name="input_name"
      @commit="commit"
    ></temp-member>
  </div>
</template>
<script>
import TempMember from "./TempMember";
import PictureUpload from "@/components/PictureUpload";
import LinkInput from "@/views/details/home/components/LinkInput";

export default {
  name: "AlterMember",
  data() {
    return {
      list: [
        {
          file: "",
          group: "会员单位",
          image: "",
          id: "",
          name: "",
          httpUrl: ""
        }
      ]
    };
  },
  components: {
    TempMember
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$route.params.data) {
        let info = this.$route.params.data;
        this.$set(this.list[0], "name", info.name);
        this.$set(this.list[0], "httpUrl", info.image[0].httpUrl);
        this.$set(this.list[0], "id", info._id);
        this.$set(this.list[0], "name", info.name);
        this.$set(this.list[0], "image", info.image[0]._id);
      }
    },

    imgFile(file, i) {
      this.$set(this.list[0], "httpUrl", file.httpUrl);
      this.$set(this.list[0], "image", file._id);
    },
    input_name(val, i) {
      this.$set(this.list[0], "name", val);
    },
    commit() {
      this.$store
        .dispatch("details/updateMember", this.list[0])
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
@aaa: ~">>>";
.alter-member-container {
}
</style>
