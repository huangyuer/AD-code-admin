import {
    login,
    getUsers,
    getPageLogs
  } from "@/api/user";
  import { getToken, setToken, removeToken } from "@/utils/auth";
  
  const state = {
    token: getToken(),
    userInfo: [],
  };
  
  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  };
  
  const actions = {
    // user login
    login({ commit }, userInfo) {
      const { account, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          account: account,
          password: password
        })
          .then(response => {
            const { data } = response;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    getUsers({ commit },params) {
      return new Promise((resolve, reject) => {
        getUsers(params)
          .then(response => {
            const { data,msg } = response;
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getPageLogs({ commit },params) {
      return new Promise((resolve, reject) => {
        getPageLogs(params)
          .then(response => {
            const { data,msg } = response;
            resolve(response);
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
  