<template>
  <div class="alterArticle">
    <addGoods ref="alter" :type="'修改'" @alterBtn="alterBtn"></addGoods>
  </div>
</template>
<script>
import addGoods from "./addGoods";
export default {
  name: "AlterGoods",
  components: { addGoods },
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$nextTick(() => {
      let _this = this;
      this.$store
        .dispatch("points/getGoodsDetail", { id: this.id })
        .then(data => {
          console.log("-----2222", _this.$refs.alter);
          //  _this.$refs.alter=data.
          let good = data.goods;
          let info = _this.$refs.alter;
          info.title = good.name;
          info.score = good.score;
          info.typeVal = good.type;
          info.introduction = good.introduction;
          info.stockType = good.stockType;
          info.stockNum = good.stockNum;
          info.qtText = good.qtText;
          info.isDel = good.isDel;
          info.coverImg = good.coverImg && good.coverImg[0]._id;
          good.goodsImg && good.goodsImg.forEach(el => {
            info.goodsImg.push(el._id)
          });
          // info.goodsImg.push(good.goodsImg && good.goodsImg[0]._id);
          info.video = good.video && good.video[0]._id;

          info.coverUrl = good.coverImg && good.coverImg[0].httpUrl;
          // info.goodsUrl.push(good.goodsImg && good.goodsImg[0].httpUrl);
          good.goodsImg && good.goodsImg.forEach(el => {
            info.goodsUrl.push(el.httpUrl)
          });
          info.videoUrl = good.video && good.video[0].httpUrl;
        })
        .catch(e => {
          // this.$alert(e, {
          //   confirmButtonText: "确定",
          //   center: true
          // });
          reject(e);
        });
    });
  },
  methods: {
    alterBtn(params) {
      params.id = this.$route.query.id;
      console.log("------", params);
      this.$store
        .dispatch("points/upGoods", params)
        .then(data => {
          this.$alert(data, {
            confirmButtonText: "确定",
            center: true
          }).then(()=>{
             this.$router.push({
              path: "/pointsShop"
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
