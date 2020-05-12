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
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$nextTick(() => {
      this.$store.dispatch("video/getVideo", { id: this.id }).then(data => {
        let info = this.$refs.alter;
        let video = data.video;
        info.title = video.title;
        info.menuVal = video.tag;
        info.typeVal = video.childMenu;
        info.tagVal = video.tag;
        info.imgUrl = video.coverImg[0]&&video.coverImg[0].httpUrl;
        info.videoUrl = video.video[0]&&video.video[0].httpUrl;
        info.fileId = video.coverImg[0]&&video.coverImg[0]._id;
        info.videoId = video.video[0]&&video.video[0]._id;
        info.content = video.introduction;
        info.intro = video.introduction;
        info.httpUrl = video.video[0]&&video.video[0].httpUrl;
      });
    });
  },
  methods: {
    alterBtn(params, params1) {
      params.id = this.$route.query.id;
      if (params1) {
        this.$store.dispatch("common/createHttpFile", params1).then(res => {
          params.video = res.fileId;
          this.$store
            .dispatch("video/upVideo", params)
            .then(data => {
              this.$alert(data, {
                confirmButtonText: "确定",
                center: true
              }).then(() => {
                this.$router.push({
                  path: "/video"
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
        });
      } else {
        this.$store
          .dispatch("video/upVideo", params)
          .then(data => {
            this.$alert(data, {
              confirmButtonText: "确定",
              center: true
            }).then(() => {
              this.$router.push({
                path: "/video"
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
      console.log("------", params);
    }
  }
};
</script>
<style lang="less" scoped></style>
