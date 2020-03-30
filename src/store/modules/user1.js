import {
  login,
  logout,
  getUsers,
  addUsers,
  delUser,
  updateUser,
  getUserImportFile,
  importUser
} from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
// import router, { resetRouter } from '@/router'
import axios from "axios";
import qs from "qs";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  userInfo: [],
  userImportUrl: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_USERIMPORTURL: (state, userImportUrl) => {
    state.userImportUrl = userImportUrl;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
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

  // get user info
  getUsers({ commit }, userInfo) {
    // var params = new URLSearchParams();
    // params.append('page', 1);       //你要传给后台的参数值 key/value
    // params.append('limit', 1);
    // params.append('type', '访客');
    // axios.defaults.headers.common['token']= state.token;
    //     axios.post('/getUsers',params)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // return;

    const { page, limit, name, phone, memberCode, type } = userInfo;
    return new Promise((resolve, reject) => {
      getUsers({
        page: page,
        limit: limit,
        name: name,
        phone: phone,
        memberCode: memberCode,
        type: type
      })
        .then(response => {
          const { data } = response;
          commit("SET_USERINFO", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //addUsers
  addUsers({ commit }, userInfo) {
    const { users, type } = userInfo;
    return new Promise((resolve, reject) => {
      addUsers({
        users: users,
        type: type
      })
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //删除用户信息

  delUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      delUser({
        id: id
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

  //updateUser
  updateUser({ commit }, userInfo) {
    const { id, department, position, hospital, phone, email } = userInfo;
    return new Promise((resolve, reject) => {
      updateUser({
        id: id,
        department: department,
        position: position,
        position: position,
        hospital: hospital,
        phone: phone,
        email: email
      })
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //用户导入模板
  getUserImportFile({ commit }) {
    return new Promise((resolve, reject) => {
      getUserImportFile()
        .then(response => {
          const { data } = response;
          commit("SET_USERIMPORTURL", data.url);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //新增/解绑用户 （文件）

  importUser({ commit }, info) {
    let form = new FormData();
    form.append("file", info.file);
    form.append("type", info.type);
    return new Promise((resolve, reject) => {
      importUser(form)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          // resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, {
            root: true
          });

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
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);

      const { roles } = await dispatch("getInfo");

      // resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch("permission/generateRoutes", roles, {
        root: true
      });

      // dynamically add accessible routes
      // router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch("tagsView/delAllViews", null, {
        root: true
      });

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
