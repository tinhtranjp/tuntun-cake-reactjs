import { axiosClient } from "../axiosClient"

export const productApi = {
  getDashBoard: (params) => axiosClient.get("/dash-board", { params }).then((res) => res.data),
  add: (productRQ) =>
    axiosClient
      .post("/products", productRQ, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  update: (prdUpdateRQ, id) =>
    axiosClient
      .put("/products/" + id, prdUpdateRQ, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  getStatus: () => axiosClient.get("/products/status").then((res) => res.data),

  getTypes: () => axiosClient.get("/products/types").then((res) => res.data),

  getById: (id) => axiosClient.get("/products/" + id).then((res) => res.data),
  getDetails: (id) => axiosClient.get("/products/detail/" + id).then((res) => res.data),
  finByIdBeforeUpdate: (id) => axiosClient.get("/products/before-update/" + id).then((res) => res.data),
  search: (params) => axiosClient.get("/products/search", { params }).then((res) => res.data),
  searchOrders: (params) => axiosClient.get("/products/search-view", { params }).then((res) => res.data),

  upLoad: (files) =>
    axiosClient.post("/products/upload-img", files, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  upLoad: async (files) => {
    if (!files) return []
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })
    try {
      const res = await axiosClient.post("/products/upload-img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // giả sử backend trả { urls: string[] }
      //@ts-ignore
      return res.urls || []
    } catch (error) {
      console.error("Upload failed:", error)
      return []
    }
  },
}
