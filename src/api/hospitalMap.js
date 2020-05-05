import request from "@/utils/request";

export function getHospitals(data) {
  return request({
    url: "/getHospitals",
    method: "post",
    data
  });
}
export function importHospitals(data) {
    return request({
      url: "/importHospitals",
      method: "post",
      data
    });
  }

  export function importDoctors(data) {
    return request({
      url: "/importDoctors",
      method: "post",
      data
    });
  }
  

