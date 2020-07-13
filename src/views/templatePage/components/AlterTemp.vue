<template>
  <div class="AlterTemp">
    <div class="alterArticle">
      <AddTemp ref="alter" :type="'修改'" @alterBtn="alterBtn"></AddTemp>
    </div>
  </div>
</template>
<script>
import AddTemp from "./AddTemp";

export default {
  name: "AlterTemp",
  components: { AddTemp },
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$nextTick(() => {
      this.$store
        .dispatch("tempHtml/getTempHtml", { id: this.id })
        .then(data => {
          let html = data.html;
          let info = this.$refs.alter;
          info.title = html.name;
          info.images = html.images;
          // info.menuVal = article.menu;
        });
    });
  },
  methods: {
    alterBtn(params) {
      params.id = this.$route.query.id;

      this.$store.dispatch("tempHtml/upTempHtml", params).then(data => {
        this.$alert(data, {
          confirmButtonText: "确定",
          center: true
        }).then(() => {
          this.$router.push({
            path: "/templatePage"
          });
        });
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
