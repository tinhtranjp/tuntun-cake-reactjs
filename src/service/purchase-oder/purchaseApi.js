import { axiosClient } from "../axiosClient"

export const purchaseApi = {
  add: (data) => axiosClient.post("/purchase-orders", data),
}
