import { axiosClient } from "../axiosClient"

export const purchaseApi = {
  add: (data) => axiosClient.post("/purchase", data),
  search: (params) => axiosClient.get("/purchase/search", { params }).then((res) => res.data),
  getCountType: (params) => axiosClient.get("/purchase/type/counts", { params }).then((res) => res.data),
  updateNote: (data, id) => axiosClient.put("/purchase/note/" + id, data).then((res) => res.data),

  // details
  getDetailsLasted: (params) => axiosClient.get("/purchase/lasted/order", { params }).then((res) => res.data),
  updateDetailNote: (data, id) => axiosClient.put("/purchase/note-details/" + id, data).then((res) => res.data),
}
