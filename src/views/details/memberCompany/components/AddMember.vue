<template>
  <div class="add-member-container">
    <temp-member
      :title="'会员单位-添加详情'"
      :list="list"
      @remove="remove"
      @add="add"
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
  name: "AddMember",
  data() {
    return {
      list: [],
      info:{
        httpUrl:'',
        name:'',
        image:''
      }
    };
  },
  components: {
    TempMember
  },
  created() {
    this.list.push(this.info);
  },
  methods: {
    add() {
      this.info={
        httpUrl:'',
        name:'',
        image:''
      }
      this.list.push(this.info);
    },
    remove(i) {
      this.list.splice(i, 1);
    },
    imgFile(file,i) {
      this.$set(this.list[i],'httpUrl',file.httpUrl)
      this.$set(this.list[i],'image',file._id)
  console.log("0000000",this.list,file,i)

    },
    input_name(val,i){
      console.log("---inpur-----", val,i);
      this.$set(this.list[i],'name',val)
    },
    commit(){
      this.$store
        .dispatch("details/addMembers", this.list)
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
.add-member-container {
}
</style>
