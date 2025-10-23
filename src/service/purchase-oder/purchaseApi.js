import { axiosClient } from "../axiosClient"

export const purchaseApi = {
  add: (data) => axiosClient.post("/purchase-orders", data),
  search: (params) => axiosClient.get("/purchase-orders/search", { params }).then((res) => res.data),
  getCountType: (params) => axiosClient.get("/purchase-orders/type/counts", { params }).then((res) => res.data),
  updateNote: (data, id) => axiosClient.put("/purchase-orders/note/" + id, data).then((res) => res.data),

  // details
  getDetailsLasted: (params) =>
    axiosClient.get("/purchase-orders-detail/lasted/order", { params }).then((res) => res.data),
  updateDetailNote: (data, id) => axiosClient.put("/purchase-orders-detail/note/" + id, data).then((res) => res.data),
}
