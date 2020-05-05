import request from "@/utils/request";

export function addGoods(data) {
  return request({
    url: "/addGoods",
    method: "post",
    data
  });
}
export function getGoodsAdmin(data) {
    return request({
      url: "/getGoodsAdmin",
      method: "post",
      data
    });
  }

  export function getGoodsDetail(data) {
    return request({
      url: "/getGoodsDetail",
      method: "post",
      data
    });
  }
  
  export function upGoods(data) {
    return request({
      url: "/upGoods",
      method: "post",
      data
    });
  }

  export function getExgLogsAdmin(data) {
    return request({
      url: "/getExgLogsAdmin",
      method: "post",
      data
    });
  }
  


  export function upExgOrder(data) {
    return request({
      url: "/upExgOrder",
      method: "post",
      data
    });
  }

