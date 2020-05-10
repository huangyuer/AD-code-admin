import { addGoods,getGoodsAdmin,getGoodsDetail,upGoods,getExgLogsAdmin,upExgOrder,getScoreLogs} from "@/api/points";

const state = {

};

const mutations = {

};

const actions = {
    addGoods({ commit },params) {
        // {name:params.name,score:params.score,
        //     type:params.type,introduction:params.introduction,
        //     stockType:params.stockType,stockNum:params.stockNum,
        //     coverImg:params.coverImg,goodsImg:params.goodsImg,
        //     qtText:params.qtText,video:params.video,
        //     isDel:params.isDel}
        return new Promise((resolve, reject) => {
            addGoods(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      getGoodsAdmin({ commit },params) {
        return new Promise((resolve, reject) => {
            getGoodsAdmin(params)
            .then(response => {
              const { data,msg } = response;
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      getGoodsDetail({ commit },params) {
        return new Promise((resolve, reject) => {
            getGoodsDetail(params)
            .then(response => {
              const { data,msg } = response;
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      upGoods({ commit },params) {
        return new Promise((resolve, reject) => {
            upGoods(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      getExgLogsAdmin({ commit },params) {
        return new Promise((resolve, reject) => {
          getExgLogsAdmin(params)
            .then(response => {
              const { data,msg } = response;
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      upExgOrder({ commit },params) {
        return new Promise((resolve, reject) => {
          upExgOrder(params)
            .then(response => {
              const { data,msg } = response;
              resolve(msg);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      

      getScoreLogs({ commit },params) {
        return new Promise((resolve, reject) => {
          getScoreLogs(params)
            .then(response => {
              const { data,msg } = response;
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      
      

//     importHospitals({ commit },params) {
//         let form = new FormData();
//         form.append("file",params);
//         return new Promise((resolve, reject) => {
//             addGoods(form)
//             .then(response => {
//               const { data,msg } = response;
//               resolve(msg);
//             })
//             .catch(error => {
//               reject(error);
//             });
//         });
//       },

//     getHospitals({ commit },params) {
//     return new Promise((resolve, reject) => {
//         addGoods({page:params.page,limit:params.limit,name:params.name})
//         .then(response => {
//           const { data } = response;
//           resolve(data);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   },


};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
