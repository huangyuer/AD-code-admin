import {
  getArticles,
  getArticle,
  delArticle,
  addArticle,
  updateArticle
} from "@/api/article";

const state = {};

const mutations = {};

const actions = {
  getArticles({ commit }, params) {
    return new Promise((resolve, reject) => {
      getArticles({
        page: params.page,
        export:params.export,
        limit: params.limit,
        title: params.title,
        menu: params.menu
      })
        .then(response => {
          const { data,msg } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  getArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      getArticle(params)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delArticle({ commit }, id) {
    return new Promise((resolve, reject) => {
      delArticle({
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
  addArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      addArticle({
        title: params.title,
        menu: params.menu,
        childMenu: params.childMenu,
        tag: params.tag,
        coverImg: params.coverImg,
        introduction: params.introduction,
        content: params.content,
        contentHtml: params.contentHtml,
        link: params.link,
        province:params.province,
        city:params.city
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
  updateArticle({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateArticle({
        id: params.id,
        title: params.title,
        menu: params.menu,
        childMenu: params.childMenu,
        tag: params.tag,
        coverImg: params.coverImg,
        introduction: params.introduction,
        content: params.content,
        contentHtml: params.contentHtml,
        link: params.link
      })
        .then(response => {
          const { data, msg } = response;
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
