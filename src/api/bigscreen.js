import request from "@/utils/request";

export function getStationData(params) {
  return request({
    url: "/api/v1.01/stations",
    method: "get",
    params,
  });
}
