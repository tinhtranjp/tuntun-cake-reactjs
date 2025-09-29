import { axiosClient } from "../axiosClient"

export const categoryApi = {
  add: (categoryRQ) => axiosClient.post("/categories", categoryRQ),
  getAll: () => axiosClient.get("/categories").then((res) => res.data),
  toggleCategories: (id) => axiosClient.put("/categories/toggle-status/" + id),
  getById: (id) => axiosClient.get("/categories/" + id).then((res) => res.data),
  update: (id, data) => axiosClient.put("/categories/" + id, data),
  reorder: (categoryIds) => axiosClient.put("/categories/reorder", categoryIds),
}
