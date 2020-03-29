import {
  getQuestionnaires,
  getGroups,
  getQsnImportFile,
  addQuestionnaire,
  delQuestionnaire,
  upQuestionnaire
} from "@/api/education";
import axios from "axios";

const state = {
  groupInfo: [],
  questionInfo: {},
  importFileUrl: ""
};

const mutations = {
  SET_GROUPINFO: (state, groupInfo) => {
    state.groupInfo = groupInfo;
  },
  SET_QUESTIONINFO: (state, questionInfo) => {
    state.questionInfo = questionInfo;
  },
  SET_IMPORTFILEURL: (state, url) => {
    state.importFileUrl = url;
  }
};
const actions = {
  getGroups({ commit }) {
    return new Promise((resolve, reject) => {
      getGroups()
        .then(response => {
          const { msg,data } = response;
          commit("SET_GROUPINFO", data.groups);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQuestionnaires({ commit }, question) {
    const { page, limit, title, groupId } = question;
    return new Promise((resolve, reject) => {
      getQuestionnaires({
        page: page,
        limit: limit,
        title: title,
        groupId: groupId
      })
        .then(response => {
          const { msg,data } = response;
          commit("SET_QUESTIONINFO", data);
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQsnImportFile({ commit }) {
    return new Promise((resolve, reject) => {
      getQsnImportFile({})
        .then(response => {
          const {msg, data } = response;
          commit("SET_IMPORTFILEURL", data.url);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addQuestionnaire({ commit }, question) {
    let form = new FormData();
    // 文件对象
    form.append("file", question.file);
    form.append("title", question.title);
    // form.append("groupNames", question.groupNames);
    // form.append("groupIds", question.groupIds);

      for (var i = 0; i < question.groupNames.length; i++) {
      form.append('groupNames'+[],question.groupNames[i])
     }
     for (var i = 0; i < question.groupIds.length; i++) {
      form.append('groupIds'+[],question.groupIds[i])

     }

    // for (var i = 0; i < question.groups.length; i++) {
    //   form.append('groups['+i+'][group]',question.groups[i].group)
    //   form.append('groups['+i+'][groupId]',question.groups[i].groupId)
    //  }
    form.append("level", question.level);
    return new Promise((resolve, reject) => {
      addQuestionnaire(form)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delQuestionnaire({ commit }, id) {
    let form = new FormData();
    form.append("id",id);
    return new Promise((resolve, reject) => {
      delQuestionnaire(form)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  upQuestionnaire({ commit }, question) {
    let form = new FormData();
    form.append("id",question.id);
    form.append("title", question.title);
    form.append("level", question.level);
    for (var i = 0; i < question.groupNames.length; i++) {
      form.append('groupNames'+[],question.groupNames[i])
     }
     for (var i = 0; i < question.groupIds.length; i++) {
      form.append('groupIds'+[],question.groupIds[i])

     }

    return new Promise((resolve, reject) => {
      upQuestionnaire(form)
        .then(response => {
          const { data } = response;
          resolve(data);
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
