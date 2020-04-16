import { uploadFile,getMenus, getMenuTypes, getMenuTags } from "@/api/common";

const state = {
  getMenus: [],
  getTypes: [],
  getTags: []
};

const mutations = {
  SET_MENUS: (state, menus) => {
    state.getMenus = menus;
  }
};

const actions = {
  uploadFile({ commit },file) {
    let form = new FormData();
    // 文件对象
    form.append("file",file);
    return new Promise((resolve, reject) => {
      uploadFile(form)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMenus({ commit }) {
    return new Promise((resolve, reject) => {
      getMenus()
        .then(response => {
          const { data } = response;
          commit("SET_MENUS", data.menus);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMenuTypes({ commit }, params) {
    return new Promise((resolve, reject) => {
      getMenuTypes({ menu: params.menu })
        .then(response => {
          const { data } = response;
          resolve(data.types);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMenuTags({ commit }, params) {
    return new Promise((resolve, reject) => {
      getMenuTags({ menu: params.menu, type: params.type })
        .then(response => {
          const { data } = response;
          resolve(data.tags);
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
