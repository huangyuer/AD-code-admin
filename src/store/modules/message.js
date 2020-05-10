import { getLvMsgAdmin, upLeaveMsg,getUnCheckMsg } from "@/api/message";

const state = {

};

const mutations = {

};

const actions = {
    getLvMsgAdmin({ commit },params) {
    return new Promise((resolve, reject) => {
        getLvMsgAdmin({page:params.page,limit:params.limit,name:params.name,status:params.status,tag:params.tag,export:params.export})
        .then(response => {
          const { data } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  upLeaveMsg({ commit }, params) {
    return new Promise((resolve, reject) => {
        upLeaveMsg({ id: params.id,status:params.status })
        .then(response => {
          const { data,msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUnCheckMsg({ commit }, params) {
    return new Promise((resolve, reject) => {
        getUnCheckMsg(params)
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
