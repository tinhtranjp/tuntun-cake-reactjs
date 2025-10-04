import { axiosClient } from "../axiosClient"

export const variantApi = {
  toggle: (id) => axiosClient.put("/variants/display/" + id),
  search: (params) => axiosClient.get("/variants/search", { params }).then((res) => res.data),
}
