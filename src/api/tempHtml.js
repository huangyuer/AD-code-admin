import request from "@/utils/request";

export function getTempHtmls(data) {
  return request({
    url: "/getTempHtmls",
    method: "post",
    data
  });
}
export function addTempHtml(data) {
    return request({
      url: "/addTempHtml",
      method: "post",
      data
    });
  }

  export function upTempHtml(data) {
    return request({
      url: "/upTempHtml",
      method: "post",
      data
    });
  }

  export function delTempHtml(data) {
    return request({
      url: "/delTempHtml",
      method: "post",
      data
    });
  }

  export function getTempHtml(data) {
    return request({
      url: "/getTempHtml",
      method: "post",
      data
    });
  }