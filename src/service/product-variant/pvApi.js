import { axiosClient } from "../axiosClient"

export const pvApi = {
  add: (pvRQ) =>
    axiosClient
      .post("/product-variants", pvRQ, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  getImages: (id) => axiosClient.get("/product-variants/images/" + id).then((res) => res.data),
  getDetails: (id) => axiosClient.get("/product-variants/details/" + id).then((res) => res.data),

  updateImages: (imgRQ, id) =>
    axiosClient
      .put("/product-variants/" + id, imgRQ, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  reorder: (data) => axiosClient.put("/product-variants/reorder", data).then((res) => res.data),
  updateStatus: (data, id) => axiosClient.put("/product-variants/status/" + id, data),
  search: (params) => axiosClient.get("/product-variants/search", { params }).then((res) => res.data),
}
