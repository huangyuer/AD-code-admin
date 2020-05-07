import { getExportLogs,getExportTables,batchExport} from "@/api/export.js";

const state = {

};

const mutations = {

};

const actions = {
    getExportLogs({ commit },params) {
        return new Promise((resolve, reject) => {
            getExportLogs(params)
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      getExportTables({ commit },params) {
        return new Promise((resolve, reject) => {
            getExportTables()
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      batchExport({ commit },params) {
        return new Promise((resolve, reject) => {
            batchExport(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
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
