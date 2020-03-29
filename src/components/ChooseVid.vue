<template>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        width="900px"
        @opened="openDialog"
        :before-close="hideData"
        @close="closeDialog"
        left>
        <div class="el-dialog__header tise">
            <span class="el-dialog__title">选择视频</span>
            <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                <i class="el-dialog__close el-icon el-icon-close" @click="hideData()"></i>
            </button>
        </div>
        <div class="dialogChooseWapper"   v-loading="loading">
            <div class="ChooseleftTab">
                <el-scrollbar class="pageleftscrollbar" :native="false">
                    <div class="filegroupsList">
                        <!-- <div class="filegroupsItem" :class="{active : active == item.name}"  v-for="(item,index) in defaultgroups" @click="ClickgroupsItem(item)">{{item.name}}</div> -->
                        <div class="filegroupsItem" :class="{active : active.name && item.name && active.name == item.name}"  
                        v-for="(item,key) in filegroups" @click="ClickgroupsItem(item)">{{item.name}}</div>
                        <div class="addgroupbtn" @click="visible=true">新建分组</div>
                        <el-dialog
                            width="300px"
                            :append-to-body="true"
                            :close-on-click-modal="false"
                            :visible.sync="visible"
                            @open="openvisible"
                        >
                            <div style="margin:20px;box-sizing:border-box;">
                            <div style="font-size:14px;color:#333333;padding:20px 0;" class="p-titleinput">
                                请输入分组名称
                            </div>
                            <el-input
                                class="inputadd"
                                v-model="addGroupName"
                                type="text"
                                style="width:240px;"
                            ></el-input>
                            <div style="text-align: center; margin-top:20px;padding-bottom:30px;display:flex;">
                                <div
                                style="flex:1;background:#4373F9;padding:5px 0;margin-right:10px;border-radius:4px;color:#ffffff;"
                                @click="addFileGroup()"
                                >确定</div>
                                <div
                                style="flex:1;border:1px solid #E5E5E5;padding:5px 0;margin-left:10px;border-radius:4px;color:#999999"
                                @click="visible = false"
                                >取消</div>
                            </div>
                            </div>
                        </el-dialog>
                    </div>
                </el-scrollbar>
            </div>
            <div class="ChooserightList">
                <div class="demoimagelist">
                    <div class="demo-image">
                        <div :class="{block:true,clickfalse:true,activeborder:currentchoosevideoList.includes(fit)}" 
                        v-for="(fit,index) in filesimagevideo" 
                        @click="selectVideo(fit)">
                            <div class="xuanze-gou" v-show="currentchoosevideoList.includes(fit)">
                                <img src="../assets/xuanzeicon@2x.png" alt="">
                            </div>
                            <div class="maskelimage">
                                <img src="../assets/play@2x.png" alt="">
                            </div>
                            <video 
                                style="object-fit: cover;" 
                                preload="metadata" 
                                :src="fit.httpUrl"  
                                :class="{upvideo:true,
                                activeborder:true
                                }" 
                                width="100" height="60">
                            </video>
                            <el-tooltip class="item" effect="dark" :content="fit.fileName" placement="bottom-start">
                                <span class="demonstration">{{ fit.fileName }}</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
                <div class="member-info-footer">
                    <Pagination
                        :total="total"
                        :limit="currentsItem.limit"
                        @currentPage="jumpPage"
                    ></Pagination>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <div>
                <el-upload
                :action="''"
                :show-file-list="false"
                list-type="video"
                multiple
                :auto-upload="true"
                accept=".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mp4,.mkv,.vob"
                :http-request="uploadMethod">
                    <button class="footerdialogbtn"><span>上传文件</span></button>
                </el-upload>
            </div>
            <button @click="submitTrue()" class="footerdialogbtn primary"><span>确 定</span></button>
        </span>
    </el-dialog>

</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  name: "ChooseVid",
  props:{
      centerDialogVisible:{
          type:Boolean,
          default:false,
    }
  },
  components:{Pagination},
  data() {
    return {
        visible:false,
        //
        active:'',
        //ADD GROUP
        addGroupName:'',
        addfilegroups:[],
        //GET IMAGEVIDEO
        filesimagevideo:[],
        total:1,
        currentsItem: {
          page: 1,
          limit: 12,
          fileType: '视频',
          groupId: String,
          group:String,
        },
        //GET GROUP
        gettype:'视频',
        defaultgroups:[{
          _id:'',
          name:'全部视频'
        },{
          _id:'',
          name:'未分组'
        }],
        filegroups:[],
        //uploadfile
        uploadfiles:{
            file:'',
            group:'',
            groupId:''
        },
        //chooseVideo
        currentchoosevideoList:[],
        //
        video:'',
        //loading
        loading:false,
    };
  },
  methods:{
    hideData() {
        this.$emit("hideDialog");
    },
    openDialog(){
        this.gettype="视频";
        this.currentsItem.fileType="视频";
        this.loading=true;
        this.getFileGroups();
    },
    closeDialog(){
        this.filegroups=[];
        this.filesimagevideo=[];
        this.$emit("hideDialog");
    },
    openvisible(){
      this.addGroupName='';
    },
    uploadMethod(param) {
      this.uploadfiles.file = param.file;
      this.uploadfiles.group = this.active.name;
      this.uploadfiles.groupId = this.active._id;
      this.$store.dispatch("details/uploadFile", this.uploadfiles).then(() => {
        this.init(this.active);
        this.$message({
          type: "success",
          message: '上传成功'
        });
        })
        .catch(e => {
          this.$message({
            type: "error",
            message: e
          });
        });
    },
    selectVideo(item){
        if (!this.currentchoosevideoList.includes(item)) {
            this.currentchoosevideoList.push(item);
        } else {
            for (var i = 0; i < this.currentchoosevideoList.length; i++) {
                if (this.currentchoosevideoList[i] == item) {
                    this.currentchoosevideoList.splice(i, 1);
                    return;
                }
            }
        }
    },
    //选择确定传值给需要的地方
    submitTrue(){
        if(this.currentchoosevideoList==""){
            this.$message({
                message: "没有选择视频",
                type: 'warning'
            });
            return;
        }
        if (this.currentchoosevideoList != "") {
            this.$emit("videoFileList", this.currentchoosevideoList);
            this.currentchoosevideoList = [];
            this.$message({
                message: "视频选择成功",
                type: 'success'
            });
        } 
        this.hideData();
    },
    ClickgroupsItem(item){
        this.active = item;
        this.currentsItem.groupId=item._id;
        this.currentsItem.page=1;
        this.currentsItem.fileType='视频';
        this.loading=true;
        this.getFileImageVideo();

    },
    jumpPage(val){
      this.currentsItem.page = val;
      this.getFileImageVideo();
    },
    getFileGroups() {
      this.$store
        .dispatch("details/getFileGroups",this.gettype)
        .then(() => {
          this.filegroups = this.$store.getters.filegroups.fileGroups;
          this.init(this.filegroups[0]);  
        })
        .catch(e => {
          console.log(e);
        });
    },
    addFileGroup() {
      const addfileatc={
        name:this.addGroupName,
        type:this.gettype
      }
      this.$store
        .dispatch("details/addFileGroup",addfileatc)
        .then(() => {
          this.addfilegroups = this.$store.getters.addfilegroups;
          this.visible = false;
           this.getFileGroups();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getFileImageVideo(){
        this.$store
        .dispatch("details/getFileImageVideo",this.currentsItem)
        .then(() => {
          this.loading=false;
          this.filesimagevideo = this.$store.getters.filesimagevideo.files;
          this.total = this.$store.getters.filesimagevideo.total;
        })
        .catch(e => {
          console.log(e);
        });
    },
    init(groupitem){
        this.active = groupitem;
        this.currentsItem.group = this.active.name;
        this.currentsItem.groupId=this.active._id;
        this.getFileImageVideo();
    }
  },
};
</script>
<style lang='less' scoped>
@aaa: ~">>>";
.dialogChooseWapper{
    display: flex;
    .ChooseleftTab{
        flex: 123;
        .pageleftscrollbar{
            height: 100%;
            border-right: 2px solid #e5e5e5;
            .filegroupsList{
                .filegroupsItem{
                height: 38px;
                line-height: 38px;
                text-align: center;
                font-size: 15px;
                color: #999999;
                cursor: pointer;
                &.active{
                    background: #f7f7f7;
                    color: #333333;
                    }
                }
                .addgroupbtn{
                    text-align: center;
                    color: #4373F9;
                    font-size: 15px;
                    position: absolute;
                    width: 100%;
                    bottom: 80px;
                    cursor: pointer;
                }
            }
        }
    }
    .ChooserightList{
        flex: 777;
        .demoimagelist{
            margin-top: 30px;
            min-height: 210px;
            .demo-image{
            overflow: hidden;
            margin-left: 40px;
                .block{
                    float: left;
                    margin: 0 7px;
                    position: relative;
                    margin-bottom:20px;
                    &.activeborder::after{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: rgba(0,0,0,.1);
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                    }
                    .maskelimage{
                        position: absolute;
                        left: calc(50% - 12px);
                        top: calc(50% - 22px);
                        width:24px;
                        height: 24px;
                        z-index: 2;
                        img{
                            width: 100%;
                        }
                    }
                    .upvideo{
                        position: relative;
                        .activeborder::after{
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            background: rgba(0,0,0,.1);
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                        }
                    }
                    
                    .xuanze-gou{
                        // display: none;
                        position: absolute;
                        left:5px;
                        top:5px;
                        width: 20px;
                        height: 20px;
                        z-index: 2;
                        img{
                            width: 100%;
                        }
                    }
                    .demonstration{
                    display: block;
                    text-align: center;
                    color: #666666;
                    font-size: 14px;
                    width:100px;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    }
                }
            }
        }
        .member-info-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-top: 30px;
            padding-right: 30px;
            padding-bottom: 126px;
        }
    }
}
@{aaa}.el-dialog__header{
    padding: 0;
    &.tise{
        height: 20px;
        padding:20px 20px 10px;
        border-bottom: 2px solid #e5e5e5;
        text-align: center;
    }
}
@{aaa}.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    position: absolute;
    top: 16px;
    left: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
}
@{aaa}.el-dialog__body{
    padding: 0;
    height: 88%;
}
@{aaa}.el-scrollbar__wrap {
    overflow-x: hidden;
    height: 72%;
}
@{aaa}.dialogChooseWapper{
    height: 100%;
}
@{aaa}.el-scrollbar__bar.is-vertical{
    width: 5px;
}
@{aaa}.el-dialog__footer{
    position: absolute;
    bottom: 20px;
    left: 123px;
    .dialog-footer{
        display: flex;
    }
    .footerdialogbtn{
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #dae4ff;
        color: #4373f9;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 0;
        font-size: 14px;
        border-radius: 4px;
        &.primary{
            background: #4373f9;
            color:#ffffff;
            margin-left: 15px;
        }
    }
}
</style>
