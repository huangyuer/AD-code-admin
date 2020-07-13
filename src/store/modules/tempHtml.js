import { getTempHtmls,addTempHtml,upTempHtml,delTempHtml,getTempHtml} from "@/api/tempHtml.js";

const state = {

};

const mutations = {

};

const actions = {
    getTempHtmls({ commit },params) {
        return new Promise((resolve, reject) => {
            getTempHtmls(params)
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      addTempHtml({ commit },params) {
        return new Promise((resolve, reject) => {
            addTempHtml(params)
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      upTempHtml({ commit },params) {
        return new Promise((resolve, reject) => {
            upTempHtml(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      delTempHtml({ commit },params) {
        return new Promise((resolve, reject) => {
            delTempHtml(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      getTempHtml({ commit },params) {
        return new Promise((resolve, reject) => {
            getTempHtml(params)
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
