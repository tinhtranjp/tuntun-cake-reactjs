import { axiosClient } from "../axiosClient"

export const productOptionApi = {
  getOptions: () => axiosClient.get("/product_options/options").then((res) => res.data),
  getOptionsOrderByIndex: () => axiosClient.get("/product_options/order-index").then((res) => res.data),
  add: (options) => axiosClient.post("/product_options", options).then((res) => res.data),
  addValues: (options) => axiosClient.post("/product_options/add-value", options).then((res) => res.data),
  toggleSoftDelete: (id) => axiosClient.put("/product_options/options/toggle/" + id).then((res) => res.data),
  toggleValueSoftDelete: (id) => axiosClient.put("/product_options/value/toggle/" + id).then((res) => res.data),
  reorderIndex: (data) => axiosClient.put("/product_options/options/reorder", data).then((res) => res.data),
  reorderValueIndex: (data) => axiosClient.put("/product_options/value/reorder", data).then((res) => res.data),
  getOptionValueOrderByIndex: (id) => axiosClient.get("/product_options/option-value/" + id).then((res) => res.data),
}
