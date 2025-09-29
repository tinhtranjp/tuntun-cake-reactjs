import { axiosClient } from "../axiosClient"

export const recipeApi = {
  add: (recipeRQ) =>
    axiosClient.post("/recipes", recipeRQ, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  search: (params) => axiosClient.get("/recipes/search", { params }).then((res) => res.data),
  softDeletes: (ids) => axiosClient.put("/recipes/display", ids).then((res) => res.data),
  toggle: (id) => axiosClient.put("/recipes/display/" + id).then((res) => res.data),
  getById: (id) => axiosClient.get("/recipes/" + id).then((res) => res.data),
  update: (id, data) =>
    axiosClient.put("/recipes/" + id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
}
