import { getHospitals,importHospitals,importDoctors,getHospital,upHospital } from "@/api/hospitalMap";

const state = {

};

const mutations = {

};

const actions = {
  upHospital({ commit },params) {
   
    return new Promise((resolve, reject) => {
      upHospital(params)
        .then(response => {
          const { data,msg } = response;
          resolve(msg);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getHospital({ commit },params) {
   
    return new Promise((resolve, reject) => {
      getHospital(params)
        .then(response => {
          const { data,msg } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

    importDoctors({ commit },params) {
        let form = new FormData();
        form.append("file",params);
        return new Promise((resolve, reject) => {
            importDoctors(form)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },

    importHospitals({ commit },params) {
        let form = new FormData();
        form.append("file",params);
        return new Promise((resolve, reject) => {
            importHospitals(form)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },

    getHospitals({ commit },params) {
    return new Promise((resolve, reject) => {
        getHospitals({page:params.page,limit:params.limit,name:params.name,export:params.export})
        .then(response => {
          const { data } = response;
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
