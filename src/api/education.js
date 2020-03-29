import request from "@/utils/request";

export function getQuestionnaires(data) {
  return request({
    url: "/getQuestionnaires",
    method: "post",
    data
  });
}

export function getGroups() {
  return request({
    url: "/getGroups",
    method: "post"
  });
}

export function getQsnImportFile() {
  return request({
    url: "/getQsnImportFile",
    method: "post"
  });
}

export function addQuestionnaire(data) {
  return request({
    url: "/addQuestionnaire",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export function delQuestionnaire(data) {
  return request({
    url: "/delQuestionnaire",
    method: "post",
    data
  });
}

export function upQuestionnaire(data) {
  return request({
    url: "/upQuestionnaire",
    method: "post",
    data
  });
}
