import axios from "axios"

import { getUser, setUser, clearUser } from "@store/UserStore"
import { userApi } from "@service/userApi"

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getUser()?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

let refreshTokenPromise = null

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  (error) => {
    if (error.response.status === 410) {
      clearUser()
      window.location.href = "/login"
      return Promise.reject(error)
    }

    const originalRequests = error.config

    if (error.response?.status === 401 && !originalRequests._retry) {
      originalRequests._retry = true
      const refreshToken = getUser()?.refreshToken

      if (!refreshToken) {
        clearUser()
        window.location.href = "/login"
        return Promise.reject(error)
      }

      if (!refreshTokenPromise) {
        refreshTokenPromise = userApi
          .refreshToken(refreshToken)
          .catch(() => {
            clearUser()
            window.location.href = "/login"
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then((userResponse) => {
        setUser(userResponse)
        originalRequests.headers["Authorization"] = `Bearer ${userResponse.accessToken}`
        return axiosClient(originalRequests)
      })
    }

    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 401) {
      console.log(errorMessage)
    }

    return Promise.reject(error)
  },
)
