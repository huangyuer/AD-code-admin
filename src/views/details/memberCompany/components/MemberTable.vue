<template>
  <Table :tableData="tableData" >
    <div
      class="table-content"
      slot="tableBody"
      v-for="(item,index) in tableData"
      :key="item.id"
    >
      <div class="table-row">
        <span>
          {{ item.name }}
        </span>
      </div>
      <div class="table-row">
        <img :src="item.image[0]?item.image[0].httpUrl:''" alt="" />
      </div>
      <div class="table-operate-btn table-row">
        <div class="alter-btn" @click="alter(item)">修改</div>
        <div>|</div>
        <div class="del-btn" @click="del(item, index)">删除</div>
      </div>
    </div>
  </Table>
  
  

</template>

<script>
import Table from "@/components/Table";

export default {
  name: "MemberTable",
  components: { Table },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    del(item, index) {
      this.$emit("del", item, index);
    },
    alter(item){
      this.$router.push({
        name: "AlterMember",
        params: {
          data: item
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
