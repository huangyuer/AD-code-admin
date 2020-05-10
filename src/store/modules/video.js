import {
  getVideos,
  getVideo,
  addVideo,
  delVideo,
  upVideo,
  getLive,
  upLive
} from "@/api/video";

const state = {

};

const mutations = {

};

const actions = {
  getLive({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getLive()
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
  upLive({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      upLive({
          id: params.id,
          liveAdd: params.liveAdd,
          coverImg: params.coverImg
        })
        .then(response => {
          const {
            msg
          } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getVideos({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getVideos({
          page: params.page,
          limit: params.limit,
          title: params.title,
          tag: params.tag,
          export: params.export
        })
        .then(response => {
          const {
            data
          } = response;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getVideo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getVideo(params)
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
          tag: params.tag,
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
  upVideo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      upVideo({
          id: params.id,
          tag: params.tag,
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
