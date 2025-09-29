import { toast } from "sonner"
import { userApi } from "../userApi"
import { useMutation } from "@tanstack/react-query"

export function useCreateUser() {
  return useMutation({
    mutationFn: (user) => userApi.register(user),

    onSuccess: () => {
      toast.success("Tạo tài khoản thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useUserLogin() {
  return useMutation({
    mutationFn: (loginData) => userApi.login(loginData),

    onSuccess: () => {
      toast.success("Đăng nhập thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}
