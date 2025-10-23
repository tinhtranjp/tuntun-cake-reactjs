import { axiosClient } from "../axiosClient"

export const orderApi = {
  add: (orderRQ) => axiosClient.post("/orders", orderRQ).then((res) => res.data),
  search: (params) => axiosClient.get("/orders/search", { params }).then((res) => res.data),
  changeStatus: (data, id) => axiosClient.put("/orders/change-status/" + id, data).then((res) => res.data),
  togglePreOrder: (id) => axiosClient.put("/orders/pre-order/" + id).then((res) => res.data),
  getCountStatus: (params) => axiosClient.get("/orders/status/counts", { params }).then((res) => res.data),
}
