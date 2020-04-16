import {
  getVideos,
  addVideo,
  delVideo,
  updateVideo
} from "@/api/video";

const state = {

};

const mutations = {

};

const actions = {
  getVideos({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getVideos({
          page: params.page,
          limit: params.limit,
          title: params.title
        })
        .then(response => {
          const {
            data
          } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addVideo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      addVideo({
          title: params.title,
          introduction: params.introduction,
          coverImg: params.coverImg,
          video: params.video
        })
        .then(response => {
          const {
            data,
            msg
          } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateVideo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      updateVideo({
          id: params.id,
          title: params.title,
          introduction: params.introduction,
          coverImg: params.coverImg,
          video: params.video
        })
        .then(response => {
          const {
            data,
            msg
          } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delVideo({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      delVideo({
          id: id
        })
        .then(response => {
          const {
            data,
            msg
          } = response;
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
