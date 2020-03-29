<template>
  <div class="home-container" v-if="isShow">
    <div class="home-container-title">功能管理</div>
    <home-select :title="'首页banner'">
      <div class="home-image-slot">
        <picture-upload
          @select_picture="select_picture"
          :src="homeImage.banner[0].httpUrl"
          :itemPic="homeImage.banner[0]"
          :value="'Banner：'"
          :tip="'图片建议尺寸1200*400px'"
        ></picture-upload>
        <link-input
          :title="'链接：'"
          :value="homeImage.banner[0].link"
          class="home-image-item"
          :itemInput="homeImage.banner[0]"
          @input="input_picture"
        >
          <div></div>
        </link-input>
      </div>
    </home-select>
    <home-select :title="'首页banner1'">
      <div
        class="home-image-slot"
        v-for="(item, index) in homeImage.banner1"
        :key="index"
      >
        <picture-upload
          @select_picture="select_picture"
          :src="item.httpUrl"
          :itemPic="item"
          :value="'轮播图：'"
          :tip="'图片建议尺寸582*486px'"
        ></picture-upload>
        <link-input
          :title="'名称：'"
          :value="item.title"
          class="home-image-item"
          :itemInput="item"
          :type="'title'"
          @input="input_picture"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'链接：'"
          class="home-image-item"
          :value="item.link"
          :itemInput="item"
          @input="input_picture"
        >
          <div
            class="operate-btn"
            v-if="index + 1 >= homeImage.banner1.length"
            @click="addPicture('banner1', item)"
          >
            新增
          </div>
          <div class="operate-btn" v-else @click="delPicture(item)">
            删除
          </div>
        </link-input>
      </div>
    </home-select>
    <home-select :title="'首页banner2'">
      <div
        class="home-image-slot"
        v-for="(item, index) in homeImage.banner2"
        :key="index"
      >
        <picture-upload
          @select_picture="select_picture"
          :src="item.httpUrl"
          :itemPic="item"
          :value="'轮播图：'"
          :tip="'图片建议尺寸1200*126px'"
        ></picture-upload>
        <link-input
          :title="'链接：'"
          class="home-image-item"
          :value="item.link"
          :itemInput="item"
          @input="input_picture"
        >
          <div
            class="operate-btn"
            v-if="index + 1 >= homeImage.banner2.length"
            @click="addPicture('banner2', item)"
          >
            新增
          </div>
          <div class="operate-btn" v-else @click="delPicture(item)">
            删除
          </div>
        </link-input>
      </div>
    </home-select>
    <home-select :title="'广告位'" class="home-adImg">
      <div style="display:flex;flex-flow: wrap;">
        <div
          class="home-image-slot"
          v-for="(item, index) in homeImage.adImg"
          :key="index"
        >
          <picture-upload
            @select_picture="select_picture"
            :src="item.httpUrl"
            :itemPic="item"
            :value="'广告位1：'"
            :tip="'图片建议尺寸1200*126px'"
          ></picture-upload>
          <link-input
            :title="'链接：'"
            :value="item.link"
            :itemInput="item"
            @input="input_picture"
          >
            <div
              class="operate-btn"
              v-if="index + 1 >= homeImage.adImg.length"
              @click="addPicture('adImg', item)"
            >
              新增
            </div>
            <div class="operate-btn" v-else @click="delPicture(item)">
              删除
            </div>
          </link-input>
        </div>
      </div>
      <div style="display:flex;flex-flow: wrap;">
        <div
          class="home-image-slot"
          v-for="(item, index) in homeImage.adImg1"
          :key="item.id"
        >
          <picture-upload
            @select_picture="select_picture"
            :src="item.httpUrl"
            :itemPic="item"
            :value="'广告位2：'"
            :tip="'图片建议尺寸330*154px'"
          ></picture-upload>
          <link-input
            :title="'链接：'"
            :value="item.link"
            :itemInput="item"
            @input="input_picture"
          >
            <div
              class="operate-btn"
              v-if="index + 1 >= homeImage.adImg1.length"
              @click="addPicture('adImg1', item)"
            >
              新增
            </div>
            <div class="operate-btn" v-else @click="delPicture(item)">
              删除
            </div>
          </link-input>
        </div>
      </div>
    </home-select>
    <home-select :title="'信息栏'">
      <div class="home-info-slot">
        <div v-for="(item, index) in infoBars.infoBars" :key="index">
          <link-input
            :title="'信息栏' + (index + 1) + '：'"
            class="home-info-item"
            :value="item.Menu"
            :itemInput="item"
            @input="input_infoBars"
          >
            <div></div>
          </link-input>
        </div>
      </div>
    </home-select>
    <home-select :title="'友情链接'">
      <div
        class="home-image-slot"
        v-for="(item, index) in homeImage.friends"
        :key="index"
      >
        <picture-upload
          @select_picture="select_picture"
          :src="item.httpUrl"
          :itemPic="item"
          :value="'友 情 链 接：'"
          :tip="'图片建议尺寸358*98px'"
        ></picture-upload>
        <link-input
          :title="'链接：'"
          :itemInput="item"
          :value="item.link"
          @input="input_picture"
        >
          <div
            class="operate-btn"
            v-if="index + 1 >= homeImage.friends.length"
            @click="addPicture('friends', item)"
          >
            新增
          </div>
          <div class="operate-btn" v-else @click="delPicture(item)">
            删除
          </div>
        </link-input>
      </div>
    </home-select>
    <home-select :title="'底部区域'">
      <div class="home-info-slot">
        <link-input
          :title="'详情：'"
          class="home-info-item"
          :value="getRecord.detail"
          @input="input_record_detail"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'备案号：'"
          class="home-info-item"
          :value="getRecord.number"
          @input="input_record_number"
        >
          <div></div>
        </link-input>
      </div>
    </home-select>
    <div class="home-container-title">分页管理</div>
    <home-select :title="'学组分类'">
      <div class="home-info-slot">
        <div v-for="(item, index) in getGroups" :key="index">
          <link-input
            :title="'学组' + (index + 1) + '：'"
            class="home-info-item"
            :value="item.name"
            :disabled="getGroups.length > index + 1"
            @input="input_group"
          >
            <div
              class="operate-btn"
              v-if="index + 1 >= getGroups.length"
              @click="addGroup(index)"
            >
              新增
            </div>
            <div class="operate-btn" v-else @click="delGroup(item, index)">
              删除
            </div>
          </link-input>
        </div>
      </div>
    </home-select>
    <home-select :title="'视频直播'">
      <div class="home-image-slot">
        <picture-upload
          @select_picture="select_live"
          :src="getLive.image[0].httpUrl"
          :itemPic="getLive"
          :tip="'图片建议尺寸600*270px'"
        ></picture-upload>
        <link-input
          :title="'名称：'"
          class="home-image-item"
          :value="getLive.title"
          @input="input_live_title"
        >
          <div></div>
        </link-input>
        <link-input
          :title="'链接：'"
          class="home-image-item"
          :value="getLive.link"
          @input="input_live_link"
        >
          <div></div>
        </link-input>
      </div>
    </home-select>
  </div>
</template>
<script>
import HomeSelect from "./components/HomeSelect";
import PictureUpload from "@/components/PictureUploads";
import LinkInput from "./components/LinkInput";

export default {
  name: "index",
  components: { HomeSelect, PictureUpload, LinkInput },
  data() {
    let self = this;
    return {
      homeImage: {},
      infoBars: {},
      getLive: {},
      getRecord: {},
      getGroups: [],
      liveInfo: {},
      recordInfo: {},
      addGroupName: "",
      updateImageInfo: {},
      loading: true
    };
  },
  created() {
    this.init();
  },
  computed: {
    isShow() {
      return (
        Object.keys(this.homeImage).length > 0 &&
        Object.keys(this.infoBars).length &&
        Object.keys(this.getLive).length > 0 &&
        Object.keys(this.getRecord).length > 0 &&
        this.getGroups.length > 0
      );
    }
  },
  methods: {
    init() {
      this.getHomeImage();
      this.$store.dispatch("details/getInfoBars").then(data => {
        this.infoBars = this.$store.getters.infoBars;
      });

      this.getRecordApi();
      this.getGroupsApi();
      this.$store.dispatch("details/getLive").then(data => {
        this.getLive = this.$store.getters.getLive.live;
        this.$set(this.liveInfo, "id", this.getLive._id);
        this.$set(this.liveInfo, "link", this.getLive.link);
        this.$set(this.liveInfo, "title", this.getLive.title);
        this.$set(this.liveInfo, "image", this.getLive.image[0]._id);
      });
    },
    getHomeImage() {
      this.$store.dispatch("details/getHomeImage").then(data => {
        this.homeImage = this.$store.getters.homeImage;
        for (const key in this.homeImage) {
          if (this.homeImage.hasOwnProperty(key)) {
            this.homeImage[key].push({ httpUrl: "", link: "", title: "" });
          }
        }
      });
      this.loading = false;
    },
    getRecordApi() {
      this.$store.dispatch("details/getRecord").then(data => {
        this.getRecord = this.$store.getters.getRecord;
        this.$set(this.recordInfo, "id", this.getRecord._id);
        this.$set(this.recordInfo, "detail", this.getRecord.detail);
        this.$set(this.recordInfo, "number", this.getRecord.number);
      });
    },
    getGroupsApi() {
      this.$store.dispatch("education/getGroups").then(data => {
        this.getGroups = this.$store.getters.groupInfo;
        this.getGroups.push({ name: "" });
      });
    },
    select_live(val, item) {
      item.image[0].httpUrl = val.httpUrl;
      this.$set(this.liveInfo, "image", val._id);
      this.$store
        .dispatch("details/updateLive", this.liveInfo)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    select_picture(val, item) {
      item.httpUrl = val.httpUrl;
      if (!item.hasOwnProperty("_id")) {
        item.id = val._id;
        // this.$set(this.updateImageInfo, "id", val._id);
        return;
      }
      let info = {
        id: item._id,
        httpUrl: val.httpUrl,
        link: item.link
      };
      this.$store
        .dispatch("details/updateImage", info)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    input_infoBars(val, item) {
      let info = {
        id: item.Id,
        menu: val
      };
      this.$store
        .dispatch("details/updateInfoBar", info)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$message({
            type: "error",
            message: e
          });
        });
    },
    input_live_title(val) {
      this.$set(this.liveInfo, "title", val);
      this.$store
        .dispatch("details/updateLive", this.liveInfo)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    input_live_link(val) {
      this.$set(this.liveInfo, "link", val);
      this.$store
        .dispatch("details/updateLive", this.liveInfo)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    input_picture(val, item, type) {
      if (!item.hasOwnProperty("_id")) {
        if (type === "title") {
          item.title = val;
        } else item.link = val;
        // this.$set(this.updateImageInfo, "link", val);
        return;
      }

      let info = {
        id: item._id,
        httpUrl: item.httpUrl
      };
      if (type === "title") {
        info.title = val;
        info.link = item.link;
      } else {
        info.title = item.title;
        info.link = val;
      }

      this.$store
        .dispatch("details/updateImage", info)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    input_group(val) {
      this.addGroupName = val;
    },
    input_record_detail(val) {
      this.$set(this.recordInfo, "detail", val);
      this.$store
        .dispatch("details/updateRecord", this.recordInfo)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    input_record_number(val) {
      this.$set(this.recordInfo, "number", val);
      this.$store
        .dispatch("details/updateRecord", this.recordInfo)
        .then(data => {
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    addPicture(group, item) {
      // this.$set(this.updateImageInfo, "group", group);
      console.log("=====ddd", item);
      let info = {
        group: group,
        id: item.id,
        link: item.link,
        title: item.title
      };
      this.$store
        .dispatch("details/uploadHomeImage", info)
        .then(data => {
          this.getHomeImage();
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    addGroup() {
      this.$store
        .dispatch("details/addGroup", this.addGroupName)
        .then(data => {
          this.getGroupsApi();
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    delPicture(item) {
      let info = [];
      info.push(item._id);
      this.$store
        .dispatch("details/delFiles", info)
        .then(data => {
          this.getHomeImage();
          this.$message({
            type: "success",
            message: data
          });
        })
        .catch(e => {
          this.$alert(e, {
            confirmButtonText: "确定",
            center: true
          });
        });
    },
    delGroup(item, index) {
      this.$store
        .dispatch("details/delGroup", item._id)
        .then(data => {
          this.getGroupsApi();
          this.$message({
            type: "success",
            message: data
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
.home-container {
  padding-bottom: 20px;
  .home-adImg {
    @{aaa}.home-select-content {
      display: flex;
      flex-direction: column;
    }
  }
  .operate-btn {
    font-size: 14px;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: rgba(67, 115, 249, 1);
    cursor: pointer;
    word-break: keep-all;
  }
  .home-container-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(36, 36, 36, 1);
    padding-bottom: 30px;
    font-family: "PingFangSC-Medium";
  }
  .home-image-slot {
    max-width: 340px;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    .home-image-item {
      padding-top: 10px;
    }
  }

  .home-info-slot {
    display: flex;
    flex-direction: column;

    .home-info-item {
      padding-top: 15px;
      @{aaa} .link-input-title {
        min-width: 70px;
      }
    }
  }
}
</style>
