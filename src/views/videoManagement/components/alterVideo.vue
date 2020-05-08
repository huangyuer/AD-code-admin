<template>
  <div class="alterArticle">
    <addVideo ref="alter" :type="'修改'" @alterBtn="alterBtn"></addVideo>
  </div>
</template>
<script>
import addVideo from "./addVideo";
export default {
  name: "AlterVideo",
  components: { addVideo },
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.data = this.$route.params.data;
    this.$nextTick(() => {
      let info = this.$refs.alter;
      info.title = this.data.title;
      info.menuVal = this.data.menu;
      info.typeVal = this.data.childMenu;
      info.tagVal = this.data.tag;
      info.imgUrl = this.data.coverImg[0].httpUrl;
      info.videoUrl = this.data.video[0].httpUrl;
      info.fileId = this.data.coverImg[0]._id;
      info.videoId = this.data.video[0]._id;
      info.content = this.data.introduction;
      info.intro = this.data.introduction;
      info.link = this.data.link;
    });
  },
  methods: {
    alterBtn(params) {
      params.id = this.data._id;
      console.log("------", params);
      this.$store
        .dispatch("video/upVideo", params)
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
          reject(e);
        });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
