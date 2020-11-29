<template>
  <div class="alterArticle">
    <addArticle ref="alter" :type="'修改'" @alterBtn="alterBtn"></addArticle>
  </div>
</template>
<script>
import addArticle from './addArticle';
export default {
  name: 'AlterArticle',
  components: { addArticle },
  data() {
    return {
      id: ''
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$nextTick(() => {
      this.$store.dispatch('article/getArticle', { id: this.id }).then(data => {
        let article = data.article;
        let info = this.$refs.alter;
        info.title = article.title;
        info.menuVal = article.menu;
        info.typeVal = article.childMenu;
        info.tagVal = article.tag;
        info.imgUrl = article.coverImg[0] && article.coverImg[0].httpUrl;
        info.fileId = article.coverImg[0] && article.coverImg[0]._id;
        info.intro = article.introduction;
        info.content = article.content;
        info.contentHtml = article.contentHtml;
        info.link = article.link;
        info.province = article.province;
        info.city = article.city;
        let params = {
          menu: info.menuVal,
          type: info.typeVal
        };
        this.$store.dispatch('common/getMenuTags', params).then(res => {
          info.menuTag = res;
        });
        if (info.menuVal) {
          this.$store
            .dispatch('common/getMenuTypes', { menu: info.menuVal })
            .then(res => {
              info.menuType = res;
            });
        }
      });
    });
  },
  methods: {
    alterBtn(params) {
      params.id = this.$route.query.id;
      console.log('------', params);
      this.$store
        .dispatch('article/updateArticle', params)
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
<style lang='less' scoped>
</style>
