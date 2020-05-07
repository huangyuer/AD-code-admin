import {
  getFileGroups,
  addFileGroup,
  getFileImageVideo,
  delFiles,
  delFileGroup,
  getMembers,
  delMember,
  addMembers,
  uploadFile,
  updateMember,
  getArticles,
  getArticleLink,
  getArticle,
  getMenuSelect,
  delArticle,
  updateArticle,
  addArticle,
  setHomeVideo,
  getMenus,
  addMenu,
  updateMenu,
  delMenu,
  getHomeImage,
  getInfoBars,
  addGroup,
  delGroup,
  getLive,
  updateLive,
  getRecord,
  updateRecord,
  updateImage,
  uploadHomeImage,
  updateInfoBar
} from "@/api/details";

const state = {
  filegroups: [],
  addfilegroups: [],
  filesimagevideo: [],
  filedel: [],
  filegroupdel: [],
  uploadfile: [],
  memberInfo: [],
  articlesInfo: {},
  menuSelect: [],
  getmenus: [],
  addmenu: [],
  delmenu: [],
  updatemenu: [],
  homeImage: {},
  infoBars: [],
  getLive: {},
  getRecord: {},
  articleLink:{},
  article:{},
  //
  isExistPlate: false
};

const mutations = {
  //
  SetIsExistPlate: (state, isExistPlate) => {
    state.isExistPlate = isExistPlate;
  },
  //
  SET_ARTICLELINK:(state,articleLink)=>{
    state.articleLink=articleLink
  },
  SET_ARTICLE:(state,article)=>{
    state.article=article
  },
  SET_FIlEGROUPS: (state, filegroups) => {
    state.filegroups = filegroups;
  },
  ADD_FIlEGROUPS: (state, addfilegroups) => {
    state.addfilegroups = addfilegroups;
  },
  SET_FILEIMAGEVIDEO: (state, filesimagevideo) => {
    state.filesimagevideo = filesimagevideo;
  },
  SET_FILEDEL: (state, filedel) => {
    state.filedel = filedel;
  },
  SET_FILEGROUPDEL: (state, filegroupdel) => {
    state.filegroupdel = filegroupdel;
  },
  SET_UPLOADFILE: (state, uploadfile) => {
    state.uploadfile = uploadfile;
  },
  SET_MEMBERINFO: (state, memberInfo) => {
    state.memberInfo = memberInfo;
  },
  SET_ARTICLESINFO: (state, articlesInfo) => {
    state.articlesInfo = articlesInfo;
  },
  SET_MENUSELECT: (state, menuSelect) => {
    state.menuSelect = menuSelect;
  },
  SET_MENUSINFO: (state, getmenus) => {
    state.getmenus = getmenus;
  },
  SET_MENUSADD: (state, addmenu) => {
    state.addmenu = addmenu;
  },
  SET_MENUSDEL: (state, delmenu) => {
    state.delmenu = delmenu;
  },
  SET_MENUUPDATE: (state, updatemenu) => {
    state.updatemenu = updatemenu;
  },
  SET_HOMEIMAGE: (state, homeImage) => {
    state.homeImage = homeImage;
  },
  SET_INFOBARS: (state, infoBars) => {
    state.infoBars = infoBars;
  },
  SET_GETLIVE: (state, getLive) => {
    state.getLive = getLive;
  },
  SET_GETRECORD: (state, getRecord) => {
    state.getRecord = getRecord;
  }
};
const actions = {
  delFiles({ commit }, question) {
    const fileIds = question;
    return new Promise((resolve, reject) => {
      delFiles({
        fileIds: fileIds
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_FILEDEL", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delFileGroup({ commit }, question) {
    const id = question;
    return new Promise((resolve, reject) => {
      delFileGroup({
        id: id
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_FILEGROUPDEL", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFileImageVideo({ commit }, question) {
    const {page,limit,type,group} = question;
    let form = new FormData();
    form.append("page",page);
    form.append("limit",limit);
    form.append("type",type);
    form.append("group",group);
    return new Promise((resolve, reject) => {
      getFileImageVideo(form)
        .then(response => {
          const { msg, data } = response;
          commit("SET_FILEIMAGEVIDEO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addFileGroup({ commit }, question) {
    const { name, type } = question;
    return new Promise((resolve, reject) => {
      addFileGroup({
        name: name,
        type: type
      })
        .then(response => {
          const { msg, data } = response;
          commit("ADD_FIlEGROUPS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFileGroups({ commit }, question) {
    const type = question;
    return new Promise((resolve, reject) => {
      getFileGroups({
        type: type
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_FIlEGROUPS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //上传文件
  uploadFile({ commit }, info) {
    let form = new FormData();
    form.append("file", info.file);
    if (info.group) form.append("group", info.group);
    if (info.groupId) form.append("groupId", info.groupId);
    return new Promise((resolve, reject) => {
      uploadFile(form)
        .then(response => {
          const { data, msg } = response;
          commit("SET_UPLOADFILE", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //更新备案信息
  updateRecord({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateRecord({
        id: info.id,
        detail: info.detail,
        number: info.number
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //功能管理>更新图片信息
  updateImage({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateImage({
        id: info.id,
        httpUrl: info.httpUrl,
        link: info.link,
        title:info.title
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //首页新增图片信息
  uploadHomeImage({ commit }, info) {
    return new Promise((resolve, reject) => {
      uploadHomeImage({
        id: info.id,
        link: info.link,
        group: info.group,
        title:info.title
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改信息栏
  updateInfoBar({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateInfoBar({
        id: info.id,
        menu: info.menu
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取备案信息
  getRecord({ commit }) {
    return new Promise((resolve, reject) => {
      getRecord()
        .then(response => {
          const { data, msg } = response;
          commit("SET_GETRECORD", data.record);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改视频直播信息
  updateLive({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateLive({
        id: info.id,
        image: info.image,
        link: info.link,
        title: info.title
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取直播信息
  getLive({ commit }) {
    return new Promise((resolve, reject) => {
      getLive()
        .then(response => {
          const { data, msg } = response;
          commit("SET_GETLIVE", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //新增学组
  delGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      delGroup({
        id: id
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //新增学组
  addGroup({ commit }, name) {
    return new Promise((resolve, reject) => {
      addGroup({
        name: name
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //首页>信息栏
  getInfoBars({ commit }) {
    return new Promise((resolve, reject) => {
      getInfoBars()
        .then(response => {
          const { data, msg } = response;
          commit("SET_INFOBARS", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取首页图片
  getHomeImage({ commit }) {
    return new Promise((resolve, reject) => {
      getHomeImage()
        .then(response => {
          const { data, msg } = response;
          commit("SET_HOMEIMAGE", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //设置文章首页展示
  setHomeVideo({ commit }, id) {
    return new Promise((resolve, reject) => {
      setHomeVideo({
        id: id
      })
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改详情
  updateArticle({ commit }, info) {
    return new Promise((resolve, reject) => {
      updateArticle(info)
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //添加详情
  addArticle({ commit }, info) {
    return new Promise((resolve, reject) => {
      addArticle(info)
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //删除详情
  delArticle({ commit }, id) {
    let form = new FormData();
    form.append("id", id);
    return new Promise((resolve, reject) => {
      delArticle(form)
        .then(response => {
          const { data, msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取文章链接
  getArticleLink({ commit }, info) {
    return new Promise((resolve, reject) => {
      getArticleLink({menu:info.menu,platform:info.platform,id:info.id})
        .then(response => {
          const { data, msg } = response;
          commit("SET_ARTICLELINK", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


  //获取文章详情
  getArticle({ commit }, id) {
    return new Promise((resolve, reject) => {
      getArticle({id:id})
        .then(response => {
          const { data, msg } = response;
          commit("SET_ARTICLE", data.article);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


  //查询详情
  getArticles({ commit }, info) {
    let form = new FormData();
    form.append("page", info.page);
    form.append("limit", info.limit);
    form.append("title", info.title);
    form.append("menu", info.menu);
    form.append("copyright", info.copyright);
    form.append("platform", info.platform);
    return new Promise((resolve, reject) => {
      getArticles(form)
        .then(response => {
          const { data, msg } = response;
          commit("SET_ARTICLESINFO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //获取模块/分类筛选框
  getMenuSelect({ commit }, platform) {
    let form = new FormData();
    form.append("platform", platform);
    return new Promise((resolve, reject) => {
      getMenuSelect(form)
        .then(response => {
          const { data, msg } = response;
          commit("SET_MENUSELECT", data.menus);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改会员单位
  updateMember({ commit }, info) {
    let form = new FormData();
    form.append("id", info.id);
    form.append("name", info.name);
    form.append("image", info.image);
    return new Promise((resolve, reject) => {
      updateMember(form)
        .then(response => {
          const { msg } = response;
          resolve(msg);
        })
        .catch(error => {
          console.log("-----", error);
          reject(error);
        });
    });
  },

  //获取会员单位
  getMembers({ commit }, info) {
    let form = new FormData();
    form.append("page", info.page);
    form.append("limit", info.limit);
    return new Promise((resolve, reject) => {
      getMembers(form)
        .then(response => {
          const { msg, data } = response;
          commit("SET_MEMBERINFO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //新增会员单位
  addMembers({ commit }, members) {
    return new Promise((resolve, reject) => {
      addMembers({
        members: members
      })
        .then(response => {
          const { msg, data } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //删除会员单位
  delMember({ commit }, id) {
    let form = new FormData();
    form.append("id", id);
    return new Promise((resolve, reject) => {
      delMember(form)
        .then(response => {
          const { msg, data } = response;
          resolve(msg, data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //获取官网官微模块
  getMenus({ commit }, question) {
    const type = question;
    return new Promise((resolve, reject) => {
      getMenus({
        type: type
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_MENUSINFO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addMenu({ commit }, question) {
    const { name, role, router, level, groupId, type } = question;
    return new Promise((resolve, reject) => {
      addMenu({
        name: name,
        role: role,
        router: router,
        level: level,
        groupId: groupId,
        type,
        type
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_MENUSADD", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateMenu({ commit }, question) {
    const { name, role, router, id, type } = question;
    return new Promise((resolve, reject) => {
      updateMenu({
        name: name,
        id: id,
        router: router,
        role: role,
        type,
        type
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_MENUUPDATE", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delMenu({ commit }, question) {
    const id = question;
    return new Promise((resolve, reject) => {
      delMenu({
        id: id
      })
        .then(response => {
          const { msg, data } = response;
          commit("SET_MENUSDEL", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
